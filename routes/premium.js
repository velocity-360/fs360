var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})

		return
	}

	var currentUser = null
	controllers.account.currentUser(req)
	.then(function(profile){
		if (profile == null)
			return null
		else if (profile.accountType != 'premium')
			return null
		else {
			currentUser = profile
			return controller.find({id: resourceId})
		}
	})
	.then(function(entity){
		if (currentUser == null){
			// console.log('TEST !!!')
			res.redirect('/')
			return
		}

		if (entity == null){
			res.redirect('/')
			return
		}

		if (entity.link == 0){
			res.redirect('/')
			return
		}

		res.redirect(entity.link)
	})
	.catch(function(err){
		console.log('TEST ERROR')
		res.redirect('/')
	})
})


module.exports = router
