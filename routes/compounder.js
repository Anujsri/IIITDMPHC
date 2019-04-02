var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Compounder = require('../models/compounder');
var Patient = require('../models/patient');
var Medicine = require('../models/medicine');

router.post('/completeprofile/:id', ensureAuthenticated, (req, res, next) => {
    var id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) return err;
        var name = user.name;
        var email = user.email;
        var usertype = user.usertype;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;
        var zip = req.body.zip;
        var state = req.body.state;
        var userid = id;
        var completed = true;


        var compounderadd = new Compounder({
            name: name,
            email: email,
            usertype: usertype,
            phone: phone,
            address: address,
            city: city,
            zip: zip,
            state: state,
            userid: userid,
            completed: completed
        });
        compounderadd.save((err, compounderadd) => {
            if (err) return err;
            req.flash('success_msg', 'You profile is saved!');
            res.json(compounderadd);
        });
    });
});

router.post('/addMedicine/:id', ensureAuthenticated, (req, res, next) => {
    var id = req.params.id;
    var companyName = req.body.companyName;
    var medicineName = req.body.medicineName;
    var medicineQuantity = req.body.medicineQuantity;
    var quantity = req.body.medicineQuantity;
    var price = req.body.price;
    var compounderid = id;

    var medicineAdd = new Medicine({
        companyName: companyName,
        medicineName: medicineName,
        medicineQuantity: medicineQuantity,
        quantity: quantity,
        price : price,
        compounderid: compounderid
    });
    medicineAdd.save((err, medicine) => {
        if (err) return err;
        res.json(medicine);
    });
});


router.put('/editprofile/:id', ensureAuthenticated, (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var newvalues = {
        $set: {
            name: name,
            phone: phone,
            address: address,
            city: city,
            state: state,
            zip: zip
        }
    };
    Compounder.findByIdAndUpdate(id, newvalues, { new: true }).lean().exec(function(err, compounder) {
        if (err) throw err;
        var userid = compounder.userid;
        User.findByIdAndUpdate(userid, { $set: { name : name } }, { new: true }, function(err, user) {
            if (err) {
                res.send(err);
            }
            req.flash('success_msg', 'You profile is changed!');
            res.json(compounder);
        });
    });
});

router.get('/compounderDetail/:id', ensureAuthenticated, (req, res, next) => {
    var id = req.params.id;
    Compounder.findById(id, (err, compounder) => {
        if (err) return err;
        res.json(compounder);
    })
})

router.get('/allmedicine', ensureAuthenticated, (req, res, next) => {
    Medicine.find({}, 'medicineName quantity medicineQuantity price').sort({medicineQuantity : -1}).lean().exec((err, medicine) => {
        if (err) return err;
        res.json(medicine);
    })
})

router.get('/allmedicines', ensureAuthenticated, (req, res, next) => {
    Medicine.find({}).lean().exec((err, medicine) => {
        if (err) return err;
        res.json(medicine);
    })
})


router.put('/setlimit/:id', ensureAuthenticated, (req, res) => {
    var id = req.params.id;
    var limit = req.body.limit;
    var newvalues = {
        $set: {
            limit : limit
        }
    };
    Medicine.findByIdAndUpdate(id, newvalues, { new: true }).lean().exec(function(err, medicine) {
        if (err) throw err;
        res.json(medicine);
    });
});

router.get('/limitvalues/',ensureAuthenticated,(req,res)=>{
     console.log("Medicine are : ");
    Medicine.find({ $where: function() {return this.limit >= this.quantity} }).lean().exec((err,medicine)=>{
        if(err) return err;
        console.log("Medicine are : " + medicine);
        res.json(medicine);
    })
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