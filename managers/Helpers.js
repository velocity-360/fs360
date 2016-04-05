module.exports = {

	capitalize: function(string){
	    if (string == null)
	        return;
	    
	    var parts = string.split(' ');
	    var capitalizedString = '';
	    
	    for (var i=0; i<parts.length; i++){
	        var s = parts[i];
	        if (s.length <= 1){
	            capitalizedString = capitalizedString+' '+s.toUpperCase();
	            continue;
	        }
	        
	        s = s.charAt(0).toUpperCase() + s.slice(1);
	        capitalizedString = capitalizedString+' '+s;
	    }
	    
	    capitalizedString = capitalizedString.trim();
	    return capitalizedString;
	}

}