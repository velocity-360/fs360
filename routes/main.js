var express = require('express')
var router = express.Router()

// These are the pages which have FB tags:
var courseController = require('../controllers/CourseController')
var postController = require('../controllers/PostController')
var eventController = require('../controllers/EventController')
var controllers = {
	'course': courseController,
	'post': postController,
	'events': eventController
}


require('node-jsx').install({ extension: ".js" })
var React = require('react')
var ReactDOMServer = require('react-dom/server')


// Components:
var ServerApp = require('../public/build/es5/ServerApp')
var store = require('../public/build/es5/stores/store')


router.get('/', function(req, res, next) {
    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:'home', headers:req.headers}))
    res.render('index', {react: html})
})

router.get('/:page', function(req, res, next) {
	var page = req.params.page

	var controller = controllers[page]
	if (controller == null){
	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query, headers:req.headers}))
	    res.render(page, {react:html})
		return
	}

	controller.get({}, function(err, results){
		if (err){

		}

		if (results.length == 0){
		    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug, headers:req.headers}));
		    res.render(page, {react:html, tags:{}});
			return;
		}

		var entity = results[results.length-1]
		var desc = (entity.description == null) ? entity.text : entity.description
		if (desc.length > 200)
			desc = desc.substring(0, 200)+'...'
		
		var fbTags = {
			title: entity.title,
			description: desc,
			url: 'https://www.velocity360.io/'+page,
			image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260'
		}

	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query, headers:req.headers}));
	    res.render(page, {react:html, tags:fbTags});
		return
	})
})

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page
	if (page == 'api' || page == 'admin' || page == 'account'){
		next()
		return
	}

	var slug = req.params.slug
	var controller = controllers[page]
	if (controller == null){
	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page: page, slug:slug}))
	    res.render(page, {react: html})
		return
	}

	controller.get({slug: slug}, function(err, results){
		if (err){

		}

		if (results.length == 0){
		    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug}))
		    res.render(page, {react:html, tags:{}})
			return
		}

		var entity = results[0]
		var desc = (entity.description == null) ? entity.text : entity.description
		if (desc.length > 200)
			desc = desc.substring(0, 200)+'...'
		
		var fbTags = {
			title: entity.title,
			description: desc,
			url: 'https://www.velocity360.io/'+page+'/'+slug,
			image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260'
		}

	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug}));
	    res.render(page, {react:html, tags:fbTags})
		return
	})

})

module.exports = router
