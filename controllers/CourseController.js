var Course = require('../models/Course.js');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(courses){
	var results = new Array();
    for (var i=0; i<courses.length; i++){
  	  var p = courses[i];
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
		return 'courses';
	},

	get: function(params, completion){
		console.log('CourseController - GET: '+JSON.stringify(params));

		// fetch specific Course by ID:
		if (params.id != null){ 
			Course.findById(params.id, function(err, course){
				if (err){
					completion({message:'Course '+params.id+' not found'}, null);
					return;
				}
				
				if (course == null){
					completion({message:'Course '+params.id+' not found'}, null);
					return;
				}

				completion(null, course.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Course.find(params, null, {limit:limit, sort:{priority: -1}}, function(err, courses) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(courses));
		});
	},

	post: function(courseinfo, completion){
		var parts = courseinfo.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		courseinfo['slug'] = slug;

		Course.create(courseinfo, function(err, course){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, course.summary());
			return;
		});
	},



	put: function(courseId, courseInfo, completion){
		Course.findByIdAndUpdate(courseId, courseInfo, {new:true}, function(err, course){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, course.summary());
			return;
		});		
	},

	delete: function(){

	}

}



