var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expresshbs = require('express-handlebars')
var indexRouter = require('./routes/index');
var mongoose = require('mongoose')
var session =require('express-session')
var userRoute = require('./routes/user')

var app = express();
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/shopping', {useNewUrlParser: true}).then(() => {
    console.log(`your database connected`)
  });

// view engine setup

app.engine('.hbs',expresshbs({defaultLayout:'layouts',extname:'.hbs', partialsDir: path.join(__dirname, 'views/partial')}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:' mysupersecret' , resave: false , saveUninitialized: false}))
app.use('/', indexRouter);
app.use('user/',userRoute);

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
