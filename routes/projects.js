var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;
var _$pjt = require('../db/model').project;

var msg = require('../message');


router.post('/join', function(req, res, next) {
  var uid = req.body.uid;
  var pid = req.body.pid;
  if (!pid || !uid) return next(new Error("No pid or uid sent"));

  _$pjt.findByIdAndUpdate(pid,
    {$push: {"_collaborators": uid}},
    {safe: true, upsert: true},
    function(err, docPjt) {
      if (err || !docPjt) return next(err || new Error("No projects matching that id"));

      _$usr.findByIdAndUpdate(uid,
        {$push: {"_projects": pid}},
        {safe: true, upsert: true},
        function(err, docUsr) {
          if (err || !docUsr) return next(err || new Error("No users matching that id"));

          return res.status(200).json({ message: msg.success.GENERAL });
        }
      );
    }
  );
});

router.post('/support', function(req, res, next) {
  var uid = req.body.uid;
  var pid = req.body.pid;
  if (!pid || !uid) return next(new Error("No pid or uid sent"));

  _$pjt.findByIdAndUpdate(pid,
    {$push: {"_supporters": uid}},
    {safe: true, upsert: true},
    function(err, docPjt) {
      if (err || !docPjt) return next(err || new Error("No projects matching that id"));

      _$usr.findByIdAndUpdate(uid,
        {$push: {"_supportedProjects": pid}},
        {safe: true, upsert: true},
        function(err, docUsr) {
          if (err || !docUsr) return next(err || new Error("No users matching that id"));

          return res.status(200).json({ message: msg.success.GENERAL });
        }
      );
    }
  );
});

module.exports = router;
