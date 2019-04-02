var mongoose = require('mongoose');

// User Schema
var MedicineSchema = mongoose.Schema({
	companyName:{
		type:String
	},
	medicineName :{
		type: String
	},
	medicineQuantity:{
		type: Number
	},
	quantity : {
		type : Number
	},
	compounderid : {
		type : String
	},
	price : {
		type : Number
	},
	limit : {
		type : Number,
		default : 0
	}
});

var Medicine = module.exports = mongoose.model('Medicine',MedicineSchema);
