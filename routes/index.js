var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;

var generateUser = function (user) {
    var obj = {
        profile: {
            name: user.name,
            department: user.department,
            studentNumber: user.studentNumber,
            email: user.email
        },
        password: user.password
    };

    return obj;
};

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
