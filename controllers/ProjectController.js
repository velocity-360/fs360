var Project = require('../models/Project');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(projects){
	var results = new Array();
    for (var i=0; i<projects.length; i++){
  	  var p = projects[i];
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
		return 'projects';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Project.findById(params.id, function(err, project){
				if (err){
					completion({message:'Project '+params.id+' not found'}, null);
					return;
				}
				
				if (project == null){
					completion({message:'Project '+params.id+' not found'}, null);
					return;
				}

				completion(null, project.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Project.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, projects) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(projects));
		});
	},

	post: function(projectInfo, completion){
		var parts = projectInfo.title.split(' ');

		var slug = '';
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			slug += word;
			if (i != parts.length-1)
				slug += '-';
		}

		slug = slug.replace('?', '');
		projectInfo['slug'] = slug;
		Project.create(projectInfo, function(err, project){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, project.summary());
			return;
		});
	},



	put: function(projectId, projectInfo, completion){
		Project.findByIdAndUpdate(projectId, projectInfo, {new:true}, function(err, project){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, project.summary());
			return;
		});		
	},

	delete: function(){

	}

}



