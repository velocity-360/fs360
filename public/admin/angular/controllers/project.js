var app = angular.module('ProjectModule', ['ngSanitize']);

app.controller('ProjectController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService
	$scope.profile = null
	$scope.unit = {'topic':'', 'description':'', 'wistia':'', 'index':0}
	$scope.projects = null
	$scope.project = {
		id: null,
		image: '',
		pdf: '',
		units: []
	}

	
	$scope.init = function(){
		var request = $scope.generalService.parseLocation('admin')
		RestService.query({resource:'project', id:null}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('ProjectController: '+JSON.stringify(response))
			$scope.projects = response.projects
		})
	}

	$scope.selectProject = function(project){
		$scope.project = project
	}

	$scope.uploadImage = function(files){
		var pkg = {'files':files, 'media':'images'}
		uploadPackage(pkg)
	}

	$scope.uploadPDF = function(files){
		var pkg = {'files':files, 'media':'pdf'}
		uploadPackage(pkg)
	}

	function uploadPackage(pkg){
		uploadService.uploadFiles(pkg, function(response, error){
			if (error){
				alert(error.message)
				return
			}

			console.log('UPLOAD: '+JSON.stringify(response))
			if (pkg.media == 'images'){
				var image = response.image
				$scope.project['image'] = image.id
			}
			else {
				var pdf = response.pdf
				$scope.project['pdf'] = pdf.id
			}

			$scope.updateProject(null)
		})
	}


	$scope.selectUnit = function(unit){
		$scope.unit = unit
	}

	$scope.addUnit = function(){
		console.log('ADD UNIT: '+JSON.stringify($scope.unit));
		if ($scope.unit.topic.length == 0){
			alert('Please Enter a Topic');
			return;
		}

		if ($scope.unit.description.length == 0){
			alert('Please Enter a Description');
			return;
		}

		$scope.unit['index'] = $scope.project.units.length
		$scope.project.units.push($scope.unit);
		$scope.updateProject(function(){
			$scope.unit = {'topic':'', 'description':'', 'wistia':'', 'index':0};

		});
	}

	$scope.removeUnit = function(unit){
		var index = $scope.project.units.indexOf(unit);
		if (index == -1)
			return

		$scope.project.units.splice(index, 1)
//		console.log('REMOVE UNIT: '+JSON.stringify($scope.course));
		$scope.updateCourse(null)
	}

	function processTagString(){
		var tagString = $scope.project.tagString
		if (tagString == null)
			return

		var tags = []
		var t = tagString.split(',')
		for (var i=0; i<t.length; i++){
			var tag = t[i];
			if (tag.length == 0)
				continue

			tags.push(tag.trim())
		}

		$scope.project['tags'] = tags
	}

	$scope.createProject = function(){
		processTagString()
		RestService.post({resource:'project', id:null}, $scope.project, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('Create Project: '+JSON.stringify(response))
			// if (completion != null)
			// 	completion()
		})
	}

	$scope.updateProject = function(){
		if ($scope.project.id == null)
			return

		processTagString()
		RestService.put({resource:'project', id:$scope.project.id}, $scope.project, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('UPDATE Project: '+JSON.stringify(response))
		})
	}

	

	

}]);
