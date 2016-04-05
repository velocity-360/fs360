var express = require('express');
var router = express.Router();


router.get('/:page', function(req, res, next) {
	var page = req.params.page;
	res.render('admin/'+page, { });
});


router.get('/:page/:id', function(req, res, next) {
	var page = req.params.page;
	res.render('admin/'+page, { });
});


module.exports = router;
