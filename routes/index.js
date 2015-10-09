var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Respect.ly' });
});

router.post('/signup', function(req, res, next) {
    res.render('index', { title: 'Respect.ly' });
});

router.post('/signin', function(req, res, next) {
    res.render('index', { title: 'Respect.ly' });
});

module.exports = router;
