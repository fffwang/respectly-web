var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var uuid = require('node-uuid');

var _$usr = require('../db/model').user;
var _$cmt = require('../db/model').comment;

var msg = require('../message');

var generateUser = function (user) {
  var obj = {
    profile: {
      name: user.name || 'Respect.ly',
      department: parseInt(user.department),
      studentNumber: parseInt(user.studentNumber),
      email: user.email || ''
    },
    authCode: uuid.v1(),
    password: user.password
  };

  return obj;
};

var sendEmail = function (to, subject, content, cb) {
  var transporter = nodemailer.createTransport ({
    service: 'Gmail',
    auth: {
      user: 'cugamgyul@gmail.com',
      pass: 'melon123'
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'admin <cugamgyul@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: content // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      cb(error);
    } else {
      console.log('Message sent: ' + info.response);
      cb();
    }
  });
};


router.get('/', function (req, res, next) {
  var render = {title: 'Respect.ly'};
  
  res.render('index', render); 
});

router.post('/signup', function (req, res, next) {
  var user = req.body;
  var email = user.email;
  var query = _$usr
    .findOne({'profile.email': email})
    .select('id profile')
    .sort('profile.email')
    .lean(true);

  query.exec(function (err, docUsr) {
    if (err) return next(err);

    if (docUsr) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.EMAIL_EXISTS})));
      res.end(JSON.stringify({"message": msg.error.EMAIL_EXISTS}));
    } else {
      var usrGen = generateUser(user);

      _$usr.create(usrGen, function (err, docUsr) {
        if (err) return next(err);
        
        req.session.uid = docUsr._id;
        var to = docUsr.profile.email
          , subject = "Respectly 이메일 인증 메일"
          , url = "http://localhost:3000/authenticate?code=" + docUsr.authCode + "&id=" + docUsr.id
          , content = '<br>Respectly에 가입해주셔서 감사합니다. <br>' +
                      '<br>아래 링크를 눌러주세요.<br><br>' +
                      '<a href=' + url + '>Click</a><br><br>';

        sendEmail(to, subject, content, function(){
          res.header('Content-Type', 'application/json');
          res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.success.SIGNUP})));
          res.end(JSON.stringify({"message": msg.success.SIGNUP}));
        });
      });
    }
  });
});

router.get('/authenticate', function (req, res, next) {
  var id = req.query.id;
  var code = req.query.code;

  _$usr.findById(id, function (err, docUsr) {
    if (err) return next(err);

    if (!docUsr) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.INVALID_ID})));
      res.end(JSON.stringify({"message": msg.error.INVALID_ID}));
    } else if (code !== docUsr.authCode) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.INVALID_CODE})));
      res.end(JSON.stringify({"message": msg.error.INVALID_CODE}));
    } else {
      docUsr.update({ isAuthenticated: true }, function (err, raw) {
        return res.redirect('/');
      });
    }
  });
});

router.post('/signin', function (req, res, next) {
  var user = req.body,
    email = user.email,
    password = user.password;

  // check exist user
  var query = _$usr
    .findOne({'profile.email': email})
    .lean(true);

  query.exec(function (err, docUsr) {
    if (err) return next(err);

    if (!docUsr) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.INVALID_ID})));
      res.end(JSON.stringify({"message": msg.error.INVALID_ID}));
    } else if (docUsr.password !== password){
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.INCORRECT_PASSWORD})));
      res.end(JSON.stringify({"message": msg.error.INCORRECT_PASSWORD}));
    } else if (!docUsr.isAuthenticated) {
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.error.NOT_AUTHENTICATED})));
      res.end(JSON.stringify({"message": msg.error.NOT_AUTHENTICATED}));
    } else {
      req.session.uid = docUsr._id;
      res.header('Content-Type', 'application/json');
      res.header('content-length', Buffer.byteLength(JSON.stringify({"message": msg.success.SIGNIN})));
      res.end(JSON.stringify({"message": msg.success.SIGNIN}));
    }
  });
});

router.get('/signout', function (req, res, next) {
  req.session.destroy();
  return res.redirect('/');
});

router.post('/email', function (req, res, next) {
  var to = "lsywind3@gmail.com"
    , subject = "Respectly 포털 이메일 인증 메일"
    , url = "http://localhost:3000"
    , content = '<br>Respectly에 가입해주셔서 감사합니다. <br>' +
                '<br>아래 링크를 눌러주세요.<br><br>' +
                '<a href=' + url + '>Click</a><br><br>';
  
  sendEmail(to, subject, content, function() {
    res.header('Content-Type', 'application/json');
    res.header('content-length', Buffer.byteLength(JSON.stringify({"message": "E-mail sent."})));
    res.end(JSON.stringify({"message": "E-mail sent."}));
  });
});

module.exports = router;
