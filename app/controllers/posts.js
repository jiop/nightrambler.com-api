// Module dependencies

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.show = function (req, res, next){
  var id = req.params.post_id;
  Post.findById(id, function(err, post) {
    if(!err) {
      res.json({ "post" : post });
    } else {
      next(err);
    }
  });
};

// Index
exports.index = function (req, res){
  Post.find(function(err, posts) {
    if(!err) {
      res.json({ "posts" : posts });
    } else {
      next(err);
    }
  });
};
