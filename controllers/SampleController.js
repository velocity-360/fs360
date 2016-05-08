var Sample = require('../models/Sample');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(samples){
	var results = new Array();
    for (var i=0; i<samples.length; i++){
  	  var p = samples[i];
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
		return 'samples';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Sample.findById(params.id, function(err, samples){
				if (err){
					completion({message:'Sample '+params.id+' not found'}, null);
					return;
				}
				
				if (sample == null){
					completion({message:'Sample '+params.id+' not found'}, null);
					return;
				}

				completion(null, sample.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Sample.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, samples) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(samples));
		});
	},

	post: function(sampleInfo, completion){
		var parts = sampleInfo.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		slug = slug.replace('?', '');
		sampleInfo['slug'] = slug;
		Sample.create(sampleInfo, function(err, sample){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, sample.summary());
			return;
		});
	},



	put: function(sampleId, sampleInfo, completion){
		Sample.findByIdAndUpdate(sampleId, sampleInfo, {new:true}, function(err, sample){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, sample.summary());
			return;
		});		
	},

	delete: function(){

	}

}



