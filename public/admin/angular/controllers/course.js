var app = angular.module('CourseModule', ['ngSanitize']);

app.controller('CourseController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.course = {
		id: null
	};
	$scope.profile = null;
	$scope.unit = {'topic':'', 'description':'', 'wistia':'', 'index':0};

	
	$scope.init = function(){
		var request = $scope.generalService.parseLocation('admin');
		if (request.identifier == null)
			return;

		RestService.query({resource:'course', id:request.identifier}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('CourseController: '+JSON.stringify(response));
			$scope.course = response.course;
		});
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

	$scope.createCourse = function(completion){
		RestService.post({resource:'course', id:null}, $scope.course, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('Create Course: '+JSON.stringify(response));
			if (completion != null)
				completion();
		});

	}

	$scope.updateCourse = function(completion){
		if ($scope.course.id == null)
			return;

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
