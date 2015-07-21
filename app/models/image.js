var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImgSchema = new Schema({
  src: {type: String},
  srcMin: {type: String}
});

mongoose.model('Img', ImgSchema);
