var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

// Get Register Page
router.get('/register',  function (req, res) {
	if(req.isAuthenticated()){
		res.redirect('/usertype/');
	}
	else{
		res.render('register');
	}
});

// Get Login Page
router.get('/login', function (req, res) {
	if(req.isAuthenticated()){
		res.redirect('/usertype/');
	}
	else{
		res.render('login');
	}
});

router.put('/changePassword/:id',ensureAuthenticated,(req,res,next)=>{
	console.log("password checking");
	var password = req.body.password;
	var id = req.params.id;
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        User.findByIdAndUpdate(id,{ $set: { password : password }},(err,user)=>{
	        	if(err) return err;
	        	res.json(user);
			})
	    }); 
	});	
})
// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var usertype = req.body.usertype;
	 

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: username}, function (err, user) {
			if(err){
				console.log("Error yha hai");
                req.flash('error_msg','Email is already in use');
            	res.redirect('/users/register');
            }
            if(user){
            	req.flash('error_msg','Username is already in use');
            	res.redirect('/users/register');
            }
			else {
				var newUser = new User({
					name     : name,
					email    : email,
					username : username,
					password : password,
					usertype : usertype

				});
				User.createUser(newUser, function (err, user) {
					if (err) {
						req.flash('error','Email is already in use');
						res.redirect('/users/register');
					}
					else{
					    req.flash('success_msg','You are registered now you can login')
					    res.redirect('/users/login');	
					}
					
				});
			}
			
		});
	}
});

 

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});


// Login User
router.post('/login',passport.authenticate('local', {
	successRedirect: '/usertype/', 
	failureRedirect: '/users/login', 
	failureFlash: true }),function (req, res) {
		res.redirect('/');
	});


// Logout User
router.get('/logout',ensureAuthenticated, function (req, res) {
	// req.session.destroy();
	req.logOut();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

router.post('/chooseusertype/:id',ensureAuthenticated,(req,res,next)=>{
	var id = req.params.id;
	var usertype = req.body.usertype;
    User.findByIdAndUpdate(id, { $set: { usertype: usertype } }, { new: true }, (err, user) => {
		if (err) throw err;
		res.redirect('/usertype/');
	})   
})


//Check whether user is authenticted or not
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
module.exports = router;
