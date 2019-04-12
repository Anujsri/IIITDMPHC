var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Doctor = require('../models/doctor');
 
router.post('/completeprofile/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    User.findById(id,(err,user)=>{
        if(err) return err;
        var name = user.name;
        var email = user.email;
        var usertype = user.usertype;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;
        var zip = req.body.zip;
        var state = req.body.state;
        var userid = id;
        

        var lenderadd = new Doctor({
            name : name,
            email : email,
            usertype : usertype,
            phone : phone,
            address : address,
            city : city,
            zip : zip,
            state : state,
            userid : userid
        });
        lenderadd.save((err,lender)=>{
            if(err) return err;
            req.flash('success_msg', 'You profile is saved!');
            res.json(lender);
        });
    });   
});


router.put('/editprofile/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id; 
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var newvalues = { 
        $set: {
            name : name,
            phone: phone, 
            address: address,
            city : city,
            state : state,
            zip : zip
        } 
    };
    Doctor.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,doctor){
        if (err) throw err;
        var userid = doctor.userid;
        User.findByIdAndUpdate(userid, { $set: { name : name } }, { new: true }, function(err, user) {
            if (err) {
                res.send(err);
            }
            req.flash('success_msg', 'You profile is changed!');
            res.json(doctor);
        });  
    });          
});

router.get('/doctordetail/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    Doctor.findById(id,(err,lender)=>{
        if(err) return err;
        res.json(lender);
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
