var mongoose = require('mongoose');

// Manufacture Schema
var ToDoSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	creatdAt : {
		type : Date
	}
});

var ToDo = module.exports = mongoose.model('ToDo', ToDoSchema);