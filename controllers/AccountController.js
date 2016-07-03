var Profile = require('../models/Profile')
var mongoose = require('mongoose')


function convertToJson(profiles){
	var results = new Array()
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i]
  	  results.push(p.summary())
    }
	
	return results
}

module.exports = {
	login: function(params, completion){
		Profile.find({'email':params.email}, function(err, profiles) {
			if (err) {
				completion({'message':err.message}, null);
				return
			}
			
			if (profiles.length == 0){
				completion({'message':'Profile '+params.email+' not found.'}, null)
				return
			}
			
			var profile = profiles[0] // assume first one
			if (profile.password != params.password){
				completion({'message':'Incorrect Password'}, null)
				return
			}
				
			completion(null, profile.summary())
			return
		})
	},

	checkCurrentUser: function(req, completion){
		if (req.session == null){
			completion({'message':'User not logged in.'}, null)
			return
		}

		if (req.session.user == null){
			completion({'message':'User not logged in.'}, null)
			return
		}
		
		var userId = req.session.user
		Profile.findById(userId, function(err, profile){
			if (err){
				req.session.reset()
				completion({'message':'Profile '+userId+' not found'}, null)
				return
			}
			
			if (profile == null){
				completion({'message':'Profile '+userId+' not found'}, null)
				return
			}

			completion(null, profile.summary())
		})
	}

}

