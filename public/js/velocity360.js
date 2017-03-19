var ajaxRequest = function(path, params, method, completion){
    $.ajax({
        url: path,
        type: method,
        data: JSON.stringify(params),
        contentType: 'application/json; charset=utf-8',
        success: function(response) { // console.log('AJAX CALLBACK: '+JSON.stringify(response))
            if (response.confirmation != 'success'){
                completion({message: response.message}, null)
                return
            }

            completion(null, response)
        },
        error: function(XMLHttpRequest, textStatus, error) {
            alert('Error: ' + error)
        }
    })
}


var visitor = {
	username: '',
	email: '',
	password: ''
}

var stripePremium = StripeCheckout.configure({
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

        ajaxRequest('/stripe/card', params, 'POST', function(err, response){
            if (err){
                var msg = err.message || err
                alert(msg)
                return
            }

            window.location.href = '/account'
        })
    },
    closed: function() {

    }
})

var updateVisitor = function(event){
	event.preventDefault()
	visitor[event.target.id] = event.target.value
}

var slackRequest = function(event){
    event.preventDefault()
//    console.log('SLACK REQUEST: '+JSON.stringify(visitor))
    ajaxRequest('/account/subscribe', visitor, 'POST', function(err, response){
        if (err){
            var msg = err.message || err
            alert(msg)
            return
        }

        alert('Thanks for Subscribing! We will send you an email shortly with an invitation to our Slack Chanel!')

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
    ajaxRequest('/account/login', visitor, 'POST', function(err, response){
        if (err){
            var msg = err.message || err
            alert(msg)
            return
        }

        window.location.href = '/account'
    })
}

var register = function(event, type){ // basic or premium
	event.preventDefault()
	if (type == 'premium'){
		// launchStripe()
        stripePremium.open({
            name: 'Velocity 360',
            description: 'Premium Subscription'
        })

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
    ajaxRequest('/account/register', visitor, 'POST', function(err, response){
        if (err){
            var msg = err.message || err
            alert(msg)
            return
        }

        window.location.href = '/account'
    })
};
