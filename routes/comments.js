var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;
var _$cmt = require('../db/model').comment;
var _$pjt = require('../db/model').project;

var generateComment = function (comment) {
  var obj = {
    _writer: comment.writer || '',
    _project: comment.project || '',
    body: comment.body || ''
  };

  return obj;
};

router.get('/', function (req, res, next) {
  var comment = req.query;

  var query = _$cmt
    .find({})
    .lean(true);
  
  query.exec(function (err, comments) {
    res.header('Content-Type', 'application/json');
    res.header('content-length', Buffer.byteLength(JSON.stringify({"comments": comments})));
    res.end(JSON.stringify({"comments": comments}));
  });
});

router.post('/write', function (req, res, next) {
  var comment = req.body;

  var cmtGen = generateComment(comment);

  _$cmt.create(cmtGen, function (err, docCmt) {
    if (err) return next(err);

    _$usr.findByIdAndUpdate(comment.user_id, {'$addToSet': {'_comments': docCmt._id}}, function (err, docUsr) {
      if (err) return next(err);

      _$pjt.findByIdAndUpdate(comment.project_id, {'$addToSet': {'_comments': docCmt._id}}, function (err, docUsr) {
        if (err) return next(err);

        res.header('Content-Type', 'application/json');
        res.header('content-length', Buffer.byteLength(JSON.stringify({"message": "Comment written."})));
        res.end(JSON.stringify({"message": "Comment written."}));
      });
    });
  });
});

router.post('/delete', function (req, res, next) {
  var comment = req.body;
  
  _$cmt.remove({ _id: req.body.id }, function(err) {
    if (err) return next(err);

    _$usr.findByIdAndUpdate(req.uid, { $pull: { "_id" : { id: 23 } } }, function (err, docUsr) {
      if (err) return next(err);

      _$pjt.findByIdAndUpdate(req.pid, { $pull: { "_id" : { id: 23 } } }, function (err, docUsr) {
        if (err) return next(err);

        res.header('Content-Type', 'application/json');
        res.header('content-length', Buffer.byteLength(JSON.stringify({"message": "Comment written."})));
        res.end(JSON.stringify({"message": "Comment written."}));
      });
    });
  });
});

module.exports = router;

