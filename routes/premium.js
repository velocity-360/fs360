var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

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

	controller.find({id: resourceId})
	.then(function(entity){
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
		res.redirect('/')
	})


})


module.exports = router
