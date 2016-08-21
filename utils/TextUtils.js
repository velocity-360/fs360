module.exports = {

	truncateText: function(str, limit){
		if (str.length < limit)
			return str

		return str.substring(0, limit)+'...'
	},

	capitalize: function(str){
		if (str.length == 1)
			return str.toUpperCase()

		var firstLetter = str.substring(0, 1)
		return firstLetter.toUpperCase() + str.substring(1)
	},

	convertToHtml: function(str){
		var find = '\n'
		var re = new RegExp(find, 'g')
        var html = str.replace(re, '<br />')

	 //    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
		// html = html.replace(exp, "<a href='$1' target='_blank'>$1</a>")

        return html
	},

	stringToArray: function(str, separator){
		var t = str.split(separator)
		var array = []
		for (var i=0; i<t.length; i++){
			var tag = t[i]
			if (tag.length == 0)
				continue

			array.push(tag.trim())
		}

		return array
	},

	slugVersion: function(str){
		var parts = str.split(' ')
		var slug = ''
		for (var i=0; i<parts.length; i++){
			var word = parts[i].replace(',', '')
			slug += word
			if (i != parts.length-1)
				slug += '-'
		}

		slug = slug.replace('?', '')
		return slug.toLowerCase()
	}

}