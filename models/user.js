var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//6607d825-7971-4336-9d28-04acd5104cae call pending
// User Schema
var UserSchema = mongoose.Schema({
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}, 
	email: {
		type: String,
		required: true,	
		index:true 
	},
	phone: {
		type: Number,
		required: true
	},
	address : {
		city: {
			type: String
		},
		state: {
			type: String
		},
		pincode:{
	        type:Number
		},
		country: {
			type: String
		},
		address: {
			type: String
		}
	},
	profile_overview: {
		type: String
	}
});

var User = module.exports = mongoose.model('Users', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}