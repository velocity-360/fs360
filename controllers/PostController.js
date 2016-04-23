var Post = require('../models/Post.js');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(posts){
	var results = new Array();
    for (var i=0; i<posts.length; i++){
  	  var p = posts[i];
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
		return 'posts';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Post.findById(params.id, function(err, post){
				if (err){
					completion({message:'Post '+params.id+' not found'}, null);
					return;
				}
				
				if (post == null){
					completion({message:'Post '+params.id+' not found'}, null);
					return;
				}

				completion(null, post.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Post.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, posts) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(posts));
		});
	},

	post: function(postInfo, completion){
		var parts = postInfo.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		slug = slug.replace('?', '');
		postInfo['slug'] = slug;
		Post.create(postInfo, function(err, post){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, post.summary());
			return;
		});
	},



	put: function(postId, postInfo, completion){
		Post.findByIdAndUpdate(postId, postInfo, {new:true}, function(err, post){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, post.summary());
			return;
		});		
	},

	delete: function(){

	}

}



