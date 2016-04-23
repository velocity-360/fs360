var express = require('express');
var router = express.Router();
var courseController = require('../controllers/CourseController');
var postController = require('../controllers/PostController');
var eventController = require('../controllers/EventController');

require('node-jsx').install({ extension: ".js" });
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ServerApp = require('../public/build/es5/ServerApp');


router.get('/', function(req, res, next) {
    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:'home'}));
    res.render('index', {react: html});

//    res.render('index', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
	var page = req.params.page;

	var fbTags = null;
	if (page == 'events'){
		eventController.get({}, function(err, results){
			if (err){

			}

			var nextEvent = results[0]
			fbTags = {
				title: nextEvent.title,
				description: nextEvent.description,
				url: 'http://www.fullstack360.com/'+page,
				image: 'https://media-service.appspot.com/site/images/'+nextEvent.image+'?crop=260'
			}

		    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query}));
		    res.render(page, {react:html, tags:fbTags});
			return;
		});

		return;
	}


    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query}));
    res.render(page, {react:html, tags:fbTags});
});

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page;
	if (page == 'api' || page == 'admin' || page == 'account'){
		next();
		return;
	}

    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page: page, slug:req.params.slug}));
    res.render(page, {react: html});
});

module.exports = router;
