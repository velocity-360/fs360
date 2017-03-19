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
	console.log('LOGIN: '+JSON.stringify(visitor))

}

var register = function(event, type){ // basic or premium
	event.preventDefault()
	console.log('REGISTER: '+JSON.stringify(visitor)+', '+type)

}