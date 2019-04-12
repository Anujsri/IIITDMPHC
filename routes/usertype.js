var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Doctor = require('../models/doctor');
var Compounder = require('../models/compounder');
var Patient = require('../models/patient');
var Student = require('../models/students');
var Medicine = require('../models/medicine');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next) {

    if (req.user.usertype === "Dean" || req.user.usertype === "Superintendent") {
        Medicine.find({}).lean().exec((err,medicines)=>{
            if(err) return err;
            Doctor.find({usertype: "Doctor"})
            .lean().exec(function(err, doctor) {
                if (err) return err;
                Compounder.find({usertype: "Compounder" })
                .lean().exec(function(err, compounder) {
                    if (err) return err;
                    if(req.user.usertype === "Dean"){
                        res.render('dean', {
                            compounder,
                            doctor,
                            medicines
                        });
                    }
		     if(req.user.usertype === "Superintendent"){
                        res.render('superintendent', {
                            compounder,
                            doctor,
                            medicines
                        });
                    }
                });
            });
        })
    }
    if (req.user.usertype === "Doctor") {
        Doctor.findOne({ userid: req.user._id }, (err, doctor, next) => {
            if (err) return err;
            if (!doctor) {
                res.render('doctor', {
                    doctor,
                });
            } else {
                Patient.find({ doctorName : req.user.name }, (err, patients) => {
                    if (err) return err;
                    res.render('doctor', {doctor,patients});  
                });
            }
        });
    }

    if (req.user.usertype === "Compounder") {
        Compounder.findOne({ userid: req.user._id }, (err, compounder) => {
            if (err) return err;
            if (!compounder) {
                res.render('compounder', {
                    compounder,
                });
            } else {
                Patient.find({ givenbyid: compounder._id }, (err, patients) => {
                    if (err) return err;
                    var studentLen = patients.lenght;
                    res.render('compounder', {
                        compounder,
                        patients,
                        studentLen
                    });
                });
            }
        });
    }

    if (req.user.usertype === "Student") {
        var str = req.user.email;
        var patt = /@iiitdmj.ac.in/i;
        if (str.match(patt)) {
            Student.findOne({ email: req.user.email }, (err, student) => {
                if(err) return err;
                Compounder.find({}).lean().exec((err,compounder)=>{
                    if(err) return err;
                    Doctor.find({}).lean().exec((err,doctor)=>{
                        if(err) return err;
                        res.render('student', { student,doctor,compounder});
                    })
                })
            });
        } else {
            User.findOneAndRemove({ email: req.user.email }).lean().exec((err, user) => {
                if (err) return err;
                req.flash('error', 'Please login with College Email');
                res.redirect('/users/login');
            })
            // req.session.destroy();
        }
    }
});

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
