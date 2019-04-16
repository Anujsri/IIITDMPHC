var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Handlebars = require('handlebars');
require('handlebars/runtime');
var nodemailer = require('nodemailer');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var xlsxtojson = require("xlsx-to-json");
var xlstojson = require("xls-to-json");
var app = express();
var server = require('http').createServer(app);
const client = require('socket.io').listen(server).sockets;
//require('./models/User');
var Patient = require('./models/patient');
var Medicine = require('./models/medicine');
var ToDo = require('./models/todo');
var Student = require('./models/students');
require('./config/passport')(passport);

const keys = require('./config/keys');

mongoose.Promise = global.Promise;


Handlebars.registerHelper('iff', function(a, operator, b, opts) {
    var bool = false;
    switch (operator) {
        case '==':
            bool = a == b;
            break;
        case '>':
            bool = a > b;
            break;
        case '<':
            bool = a < b;
            break;
        default:
            throw "Unknown operator " + operator;
    }

    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/phc', { useNewUrlParser: true }, function(err, db) {
    if (err) {
        throw err;
    }
    client.on('connection', function(socket) {
        // Create function to send status
        sendStatus = function(s) {
            socket.emit('status', s);
        }
        var d = new Date();
        var dateFormat = {};
        var months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthName = months[d.getMonth()];
        var month;
        var mon = d.getMonth();
        month = mon;
        var datenum;
        var datenu = d.getDate();
        datenum = datenu;
        var year = d.getFullYear();
        var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        var dayName = days[d.getDay()];
        var day = d.getDay();
        dateFormat.monthName = monthName;
        dateFormat.month = month;
        dateFormat.datenum = datenum;
        dateFormat.year = year;
        dateFormat.dayName = dayName;
        // Get chats from mongo collection
        Patient.find({dateFormat : dateFormat}).lean().exec(function(err, res) {
            if (err) {
                throw err;
            }
            //Emit the messages
            socket.emit('output', res);
        });

        Patient.find({}).lean().exec(function(err, res) {
            if (err) {
                throw err;
            }
            //Emit the messages
            socket.emit('output1', res);
        });

        ToDo.find({}).lean().exec(function(err, res) {
            if (err) {
                throw err;
            }
            //Emit the messages
            socket.emit('todoOutput', res);
        });
        // Handle input events
        socket.on('input', function(data) {
            var idnumber;
            var patientName = data.patientName;
            var patientEmail;
            var phone = data.phone;
            var medicine = data.medicineName;
            var mquantity = data.medicineQuantity;
            var diseases;
            var patientType = data.patientType;
            var givenbyname = data.name;
            var givenbyid = data.id;
            var doctorName;
            var d = new Date();
            var dateFormat = {};
            var months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var monthName = months[d.getMonth()];
            var month;
            var mon = d.getMonth();
            month = mon;
            var datenum;
            var datenu = d.getDate();
            datenum = datenu;
            var year = d.getFullYear();
            var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            var dayName = days[d.getDay()];
            var day = d.getDay();
            dateFormat.monthName = monthName;
            dateFormat.month = month;
            dateFormat.datenum = datenum;
            dateFormat.year = year;
            dateFormat.dayName = dayName;
            if (data.diseases == "")
                diseases = "Not Mentioned";
            else
                diseases = data.diseases;
	    if (data.doctorName == "")
                doctorName = "N/A";
            else
                doctorName = data.doctorName;
	    if (data.idnumber == "")
                 idnumber = 0;
            else
                idnumber = data.idnumber;
            if (data.patientEmail == "")
                patientEmail = "N/A";
            else
                patientEmail = data.patientEmail;

            var medicineName = [];
            var html1 = '';
            for (var i = 0; i < medicine.length; i++) {
                var obj = {};
                obj.name = medicine[i];
                obj.quantity = mquantity[i];
                medicineName.push(obj);
                reduceMedicine(medicine[i], mquantity[i])
                html1 += '<li><div style="box-sizing: border-box;float: left;width: 50%;  "><b>Name : </b>' + medicine[i] + '</div>' +
                    '<div style="box-sizing: border-box;float: right;width: 50%; "><b>Quantity : </b>' + mquantity[i] + '</div></li>'
             }
            console.log("adding patients");
            var patientAdd = new Patient({
                patientName: patientName,
                idnumber: idnumber,
                medicineName: medicineName,
                givenbyname: givenbyname,
                givenbyid: givenbyid,
                dateFormat: dateFormat,
                diseases: diseases,
                patientType: patientType,
                patientEmail: patientEmail,
                phone: phone,
                doctorName: doctorName
            });
            patientAdd.save((err, patient) => {
                if (err) {
                    return err;
                } else {
                    console.log("saving medicine");
                    client.emit('output', [data]);
                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                    const nodemailer = require('nodemailer');
                    nodemailer.createTestAccount((err, account) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'phc@iiitdmj.ac.in', // generated ethereal user
                                pass: '******' // generated ethereal password
                            }
                        });

                        // setup email data with unicode symbols
                        var mailOptions = {
                            from: ' "Anuj" <anuj96sri@gmail.com>', // sender address
                            to: patientEmail, // list of receivers
                            subject: 'Your Medicines', // Subject line
                            // text: 'Hello world?', // plain text body
                            html: '<div style="margin-right:-15px;margin-left:-15px;">' +
                                '<div style="position:relative;min-height:1px;padding-right:15px;padding-left:15px;@media (min-width:992px){float:left};width:66.66666667%;margin-left:16.66666667%;margin-right:16.66666667%;" >' +
                                '<div  style="padding-left:0;margin-bottom:20px">' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#5499C7;color : white;font-size: 20px;"><center><b>Your PHC Visit Report</b></center></li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF"><b>Name : </b>' + patientName + '</li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF"><b>Pf No./Roll No. :  </b>' + idnumber + '</li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF"><b>Diseases Name. :  </b>' + diseases + '</li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF;color : black"><b><center>Medicine Information</center></b></li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF"><ol>' + html1 + '</ol></li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF"><b>Date :  </b>' + d + '</li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF;color : black"><b>Given By. :  </b>' + givenbyname + '</li>' +
                                '<li style="position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #AEB6BF;color : black"><b>Doctor. :  </b>' + doctorName + '</li>' +
                                '</div>' +
                                '</div>' +
                                '</div>',
                            // html body
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        });
                    });
                }
            });


            function reduceMedicine(medicine, mquantity) {
                Medicine.findOne({ medicineName: medicine }, 'quantity').lean().exec((err, getmedicine) => {
                    var a = getmedicine.quantity - mquantity;
                    Medicine.findOneAndUpdate({ medicineName: medicine }, { $set: { quantity: a } }, { new: true }, function(err, medicines) {
                        if (err) {
                            res.send(err);
                        }
                        console.log("updated medicies : " + medicine);
                    });
                })
            }

        });

        socket.on('todoInput', function(data) {
            var todo = data.todo;
            console.log("todo is : " + todo);
            var creatdAt = new Date();
            var todoAdd = new ToDo({
                todo: todo,
                creatdAt: creatdAt
            });
            todoAdd.save((err, todo) => {
                if (err) {
                    return err;
                } else {
                    client.emit('todoOutput', [data]);
                }
            });
        });
    });
});
var db = mongoose.connection;
var auth = require('./routes/auth')
var routes = require('./routes/index');
var users = require('./routes/users');
var usertype = require('./routes/usertype');
var doctor = require('./routes/doctor');
var compounder = require('./routes/compounder');
var patient = require('./routes/patient');
var student = require('./routes/student');
// Init App

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'html');
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false
    // secret: 'secret',
    // saveUninitialized: true,
    // resave: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // cookie: { maxAge: 720 * 60 * 1000 }
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
// Connect Flash
app.use(flash());
// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});

app.use('/auth', auth);
app.use('/', routes);
app.use('/users/', users);
app.use('/usertype/', usertype);
app.use('/doctor/', doctor);
app.use('/compounder/', compounder);
app.use('/patient/', patient);
app.use('/student/', student);
// Set Port
server.listen(process.env.PORT || 3000, function() {
    console.log("Port is listening!");
});
