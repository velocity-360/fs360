var app = angular.module('DuplicatesModule', ['ngSanitize']);

app.controller('DuplicatesController', ['$scope', 'generalService', function($scope, generalService) {
	$scope['generalService'] = generalService;
	$scope.text = '';
	$scope.duplicates = '';
	$scope.sanitized = '';

	
	$scope.init = function(){

	}

	$scope.cleanup = function(){
		var t = $scope.text.replace(/(\r\n|\n|\r)/gm, ' ');
		t = t.replace(/\t/g, ' ');

		var words = t.split(' ');

		var a = [];

		for (var i=0; i<words.length; i++){
			var word = words[i];
			console.log('WORD: '+word);
			if (word.indexOf('@') == -1)
				continue;
			


			a.push(word.split(' ')[0]);
		}

		$scope.text = a.toString();

	}

	
	$scope.checkDuplicates = function(){
		console.log('Check Duplicates');
		var list = $scope.text.split(',');

		var a = [];
		var b = [];

		for (var i=0; i<list.length; i++){
			var word = list[i];
			console.log('WORD: '+word);
			if (a.indexOf(word) == -1){
				a.push(word);
			}
			else{
				b.push(word);
			}
		}

		$scope.sanitized = a.toString();
		$scope.duplicates = b.toString();


	}
	

}]);
