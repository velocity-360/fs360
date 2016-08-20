var app = angular.module('TutorialsModule', ['ngSanitize']);

app.controller('TutorialsController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService
	$scope.profile = null
	$scope.tutorials = null
	$scope.post = ''
	$scope.tutorial = {
		id: null,
		title: '',
		description: '',
		image: ''
	}
	
	$scope.init = function(){
		var request = $scope.generalService.parseLocation('admin')
		if (request.identifier == null){
			RestService.query({resource:'tutorial', id:null}, function(response){
				if (response.confirmation != 'success'){
					alert(response.message);
					return;
				}

				$scope.tutorials = response.tutorials
			})
			return
		}


		RestService.query({resource:'tutorial', id:request.identifier}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			$scope.tutorial = response.tutorial
		})
	}

	$scope.uploadImage = function(files){
		var pkg = {'files':files, 'media':'images'}
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
				$scope.tutorial['image'] = image.id
				$scope.updateTutorial(null)
			}
		})
	}

	$scope.addPost = function(){
		if ($scope.post.length == 0)
			return

		var tutorialId = $scope.tutorial.id
		if (tutorialId == null)
			return

		RestService.get({resource:'post', id:$scope.post}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			var post = response.post
			var alreadyThere = false
			for (var i=0; i<$scope.tutorial.posts.length; i++){
				var p = $scope.tutorial.posts[i]
				if (p.id == post.id){ // already there, ignore
					alreadyThere = true
					break
				}
			}

			if (alreadyThere == true)
				return

			var entry = {
				title: post.title,
				id: post.id,
				wistia: post.wistia,
				image: post.image
			}

			$scope.tutorial.posts.push(entry)
			$scope.updateTutorial()
		})
	}


	$scope.updateTutorial = function(completion){
		if ($scope.tutorial.id == null)
			return
		
		RestService.put({resource:'tutorial', id:$scope.tutorial.id}, $scope.tutorial, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('Update tutorial: '+JSON.stringify(response))
			$scope.tutorial = response.tutorial
			alert('Tutorial Updated')
			if (completion != null)
				completion()
		})
	}

	$scope.createTutorial = function(completion){
		RestService.post({resource:'tutorial'}, $scope.tutorial, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('CREATE TUTORIAL: '+JSON.stringify(response))
			$scope.tutorials.push(response.tutorial)
			$scope.tutorial = {
				id: null,
				title: '',
				description: '',
				image: ''
			}

			if (completion != null)
				completion()
		})
	}


	$scope.removeTutorial = function(){
		if ($scope.tutorial.id == null)
			return

		RestService.delete({resource:'tutorial', id:$scope.tutorial.id}, function(response){
			if (response.confirmation != 'success'){
				alert(response.message)
				return
			}

			console.log('DELETE EVENT: '+JSON.stringify(response))
			RestService.query({resource:'tutorial', id:null}, function(response){
				if (response.confirmation != 'success'){
					alert(response.message)
					return
				}

				$scope.tutorials = response.tutorials
			})
		})
	}

}])
