var Comment = require('../models/Comment.js');
var mongoose = require('mongoose');
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(comments){
	var results = new Array();
    for (var i=0; i<comments.length; i++){
  	  var p = comments[i];
  	  results.push(p.summary());
    }
	
	return results;
}

module.exports = {

	pluralKey: function(){
		return 'comments';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Comment.findById(params.id, function(err, comment){
				if (err){
					completion({message:'Comment '+params.id+' not found'}, null);
					return;
				}
				
				if (comment == null){
					completion({message:'Comment '+params.id+' not found'}, null);
					return;
				}

				completion(null, comment.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = '0';
		
		delete params['limit'];
		
		Comment.find(params, null, {limit:parseInt(limit), sort:{timestamp: -1}}, function(err, comments) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(comments));
		});
	},

	post: function(commentInfo, completion){
		Comment.create(commentInfo, function(err, comment){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, comment.summary());
			return;
		});
	},



	put: function(commentId, commentInfo, completion){
		Comment.findByIdAndUpdate(commentId, commentInfo, {new:true}, function(err, comment){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, comment.summary());
			return;
		});		
	},

	delete: function(){

	}

}



