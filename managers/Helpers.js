module.exports = {

	randomString: function(limit){
	    var text = ""
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	    for (var i=0; i <limit; i++)
	        text += possible.charAt(Math.floor(Math.random() * possible.length))

	    return text
	},

	capitalize: function(string){
	    if (string == null)
	        return;
	    
	    var parts = string.split(' ')
	    var capitalizedString = ''
	    
	    for (var i=0; i<parts.length; i++){
	        var s = parts[i]
	        if (s.length <= 1){
	            capitalizedString = capitalizedString+' '+s.toUpperCase()
	            continue
	        }
	        
	        s = s.charAt(0).toUpperCase() + s.slice(1)
	        capitalizedString = capitalizedString+' '+s
	    }
	    
	    capitalizedString = capitalizedString.trim()
	    return capitalizedString
	},

	slugString: function(string){
		var parts = string.split(' ')

		var slug = ''
		for (var i=0; i<parts.length; i++){
			var word = parts[i]
			word = word.replace('?', '')
			word = word.replace('&', '')
			word = word.replace(':', '')
			if (word.length < 1)
				continue
			
			slug += word.toLowerCase()
			if (i != parts.length-1)
				slug += '-'
		}

		return slug
	}

}