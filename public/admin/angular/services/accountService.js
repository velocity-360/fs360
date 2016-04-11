var accountService = angular.module('AccountServiceModule', ['RestServiceModule']);

restService.factory('accountService', ['RestService', function(RestService){
	
	var accountManager = {};
	
	accountManager.checkCurrentUser = function(completion){
		console.log('ACCOUNT SERVICE: Check Current User ');
		RestService.get({resource:'currentuser', id:null}, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			
			if (completion != null)
				completion(response);
		});
	};


	accountManager.register = function(profile, completion){
		var required = [{'firstName':'First Name'}, {'lastName':'Last Name'}, {'email':'Email'}];
		var missing = null;
		for (var i=0; i<required.length; i++){
			var field = required[i];
			var key = Object.keys(field)[0];
			
			if (profile[key].length==0){
				checkField(profile, key);
				missing = field[key];
				break;
			}
		}
		
		if (missing != null){
			if (completion != null)
				completion(null, {'message':'Missing '+missing});
			return;
		}
		
		
		if (validateEmail(profile.email)==false) {
			if (completion != null)
				completion(null, {'message':'Invalid Email'});
			return;
		}
		
		
		RestService.post({resource:'profile', id:null}, profile, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				return;
			}
			
			if (completion != null)
				completion(response, null);
		});
	};
	
	accountManager.updateProfile = function(profile, completion){
		
		RestService.update({resource:'profile', id:profile.id}, profile, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				
				return;
			}

			if (completion != null)
				completion(response, null);
		});
	};

	accountManager.login = function(credentials, completion){
		if (credentials.email.length==0){
			alert("Please enter your email");
			return;
		}

		if (credentials.password.length==0){
			alert("Please enter your password");
			return;
		}
		
		if (validateEmail(credentials.email)==false) {
			alert("Please enter a valid email");
			return;
		}
		
		
		RestService.post({resource:'login', id:null}, credentials, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				return;
			}
			
			if (completion != null)
				completion(response, null);
		});
	};
	
	function checkField(profile, fieldId){
		var inputField = document.getElementById(fieldId);
		inputField.style.border = (profile[fieldId].length > 0) ? 'none' : '1px solid red'
	}
	
	
	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}
	
	
	return accountManager;
	
}]);