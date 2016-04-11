var generalService = angular.module('GeneralServiceModule', []);

generalService.factory('generalService', [function(){
	
	var manager = {};
	
	manager.truncatedText = function(text, limit){
		if (text.length < limit)
			return text;
		
		return text.substring(0, limit)+'...';
	}
	
	
    manager.formattedDate = function(dateStr) {
    	var date = moment(new Date(dateStr)).format('MMM D, YYYY');
    	return date;
    }
	
	
	manager.convertToLinks = function(text) {
		var replaceText, replacePattern1;
 
		//URLs starting with http://, https://
		replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
		replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
 
		//URLs starting with "www."
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');
		
		return replacedText;
	}
	
	
	
    manager.parseLocation = function(stem) {
    	var resourcePath = location.href.replace(window.location.origin, ''); // strip out the domain root (e.g. http://localhost:8888)
    	var requestInfo = {"page":null, "identifier":null, 'params':{}};

    	// parse out the parameters:
    	var p = resourcePath.split('?');
    	if (p.length > 1){
    		var paramString = p[1];
    		var a = paramString.split('&');
    		var params = {};
    		for (var i=0; i<a.length; i++){
    			var keyValue = a[i].split('=');
    			if (keyValue.length < 1)
    				continue;
    			
    			params[keyValue[0]] = keyValue[1];
    		}
    		
    		requestInfo['params'] = params;
    	}
    	
    	resourcePath = p[0];

    	var parts = resourcePath.split(stem+'/');
    	if (parts.length > 1){
    		var hierarchy = parts[1].split('/');
    		for (var i=0; i<hierarchy.length; i++){
    			if (i==0)
    				requestInfo['page'] = hierarchy[i]

    			if (i==1) 
    			    requestInfo['identifier'] = hierarchy[i];
    			
    		}
    	}

    	return requestInfo;
    }
	
	
	
	return manager;
	
}]);