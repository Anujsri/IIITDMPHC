var mongoose = require('mongoose');

// User Schema
var PatientSchema = mongoose.Schema({
	patientName:{
		type:String,
		index : true
	},
	idnumber:{
		type: Number
	},
	date:{
		type: Date
	},
	dateFormat : {
		monthName : {type : String},
		month     : {type : Number},
		datenum   : {type : Number},
		year      : {type : Number},
		dayName   : {type : String}
	},
	medicineName:[{
		name : {
			type : String,
			index : true
		},
		quantity : {
			type : Number
		}
	}],
	givenbyid : {
		type : String,
	},
	givenbyname : {
		type : String
	},
	diseases : {
		type : String
	},
	patientEmail : {
		type : String
	},
	patientType : {
		type : String
	},
	doctorName : {
		type : String
	},
	phone : {
		type : Number
	},
	image_url : {
		type : String,
		default :"http://icons.iconarchive.com/icons/icons-land/vista-people/256/Person-Male-Light-icon.png" 
	}
	 
});

var Patient = module.exports = mongoose.model('Patient',PatientSchema);
