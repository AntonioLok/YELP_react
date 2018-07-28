const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const cookie = require('cookie');
const fs = require('fs');
const multer = require('multer');
const User = require('../models/user');
const Image = require('../models/image');
const yelp = require('yelp-fusion');
const apiKey = 'g2LQLACnXsY7miaSmgH2qmXl-kab1nQQ56sro1O8TcPJ1SsVuI-_pAnmm-yhWuOPIbv_FObao155N46KpaC4FOe_wZ8fivhzKIo03xJHxeRhzQZY14mn_H4sEhFWW3Yx';
const client = yelp.client(apiKey);
const mongoose = require('mongoose');

const Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "-" + Date.now() + file.originalname);
     }
 });
 
 const fileFilter = (req, file, callback) => {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
			callback(null, true)
		} else  {
			callback(null, false)
		}
 }
 
 
const upload = multer({
     storage: Storage,
	 fileFilter: fileFilter
 });//.array("imgUploader", 3); //Field name and max count

mongoose.connect('mongodb://user123:user123@ds245901.mlab.com:45901/replica_yelp', { useNewUrlParser: true });
const dbconnection = mongoose.connection;

//handle mongo error
dbconnection.on('error', console.error.bind(console, 'connection error:'));
dbconnection.once('open', function () {
	console.log("We are connected");
  // we're connected!
});

router.put('/sign-up', (req, res, next) => {
	var user = new User({
		name: req.body.name,
		lastName : req.body.lastName,
		username: req.body.username.toLowerCase(),
		dateJoined: req.body.dateJoined,
		location: null,
		about: null,
		profilePicture: null,
		blog: null,
		favoMovie: null,
		activity: []
    });
	user.password = user.generateHash(req.body.password);
          // Save user to database
        user.save((err) => {
        // Check if error occured
		if (err) {
		  // Check if error is an error indicating duplicate account
		  if (err.code === 11000) {
			res.json({ success: false, message: 'E-mail already exists' }); // Return error
		  }
		}else {
		  res.json({ success: true, message: 'Acount registered!' }); // Return success 
		  }
	});
});

router.put('/log-in', (req, res, next) => {
	User.authenticate(req.body.username, req.body.password, function (error, user) {
		if (!user || error) {
			res.json({ success: false, message: error.message });
		} else { 
		req.session.username = user._id;
			res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
              path : '/', 
              maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
			}));
			res.json({ success: true, message: 'Logged in', user: user});
		}
	});	
});

router.get('/log-out', (req, res, next) => {
	if (req.session.username) { 
		req.session.destroy();
		res.setHeader('Set-Cookie', cookie.serialize('username', '', {
			  path : '/', 
			  maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
		}));
		res.json({ success: true, message: 'Logged out' });
	} else {
		res.json({ success: false, message: 'Not user logged in' });
	}
});

router.patch('/update/:id', (req, res, next) => {
	User.updateUserInfo(req.params.id, req.body.userInfo, function(err, user){
		if (err) {
			res.json({ success: true, message: "Could not be updated. Please try again", user: null});
		} else {
			res.json({ success: true, message: "Updated successfully", user: user});
		}
	});
});

router.get('/profile/:email', (req, res, next) => {
	 User.getUserInfo(req.params.email, function(err, user) {
		if (err) {
			res.json({ success: false, message: "error", user: null});
		} else  {
			res.json({ success: true, message: "success", user: user});
		}
	});

});

router.get('/profilePicture/:id', (req, res, next) => {
	 Image.getImg(req.params.id, function(err, image) {
			if (err) {
				res.json({ success: false, message: "Error", img: null});
			} else  {
				res.json({ success: true, message: "Success", img: image});
			}
	 })
});


router.put('/upload/img/:id', upload.single('file'), (req, res, next) => {
	if (req.file) {
		const imgPath = "./Images/" + req.file.filename;
		const img = new Image;
		img.data = fs.readFileSync(imgPath, 'base64');
		img.contentType = req.file.mimetype;
		img.owner = req.params.id;
		img.save(function (err, img) {
			if (err) { 
				res.json({ success: false, message: err});
			};
			Image.getImg(img._id, function(err, image) {
				if (err) {
					res.json({ success: false, message: "error"});
				} else  {
					User.updateUserInfo(req.params.id, {profilePicture: image._id}, function(err, user){
					if (err) {
						res.json({ success: true, message: "Could not be updated. Please try again", user: null});
					} else {
						res.json({ success: true, message: "Updated successfully", user: user});
					}
					});
					//res.json({ success: true, message: "success", img: image});
				}  
			});
		});	
	} else { 
		res.json({ success: false, message: "The file passed is not an image"})
	}
});

router.get('/search/:term/:location', (req, res, next) => {
	client.search({
	  term: req.params.term,
	  location: req.params.location
	}).then(response => {
	  res.json({ success: true, data: response.jsonBody})
	}).catch(e => {
	  res.json({ success: false, message: e.message})
	});
});

module.exports = router;