var mongoose = require('mongoose');

// Manufacture Schema
var StudentSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	}, 
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
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		pincode:{
	        type:Number,
	        required: true
		},
		country: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		}
	},
	profile_overview: {
		type: String
	}
});

var Student = module.exports = mongoose.model('Student', StudentSchema);

 

 
