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
      type: Number,
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
  password: {
    type: String,
    required: true
  },
  loginType: {
    type: String,
    default: "email"
  },
  _projects: [
    {
      type: String,
      ref: 'project'
    }
  ],
  _comments: [
    {
      type: String,
      ref: 'comment'
    }
  ],
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  authCode: {
    type: String,
    required: true
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

var project = new schema({
  _owner: {
    type: String,
    required: true,
    ref: 'user'
  },
  _supporters: [
    {
      type: String,
      ref: 'user'
    }
  ],
  _collaborators: [
    {
      type: String,
      ref: 'user'
    }
  ],
  summary: {
    type: String
  },
  thumbnail: {
    type: String
  },
  _comments: [
    {
      type: String,
      ref: 'comment'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  finishedAt: {
    type: Date,
    index: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

exports.project = mongoose.model('project', project);

var comment = new schema({
  _writer: {
    type: String,
    required: true,
    ref: 'user'
  },
  _project: {
    type: String,
    required: true,
    ref: 'project'
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

exports.comment = mongoose.model('comment', comment);
