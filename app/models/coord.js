var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordSchema = new Schema({
  latitude: { type: Number },
  longitude: { type: Number },
  zoom: { type: Number }
});

mongoose.model('Coord', CoordSchema);
