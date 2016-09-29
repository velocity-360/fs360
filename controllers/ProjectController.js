var Project = require('../models/Project')
var Helpers = require('../managers/Helpers')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(projects){
	var results = new Array();
    for (var i=0; i<projects.length; i++){
  	  var p = projects[i];
  	  results.push(p.summary());
    }
	
	return results;
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
			limit = 0
		
		delete params['limit']
		
		Project.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, projects) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(projects));
		});
	},

	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			// fetch specific Course by ID:
			if (params.id != null){ 
				Project.findById(params.id, function(err, project){
					if (err){
						resolve(null)
						return
					}
					
					if (project == null){
						resolve(null)
						return
					}

					resolve(project)
				})
				return
			}
			
			
			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = 0
			
			delete params['limit']
			
			Project.find(params, null, {limit:limit, sort:{timestamp: -1}}, function(err, projects) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(projects))
			})
		})
	},		

	post: function(projectInfo, completion){
		projectInfo['slug'] = Helpers.slugString(projectInfo.title)
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
		projectInfo['slug'] = Helpers.slugString(projectInfo.title)
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



