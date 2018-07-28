var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var ObjectId = require('mongodb').ObjectID

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  dateJoined: { type: String },
  location: { type: String },
  about: { type: String },
  profilePicture: { type: String },
  blog: { type: String },
  favoMovie: { type: String },
  activity: { type: Object}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
	UserModel.findOne({ username: email }).exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('This account does not exist');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
		  var err = new Error('Password is incorrect');
          return callback(err);
        }
      })
    });
}

userSchema.statics.getUserInfo = function (email, callback) {
	UserModel.findOne({ username: email }, function (err, user) {
		if (err) {
			return callback(err);
		} else {
			user.password = null;
			return callback(null, user);
		}
	});
}

userSchema.statics.updateUserInfo = function (id, newValue, callback) {
	UserModel.findByIdAndUpdate(id, newValue, {new: true}, function(err, user) {
		return callback(err, user);
	});
}

var UserModel = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);