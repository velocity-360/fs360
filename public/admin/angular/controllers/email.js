var app = angular.module('EmailModule', ['ngSanitize']);

app.controller('EmailController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = null;
	$scope.credentials = {'email':'', 'password':'', 'name':''};
	$scope.recipients = [];
	$scope.emailTemplate = 'workshop'; // default to workshop template
	$scope.recipientsString = '';
	$scope.loading = false;

	
	$scope.init = function(){
		accountService.checkCurrentUser(function(response){
			if (response.confirmation == 'success')
				$scope.profile = response.profile;
			
		});
	}
	
	$scope.sendEmail = function(){
		if ($scope.recipientsString.length == 0){
			alert('Include at least one recipient.');
			return;
		}
		
		var r = $scope.recipientsString.split(',');
		for (var i=0; i<r.length; i++){
			var email = r[i];
			$scope.recipients.push(email.trim());
		}
		
		if ($scope.recipients.length == 0){
			alert('Include at least one recipient.');
			return;
		}
		
		var pkg = {
			'recipients':$scope.recipients,
			'template': $scope.emailTemplate
		};
		
		RestService.post({resource:'email', id:null}, pkg, function(response){
			console.log('EMAIL CONTROLLER == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}
			
			$scope.recipientsString = '';
			$scope.recipients = [];
			alert('Emails Sent');
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
			
			window.location.href = '/site/forum';
		});
	}
	
	

}]);
