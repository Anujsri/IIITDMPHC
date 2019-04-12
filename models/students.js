var mongoose = require('mongoose');

// Manufacture Schema
var StudentSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	}, 
	email: {
		type: String,
		required: true,	 
	},
	phone: {
		type: Number,
		required: true
	},
	rollnum : {
		type : String,
		required : true
	},
	address : {
		hallno: {
			type: String,
			required: true
		},
		block: {
			type: String,
			required: true
		},
		roomNum:{
	        type:Number,
	        required: true
		} 
	},
	program : {
		type : String,
		required : true
	},
	branch : {
		type : String,
		required : true
	},
	completed : {
		type : Boolean,
		default : false
	},
	userid:{
		type:String,
		required: true
	}, 
        bloodg : {
                type : String
       }
});

var Student = module.exports = mongoose.model('Student', StudentSchema);

 

 
