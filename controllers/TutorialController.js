var Tutorial = require('../models/Tutorial')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(tutorials){
	var results = new Array()
    for (var i=0; i<tutorials.length; i++){
  	  var p = tutorials[i]
  	  results.push(p.summary())
    }
	
	return results
}


module.exports = {
	pluralKey: function(){
		return 'tutorials'
	},

	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			if (params.id != null){ 
				Tutorial.findById(params.id, function(err, tutorial){
					if (err){
						resolve(null)
						return
					}
					
					if (tutorial == null){
						resolve(null)
						return
					}

					resolve(tutorial)
				})
				return
			}
			
			
			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = 0
			
			delete params['limit']
			
			Tutorial.find(params, null, {limit:limit, sort:{priority: 1}}, function(err, tutorials) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(tutorials))
			})
		})
	},


	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Tutorial.findById(params.id, function(err, tutorial){
				if (err){
					completion({message:'Tutorial '+params.id+' not found'}, null);
					return
				}
				
				if (tutorial == null){
					completion({message:'Tutorial '+params.id+' not found'}, null);
					return
				}

				completion(null, tutorial.summary())
			})
			return
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit
		if (limit == null)
			limit = 0
		
		delete params['limit']
		
		Tutorial.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, tutorials) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, convertToJson(tutorials))
		})
	},

	post: function(params, completion){
		var parts = params.title.split(' ')

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		slug = slug.replace('?', '')
		params['slug'] = slug
		Tutorial.create(params, function(err, tutorial){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, tutorial.summary())
			return
		})
	},


	put: function(id, params, completion){
		Tutorial.findByIdAndUpdate(id, params, {new:true}, function(err, tutorial){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, tutorial.summary())
			return
		})
	},

	delete: function(){

	}

}



