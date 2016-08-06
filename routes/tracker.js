var express = require('express')
var router = express.Router()
var Track = require('../models/Track')
var accountController = require('../controllers/AccountController')


router.post('/', function(req, res, next) {
	var page = req.body.page
	var slug = req.body.slug
	var params = req.body.params

//	console.log('TRACKER = '+page)
	var profile = {}
	accountController.currentUser(req)
	.then(function(currentUser){
		if (currentUser != null){
			profile['id'] = currentUser.id
			profile['email'] = currentUser.email
			profile['firstName'] = currentUser.firstName
			profile['lastName'] = currentUser.lastName
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
			profile: profile
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
			res.json({
				confirmation:'fail',
				message: 'Track '+trackingId+' not found'
			})
			return
		}

		if (track == null){
			res.json({
				confirmation:'fail',
				message: 'Track '+trackingId+' not found'
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

		track['profile'] = profile
		track.markModified('profile')

		track.save()

		res.json({
			confirmation:'success'
		})
		return
	})


})



module.exports = router
