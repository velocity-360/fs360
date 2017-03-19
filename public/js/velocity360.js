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

	console.log('LOGIN: '+JSON.stringify(visitor))

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

	console.log('REGISTER: '+JSON.stringify(visitor)+', '+type)

}