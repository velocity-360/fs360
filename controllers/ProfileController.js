var Profile = require('../models/Profile.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(profiles){
	var results = new Array();
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i];
  	  results.push(p.summary());
    }
	
	return results;
}

module.exports = {
	pluralKey: function(){
		return 'profiles';
	},

	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			if (params.id != null){ 
				Profile.findById(params.id, function(err, profile){
					if (err){
						resolve(null)
						return
					}
					
					if (profile == null){
						resolve(null)
						return
					}

					resolve(profile)
				})
				return
			}
			
			
			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = '0'

			delete params['limit']
			
			Profile.find(params, null, {limit:parseInt(limit), sort:{timestamp: -1}}, function(err, profiles) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(profiles))
			})
		})
	},

	create: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			Profile.find({email:params.email}, function(err, profiles){
				if (err){
					reject(err)
					return
				}

				if (profiles.length > 0){ // profile with email already exists - send it back
					var profile = profiles[0]
					resolve(profile)
					return
				}

				// Create new profile. This is what should happen:
				Profile.create(params, function(error, profile){
					if (error){
						reject(err)
						return
					}
					
					resolve(profile)
					return
				})
			})
		})
	},


	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Profile.findById(params.id, function(err, profile){
				if (err){
					completion({message:'Profile '+params.id+' not found'}, null);
					return;
				}
				
				if (profile == null){
					completion({message:'Profile '+params.id+' not found'}, null);
					return;
				}

				completion(null, profile.summary());
			});
			return;
		}


		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = '0'
		
		delete params['limit']
		
		Profile.find(params, null, {limit:parseInt(limit), sort:{timestamp: -1}}, function(err, profiles) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(profiles));
		});
	},

	post: function(params, completion){
		Profile.find({email:params.email}, function(err, profiles){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}

			if (profiles.length > 0){ // profile with email already exists - send it back
				var profile = profiles[0];
				completion(null, profile.summary());
				return;
			}

			// Create new profile. This is what should happen:
			Profile.create(params, function(error, profile){
				if (error){
					completion({confirmation:'fail', message:error.message}, null);
					return;
				}
				
				completion(null, profile.summary());
				return;
			});
		});
	},


	put: function(id, params, completion){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, profile.summary());
			return;
		});		
	},

	delete: function(){

	}

}



