export default {

	handler: null,
	callback: null,

	initialize: function(completion){
		callback: completion
		var _this = this
	    this.handler = StripeCheckout.configure({
	        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
	        image: '/images/logo_round_blue_260.png',
	        locale: 'auto',
	        panelLabel: 'Premium: $19.99/month',
	        token: function(token) { // You can access the token ID with `token.id`
	        	_this.completion(token)
	        }
	    });
	},

	showModal: function(){
	    this.handler.open({
		    name: 'FullStack 360',
		    description: 'Premium Subscription'
	    });		
	}


}