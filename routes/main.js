var express = require('express');
var router = express.Router();

require('node-jsx').install({ extension: ".js" });
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var App = require('../public/build/es5/ServerApp');


router.get('/', function(req, res, next) {
    var html = ReactDOMServer.renderToString(React.createElement(App, {page:'home'}));
    res.render('index', {react: html});

//    res.render('index', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, { title: 'Express' });
});

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page;
	if (page == 'api'){
		next();
		return;
	}

	if (page == 'admin'){
		next();
		return;
	}
	
    res.render(req.params.page, { title: 'Express' });
});
module.exports = router;
