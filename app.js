var express = require('express');
var app= express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Category= require('./models/category');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/meanapp');
var db = mongoose.connection;


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.send('Hello all');
});

app.get('/api/v1/categories', function(req, res){
    Category.getCategories(function(err, categories){
        if(err){
            throw err;
        }
        res.json(categories);
    });
});


app.post('/api/v1/categories', function(req, res){
    var categories=req.body;
    Category.addCategories(categories,function(err, categories){
        if(err){
            throw err;
        }
        res.json(categories);
    });
});

app.put('/api/v1/categories/:_id', function(req, res){
    var id=req.params._id;
    var categories=req.body;
    Category.updateCategories(id,categories,{},function(err, categories){
        if(err){
            throw err;
        }
        res.json(categories);
    });
});


app.delete('/api/v1/categories/:_id', function(req, res){
    var id=req.params._id;
    Category.removeCategories(id,function(err, categories){
        if(err){
            throw err;
        }
        res.json(categories);
    });
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
