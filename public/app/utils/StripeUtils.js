export default {

	handler: null,
	callback: null,

	initialize: function(completion){
		this.callback = completion
		var _this = this
	    this.handler = StripeCheckout.configure({
	        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
	        image: '/images/logo_round_blue_260.png',
	        locale: 'auto',
	        panelLabel: 'Premium: $19.99/month',
	        token: function(token) { // You can access the token ID with `token.id`
	        	_this.callback(token)
	        }
	    });
	},

	initializeWithText: function(text, completion){
		this.callback = completion
		var _this = this
	    this.handler = StripeCheckout.configure({
	        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
	        image: '/images/logo_round_blue_260.png',
	        locale: 'auto',
	        panelLabel: text,
	        token: function(token) { // You can access the token ID with `token.id`
	        	_this.callback(token)
	        }
	    });
	},

	showModal: function(){
	    this.handler.open({
		    name: 'Velocity 360',
		    description: 'Premium Subscription'
	    });		
	},

	showModalWithText: function(text){
	    this.handler.open({
		    name: 'Velocity 360',
		    description: text
	    });		
	}


}