var express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var router = express.Router();
var EmailManager = require('../managers/EmailManager');
var Helpers = require('../managers/Helpers');

// controllers:
var courseController = require('../controllers/CourseController');
var profileController = require('../controllers/ProfileController');
var subscriberController = require('../controllers/SubscriberController');
var postController = require('../controllers/PostController');
var commentController = require('../controllers/CommentController');
var eventController = require('../controllers/EventController');
var controllers = {
	'course': courseController,
	'profile': profileController,
	'subscriber': subscriberController,
	'post': postController,
	'comment': commentController,
	'event': eventController
};

var fetchFile = function(path){
	return new Promise(function (resolve, reject){

		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err); }
			else { resolve(data); }
		});
	});
}


router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'currentuser') {
		if (req.session == null){
			res.json({'message':'User not logged in.'});
			return;
		}

		if (req.session.user == null){
			console.log('TEST 2');
			res.json({'message':'User not logged in.'});
			return;
		}




		var accountController = require('../controllers/AccountController');
		accountController.checkCurrentUser(req, function(err, results){
			if (err){
				res.json({confirmation:'fail', message:err.message});
				return;
			}

			res.json({confirmation:'success', profile:results});
		});
		return;
	}


	if (resource == 'unsubscribe') {
		var email = req.query.email;
		if (email == null)
			return;
		
		EmailManager.sendEmail('info@fullstack360.com', 'dkwon@fullstack360.com', 'unsubscribe', email);
		res.send('You have been unsubscribed. Thank you');
	}

	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'});
		return;
	}

	controller.get(req.query, function(err, results){
		if (err){
			res.json({confirmation:'fail', message:err.message});
			return;
		}

		var data = {confirmation:'success'}
		data[controller.pluralKey()] = results;
		res.json(data);
	});

});

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var resourceId = req.params.id;

	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'});
		return;
	}

	controller.get({id:resourceId}, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message});
			return;
		}

		var data = {confirmation:'success'}
		data[resource] = result;
		res.json(data);
	});

});

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'test'){
		console.log('TEST REQUEST: '+JSON.stringify(req.body));
		res.json({
			confirmation:'success',
			body: req.body
		});

		return;
	}

	if (resource == 'application'){
		EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@fullstack360.com', 'Course Application', JSON.stringify(req.body))
		res.json({
			confirmation:'success', 
			message:'Thanks for completing an application. We will be in touch shortly regarding a follow-up interview.'
		});

		return;
	}

	if (resource == 'syllabus'){
//		console.log('SYLLABUS REQUEST: '+JSON.stringify(req.body));
		EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@fullstack360.com', 'Syllabus Request', JSON.stringify(req.body))
		.then(function(){
			res.json({'confirmation':'success', 'message':'Thanks for your syllabus request. Check your email shortly for a direct download link to the syllabus.'});
			return;
		})
		.catch(function(err){
			res.json({'confirmation':'fail', 'message':err.message});
			return

		});

		return;
	}

	if (resource == 'rsvp') {
		var infoRequest = req.body;
		console.log('RSVP: '+JSON.stringify(infoRequest));
		var json = JSON.stringify(infoRequest);
		
		// send email to yourself for notification:
		EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@fullstack360.com', 'Seminar', json)
		.then(function(){
			// var firstName = infoRequest.visitor.name.split(' ')[0];
			// var confirmationMsg = 'Dear '+Helpers.capitalize(firstName)+',<br /><br />Thanks for registering to the '+infoRequest.event.subject+' on '+infoRequest.event.date+'! My name is Dan Kwon and I am the founder of <a href="http://www.fullstack360.com">The Full Stack</a>. The Full Stack offers part-time and full-time instructional courses in software development. We specialize in the following areas: Node JS, Angular, iOS, and React JS.<br /><br />If you are interested in learning about our part-time development course, check <a href="http://www.fullstack360.com">HERE</a>. Thanks and see you at the workshop.<br /><br />Dan Kwon<br />Founder<br /><a href="http://www.fullstack360.com">The Full Stack</a><br />';
			var confirmationMsg = 'Dear '+Helpers.capitalize(infoRequest.visitor.firstName)+',<br /><br />Thanks for registering to the '+infoRequest.event.title+' on '+infoRequest.event.date+'! My name is Dan Kwon and I am the founder of <a href="http://www.fullstack360.com">The Full Stack</a>. The Full Stack offers part-time and full-time instructional courses in software development. We specialize in the following areas: Node JS, Angular, iOS, and React JS.<br /><br />If you are interested in learning about our part-time development course, check <a href="http://www.fullstack360.com">HERE</a>. Thanks and see you at the workshop.<br /><br />Dan Kwon<br />Founder<br /><a href="http://www.fullstack360.com">FullStack 360</a><br />';
			var subscriber = {
				name: infoRequest.visitor.firstName+infoRequest.visitor.lastName,
				email: infoRequest.visitor.email,
				workshop: infoRequest.event.title
			};

			subscriberController.post(subscriber, null);
			return EmailManager.sendHtmlEmail('dkwon@fullstack360.com', infoRequest.visitor.email, infoRequest.event.title, confirmationMsg);
		})
		.then(function(){
//			var msg = 'Thanks for your interest in the '+infoRequest.event.subject+'. Please check your email for a confirmation. Looking forward to seeing you there!';
			var msg = 'Thanks for your interest in the '+infoRequest.event.title+'. Please check your email for a confirmation. Looking forward to seeing you there!';
			res.json({'confirmation':'success', 'message':msg});
			return;
		})
		.catch(function(err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		});

		return;
	}

	
	if (req.params.resource == 'email'){
		var recipients = req.body.recipients;
		if (recipients == null){
			res.json({'confirmation':'fail','message':'Missing recipients parameter.'});
			return;
		}

		if (recipients.length == 0){
			res.json({'confirmation':'fail','message':'There are no recipients.'});
			return;
		}
		
		recipients.push('dennykwon2@gmail.com');

		var template = req.body.template;
		var path = 'public/email/'+template+'/email.html';
//		var path = 'public/email/subscribers/email.html';

		var subject = 'Programming Workshop';
		if (template == 'video')
			subject = 'Programming Video Series';
		if (template == 'summer')
			subject = 'Learn iOS, Node, and React this Summer';

		fetchFile(path)
		.then(function(data){
			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			for (var i=0; i<recipients.length; i++){
				var address = recipients[i];
				var formatted = data.replace('{{email}}', address);
				sendgrid.send({
					to:       address,
					from:     'info@fullstack360.com',
					fromname: 'FullStack 360',
					subject:  subject,
					html:     formatted
				}, function(err, json) {
					if (err) { }
				});
			}
		
			res.json({'confirmation':'success', 'message':'Email sent to '+recipients});
			return;
		})
		.catch(function(err){
			res.json({'confirmation':'fail','message':err.message});
			return;
		});
		
		return;
	}


	var controller = controllers[resource];
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'});
		return;
	}

	controller.post(req.body, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message});
			return;
		}

		if (resource == 'profile') { // profile registration, install session cookie
			req.session.user = result.id;
			EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@fullstack360.com', 'New Subscriber', JSON.stringify(req.body));
		}
		
		var data = {confirmation:'success'}
		data[resource] = result;
		res.json(data);
		return;
	});


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
