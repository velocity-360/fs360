var express = require('express')
var Promise = require('bluebird')
var fs = require('fs')
var router = express.Router()
var EmailManager = require('../managers/EmailManager')
var Helpers = require('../managers/Helpers')
var Scraper = require('../managers/Scraper')


// controllers:
var courseController = require('../controllers/CourseController')
var profileController = require('../controllers/ProfileController')
var subscriberController = require('../controllers/SubscriberController')
var postController = require('../controllers/PostController')
var commentController = require('../controllers/CommentController')
var eventController = require('../controllers/EventController')
var projectController = require('../controllers/ProjectController')
var sampleController = require('../controllers/SampleController')
var unitController = require('../controllers/UnitController')
var controllers = {
	course: courseController,
	profile: profileController,
	subscriber: subscriberController,
	post: postController,
	comment: commentController,
	event: eventController,
	project: projectController,
	sample: sampleController,
	unit: unitController
};

var fetchFile = function(path){
	return new Promise(function (resolve, reject){

		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err) }
			else { resolve(data) }
		})
	})
}


router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource

	if (resource == 'unsubscribe') {
		var email = req.query.email
		if (email == null)
			return
		
		EmailManager.sendEmail('info@fullstack360.com', 'dkwon@velocity360.io', 'unsubscribe', email)
		res.send('You have been unsubscribed. Thank you')
	}

	var controller = controllers[resource]
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'})
		return
	}

	controller.get(req.query, function(err, results){
		if (err){
			res.json({confirmation:'fail', message:err.message})
			return
		}

		var data = {confirmation:'success'}
		data[controller.pluralKey()] = results
		res.json(data)
	})
})


router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'})
		return
	}

	controller.get({id:resourceId}, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message})
			return;
		}

		var data = {confirmation:'success'}
		data[resource] = result
		res.json(data)
	})
})

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;
	var emailList = ['dkwon@velocity360.io']

	if (resource == 'application'){
		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Course Application', JSON.stringify(req.body))
		res.json({
			confirmation:'success', 
			message:'Thanks for completing an application. We will be in touch shortly regarding a follow-up interview.'
		});

		return;
	}

	if (resource == 'info'){
		var body = req.body
		subscriberController.post(body, null)
		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'General Info Request', JSON.stringify(body))
		res.json({'confirmation':'success', 'message':'Thanks for your interest. We will reach out to you shortly with more information!'})
		return
	}

	if (resource == 'freesession'){
		var body = req.body
		subscriberController.post(body, null)
		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Free Session Request', JSON.stringify(body))
		res.json({'confirmation':'success', 'message':'Thanks for your interest. We will contact you shortly with more information about attending a free session!'})
		return
	}

	if (resource == 'subscribe'){
		subscriberController.post(req.body, null)
		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'New Subscriber', JSON.stringify(req.body))
		res.json({'confirmation':'success', 'message':'Thanks for subscribing! We will reach out to you shortly with more information!'})
		return
	}

	if (resource == 'syllabus'){
		var body = req.body
		var course = body.course

		var template = 'node-react-evening.html'
		if (course == 'Node & React Evening Course')
			template = 'node-react-evening.html'
		
		if (course == 'Fundamentals Bootcamp')
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

				EmailManager.sendHtmlEmail('katrina@velocity360.io', result.email, 'Velocity 360 - Syllabus Request', html)
				res.json({'confirmation':'success', 'message':'Thanks for your syllabus request. Check your email shortly for a direct download link to the syllabus.'})
				return
			})
		})
		.catch(function(err){

		})

		EmailManager.sendEmails('info@thegridmedia.com', emailList, 'Syllabus Request', JSON.stringify(body))
		return
	}

	if (resource == 'rsvp') {
		var infoRequest = req.body;
		var json = JSON.stringify(infoRequest)
		
		// send email to yourself for notification:
		EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@velocity360.io', 'Event RSVP', json)
		.then(function(){
			var confirmationMsg = 'Dear '+Helpers.capitalize(infoRequest.firstName)+',<br /><br />Thanks for registering to the '+infoRequest.event+' workshop on '+infoRequest.date+'! My name is Katrina Murphy and I am the community manager of <a href="https://www.velocity360.io">Velocity 360</a>. Velocity offers part-time and full-time instructional courses in software development. We specialize in the following areas: Node JS, React, React Native, Angular, and iOS.<br /><br />If you are interested in learning about our full or part-time development courses, check <a href="https://www.velocity360.io">HERE</a>. Thanks and see you at the workshop.<br /><br />Katrina Murphy<br />Community Manager<br /><a href="https://www.velocity360.io">Velocity 360</a><br /><br /><br /><a style="background:#f1f9f5;border: 1px solid #ddd; padding:16px; text-decoration:none;margin-top:12px" href="https://www.velocity360.io/syllabus/FundamentalsBootcamp.pdf">Download Syllabus</a>'
			var subscriber = {
				name: infoRequest.firstName+infoRequest.lastName,
				email: infoRequest.email,
				workshop: infoRequest.event
			}

			subscriberController.post(subscriber, null)
			return EmailManager.sendHtmlEmail('katrina@velocity360.io', infoRequest.email, infoRequest.event, confirmationMsg)
		})
		.then(function(){
			var msg = 'Thanks for your interest in the '+infoRequest.event+' workshop. Please check your email for a confirmation. Looking forward to seeing you there!'
			res.json({'confirmation':'success', 'message':msg})
			return
		})
		.catch(function(err){
			res.json({'confirmation':'fail', 'message':err.message})
			return
		})

		return
	}

	
	if (req.params.resource == 'email'){
		var recipients = req.body.recipients;
		if (recipients == null){
			res.json({'confirmation':'fail','message':'Missing recipients parameter.'})
			return
		}

		if (recipients.length == 0){
			res.json({'confirmation':'fail','message':'There are no recipients.'})
			return
		}
		
		recipients.push('dennykwon2@gmail.com');

		var template = req.body.template
		var path = 'public/email/'+template+'/email.html'

		var data = ''
		fetchFile(path)
		.then(function(html){
			data = html
			return Scraper.scrapeRawHtml(data)
		})
		.then(function(results){
			if (template != 'workshop'){
				var subject = results['title']
				for (var i=0; i<recipients.length; i++){
					var address = recipients[i]
					var formatted = data.replace('{{email}}', address) // for unsubscribe link
					EmailManager.sendHtmlEmail('info@thegridmedia.com', address, subject, formatted)
				}
			
				res.json({'confirmation':'success', 'message':'Email sent to '+recipients})
				return				
			}

			eventController.get({}, function(err, events){
				if (err){
					res.json({'confirmation':'fail','message':err.message})
					return
				}

				var nextEvent = events[0]
				var template = data.replace('{{title}}', nextEvent.title)
				template = template.replace('{{description}}', nextEvent.description)
				template = template.replace('{{image}}', nextEvent.image)
				template = template.replace('{{slug}}', nextEvent.slug)
				var time = nextEvent.date+', '+nextEvent.time
				template = template.replace('{{time}}', time)

				var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
				for (var i=0; i<recipients.length; i++){
					var address = recipients[i];
					var formatted = template.replace('{{email}}', address) // for unsubscribe link
					EmailManager.sendHtmlEmail('info@thegridmedia.com', address, 'Workshop: '+nextEvent.title, formatted)
				}
			
				res.json({'confirmation':'success', 'message':'Email sent to '+recipients})
				return
			})
		})
		.catch(function(err){
			res.json({'confirmation':'fail','message':err.message})
			return
		})
		
		return
	}


	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'})
		return
	}

	controller.post(req.body, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message})
			return
		}

		if (resource == 'profile') { // profile registration, install session cookie
			req.session.user = result.id;
			EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@velocity360.io', 'New Subscriber', JSON.stringify(req.body));
		}
		
		var data = {confirmation:'success'}
		data[resource] = result
		res.json(data)
		return
	})


});

router.put('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var resourceId = req.params.id;

	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'});
		return;
	}

	controller.put(resourceId, req.body, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message});
			return;
		}

		var data = {confirmation:'success'}
		data[resource] = result;
		res.json(data);
	});
});

router.delete('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var resourceId = req.params.id;

	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'});
		return;
	}

	controller.delete(resourceId, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message});
			return;
		}

		res.json({
			confirmation:'success',
			message:'Resource Deleted'
		});
	});

});


module.exports = router;
