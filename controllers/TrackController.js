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

	}

}



