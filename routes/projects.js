var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;
var _$pjt = require('../db/model').project;


router.post('/join', function(req, res, next) {
  var pid = req.body.pid;
  if (!pid) return next(new Error("No pid"));

  res.send('respond with a resource');
});

router.post('/support', function(req, res, next) {
  var pid = req.body.pid;
  if (!pid) return next(new Error("No pid"));

  res.send('respond with a resource');
});

module.exports = router;
