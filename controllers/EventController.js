var Event = require('../models/Event');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(events){
	var results = new Array();
    for (var i=0; i<events.length; i++){
  	  var p = events[i];
  	  results.push(p.summary());
    }
	
	return results;
}

function randomString(limit){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i <limit; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {

	pluralKey: function(){
		return 'events';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Event.findById(params.id, function(err, event){
				if (err){
					completion({message:'Event '+params.id+' not found'}, null);
					return;
				}
				
				if (event == null){
					completion({message:'Event '+params.id+' not found'}, null);
					return;
				}

				completion(null, event.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Event.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, events) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(events));
		});
	},

	post: function(eventInfo, completion){
		var parts = eventInfo.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		eventInfo['slug'] = slug;
		Event.create(eventInfo, function(err, event){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, event.summary());
			return;
		});
	},


	put: function(eventId, eventInfo, completion){
		Event.findByIdAndUpdate(eventId, eventInfo, {new:true}, function(err, event){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, event.summary());
			return;
		});		
	},

	delete: function(eventId, completion){
		Event.findOneAndRemove({_id: eventId}, function(err, result){
			if (err){
				if (completion != null)
					completion({confirmation:'fail', message:err.message}, null);

				return;
			}
			
			if (completion != null)
				completion(null, {});
			return;
		});
	}

}



