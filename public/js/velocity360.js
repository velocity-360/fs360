var visitor = {
	username: '',
	email: '',
	password: ''
}

var updateVisitor = function(event){
	event.preventDefault()
	visitor[event.target.id] = event.target.value
}

var login = function(event){
	event.preventDefault()
	if (visitor.email.length == 0){
		alert('Please Enter Your Email')
		return
	}

	if (visitor.password.length == 0){
		alert('Please Enter Your Password')
		return
	}

//	console.log('LOGIN: '+JSON.stringify(visitor))
    $.ajax({
        url: '/account/login',
        type: 'POST',
        data: JSON.stringify(visitor),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            // console.log('AJAX CALLBACK: '+JSON.stringify(response))
            if (response.confirmation != 'success'){
            	alert(response.message)
            	return
            }

            window.location.href = '/account'
        },
        error: function(XMLHttpRequest, textStatus, error) { 
            alert('Error: ' + error)
        }
    })
}

var register = function(event, type){ // basic or premium
	event.preventDefault()

	if (visitor.username.length == 0){
		alert('Please Enter Your Username')
		return
	}

	if (visitor.email.length == 0){
		alert('Please Enter Your Email')
		return
	}

//	console.log('REGISTER: '+JSON.stringify(visitor)+', '+type)
    $.ajax({
        url: '/account/register',
        type: 'POST',
        data: JSON.stringify(visitor),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            // console.log('AJAX CALLBACK: '+JSON.stringify(response))
            if (response.confirmation != 'success'){
            	alert(response.message)
            	return
            }

            window.location.href = '/account'
        },
        error: function(XMLHttpRequest, textStatus, error) { 
            alert('Error: ' + error)
        }
    })
}