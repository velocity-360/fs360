var app = angular.module('SeriesModule', ['ngSanitize']);

app.controller('SeriesController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = null;
	$scope.credentials = {'email':'', 'password':'', 'name':''};
	$scope.loading = false;
	$scope.series = {'name':'', 'tags':[], 'tagsString':'', 'description':'', 'image':'', 'videos':[], 'synopsis':'', 'fee':'0'};
	$scope.video = {'name':'', 'tags':[], 'tagsString':'', 'description':'', 'image':'', 'url':'', 'series':'', 'index':0, 'youtubeId':'', 'packageUrl':''};

	
	$scope.init = function(){
		console.log('SERIES Controller');
		accountService.checkCurrentUser(function(response){
			if (response.confirmation == 'success')
				$scope.profile = response.profile;
			
		});
	}

	$scope.parseUrl = function(){
		var requestInfo = $scope.generalService.parseLocation('admin');
		if (requestInfo.identifier == null)
			return;

		console.log('PARSE URL: '+requestInfo.identifier);
		RestService.query({resource:'series', id:requestInfo.identifier}, function(response){
			console.log('SERIES == '+JSON.stringify(response));
			if (response.confirmation != 'success')
				return;

			$scope.series = response.series;
			$scope.series['tagsString'] = $scope.series.tags.toString();
			$scope.series['techUsedString'] = $scope.series.techUsed.toString();
			fetchSeriesVideos()
		});
	}

	function convertTags(tagsString){
		var tags = [];
		var t = tagsString.split(',');
		for (var i=0; i<t.length; i++)
			tags.push(t[i].trim());
		
		return tags;
	}

	function fetchSeriesVideos(){
		RestService.query({resource:'video', series:$scope.series.id, id:null}, function(response){
			console.log('FETCH SERIES VIDESO: '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			$scope.series['videos'] = response.videos;
		});

	}

	$scope.updateSeries = function(){
		$scope.series['tags'] = convertTags($scope.series.tagsString);
		$scope.series['techUsed'] = convertTags($scope.series.techUsedString);
		RestService.put({resource:'series', id:$scope.series.id}, $scope.series, function(response){
			console.log('SERIES CONTROLLER == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			alert('Series Updated');
		});
	}


	$scope.createSeries = function(){
		$scope.series['tags'] = convertTags($scope.series.tagsString);
		$scope.series['techUsed'] = convertTags($scope.series.techUsedString);
		RestService.post({resource:'series', id:null}, $scope.series, function(response){
			console.log('SERIES CONTROLLER == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			window.location.href = '/admin/edit-series/'+response.series.id;
		});

	}
	
	$scope.addVideo = function(){
		$scope.video['series'] = $scope.series.id;
		$scope.video['tags'] = convertTags($scope.video.tagsString);
		if ($scope.video.index == 0)
			$scope.video['index'] = $scope.series.videos.length;


		RestService.post({resource:'video', id:null}, $scope.video, function(response){
			console.log('ADD VIDEO == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			$scope.series.videos.push(response.video);
			$scope.resetVideo();
		});
	}

	$scope.selectVideo = function(video){
		$scope.video = video;
		$scope.video['tagsString'] = video.tags.toString();
	}

	$scope.updateVideo = function(){
		$scope.video['tags'] = convertTags($scope.video.tagsString);
		RestService.put({resource:'video', id:$scope.video.id}, $scope.video, function(response){
			console.log('UPDATE VIDEO == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			alert('VIDEO UPDATED');
			$scope.resetVideo();
		});
	}

	$scope.resetVideo = function(){
		$scope.video = {'name':'', 'tags':[], 'tagsString':'', 'description':'', 'image':'', 'url':'', 'series':'', 'index':0, 'youtubeId':'', 'packageUrl':''};
	}
	
	$scope.onFileSelect = function(files, entity, media){
		$scope.loading = true;
		uploadService.uploadFiles({'files':files, 'media':media}, function(response, error){
			$scope.loading = false;
			
			if (error != null){
				alert(error.message);
				return;
			}
			
			if (media != 'images')
				return;

			var image = response.image;
			delete image['key'];

			if (entity == 'series'){
				$scope.series['image'] = image.id;
				console.log(JSON.stringify($scope.series));
			}
			
			if (entity == 'video'){
				$scope.video['image'] = image.id;
				console.log(JSON.stringify($scope.video));
			}

		});
	}

	$scope.login = function(){
		$scope.loading = true;
		accountService.login($scope.credentials, function(response, error){
			if (error != null){
				$scope.loading = false;
                alert(error.message);
				return;
			}
			
		});
	}
	
	

}]);
