
var visitor = {
	username: '',
	email: '',
	password: ''
}

var updateVisitor = function(event){
	event.preventDefault()
	visitor[event.target.id] = event.target.value
}

var launchStripe = function(){
    var stripeHandler = StripeCheckout.configure({
        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
        image: '/img/logo_260.png',
        address: true,
        locale: 'auto',
        panelLabel: 'Premium: $19.99/month',
        token: function(token) { // You can access the token ID with `token.id`
        	//cbk(token)
			var params = {
				stripeToken: token.id,
				email: token.email,
				name: token.name
			}

            $.ajax({
                url: '/stripe/card',
                type: 'POST',
                data: JSON.stringify(params),
                contentType: 'application/json; charset=utf-8',
                success: function(response) { // console.log('AJAX CALLBACK: '+JSON.stringify(response))
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
        },
        closed: function() {

        }
    })

    stripeHandler.open({
	    name: 'Velocity 360',
	    description: 'Premium Subscription'
    })
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
	if (type == 'premium'){
		launchStripe()
		return
	}

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
};
