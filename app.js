/**
 * Author       - Dong Hyun Koo
 * Email        - tellmewhy07@gmail.com
 * Github       - https://github.com/AlwaysAwake
 * Facebook     - https://www.facebook.com/donghyun.koo.98
 */

/**
 * Author       - 빵임이
 * Email        -
 * Github       -
 * Facebook     -
 */

/**
 * Author       - 카추사 샌드백
 * Email        -
 * Github       -
 * Facebook     -
 */
'use strict';

var express       = require('express');
var session       = require('express-session');
var RedisStore    = require('connect-redis')(session);
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');

var config = require('./config');

var routes      = require('./routes/index');
var users       = require('./routes/users');

var app = express();

var DATABASE = "mongodb";
var ENVIRONMENT = app.get('env');


/**
 * Database connection
 * ==================================
 */
var config_mongodb = config[DATABASE][ENVIRONMENT];
mongoose.connect(config_mongodb.uri, {
  db: {native_parser: true},
  server: {poolSize: config_mongodb.poolSize},
  user: config_mongodb.username,
  pass: config_mongodb.password
});
mongoose.connection.on('open', function () {
  console.log('Connection opened to mongodb!');
});


/**
 * View engine setup
 * ==================================
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/**
 * Middlewares
 * ==================================
 */

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*
app.use(session({
  store: new RedisStore,
  secret: 'I respect you',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 }
}));
*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});


/**
 * Route handlers
 * ==================================
 */
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handlers
 * ==================================
 */
// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'localhost') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
