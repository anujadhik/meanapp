var mongoose= require('mongoose');

//Category Schema
var categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get Genres
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit);
}

// Add Genre
module.exports.addCategories = function(category, callback){
    Category.create(category, callback);
}

// Update Genre
module.exports.updateCategories = function(id, category, options, callback){
    var query = {_id: id};
    var update = {
        name: category.name
    }
    Category.findOneAndUpdate(query, update, options, callback);
}


// Delete Genre
module.exports.removeCategories = function(id, callback){
    var query = {_id: id};
    Category.remove(query, callback);
}
