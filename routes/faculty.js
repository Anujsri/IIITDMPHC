var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Faculty = require('../models/faculty');

router.post('/completeprofile/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    var name =  req.body.name;
    var phone = req.body.phone;
    var pfnumber = req.body.pfnumber;
    var branch = req.body.branch;
    var bloodg = req.body.bloodg;
    var userid = id;
    var email = req.user.email;
	var addFaculty = new Faculty({
	    name : name,
        email : email,
        phone : phone,
        pfnumber : pfnumber,
        branch : branch,
        userid : userid,
        completed : true,
        bloodg : bloodg
	});
	addFaculty.save((err,faculty) => {
        if (err){
            return err;
        }
        else{
            User.findByIdAndUpdate(id, { $set: { name : name } }, { new: true }, function(err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(faculty);
            });   
        }
    });
})


router.put('/editprofile/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    var name =  req.body.name;
    var phone = req.body.phone;
    var pfnumber = req.body.pfnumber;
    var branch = req.body.branch;
    var bloodg = req.body.bloodg;
    var newvalues = {
        $set: {
            name : name,
            phone : phone,
            pfnumber : pfnumber,
            branch : branch,
            bloodg : bloodg
        }
    };
    Faculty.findByIdAndUpdate(id, newvalues, { new: true }).lean().exec(function(err, faculty) {
        if (err) throw err;
        res.json(faculty);
    });
})

router.post('/getFaculty',(req,res)=>{
    var pfnumber = req.body.pfnumber;
    Faculty.findOne({pfnumber : pfnumber}).lean().exec((err,faculty)=>{
        if(err) return err;
        res.json(faculty);
    })
})

router.get('/getroll',(req,res)=>{
    Faculty.find({},'pfnumber').lean().exec((err,faculty)=>{
        if(err) return err;
        res.json(faculty);
    })
})

router.post('/facultyinfo',ensureAuthenticated,(req,res,next)=>{
    var pfnumber = req.body.pfnumber;
    Faculty.findOne({pfnumber : pfnumber}).lean().exec(function(err,faculty){
        if(err) return err;
        res.json(faculty);
    })
})

router.get('/allfacultys',ensureAuthenticated,(req,res,next)=>{
    Faculty.find({}).lean().exec((err,faculty)=>{
        if(err) return err;
        res.json(faculty);
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
