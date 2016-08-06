var express = require('express')
var router = express.Router()
var accountController = require('../controllers/AccountController')
var subscriberController = require('../controllers/SubscriberController')
var EmailManager = require('../managers/EmailManager')


router.get('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'currentuser') {
		accountController.checkCurrentUser(req, function(err, results){
			if (err){
				res.json({confirmation:'fail', message:err.message})
				return
			}

			res.json({confirmation:'success', profile:results})
		});
		return
	}

	if (action == 'currentvisitor') {
		subscriberController.currentVisitor(req)
		.then(function(visitor){
			if (visitor == null){
				res.json({confirmation:'fail', message:'Visitor Not Found'})
				return
			}

			res.json({confirmation:'success', visitor:visitor})
		})
		.catch(function(err){
			res.json({confirmation:'fail', message:err.message})
			return
		})

		return
	}

	if (action == 'logout') {
		req.session.reset()
		res.redirect('/')
		return
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})
})



router.post('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'login') {
		accountController.login(req.body, function(err, profile){
			if (err){
				res.json({confirmation:'fail', message:err.message});
				return;
			}

			req.session.user = profile.id; // install cookie with profile id set to 'user'
			res.json({confirmation:'success', profile:profile});
		})
		return
	}

	var body = req.body
	var emailList = ['dkwon@velocity360.io', 'katrina@velocity360.io']
	var actions = ['application', 'info', 'proposal', 'freesession', 'subscribe']

	if (actions.indexOf(action) != -1){
		EmailManager.sendEmails('info@thegridmedia.com', emailList, body.subject, JSON.stringify(body))
		res.json({
			confirmation:'success', 
			message:'Thanks for completing an application. We will be in touch shortly regarding a follow-up interview.'
		})

		return
	}

	// if (action == 'application'){
	// 	EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Course Application', JSON.stringify(req.body))
	// 	res.json({
	// 		confirmation:'success', 
	// 		message:'Thanks for completing an application. We will be in touch shortly regarding a follow-up interview.'
	// 	})

	// 	return
	// }

	// if (action == 'info'){
	// 	subscriberController.post(body, function(err, subscriber){
	// 		if (err == null)
	// 			req.session.visitor = subscriber.id

	// 		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'General Info Request', JSON.stringify(body))
	// 		res.json({'confirmation':'success', 'message':'Thanks for your interest. We will reach out to you shortly with more information!'})
	// 	})
	// 	return
	// }

	// if (action == 'proposal'){
	// 	subscriberController.post(body, function(err, subscriber){
	// 		if (err == null)
	// 			req.session.visitor = subscriber.id

	// 		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Project Proposal', JSON.stringify(body))
	// 		res.json({'confirmation':'success', 'message':'Thank you for submitting a project proposal. We will reach out to you shortly with more information!'})
	// 	})
	// 	return
	// }

	// if (action == 'freesession'){
	// 	subscriberController.post(body, function(err, subscriber){
	// 		if (err == null)
	// 			req.session.visitor = subscriber.id

	// 		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Free Session Request', JSON.stringify(body))
	// 		res.json({'confirmation':'success', 'message':'Thanks for your interest. We will contact you shortly with more information about attending a free session!'})
	// 	})
	// 	return
	// }

	// if (resource == 'subscribe'){
	// 	subscriberController.post(body, function(err, subscriber){
	// 		if (err == null)
	// 			req.session.visitor = subscriber.id

	// 		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'New Subscriber', JSON.stringify(req.body))
	// 		res.json({'confirmation':'success', 'message':'Thanks for subscribing! We will reach out to you shortly with more information!'})
	// 	})
	// 	return
	// }



	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})


})


module.exports = router
