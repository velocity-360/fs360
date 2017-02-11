var appName = 'FullStack360'
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var sessions = require('client-sessions')
var mongoose = require('mongoose')
var compression = require('compression')
if (app.get('env') === 'development') 
  require('dotenv').config()

var main = require('./routes/main')
var api = require('./routes/api')
var admin = require('./routes/admin')
var account = require('./routes/account')
var stripe = require('./routes/stripe')
var tracker = require('./routes/tracker')
var premium = require('./routes/premium')

// Here we find an appropriate database to connect to, defaulting to localhost if we don't find one.  
// var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/'+appName

// Makes connection asynchronously.  Mongoose will queue up database operations and release them when the connection is complete.
mongoose.connect(process.env.MONGOLAB_URI, function (err, res) {
  if (err)
    console.log ('ERROR connecting to: ' + process.env.MONGOLAB_URI + '. ' + err)
  else 
    console.log ('DB Connection success')
})


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessions({
  cookieName: 'session',
  secret: 'ajajfjwfajwef',
  duration: 60*24*60*60*1000, // 60 days
  activeDuration:30*60*1000,
}))
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', main)
app.use('/tracker', tracker)
app.use('/api', api)
app.use('/account', account)
app.use('/admin', admin)
app.use('/stripe', stripe)
app.use('/premium', premium)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
