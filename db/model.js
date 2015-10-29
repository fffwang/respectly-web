/**
 * Created by Fwang on 2015-10-09.
 */
var mongoose = require('mongoose')
  , schema = mongoose.Schema;

var user = new schema({
  profile: {
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    studentNumber: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    photo: {
      type: String
    }
  },
  id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loginType: {
    type: String,
    default: "email"
  },
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  joinedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  droppedAt: {
    type: Date,
    index: true
  },
  hidden: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  collection: 'users',
  versionKey: false
});

exports.user = mongoose.model('user', user);
