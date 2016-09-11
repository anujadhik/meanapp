var express = require('express');
var app= express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Category= require('./models/category');
Course= require('./models/course');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/meanapp');
var db = mongoose.connection;

app.use(express.static(__dirname + "/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'jade');
app.set('view options', { layout: 'other' });

app.get('/', function(req, res){
    res.send('Hello all');
});

//APIs for categories
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

//APIs for courses
app.get('/api/v1/courses', function(req, res){
    Course.getCourses(function(err, courses){
        if(err){
            throw err;
        }
        res.json(courses);
    });
});

app.post('/api/v1/courses', function(req, res){
    var courses=req.body;
    Course.addCourses(courses,function(err, courses){
        if(err){
            throw err;
        }
        res.json(courses);
    });
});

app.put('/api/v1/courses/:_id', function(req, res){
    var id=req.params._id;
    var courses=req.body;
    Course.updateCourses(id,courses,{},function(err, courses){
        if(err){
            throw err;
        }
        res.json(courses);
    });
});


app.delete('/api/v1/courses/:_id', function(req, res){
    var id=req.params._id;
    Course.removeCourses(id,function(err, courses){
        if(err){
            throw err;
        }
        res.json(courses);
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
