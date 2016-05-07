var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');
var Course = require('../models/Course');
var Promise = require('bluebird');
var EmailManager = require('../managers/EmailManager');


function createProfile(profileInfo){
    return new Promise(function (resolve, reject){

		Profile.create(profileInfo, function(err, profile){
			if (err){
	            reject(err);
	            return; 
			}
		
			if (profile == null){
	            reject(null);
	            return; 
			}

	        resolve(profile);
		});


    });
}

function findProfile(profileId){
    return new Promise(function (resolve, reject){

		Profile.findById(profileId, function(err, profile){
			if (err){
	            reject(err);
	            return; 
			}
		
			if (profile == null){
	            reject(null);
	            return; 
			}

	        resolve(profile);
		});
    });
}

function createStripeAccount(stripe, profile, stripeToken, amount){ // amount can be null
    return new Promise(function (resolve, reject){

		stripe.customers.create({
			description: profile.id,
			source: stripeToken
		}, function(err, customer) {
			if (err){
	            reject(err);
	            return; 
			}
			
			var card = customer.sources.data[0];
			profile['creditCard'] = {'id':customer.id, 'lastFour':card.last4, 'exp_month':card.exp_month, 'exp_year':card.exp_year, 'brand':card.brand};
			profile['stripeId'] = customer.id;
//			profile['accountType'] = 'premium';
			profile.save();

			if (amount == null){
			    resolve(profile);
				return;
			}

	        // resolve(customer);
	        var cents = amount * 100;
			stripe.charges.create({
					amount: cents, // amount in cents, need to multiply by 100
					currency: 'usd',
					customer: customer.id,
					description: 'Example charge',
				}, function(error, charge) {
					if (error){ // check for `err`
			            reject(err);
			            return; 
					}

			        resolve(charge);
//					res.send({'confirmation':'success', 'charge':charge});
					return;
			});
		});
    });
}

function createStripeCharge(stripe, amount, customerId, description){

    return new Promise(function (resolve, reject){
		stripe.charges.create({
				amount: amount*100, // amount in cents
				currency: 'usd',
				customer: customerId,
				description: description,
			}, function(err, charge) {
				if (err){ // check for `err`
		            reject(err);
		            return; 
				}

		    	resolve(charge);
		});
    });
}



router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'register') { // new user signing up as premium subscriber
		createProfile(req.body)
		.then(function(profile){
			var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
			return createStripeAccount(stripe, profile, req.body.stripeToken, null);
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message});
			return;
		});
	}


	if (resource == 'charge') {
		if (!req.session){
			res.send({'confirmation':'fail', 'message':'User not logged in.'});
			return;
		}

		if (!req.session.user){
			res.send({'confirmation':'fail', 'message':'User not logged in.'});
			return;
		}


		var userId = req.session.user; // this is the currently logged in user

		findProfile(userId)
		.then(function(profile){
			var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

			// already has a stripe account:
			if (profile.stripeId.length == 0)
				return createStripeAccount(stripe, profile, req.body.stripeToken, req.body.amount);
			else 
				return createStripeCharge(stripe, req.body.amount, profile.stripeId, 'TEST STRIPE CHARGE 1');
		})
		.then(function(charge){
			var courseId = req.body.course;

			// find course and add profile to subscribers array.
			Course.findById(courseId, function(err, course){
				if (err){
					res.send({'confirmation':'fail', 'message':err.message});
		            return; 
				}
			
				if (course == null){
					res.send({'confirmation':'fail', 'message':'Course '+courseId+' not found.'});
		            return; 
				}

				if (course.subscribers.indexOf(userId) == -1){
					course.subscribers.push(userId);
					course.save();
				}

				res.send({'confirmation':'success', 'course':course.summary()});
	            return;
			});
			return;
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message});
			return;
		});
		
		return;
	}

	
	
	
	// Apply a credit card to a profile:
	if (resource == 'card') {
		var stripeToken = req.body.stripeToken;
		if (stripeToken == null){
			res.json({'confirmation':'fail', 'message':'Missing stripeToken parameter'});
			return;
		}
		
		if (!req.session){
			res.send({'confirmation':'fail', 'message':'User not logged in.'});
			return;
		}

		if (!req.session.user){
			res.send({'confirmation':'fail', 'message':'User not logged in.'});
			return;
		}
		
		var userId = req.session.user;
		Profile.findById(userId, function(err, profile){
			if (err){
				req.session.reset();
				res.send({'confirmation':'fail', 'message':'Profile '+userId+' not found'});
				return;
			}
		
			if (profile == null){
				res.send({'confirmation':'fail', 'message':'Profile '+userId+' not found'});
				return;
			}
			
			var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
			stripe.customers.create({
				description: profile.id,
				source: stripeToken
			}, function(err, customer) {
				if (err){
					res.json({'confirmation':'fail', 'message':err.message});
					return;
				}
				
				profile['accountType'] = 'premium';
				profile['monthlyRate'] = 19.99;
				var promoCode = req.body.promoCode;

				if (promoCode != null){ // check promo code
					profile['promoCode'] = promoCode;
					if (promoCode == 'nyu'){
						profile['monthlyRate'] = 9.99;
					}
				}

				res.json({'confirmation':'success', 'profile':profile.summary()});
				
				var card = customer.sources.data[0];
				profile['stripeId'] = customer.id;
				profile['creditCard'] = {'id':customer.id, 'lastFour':card.last4, 'exp_month':card.exp_month, 'exp_year':card.exp_year, 'brand':card.brand};

				EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@fullstack360.com', 'New Premium Subscriber', JSON.stringify(profile.summary()));
				profile.save();
				return;
			});
			
		});
		
		return;
	}
	
	
});




module.exports = router;
