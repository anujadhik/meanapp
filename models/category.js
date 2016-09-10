var mongoose= require('mongoose');

//Course Schema
var categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get,POST,UPDATE,DELEtE Categories
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit);
}

module.exports.addCategories = function(category, callback){
    Category.create(category, callback);
}

module.exports.updateCategories = function(id, category, options, callback){
    var query = {_id: id};
    var update = {
        name: category.name
    }
    Category.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeCategories = function(id, callback){
    var query = {_id: id};
    Category.remove(query, callback);
}
