var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;
var _$cmt = require('../db/model').comment;
var _$pjt = require('../db/model').project;

var generateComment = function (comment) {
  var obj = {
    _writer: comment._writer || '',
    _project: comment._project || '',
    body: comment.body || ''
  };

  return obj;
};

router.get('/', function (req, res, next) {
  var comment = req.query;

  var query = _$cmt
    .find({})
    .populate('_writer')
    .lean(true);
  
  query.exec(function (err, comments) {
    res.header('Content-Type', 'application/json');
    res.header('content-length', Buffer.byteLength(JSON.stringify({"comments": comments})));
    res.end(JSON.stringify({"comments": comments}));
  });
});

router.post('/write', function (req, res, next) {
  var comment = {};
  
  comment._writer = req.session.uid;
  comment._project = '567f9c15b075f741a91ad3a7';
  comment.body = req.body.body;
  
  var cmtGen = generateComment(comment);

  _$cmt.create(cmtGen, function (err, docCmt) {
    if (err) return next(err);

    _$usr.findByIdAndUpdate(comment._writer, {'$addToSet': {'_comments': docCmt._id}}, function (err, docUsr) {
      if (err) return next(err);

      _$pjt.findByIdAndUpdate(comment._project, {'$addToSet': {'_comments': docCmt._id}}, function (err, docUsr) {
        if (err) return next(err);

        res.header('Content-Type', 'application/json');
        res.header('content-length', Buffer.byteLength(JSON.stringify({"message": "Comment written."})));
        res.end(JSON.stringify({"message": "Comment written."}));
      });
    });
  });
});

router.delete('/delete/:cid', function (req, res, next) {
  var cid = req.params.cid;
  var uid = req.session.uid;
  var pid = '567f9c15b075f741a91ad3a7';
  
  _$cmt.remove({ _id: cid }, function(err) {
    if (err) return next(err);

    _$usr.findByIdAndUpdate(uid, { $pull: { "_comments" : cid } }, function (err, docUsr) {
      if (err) return next(err);

      _$pjt.findByIdAndUpdate(pid, { $pull: { "_comments" : cid } }, function (err, docPjt) {
        if (err) return next(err);

        res.header('Content-Type', 'application/json');
        res.header('content-length', Buffer.byteLength(JSON.stringify({"message": 'successfully deleted'})));
        res.end(JSON.stringify({"message": 'successfully deleted'}));
      });
    });
  });
});

module.exports = router;

