"use strict";

var cbk;
var stripeHandler;

module.exports = {

	initialize: function (completion) {
		cbk = completion;
		//		var _this = this
		stripeHandler = StripeCheckout.configure({
			key: "pk_live_yKFwKJsJXwOxC0yZob29rIN5",
			image: "/images/logo_round_blue_260.png",
			address: true,
			locale: "auto",
			panelLabel: "Premium: $19.99/month",
			token: function (token) {
				// You can access the token ID with `token.id`
				cbk(token);
			}
		});
	},

	initializeWithText: function (text, completion) {
		cbk = completion;
		stripeHandler = StripeCheckout.configure({
			key: "pk_live_yKFwKJsJXwOxC0yZob29rIN5",
			image: "/images/logo_round_blue_260.png",
			address: true,
			locale: "auto",
			panelLabel: text,
			token: function (token) {
				// You can access the token ID with `token.id`
				cbk(token);
			}
		});
	},

	showModal: function () {
		if (stripeHandler == null) return;

		stripeHandler.open({
			name: "Velocity 360",
			description: "Premium Subscription"
		});
	},

	showModalWithText: function (text) {
		if (stripeHandler == null) return;

		stripeHandler.open({
			name: "Velocity 360",
			description: text
		});
	}


};
// this.handler.open({
//  name: 'Velocity 360',
//  description: 'Premium Subscription'
// });		
// this.handler.open({
//  name: 'Velocity 360',
//  description: text
// });