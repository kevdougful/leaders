'use strict';

var express = require('express');
var router = express.Router();

router.get('/partial/:name', function(req, res, next) {
	var name = req.params.name;
	res.render('partial/' + name);
});

router.get('*', function(req, res, next) {
	res.render('index', {});
});

module.exports = router;