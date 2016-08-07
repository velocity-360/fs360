var Track = require('../models/Track')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(tracks){
	var results = new Array()
    for (var i=0; i<tracks.length; i++){
  	  var p = tracks[i]
  	  results.push(p.summary())
    }
	return results
}


module.exports = {
	pluralKey: function(){
		return 'tracks';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Track.findById(params.id, function(err, tracks){
				if (err){
					completion({message:'Track '+params.id+' not found'}, null);
					return
				}
				
				if (tracks == null){
					completion({message:'Track '+params.id+' not found'}, null);
					return
				}

				completion(null, tracks.summary())
			})
			return
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0
		
		delete params['limit'];
		
		Track.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, tracks) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, convertToJson(tracks))
		})
	},

	post: function(params, completion){
		Track.create(params, function(err, track){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, track.summary())
			return
		})
	},



	put: function(id, params, completion){
		Track.findByIdAndUpdate(id, params, {new:true}, function(err, track){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, track.summary())
			return
		});		
	},

	delete: function(){

	},

	updateTracking: function(req, visitor, callback){
		var page = req.body.page
		var slug = req.body.slug
		var params = req.body.params

		var trackingId = req.session.track
		if (trackingId == null){
			var pageMap = {}
			pageMap[page] = 1
			var info = {
				history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
				pageMap: pageMap,
				visitor: visitor
			}

			Track.create(info, function(err, track){
				if (err){
					callback(err, null)
					return
				}

				req.session.track = track._id
				callback(null, track.summary())
				return			
			})

			return			
		}

		Track.findById(trackingId, function(err, track){
			if (err){
				req.session.reset()
				var pageMap = {}
				pageMap[page] = 1
				var info = { 
					history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
					pageMap: pageMap,
					visitor: visitor
				}


				Track.create(info, function(err, track){
					if (err){
						callback(err, null)
						return
					}

					req.session.track = track._id
					callback(null, track.summary())
					return			
				})
				return
			}

			if (track == null){
				req.session.reset()
				var pageMap = {}
				pageMap[page] = 1
				var info = {
					history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
					pageMap: pageMap,
					visitor: visitor
				}

				Track.create(info, function(err, track){
					if (err){
						callback(err, null)
						return
					}

					req.session.track = track._id
					callback(null, track.summary())
					return			
				})
				return			
			}

			var history = track.history
			if (history == null)
				history = []

			history.push({
				page: page,
				slug: slug,
				params: params,
				timestamp: Date.now()
			})

			track['history'] = history

			var pageMap = track.pageMap
			var pageCount = pageMap[page]
			if (pageCount == null)
				pageCount = 1
			else 
				pageCount = pageCount+1

			pageMap[page] = pageCount
			track['pageMap'] = pageMap
			track.markModified('pageMap')

			track['visitor'] = visitor
			track.markModified('visitor')

			track.save()

			callback(null, track.summary())
			return
		})


	}

}



