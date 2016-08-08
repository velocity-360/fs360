var express = require('express')
var router = express.Router()
var accountController = require('../controllers/AccountController')
var subscriberController = require('../controllers/SubscriberController')
var Helpers = require('../managers/Helpers')
var EmailManager = require('../managers/EmailManager')
var fs = require('fs')


var fetchFile = function(path){
	return new Promise(function (resolve, reject){

		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err) }
			else { resolve(data) }
		})
	})
}

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
	var actions = ['application', 'proposal', 'freesession', 'subscribe']

	if (actions.indexOf(action) != -1){
		EmailManager.sendEmails('info@thegridmedia.com', emailList, body.subject, JSON.stringify(body))
		res.json({
			confirmation:'success', 
			message: body.confirmation
		})

		return
	}

	if (action == 'syllabus'){
		var course = body.course

		var template = 'node-react-evening.html'
		if (course == 'Node & React Evening Course')
			template = 'node-react-evening.html'
		
		if (course == '8-Week Fundamentals Bootcamp')
			template = 'fundamentals-bootcamp.html'

		if (course == '24-Week Evening Bootcamp')
			template = 'fundamentals-bootcamp.html'
		
		fetchFile('public/email/syllabus/'+template)
		.then(function(html){
			var url = 'https://www.velocity360.io/syllabus/'+body.pdf
			html = html.replace('{{link}}', url)
			html = html.replace('{{name}}', Helpers.capitalize(body.firstName))
			html = html.replace('{{link}}', url)

			var subscriber = {
				name: body.firstName+body.lastName,
				email: body.email,
				workshop: course
			}

			subscriberController.post(subscriber, function(err, result){
				if (err){
					return
				}

				req.session.visitor = result.id
				EmailManager.sendHtmlEmail('katrina@velocity360.io', result.email, 'Velocity 360 - Syllabus Request', html)
				res.json({
					confirmation: 'success',
					message: body.confirmation
				})
				return
			})
		})
		.catch(function(err){

		})

		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Syllabus Request', JSON.stringify(body))
		return
	}


	if (action == 'rsvp') {
		var infoRequest = req.body
		
		// send email to yourself for notification:
		EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@velocity360.io', 'Event RSVP', JSON.stringify(infoRequest))
		.then(function(){
			var confirmationMsg = 'Dear '+Helpers.capitalize(infoRequest.firstName)+',<br /><br />Thanks for registering to the '+infoRequest.subject+' workshop on '+infoRequest.date+'! My name is Katrina Murphy and I am the community manager of <a href="https://www.velocity360.io">Velocity 360</a>. Velocity offers part-time and full-time instructional courses in software development. We specialize in the following areas: Node JS, React, React Native, Angular, and iOS.<br /><br />If you are interested in learning about our full or part-time development courses, check <a href="https://www.velocity360.io">HERE</a>. Thanks and see you at the workshop.<br /><br />Katrina Murphy<br />Community Manager<br /><a href="https://www.velocity360.io">Velocity 360</a><br /><br /><br /><a style="background:#f1f9f5;border: 1px solid #ddd; padding:16px; text-decoration:none;margin-top:12px" href="https://www.velocity360.io/syllabus/FundamentalsBootcamp.pdf">Download Syllabus</a>'
			var subscriber = {
				name: infoRequest.firstName+infoRequest.lastName,
				email: infoRequest.email,
				workshop: infoRequest.subject,
				survey: infoRequest.survey
			}

			subscriberController.post(subscriber, function(err, result){
				if (err == null)
					req.session.visitor = result.id
			})

			return EmailManager.sendHtmlEmail('katrina@velocity360.io', infoRequest.email, infoRequest.subject, confirmationMsg)
		})
		.then(function(){
			res.json({
				confirmation: 'success',
				message: 'Thanks for your interest in the '+infoRequest.subject+' workshop. Please check your email for a confirmation. Looking forward to seeing you there!'
			})
			return
		})
		.catch(function(err){
			res.json({confirmation:'fail', message:err.message})
			return
		})

		return
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})

})


module.exports = router
