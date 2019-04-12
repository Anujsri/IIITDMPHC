var mongoose = require('mongoose');

// Manufacture Schema
var CompounderSchema = mongoose.Schema({
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
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state:{
	        type:String,
        	required: true
	},
	zip:{
		type:Number,
		required: true
	},
	userid:{
		type:String,
		required: true
	},
	usertype:
	{
		type:String,
		required: true
	},
	image_url:{
		type: String,
		default: "http://icons.iconarchive.com/icons/icons-land/medical/256/People-Doctor-Male-icon.png"
	},
	inoffice : {
	        type : Boolean,
		default : false
	}
});

var Compounder = module.exports = mongoose.model('Compounder', CompounderSchema);

 

 
