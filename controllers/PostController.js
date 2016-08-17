var Post = require('../models/Post')
var Scraper = require('../utils/Scraper')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(posts){
	var results = new Array()
    for (var i=0; i<posts.length; i++){
  	  var p = posts[i]
  	  results.push(p.summary())
    }
	
	return results
}

module.exports = {
	pluralKey: function(){
		return 'posts'
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Post.findById(params.id, function(err, post){
				if (err){
					completion({message:'Post '+params.id+' not found'}, null)
					return
				}
				
				if (post == null){
					completion({message:'Post '+params.id+' not found'}, null)
					return
				}

				completion(null, post.summary())
			})
			return
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit
		if (limit == null)
			limit = 0
		
		delete params['limit']
		Post.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, posts) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, convertToJson(posts))
		})
	},

	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			// fetch specific Course by ID:
			if (params.id != null){ 
				Post.findById(params.id, function(err, post){
					if (err){
						resolve(null)
						return
					}
					
					if (post == null){
						resolve(null)
						return
					}

					resolve(post)
				})
				return
			}
			
			
			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = 0
			
			delete params['limit']
			Post.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, posts) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(posts))
			})
		})
	},	

	post: function(postInfo, completion){
		if (postInfo.link.length == 0){
			var parts = postInfo.title.split(' ')
			var slug = ''
			for (var i=0; i<parts.length; i++){
				var word = parts[i]
				slug += word
				if (i != parts.length-1)
					slug += '-'
			}

			slug = slug.replace('?', '')
			postInfo['slug'] = slug
			Post.create(postInfo, function(err, post){
				if (err){
					completion({confirmation:'fail', message:err.message}, null)
					return
				}
				
				completion(null, post.summary())
				return
			})

			return
		}

		var props = ['og:title', 'og:image', 'og:description']
		Scraper.scrape(postInfo.link, props)
		.then(function(result){
			var keys = Object.keys(result)
			for (var i=0; i<keys.length; i++){
				var key = keys[i]
				postInfo[key] = result[key]
			}

			var parts = postInfo.title.split(' ')
			var slug = ''
			for (var i=0; i<parts.length; i++){
				var word = parts[i]
				slug += word
				if (i != parts.length-1)
					slug += '-'
			}

			slug = slug.replace('?', '')
			postInfo['slug'] = slug
			Post.create(postInfo, function(err, post){
				if (err){
					completion({confirmation:'fail', message:err}, null)
					return
				}
				
				completion(null, post.summary())
				return
			})
		})
		.catch(function(err){
			completion({confirmation:'fail', message:err}, null)
		})
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



