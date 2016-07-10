var Subscriber = require('../models/Subscriber.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(subscribers){
	var results = new Array();
    for (var i=0; i<subscribers.length; i++){
  	  var p = subscribers[i];
  	  results.push(p.summary());
    }
	
	return results;
}

module.exports = {
	pluralKey: function(){
		return 'subscribers'
	},

	get: function(params, completion){
		console.log('CourseController - GET: '+JSON.stringify(params));

		// fetch specific Course by ID:
		if (params.id != null){ 
			Subscriber.findById(params.id, function(err, subscriber){
				if (err){
					completion({message:'Subscriber '+params.id+' not found'}, null)
					return
				}
				
				if (subscriber == null){
					completion({message:'Subscriber '+params.id+' not found'}, null)
					return
				}

				completion(null, subscriber.summary())
			})
			return
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit
		if (limit == null)
			limit = '0'
		
		delete params['limit']

		var format = 'json'
		if (params['format'] != null){
			format = 'list'
			delete params['format']
		}
		
		Subscriber.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, subscribers) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			if (format == 'list'){
				var list = [];
				for (var i=0; i<subscribers.length; i++){
					var subscriber = subscribers[i]
					var email = subscriber.email.toLowerCase()
					if (list.indexOf(email) != -1)
						continue
					
					list.push(email)
				}

				completion(null, list)
				return
			}

			completion(null, convertToJson(subscribers))
		})
	},

	post: function(subscriberInfo, completion){
		Subscriber.create(subscriberInfo, function(err, subscriber){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			if (completion != null)
				completion(null, subscriber.summary())
			
			return
		})
	},


	put: function(subscriberId, subscriberInfo, completion){
		Subscriber.findByIdAndUpdate(subscriberId, subscriberInfo, {new:true}, function(err, subscriber){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, subscriber.summary())
			return
		})
	},

	delete: function(){

	}

}



