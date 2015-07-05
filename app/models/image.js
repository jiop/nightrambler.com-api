var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  src: { type: String },
  srcMin: { type: String }
});

mongoose.model('Image', ImageSchema);
