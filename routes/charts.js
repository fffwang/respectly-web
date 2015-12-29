var express = require('express');
var router = express.Router();

var _$usr = require('../db/model').user;
var _$pjt = require('../db/model').project;


router.get('/participants', function(req, res, next) {
  var pid = req.query.pid;
  if (!pid) return next(new Error("No pid"));

  _$pjt
    .findById(pid)
    .populate("_collaborators")
    .exec(function (err, docPjt) {
      if (err) return next(err);

      var data = docPjt._collaborators;
      return res.status(200).json({ data: data });
    });
});

router.get('/supporters', function(req, res, next) {
  var pid = req.query.pid;
  if (!pid) return next(new Error("No pid"));

  _$pjt.findById(pid, function(err, docPjt) {
    if (err) return next(err);
    
    var left = docPjt.supportersGoal - docPjt._supporters.length;
    var chartData = [
      {
        value: docPjt._supporters.length,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "지지자 수"
      },
      {
        value: left >= 0 ? left : 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "남은 지지자 수"
      }
    ];
    return res.status(200).json(
      {
        chartData: chartData,
        supportersCount: docPjt._supporters.length,
        supportersGoal: docPjt.supportersGoal
      });
  });
});

module.exports = router;

/*
  var query = _$usr
    .findOne({'profile.email': email})
    .select('id profile')
    .sort('profile.email')
    .lean(true);

  query.exec(function(err, docUsr) {
    _$pjt.findByIdAndUpdate(
      pid,
      { $push: {"_collaborators": docUsr.id }},
      { safe: true, upsert: true, new: true },
      function(err, docPjt) {

      }
    );
  });
*/
