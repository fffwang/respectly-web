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
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Respect.ly'}); 
});

router.post('/signup', function (req, res, next) {
  var user = req.param('user');
  var email = user.email;

  var query = _$usr
    .findOne({'profile.email': email})
    .select('profile')
    .sort('profile.email')
    .lean(true);

  query.exec(function (err, docUsr) {
    if (err) return next(err);

    if (docUsr) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": "Email exists."})));
      res.end(JSON.stringify({"message": "Email exists."}));
    } else {
      var usrGen = generateUser(user);

      _$usr.create(usrGen, function (err, docUsr) {
        if (err) return next();

        var name = docUsr.profile.name;

        res.header('Content-Type', 'application/json');
        res.header('content-length', Buffer.byteLength(JSON.stringify({"name": name})));
        res.end(JSON.stringify({"name": name}));
      });
    }
  });
});

router.get('/signin', function (req, res, next) {
  res.render('index', {title: 'Respect.ly'});
});

module.exports = router;
