var app = angular.module('ScrapeModule', []);

app.controller('ScrapeController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = null;
	$scope.html = null;
	$scope.loading = false;

	
	$scope.init = function(){
		console.log('SCRAPE Init');

	}

	$scope.scrapeHtml = function(){

		var parts = $scope.html.split(' ');
		var seek = 'http://www.meetup.com/Launch-it-in-NYC/members/';
		var scraped = new Array();
		for (var i=0; i<parts.length; i++){
			var word = parts[i];
			if (word.indexOf(seek) == -1)
				continue;

			var p = word.split('=');
			word = p[p.length-1];
			word = word.replace('\"', '');
			word = word.replace('\"', '');

			// if (word.length != seek.length+10)
			// 	continue;

			if (word.length != seek.length+10 && word.length != seek.length+9 && word.length != seek.length+8)
				continue;


			if (scraped.indexOf(word) != -1)
				continue;

			scraped.push(word);
		}

		console.log('FOUND : '+scraped.length+' members: '+JSON.stringify(scraped));

	}
	
	
	

}]);
