var app = angular.module('ProjectModule', ['ngSanitize']);

app.controller('ProjectController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = null;
	$scope.unit = {'topic':'', 'description':'', 'wistia':'', 'index':0};
	$scope.project = {
		id: null,
		image: ''
	};

	
	$scope.init = function(){
		var request = $scope.generalService.parseLocation('admin')
		RestService.query({resource:'project', id:null}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return;
			}

			console.log('ProjectController: '+JSON.stringify(response))
		})


		// RestService.query({resource:'course', id:request.identifier}, function(response){
		// 	if (response.confirmation != 'success'){
		// 		alert(response.message);
		// 		return;
		// 	}

		// 	console.log('CourseController: '+JSON.stringify(response));
		// 	$scope.course = response.course;
		// 	$scope.course['tagString'] = $scope.course.tags.toString();
		// });
	}

	$scope.uploadImage = function(files){
		var pkg = {'files':files, 'media':'images'};
		uploadPackage(pkg);
	}

	$scope.uploadSyllabus = function(files){
		var pkg = {'files':files, 'media':'pdf'};
		uploadPackage(pkg);
	}

	function uploadPackage(pkg){
		uploadService.uploadFiles(pkg, function(response, error){
			if (error){
				alert(error.message);
				return;
			}

			console.log('UPLOAD: '+JSON.stringify(response));
			if (pkg.media == 'images'){
				var image = response.image;
				$scope.course['image'] = image.id;
			}
			else {
				var pdf = response.pdf;
				$scope.course['syllabus'] = pdf.id;
			}

			$scope.updateCourse(null);
		});

	}


	$scope.selectUnit = function(unit){
		$scope.unit = unit;

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

		$scope.unit['index'] = $scope.course.units.length;
		$scope.course.units.push($scope.unit);
		$scope.updateCourse(function(){
			$scope.unit = {'topic':'', 'description':'', 'wistia':'', 'index':0};

		});
	}

	$scope.removeUnit = function(unit){
		var index = $scope.course.units.indexOf(unit);
		if (index == -1)
			return;

		$scope.course.units.splice(index, 1);
//		console.log('REMOVE UNIT: '+JSON.stringify($scope.course));
		$scope.updateCourse(null);
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

	$scope.updateCourse = function(completion){
		if ($scope.course.id == null)
			return;

		processTagString()
		RestService.put({resource:'course', id:$scope.course.id}, $scope.course, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('Update Course: '+JSON.stringify(response));
			if (completion != null)
				completion();
		});
	}

	

	

}]);
