var express = require('express')
var router = express.Router()
var Track = require('../models/Track')
var subscriberController = require('../controllers/SubscriberController')
var trackController = require('../controllers/TrackController')


router.post('/', function(req, res, next) {
	var page = req.body.page
	var slug = req.body.slug
	var params = req.body.params

//	console.log('TRACKER = '+page)
	var visitor = {}
	subscriberController.currentVisitor(req)
	.then(function(subscriber){
		if (subscriber != null){
			visitor['id'] = subscriber.id
			visitor['email'] = subscriber.email
			visitor['name'] = subscriber.name
		}
	})
	.catch(function(err){

	})

	var trackingId = req.session.track
//	var user = req.session.user
	if (trackingId == null){
		var pageMap = {}
		pageMap[page] = 1
		var info = {
			history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
			pageMap: pageMap,
			visitor: visitor
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
			var pageMap = {}
			pageMap[page] = 1
			var info = {
				history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
				pageMap: pageMap,
				visitor: visitor
			}

			trackController.post(params, function(err, result){
				if (err != null){
					req.session.track = result.id
					res.json({
						confirmation:'success'
					})
				}
			})

			return
		}

		if (track == null){
			var pageMap = {}
			pageMap[page] = 1
			var info = {
				history: [{page:page, slug:slug, params:params, timestamp: Date.now()}],
				pageMap: pageMap,
				visitor: visitor
			}

			trackController.post(params, function(err, result){
				if (err != null){
					req.session.track = result.id
					res.json({
						confirmation:'success'
					})
				}
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


})



module.exports = router
