var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var ObjectId = require('mongodb').ObjectID

var imageSchema = mongoose.Schema({
  data: { type: String },
  contentType: { type: String },
  owner: { type: String }
});

imageSchema.statics.getImg = function (id, callback) {
	ImageModel.findOne({ _id: id }, function (err, img) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, img);
		}
	});
}

var ImageModel = mongoose.model('Image', imageSchema);
module.exports = mongoose.model('Image', imageSchema);