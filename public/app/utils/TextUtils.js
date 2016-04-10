export default {

	truncateText: function(str, limit){
		if (str.length < limit)
			return str

		return str.substring(0, limit)+'...'
	}

}