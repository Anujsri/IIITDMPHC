var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Student = require('../models/students');

router.post('/completeprofile/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    var name =  req.body.name;
    var phone = req.body.phone;
    var rollnum = req.body.rollnum;
    var hallno = req.body.hallno;
    var block = req.body.block;
    var roomNum = req.body.roomNum;
    var program = req.body.program;
    var branch = req.body.branch;
    var bloodg = req.body.bloodg;
    var userid = id;
    console.log("Blood group " + bloodg); 
    var email = req.user.email;
    var address = {};
    address.hallno = hallno;
    address.block = block;
    address.roomNum = roomNum;
	var addStudent = new Student({
	    name : name,
            email : email,
            phone : phone,
            rollnum : rollnum,
            address : address,
            program : program,
            branch : branch,
            userid : userid,
            completed : true,
            bloodg : bloodg
	});
	addStudent.save((err,student) => {
        if (err){
            return err;
        }
        else{
            User.findByIdAndUpdate(id, { $set: { name : name } }, { new: true }, function(err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(student);
            });   
        }
    });
})


router.put('/editprofile/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    var name =  req.body.name;
    var phone = req.body.phone;
    var rollnum = req.body.rollnum;
    var hallno = req.body.hallno;
    var block = req.body.block;
    var roomNum = req.body.roomNum;
    var program = req.body.program;
    var branch = req.body.branch;
    var bloodg = req.body.bloodg;
    console.log("Blood group : " + bloodg);
    var address = {};
    address.hallno = hallno;
    address.block = block;
    address.roomNum = roomNum;
    var newvalues = {
        $set: {
            name : name,
            phone : phone,
            rollnum : rollnum,
            address : address,
            program : program,
            branch : branch,
            bloodg : bloodg
        }
    };
    Student.findByIdAndUpdate(id, newvalues, { new: true }).lean().exec(function(err, student) {
        if (err) throw err;
        res.json(student);
    });
})

router.post('/getStudent',(req,res)=>{
    var rollnum = req.body.rollnumber;
    Student.findOne({rollnum : rollnum}).lean().exec((err,student)=>{
        if(err) return err;
        res.json(student);
    })
})

router.get('/getroll',(req,res)=>{
    Student.find({},'rollnum').lean().exec((err,student)=>{
        if(err) return err;
        res.json(student);
    })
})

router.post('/studentinfo',ensureAuthenticated,(req,res,next)=>{
    var rollnum = req.body.rollnum;
    Student.findOne({rollnum : rollnum}).lean().exec(function(err,student){
        if(err) return err;
        res.json(student);
    })
})

router.get('/allstudents',ensureAuthenticated,(req,res,next)=>{
    Student.find({}).lean().exec((err,students)=>{
        if(err) return err;
        res.json(students);
    });
})
//Check whether user is authenticted or not
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;
