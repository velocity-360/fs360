var express = require('express')
var router = express.Router()
var Track = require('../models/Track')
var subscriberController = require('../controllers/SubscriberController')
var trackController = require('../controllers/TrackController')


function updateTracking(req, res, visitor){
	var page = req.body.page
	var slug = req.body.slug
	var params = req.body.params
	var referer = req.headers.referer
	if (referer == null)
		referer = ''

	var trackingId = req.session.track
	if (trackingId == null){
		var pageMap = {}
		pageMap[page] = 1
		var info = {
			history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
			pageMap: pageMap,
			visitor: visitor,
			referer: referer
		}

		Track.create(info, function(err, track){
			if (err){
				res.json({
					confirmation:'fail',
					message: err
				})

				return
			}

			req.session.track = track._id
			res.json({
				confirmation:'success'
			})

			return			
		})

		return			
	}

	Track.findById(trackingId, function(err, track){
		if (err){
			req.session.reset()
			var pageMap = {}
			pageMap[page] = 1
			var info = { // don't update referrer here, only track original referring site
				history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
				pageMap: pageMap,
				visitor: visitor
			}

			trackController.post(info, function(err, result){
				if (err){
					res.json({
						confirmation:'fail',
						message: err
					})
					return
				}

				req.session.track = result.id
				res.json({
					confirmation:'success'
				})
			})

			return
		}

		if (track == null){
			req.session.reset()
			var pageMap = {}
			pageMap[page] = 1
			var info = {
				history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
				pageMap: pageMap,
				visitor: visitor
			}

			trackController.post(info, function(err, result){
				if (err){
					res.json({
						confirmation:'fail',
						message: err
					})
					return
				}

				req.session.track = result.id
				res.json({
					confirmation:'success'
				})

			})
			return			
		}

		var history = track.history
		if (history == null)
			history = []

		history.push({
			page: page,
			slug: slug,
			params: params,
			timestamp: Date.now()
		})

		track['history'] = history

		var pageMap = track.pageMap
		var pageCount = pageMap[page]
		if (pageCount == null)
			pageCount = 1
		else 
			pageCount = pageCount+1

		pageMap[page] = pageCount
		track['pageMap'] = pageMap
		track.markModified('pageMap')

		track['visitor'] = visitor
		track.markModified('visitor')

		track.save()

		res.json({
			confirmation:'success'
		})
		return
	})

}


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

		updateTracking(req, res, visitor)
	})
	.catch(function(err){
		updateTracking(req, res, visitor)
	})
})



module.exports = router
