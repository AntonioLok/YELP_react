var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var ObjectId = require('mongodb').ObjectID

var reviewSchema = mongoose.Schema({
  business: { type: String, required: true, unique: true },
  review: { type: Object, required: true}
});


reviewSchema.statics.getReviews = function (business, callback) {
	ReviewModel.findOne({ business: business }, function (err, review) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, review);
		}
	});
}

var ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = mongoose.model('Review', reviewSchema);