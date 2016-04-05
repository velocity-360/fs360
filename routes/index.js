var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:page/:slug', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
