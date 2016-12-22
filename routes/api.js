var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var fs = require('fs')
var EmailManager = require('../managers/EmailManager')
var Helpers = require('../managers/Helpers')
var Scraper = require('../managers/Scraper')
var controllers = require('../controllers')

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
		

		subscriberController.delete({email:email}, function(err, subscribers){
			EmailManager.sendEmail(process.env.BASE_EMAIL, address, 'dkwon@velocity360.io', 'unsubscribe', email)
			res.send('You have been unsubscribed. Thank you')
		})

		return
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
	var resource = req.params.resource
	var body = req.body
	var emailList = ['dkwon@velocity360.io', 'katrina@velocity360.io']
	
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
					EmailManager.sendHtmlEmail(process.env.BASE_EMAIL, address, address, subject, formatted)
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
//				template = template.replace('{{link}}', nextEvent.link)
				var time = nextEvent.date+', '+nextEvent.time
				template = template.replace('{{time}}', time)

				var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
				for (var i=0; i<recipients.length; i++){
					var address = recipients[i];
					var formatted = template.replace('{{email}}', address) // for unsubscribe link
					EmailManager.sendHtmlEmail(process.env.BASE_EMAIL, address, 'Workshop | '+nextEvent.title, formatted)
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
			req.session.user = result.id
			EmailManager.sendEmail(process.env.BASE_EMAIL, address, 'dkwon@velocity360.io', 'New Profile', JSON.stringify(req.body))
		}
		
		var data = {confirmation:'success'}
		data[resource] = result
		res.json(data)
		return
	})
})

router.put('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({confirmation:'fail', message:'Invalid Resource'})
		return
	}

	controller.put(resourceId, req.body, function(err, result){
		if (err){
			res.json({confirmation:'fail', message:err.message})
			return
		}

		var data = {confirmation:'success'}
		data[resource] = result
		res.json(data)
	})
})


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
