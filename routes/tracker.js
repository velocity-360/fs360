var express = require('express')
var router = express.Router()
var Track = require('../models/Track')
var subscriberController = require('../controllers/SubscriberController')
var trackController = require('../controllers/TrackController')

router.post('/', function(req, res, next) {

//	console.log('TRACKER = '+page)
	var visitor = {}
	subscriberController.currentVisitor(req)
	.then(function(subscriber){
		if (subscriber != null){
			visitor['id'] = subscriber.id
			visitor['email'] = subscriber.email
			visitor['name'] = subscriber.name
		}

		trackController.updateTracking(req, visitor, function(err, result){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err
				})
			}

			res.json({
				confirmation:'success',
				track: result
			})

			return
		})
	})
	.catch(function(err){
		trackController.updateTracking(req, visitor, function(err, result){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err
				})
			}

			res.json({
				confirmation:'success',
				track: result
			})

			return
		})
	})
})



module.exports = router
