var app = angular.module('EventsModule', ['ngSanitize']);

app.controller('EventsController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = null;
	$scope.events = null;
	$scope.event = {
		id: null,
		title: '',
		date: '',
		time: '7:00pm',
		address: '27 East 28th Street',
		description: '',
		image: ''
	};

	
	$scope.init = function(){
		RestService.query({resource:'event', id:null}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			$scope.events = response.events;
		});
	}

	$scope.uploadImage = function(files){
		var pkg = {'files':files, 'media':'images'};
		uploadPackage(pkg);
	}

	$scope.selectEvent = function(event){
		$scope.event = event;

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
				$scope.event['image'] = image.id;
			}

			if ($scope.event.id != null)
				$scope.updateEvent(null);
		});
	}

	$scope.updateEvent = function(completion){
		if ($scope.event.id == null){
			$scope.createEvent();
			return;
		}

		RestService.put({resource:'event', id:$scope.event.id}, $scope.event, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('Update EVENT: '+JSON.stringify(response));
			if (completion != null)
				completion();
		});
	}

	$scope.createEvent = function(completion){
		RestService.post({resource:'event'}, $scope.event, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('CREATE EVENT: '+JSON.stringify(response));
			$scope.events.push(response.event);
			$scope.event = {
				id: null,
				title: '',
				date: '',
				time: '7:00pm',
				address: '27 East 28th Street',
				description: '',
				image: ''
			};

			if (completion != null)
				completion();
		});
	}


	$scope.removeEvent = function(){
		if ($scope.event.id == null)
			return;

		RestService.delete({resource:'event', id:$scope.event.id}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			console.log('DELETE EVENT: '+JSON.stringify(response));
			RestService.query({resource:'event', id:null}, function(response){
				if (response.confirmation != 'success'){
					alert(response.message);
					return;
				}

				$scope.events = response.events;
			});


		});

	}
	
	
	

}]);
