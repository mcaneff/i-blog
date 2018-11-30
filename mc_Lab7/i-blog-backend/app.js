var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

// import URL routes
var posts = require('./routes/posts');
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://mathayde1:mathayde1@ds121183.mlab.com:21183/i-blog';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// remove the following middleware in the production version
app.use(function (request, response, next) {
response.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
response.header("Access-Control-Allow-Headers", "Origin, XRequested-With,Content-Type, Accept");
response.header('Access-Control-Allow-Methods', 'POST, PATCH,GET, PUT, DELETE, OPTIONS');
next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.static(path.join(__dirname, 'public')));

// use Express to handle routes
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
