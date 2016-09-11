var mongoose= require('mongoose');

//Courses Schema
var courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    pictureUrl:{
        type:String
    },
    demoUrl:{
        type:String
    },
    category:{type:String}
});

var Course = module.exports = mongoose.model('Course', courseSchema);

// Get Courses
module.exports.getCourses = function(callback, limit){
    Course.find(callback).limit(limit);
}

// Add Course
module.exports.addCourses = function(course, callback){
    Course.create(course, callback);
}

// Update Course
module.exports.updateCourses = function(id, course, options, callback){
    var query = {_id: id};
    var update = {
        title: course.title,
        description:course.description,
        price:course.price,
        pictureUrl:course.pictureUrl,
        demoUrl:course.demoUrl,
        category:course.category

    }
    Course.findOneAndUpdate(query, update, options, callback);
}


// Delete Course
module.exports.removeCourses = function(id, callback){
    var query = {_id: id};
    Course.remove(query, callback);
}

