import Promise from 'bluebird'


var cbk;
var stripeHandler;

export default {

	initialize: (completion, onClosed) => {
		cbk = completion
	    stripeHandler = StripeCheckout.configure({
	        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
	        image: '/img/logo_260.png',
	        address: true,
	        locale: 'auto',
	        panelLabel: 'Premium: $19.99/month',
	        token: (token) => { // You can access the token ID with `token.id`
	        	cbk(token)
	        },
	        closed: () => {
	        	if (onClosed)
	        		onClosed()
	        }
	    })
	},

	initializeWithText: (text, completion, onClosed) => {
		cbk = completion
	    stripeHandler = StripeCheckout.configure({
	        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
	        image: '/img/logo_260.png',
	        address: true,
	        locale: 'auto',
	        panelLabel: text,
	        token: (token) => { // You can access the token ID with `token.id`
	        	cbk(token)
	        },
	        closed: () => {
	        	if (onClosed)
	        		onClosed()
	        }
	    })
	},

	showModal: () => {
		if (stripeHandler == null)
			return

	    stripeHandler.open({
		    name: 'Velocity 360',
		    description: 'Premium Subscription'
	    })
	},

	showModalWithText: (text) => {
		if (stripeHandler == null)
			return

	    stripeHandler.open({
		    name: 'Velocity 360',
		    description: text
	    })
	}


}