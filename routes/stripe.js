var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var EmailManager = require('../managers/EmailManager')
var controllers = require('../controllers')

function createStripeAccount(profile, stripeToken){ // amount can be null
    return new Promise(function (resolve, reject){
		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		stripe.customers.create({
			description: profile._id.toString(),
			source: stripeToken
		}, function(err, customer) {
			if (err){
				reject(err)
				return
			}
			
			var card = customer.sources.data[0]
			profile['stripeId'] = customer.id
			profile['creditCard'] = {
				id: customer.id,
				lastFour: card.last4,
				exp_month: card.exp_month,
				exp_year: card.exp_year,
				brand: card.brand
			}

			resolve(profile)
			return
		})
    })
}

function createStripeCharge(customerId, amount, description){
    return new Promise(function (resolve, reject){
		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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

function createNonregisteredStripeCharge(stripeToken, amount, description){
    return new Promise(function (resolve, reject){
		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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
	var resource = req.params.resource

	if (resource == 'register') { // new user signing up as premium subscriber
		console.log('REGISTER: '+JSON.stringify(req.body))
		var params = {email: req.body.email}

//		controllers.profile.create(req.body)
		controllers.profile.create(params)
		.then(function(profile){
			return createStripeAccount(profile, req.body.stripeToken, null)
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message})
			return
		})
	}

	if (resource == 'charge') {
		var customerName = ''
		var customerEmail = req.body.email
		var type = req.body.type
		var prod = null

		createNonregisteredStripeCharge(req.body.stripeToken, req.body.amount, 'Velocity 360: '+req.body.description)
		.then(function(charge){
			customerName = charge.source.name // this comes from Stripe
			return controllers[type].find({id:req.body.product})
		})
		.then(function(product){
			prod = product

			var params = null
			if (req.session == null)
				params = {email: customerEmail}
			else if (req.session.user == null)
				params = {email: customerEmail}
			else 
				params = {id: req.session.user} // logged in user

			return controllers.profile.find(params)
		})
		.then(function(profiles){
			var text = customerName + ' purchased ' + prod.title
			EmailManager.sendEmails(process.env.BASE_EMAIL, ['dkwon@velocity360.io'], type.toUpperCase()+' Purchase', text)

			if (profiles != null){ // can be null
				if (profiles.length > 0) // registered user
					return profiles[0]
			}
			
			// unregistered user, create account
			var parts = customerName.split(' ')
			var profileInfo = {
				email: customerEmail,
				firstName: parts[0],
				lastName: (parts.length > 1) ? parts[parts.length-1] : '',
				password: 'abcd'
			}

			return controllers.profile.create(profileInfo)
		})
		.then(function(profile){
			var subscribers = prod.subscribers
			if (subscribers.indexOf(profile.id) == -1){
				subscribers.push(profile.id)
				prod['subscribers'] = subscribers
				prod.save()
			}

			// send new profile a welcome email
			req.session.user = profile.id // login as user

			var response = {
				confirmation: 'success',
				profile: profile // this is already the summary
			}

			response[req.body.type] = prod.summary()
			res.send(response)
			return
		})
		.catch(function(err){
			console.log('CHARGE ERROR: ' + err)
			res.send({confirmation: 'fail', message: err})
			return
		})
		
		return
	}

	// Apply a credit card to a profile:
	if (resource == 'card') {
		var stripeToken = req.body.stripeToken
		if (stripeToken == null){
			res.json({confirmation:'fail', message:'Missing stripeToken parameter'})
			return
		}
		
		var params = (req.session.user) ? {id: req.session.user} : {id:'-1'}
		controllers.profile.find(params)
		.then(function(profile){ // can be null
			return (profile == null) ? controllers.profile.create(req.body) : profile
		})
		.then(function(profile){
//			console.log('CREATE STRIPE CUSTOMER: '+JSON.stringify(profile))
			return createStripeAccount(profile, stripeToken)
		})
		.then(function(profile){
			profile['accountType'] = 'premium'
			profile['monthlyRate'] = 19.99
			var promoCode = req.body.promoCode

			if (promoCode != null){ // check promo code
				profile['promoCode'] = promoCode
				if (promoCode == 'nyu')
					profile['monthlyRate'] = 9.99				
			}

			req.session.user = profile._id.toString() // login as user
			res.json({confirmation:'success', profile:profile.summary()})

			EmailManager.sendEmail(process.env.BASE_EMAIL, 'dkwon@velocity360.io', 'New Premium Subscriber', JSON.stringify(profile.summary()))
 			profile.save()
		})
		.catch(function(err){
			res.send({confirmation:'fail', message:err.message})
		})
	}	
})


module.exports = router
