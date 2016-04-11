var uploadService = angular.module('UploadServiceModule', ['angularFileUpload']);

restService.factory('uploadService', ['$http', '$upload', function($http, $upload){
	
	var uploadManager = {};
	
	uploadManager.uploadFiles = function(pkg, completion){
		console.log('UPLOAD SERVICE: Upload '+pkg.files.length+' Files - '+JSON.stringify(pkg));
		
		var url = 'https://media-service.appspot.com/api/upload?media='+pkg.media;
		$http.get(url).success(function(data, status, headers, config) {
	            console.log('DATA : '+ JSON.stringify(data));
				if (data['confirmation'] != 'success'){
					if (completion != null)
						completion(null, {'message':data['message']});
	                return;
	            }

	            upload(pkg.files, data['upload'], pkg.media, completion);
	        }).error(function(data, status, headers, config) {
	            console.log("error", data, status, headers, config);
				if (completion != null)
					completion(null, {'message':data});
	        });
	};
	
	
	
	//$files: an array of files selected, each file has name, size, and type.
    function upload($files, uploadString, media, completion) { 
        for (var i=0; i < $files.length; i++) {
        	var file = $files[i];
        	$upload.upload({
        		url: uploadString, //upload.php script, node.js route, or servlet url
        		method: 'POST',
        		// headers: {'header-key': 'header-value'},
        		// withCredentials: true,
        		//data: {myObj: $scope.myModelObj},
        		file: file // or list of files: $files for html5 only
        		/* set the file formData name ('Content-Desposition'). Default is 'file' */
        		//fileFormDataName: myFile, //or a list of names for multiple files (html5).
            }).progress(function(evt) {
            	console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) { // file is uploaded successfully        	  
//        	  console.log(JSON.stringify(data));
        	  var confirmation = data['confirmation'];
          	
            
            if (confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':data['message']});
            	return;
            }
			
			if (completion != null)
				completion(data, null);
          });
        }
    };


	
	return uploadManager;
	
}]);