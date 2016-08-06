trackVisit = function(){
	console.log('trackVisit: ')

	var xmlhttp = new XMLHttpRequest()
//	var url = '/tracker?page='+window.location.href
	var url = '/tracker?page=abcde'

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//	    	console.log(xmlhttp.responseText)
	    }
	}

	xmlhttp.open('GET', url, true)
	xmlhttp.send()
}