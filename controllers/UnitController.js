var Unit = require('../models/Unit')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(units){
	var results = new Array();
    for (var i=0; i<units.length; i++){
  	  var p = units[i];
  	  results.push(p.summary());
    }
	
	return results;
}


module.exports = {
	pluralKey: function(){
		return 'units';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Unit.findById(params.id, function(err, units){
				if (err){
					completion({message:'Unit '+params.id+' not found'}, null);
					return;
				}
				
				if (units == null){
					completion({message:'Unit '+params.id+' not found'}, null);
					return;
				}

				completion(null, units.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Unit.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, units) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(units));
		});
	},

	post: function(params, completion){
		var parts = params.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		slug = slug.replace('?', '');
		params['slug'] = slug;
		Unit.create(params, function(err, unit){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, unit.summary());
			return;
		});
	},



	put: function(id, params, completion){
		Unit.findByIdAndUpdate(id, params, {new:true}, function(err, unit){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, unit.summary());
			return;
		});		
	},

	delete: function(){

	}

}



