var app = angular.module('CoursesModule', ['ngSanitize']);

app.controller('CoursesController', ['$scope', 'generalService', 'accountService', 'RestService', function($scope, generalService, accountService, RestService) {
	$scope['generalService'] = generalService;
	$scope.courses = null;
	$scope.profile = null;

	
	$scope.init = function(){
		RestService.query({resource:'course', id:null}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('CoursesController: '+JSON.stringify(response));
			$scope.courses = response.courses;
		});
	}



	
	
	

}]);
