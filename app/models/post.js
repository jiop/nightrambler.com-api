var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Coord = require('./coord');
var Image = require('./image');

var PostSchema = new Schema({
  date: { type: Date },
  coords: Coord,
  images: [Image],
  title: { type: String, default: '' },
  body: { type: String, default: '' },
});

PostSchema.path('title').required(true, 'Post title cannot be blank');
PostSchema.path('body').required(true, 'Post body cannot be blank');

mongoose.model('Post', PostSchema);
