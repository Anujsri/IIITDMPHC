var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var { check, validationResult } = require('express-validator');

// Get Register Page
router.get('/register',  function (req, res) {
	if(req.isAuthenticated()){
		res.render('dean');
	} else {
		//req.flash('error_msg','You are not logged in');
		res.render('register');
	}
});

// Get Login Page
router.get('/login', function (req, res) {
	if(req.isAuthenticated()){
		res.render('dean');
	} else {
		//req.flash('error_msg','You are not logged in');
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
	console.log("Yha aa gya")
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var phone = req.body.phone;
	 

	// Validation
	check('name', 'Name is required').notEmpty();
	check('email', 'Email is required').notEmpty();
	check('email', 'Email is not valid').isEmail();
	check('phone', 'Mobile No. is required').notEmpty();
	check('password', 'Password is required').notEmpty();
	check('password2', 'Passwords do not match').equals(req.body.password);

	var errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array())
		res.render('register', {
			errors: errors.array()
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ email: email}, function (err, user) {
			if(err){
				console.log("errors.array 1")
                req.flash('error_msg','Some error occured 1');
            	res.redirect('/users/register');
            }
            if(user){
            	console.log("errors.array 2")
            	req.flash('error_msg','Email is already in use');
            	res.redirect('/users/register');
            }
			else {
				console.log(errors.array())
				var newUser = new User({
					name     : name,
					email    : email,
					password : password,
					phone : phone

				});
				User.createUser(newUser, function (err, user) {
					if (err) {
						console.log(err)
						req.flash('error_msg','Some error occured');
						res.redirect('/users/register');
					}
					else{
						console.log("errors.array 4")
					    req.flash('success_msg','You are registered now you can login')
					    res.redirect('/users/login');	
					}
				});
			}
			
		});
	}
});

router.get('/profile',ensureAuthenticated,(req,res)=>{
	User.findOne({email : req.user.email},(err,user)=>{
		if (err){
			req.flash('error_msg','Some error occured');
			res.render('dean')
		}
		else{
			console.log(user)
			res.render('dean',{user : user})
		}
	})
})
 

passport.use(new LocalStrategy(
	function (email, password, done) {
		User.getUserByEmail(email, function (err, user) {
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
	successRedirect: '/users/profile', 
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

router.post('/usertypes/',ensureAuthenticated,(req,res,next)=>{
	var email = req.body.email;
    User.findOneAndUpdate({ email: email }, { $set: { usertype: req.body.usertype } }, { new: true }, (err, user) => {
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
