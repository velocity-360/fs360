var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');
var Course = require('../models/Course');
var Project = require('../models/Project');
var Promise = require('bluebird');
var EmailManager = require('../managers/EmailManager');


function createProfile(profileInfo){
    return new Promise(function (resolve, reject){

		Profile.create(profileInfo, function(err, profile){
			if (err){
	            reject(err)
	            return
			}
		
			if (profile == null){
	            reject(null)
	            return
			}

	        resolve(profile)
		})
    })
}

function findProfile(profileEmail){
    return new Promise(function (resolve, reject){

		Profile.find(profileEmail, function(err, profiles){
			if (err){
		        resolve(null)
	            return null
			}
		
	        resolve(profiles)
		})
    })
}

function findProject(projectId){
    return new Promise(function (resolve, reject){

		Project.findById(projectId, function(err, project){
			if (err){
	            reject(err)
	            return
			}
		
			if (project == null){
	            reject(null)
	            return;
			}

	        resolve(project)
		})
    })
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
			profile['creditCard'] = {
				'id':customer.id,
				'lastFour':card.last4,
				'exp_month':card.exp_month,
				'exp_year':card.exp_year,
				'brand':card.brand
			};
			profile['stripeId'] = customer.id;
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
		            reject(err)
		            return
				}

		    	resolve(charge)
		})
    })
}

function createNonregisteredStripeCharge(stripe, stripeToken, amount, description){
    return new Promise(function (resolve, reject){
		stripe.charges.create({
				amount: amount*100, // amount in cents
				currency: 'usd',
				source: stripeToken,
				description: description,
			}, function(err, charge) {
				if (err){ // check for `err`
		            reject(err)
		            return
				}

		    	resolve(charge)
		})
    })
}


router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'register') { // new user signing up as premium subscriber
		createProfile(req.body)
		.then(function(profile){
			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
			return createStripeAccount(stripe, profile, req.body.stripeToken, null);
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message})
			return;
		});
	}

	if (resource == 'charge') {
		var customerName = ''
		var customerEmail = ''
		var proj = null

		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		createNonregisteredStripeCharge(stripe, req.body.stripeToken, req.body.amount, 'Velocity 360')
		.then(function(charge){
			console.log('CHARGE: '+JSON.stringify(charge))
			var projectId = req.body.project
			customerName = charge.source.name // this comes from Stripe
			customerEmail = charge.source.email
			return findProject(projectId)
		})
		.then(function(project){
			proj = project
			return findProfile(customerEmail)
		})
		.then(function(profiles){
			var text = customerName+' purchased '+proj.title
			EmailManager.sendEmails('info@thegridmedia.com', ['dkwon@velocity360.io'], 'Project Purchase', text)

			if (profiles.length > 0){ // registered user
				var profile = profiles[0]
				req.session.user = profile.id // login as user
				var subscribers = proj.subscribers
				subscribers.push(profile.id)
				proj['subscribers'] = subscribers
				proj.save()

				res.send({'confirmation':'success', 'project':proj.summary(), profile:profile.summary()})
				return
			}


			// unregistered user

			// var subscribers = project.subscribers
			// subscribers.push(customerEmail)
			// project['subscribers'] = subscribers

			res.send({'confirmation':'success', 'project':proj.summary()})
			return
		})
		.catch(function(err){
			console.log('CHARGE ERROR: '+JSON.stringify(err))
			res.send({'confirmation':'fail', 'message':err.message})
			return
		})
		
		return
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
				
				var card = customer.sources.data[0]
				profile['stripeId'] = customer.id
				profile['creditCard'] = {'id':customer.id, 'lastFour':card.last4, 'exp_month':card.exp_month, 'exp_year':card.exp_year, 'brand':card.brand}

				EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@velocity360.io', 'New Premium Subscriber', JSON.stringify(profile.summary()))
				profile.save()
				return
			})
		})
		
		return
	}
	
	
})


module.exports = router
