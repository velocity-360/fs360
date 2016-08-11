var express = require('express')
var router = express.Router()
var Track = require('../models/Track')
var subscriberController = require('../controllers/SubscriberController')
var trackController = require('../controllers/TrackController')

router.get('/:action', function(req, res, next) {
	var action = req.params.action
	if (action == 'score'){

		Track.find(null, function(err, tracks){
			if (err){
				res.json({
					confirmation:'fail',
					message: err
				})

				return
			}

			var results = []

			for (var i=0; i<tracks.length; i++){
				var track = tracks[i]

				var pageMap = track.pageMap
				if (pageMap == null)
					continue

				if (track.visitor.name == null)
					continue

				var score = 0
				if (pageMap.course != null)
					score += pageMap.course

				if (pageMap.courses != null)
					score += pageMap.courses

				track.score = score

				results.push(track.summary())
				track.save()
			}

			res.json({
				confirmation:'success',
				tracks: results
			})
		})

		return
	}

})


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
