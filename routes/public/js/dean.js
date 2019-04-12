window.location.href = "#admin"
function showStudents() {
    axios.get('/patient/studentInformation/').then(function(response) {
        var html = '';
        for (var i = 0; i < response.data.length; i++) {
            var html1 = '';
            for (var j = 0; j < response.data[i].medicineName.length; j++) {
                html1 += '<div class="row">' +
                    '<li >' +
                    '<div class="col-sm-6"> Name : ' + response.data[i].medicineName[j].name + '</div>' +
                    '<div class="col-sm-6"> Quantity : ' +
                    response.data[i].medicineName[j].quantity + '</div>' +
                    '</li>' +
                    '</div>'
            }
            html += '<div class="filstudent"><div class="col-md-4">' +
                '<div class="box box-primary">' +
                '<div class="box-body box-profile">' +
                '<img class="profile-user-img img-responsive img-circle" src="/image/patient.png" alt="User profile picture">' +
                '<h3 class="profile-username text-center"><a href="#studentinformation" onclick="showStudent(' + response.data[i].idnumber + ');">' + response.data[i].patientName + '</a></h3>' +
                '<p class="text-muted text-center">' + response.data[i].idnumber + '</p>' +
                '<ul class="list-group list-group-unbordered">' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Email</b> <div class="pull-right">anuj96sri@gmail.com</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Diseases Name</b> <div class="pull-right">' + response.data[i].diseases + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<center> <b style="color:#2C3E50">Medicine Information</b> </center>' +
                '</a>' +
                '<a class="list-group-item"><ol>' + html1 +
                '</ol></a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Date</b> <div class="pull-right">' + response.data[i].dateFormat.datenum+ '/'+response.data[i].dateFormat.month +'/'+response.data[i].dateFormat.year+'  '+response.data[i].dateFormat.dayName + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Compunder : </b>' + response.data[i].givenbyname +
                '</div>' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Doctor : </b>Amresh Kumar' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div></div>'
        }
        document.getElementById('printStudent').innerHTML = html;
    });
}

function showEmployees() {
    axios.get('/patient/employeeInformation/').then(function(response) {
        var html = '';
        for (var i = 0; i < response.data.length; i++) {
            var html1 = '';
            for (var j = 0; j < response.data[i].medicineName.length; j++) {
                html1 += '<div class="row">' +
                    '<li>' +
                    '<div class="col-sm-6"> Name : ' + response.data[i].medicineName[j].name + '</div>' +
                    '<div class="col-sm-6"> Quantity : ' +
                    response.data[i].medicineName[j].quantity + '</div>' +
                    '</li>' +
                    '</div>'
            }
            html += '<div class="filstudent"><div class="col-md-4">' +
                '<div class="box box-primary">' +
                '<div class="box-body box-profile">' +
                '<img class="profile-user-img img-responsive img-circle" src="/image/patient.png" alt="User profile picture">' +
                '<h3 class="profile-username text-center">' + response.data[i].patientName + ' </h3>' +
                '<p class="text-muted text-center">' + response.data[i].idnumber + '</p>' +
                '<ul class="list-group list-group-unbordered">' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Email</b> <div class="pull-right">anuj96sri@gmail.com</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Diseases Name</b> <a href="#" class="pull-right">' + response.data[i].diseases + '</a>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<center> <b style="color:#2C3E50">Medicine Information</b> </center>' +
                '</a>' +
                '<a class="list-group-item"><ol>' + html1 +
                '</ol></a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Date</b> <div class="pull-right">' + response.data[i].date + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Compunder : </b>' + response.data[i].givenbyname +
                '</div>' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Doctor : </b>Amresh Kumar' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div></div><hr>'
        }
        document.getElementById('employeeInformation').innerHTML = html;
    });
}




window.onload = function() {
    axios.get('/compounder/allmedicine').then(function(response) {
        var dataPoints1 = [];
        var dataPoints2 = [];
        var dataPoints3 = [];
        var maximum;
        var max = [];
        var minimum = response.data[0].medicineName;
        var len = response.data.length;
        document.getElementById('medNumber').innerHTML = len;
        
        for (var i = 0; i < len; i++) {
            var medicine1 = {};
            var medicine2 = {};
            var medicine3 = {};
            medicine1.label = response.data[i].medicineName;
            medicine3.label = response.data[i].medicineName;
            medicine3.y = response.data[i].price;
            medicine1.y = response.data[i].medicineQuantity;
            medicine2.y = response.data[i].quantity;
            dataPoints1.push(medicine1);
            dataPoints2.push(medicine2);
            dataPoints3.push(medicine3);
            max.push(response.data[i].medicineQuantity);
        }
        maximum = max[0];
        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Ordered and In Stock Medicine"
            },
            axisY: {
                title: "Ordered Quantity - Units",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC",
                maximum : maximum
            },
            axisY2: {
                title: "In Stock - Units",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E",
                maximum : maximum
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                    type: "column",
                    name: "Ordered Quantity",
                    showInLegend: true,
                    yValueFormatString: "#,##0.# Units",
                    dataPoints: dataPoints1

                },
                {
                    type: "column",
                    name: "In Stock",
                    axisYType: "secondary",
                    showInLegend: true,
                    yValueFormatString: "#,##0.# Units",
                    dataPoints: dataPoints2
                }
            ]
        });
        chart.render();

        function toggleDataSeries(e) {
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }

        var chart2 = new CanvasJS.Chart("chartContainer3", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Medicines name and its Prices"
            },
            data: [{
                type: "column",
                dataPoints: dataPoints3
            }]
        });
        chart2.render();
    });
}

function showGraph() {
}


(function() {
    // Connect to socket.io
    var socket = io();
    // Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...');
        var table = document.getElementById("targettable1");
        var table1 = document.getElementById("targettable2");
        var allPatients = document.getElementById("allpatients");
        var row;
        var cell1;
        var cell2;
        var cell3;
        // Handle Output
        socket.on('output', function(data) {
            if (data.length) {
                for (var x = 0; x < data.length; x++) {
                    console.log("name : " + data[x].patientName)
                    if (data[x].patientType == "Student") {
                        
                        row = table.insertRow(1);
                        cell1 = row.insertCell(0);
                        cell2 = row.insertCell(1);
                        cell3 = row.insertCell(2);
                        cell1.innerHTML = data[x].patientName;
                        cell2.innerHTML = data[x].idnumber;
                        cell3.innerHTML = data[x].patientEmail;
                    } else {
                        row = table1.insertRow(1);
                        cell1 = row.insertCell(0);
                        cell2 = row.insertCell(1);
                        cell3 = row.insertCell(2);
                        cell1.innerHTML = data[x].patientName;
                        cell2.innerHTML = data[x].idnumber;
                        cell3.innerHTML = data[x].patientEmail;
                    }
                }
            } //if end
        });

        socket.on('output1', function(data) {
            
            if (data.length) {
                allPatients.innerHTML = data.length;
            } //if end
        });
        var textarea = document.getElementById('todoInsert');
        textarea.addEventListener('keydown', function(event) {
            if (event.which === 13 && event.shiftKey == false) {
                // Emit to server input
                var todo = textarea.value;
                socket.emit('todoInput', {
                    todo: todo
                });
                event.preventDefault();
            }
        });

        socket.on('todoOutput', function(data) {
            var todoList = document.getElementById('todoList');
            if (data.length) {
                var html = '';
                for (var x = 0; x < data.length; x++) {
                    console.log("added item is : " + data[x].todo);
                }
            } //if end
        });
    }
})();

// function addTodo() {

//     console.log("todo is  : " + todo);
//     // Connect to socket.io
//     try {
//         var socket = io();
//     } catch (err) {
//         console.log("error is here");
//         console.log(err.message)
//     }
//     // Check for connection
//     if (socket !== undefined) {
//         console.log(socket);
//         console.log('Connected to socket...');
//         // Emit to server input
//         socket.emit('todoInput', {
//             todo : todo
//         });

//         socket.on('todoOutput', function(data) {
//             if (data.length) {
//                 for (var x = 0; x < data.length; x++) {
//                     console.log("added item is : " + data[x].todo);
//                 }
//             } //if end
//         });
//     }    
// }

function showStudent(rollnumber) {
    axios.post('/student/studentinfo', { rollnum: rollnumber }).then(function(response) {
        Swal.fire({
            title: '<strong>Student Record</strong>',
            type: 'info',
            html: '<ul class="list-group">' +
                '<li class="list-group-item">Name : ' + response.data.name + ' </li>' +
                '<li class="list-group-item">Roll No. : ' + response.data.rollnum + ' </li>' +
                '<li class="list-group-item">Email : ' + response.data.email + '</li>' +
                '<li class="list-group-item">Mobile No. : ' + response.data.phone + ' </li>' +
                '<li class="list-group-item">Program : ' + response.data.program + ' </li>' +
                '<li class="list-group-item">Branch : ' + response.data.branch + ' </li>' +
                '<li class="list-group-item"><center></center><b> Address</b></li>' +
                '<li class="list-group-item"> Room No. ' + response.data.address.block + '-' + response.data.address.roomNum + '   Hall Of Residence ' + response.data.address.hallno + '</li>' +
                '</ul>',
            showConfirmButton: true,
        })
    })
}

var id;
var changepassword = document.getElementById('change-Password');
changepassword.addEventListener('submit', changePass);

function changePass(e) {
    e.preventDefault();
    var id = document.getElementById('compounderId').value;
    console.log("id is : " + id);
    var password = document.getElementById('changePass').value;
    var changeConPass = document.getElementById('changeConPass').value;
    if (password != changeConPass) {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Password and Confirm Password should be same!',
        })
    } else {
        axios.put('/users/changePassword/' + id, {
            password: password
        }).then(function(response) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Password has been updated',
                showConfirmButton: false,
                timer: 2000
            })
        });
    }
}

var changepassworddean = document.getElementById('change-Passworddean');
changepassworddean.addEventListener('submit', changePassDean);

function changePassDean(e) {
    e.preventDefault();
    var id = '{{user_id}}';
    var password = document.getElementById('changePassd').value;
    var changeConPass = document.getElementById('changeConPassd').value;
    if (password != changeConPass) {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Password and Confirm Password should be same!',
        })
    } else {
        axios.put('/users/changePassword/{{user._id}}', {
            password: password
        }).then(function(response) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Your password has been updated',
                showConfirmButton: false,
                timer: 2000
            })
            
        });
    }
}

function changePassComp(id) {
    console.log("Compunder is : " + id);
    document.getElementById('compounderId').value = id;
}

function changePassword() {
    var d = document.getElementById('changePasswordbox');
    d.style.display = "block";
}

function getAllStudents(branch) {
    window.location.href = "#admin/#allStudents";
    axios.get('/student/allstudents/').then(function(response) {
        var codeBlock = '';
        for (var i = 0; i < response.data.length; i++) {
            codeBlock += '<div class="filstudent"><div class="col-md-4 col-sm-6">' +
                '<div class="box box-primary">' +
                '<div class="box-body box-profile">' +
                '<img class="profile-user-img img-responsive img-circle" src="/image/patient.png" alt="User profile picture">' +
                '<h3 class="profile-username text-center"><a href="#studentinformation">' + response.data[i].name + '</a></h3>' +
                '<p class="text-muted text-center">' + response.data[i].rollnum + '</p>' +
                '<ul class="list-group list-group-unbordered">' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Email</b> <div class="pull-right">' + response.data[i].email + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Contact No.</b> <div class="pull-right">' + response.data[i].phone + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<div class="row">' +
                '<div class="col-md-6 col-sm-6 col-xs-6">' +
                '<b style="color:#2C3E50">Program : </b>' + response.data[i].program +
                '</div>' +
                '<div class="col-md-6 col-sm-6 col-xs-6">' +
                '<b style="color:#2C3E50">Branch : </b>' + response.data[i].branch + '</div>' +
                '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<center> <b style="color:#2C3E50">Address</b> </center>' +
                '</a>' +
                '<a class="list-group-item">' +
                'Room No. ' + response.data[i].address.block + '-' + response.data[i].address.roomNum + ' Hall of Residence ' + response.data[i].address.hallno + '</a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div></div>'

        }
        document.getElementById("wrappers").innerHTML = codeBlock;
        var filter = {};
        if(branch!= undefined){
            filter.branch= branch;
            students = response.data.filter(function(item) {
                for (var key in filter) {
                    if (item[key] === undefined || item[key] != filter[key])
                        return false;
                }
                return true;
            });
            var codeBlock = '';
            for (var i = 0; i < students.length; i++) {
                codeBlock += '<div class="filstudent"><div class="col-md-4 col-sm-6">' +
                    '<div class="box box-primary">' +
                    '<div class="box-body box-profile">' +
                    '<img class="profile-user-img img-responsive img-circle" src="/image/patient.png" alt="User profile picture">' +
                    '<h3 class="profile-username text-center"><a href="#studentinformation">' + students[i].name + '</a></h3>' +
                    '<p class="text-muted text-center">' + students[i].rollnum + '</p>' +
                    '<ul class="list-group list-group-unbordered">' +
                    '<a class="list-group-item">' +
                    '<b style="color:#2C3E50">Email</b> <div class="pull-right">' + students[i].email + '</div>' +
                    '</a>' +
                    '<a class="list-group-item">' +
                    '<b style="color:#2C3E50">Contact No.</b> <div class="pull-right">' + students[i].phone + '</div>' +
                    '</a>' +
                    '<a class="list-group-item">' +
                    '<div class="row">' +
                    '<div class="col-md-6 col-sm-6 col-xs-6">' +
                    '<b style="color:#2C3E50">Program : </b>' + students[i].program +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6 col-xs-6">' +
                    '<b style="color:#2C3E50">Branch : </b>' + students[i].branch + '</div>' +
                    '</div>' +
                    '</a>' +
                    '<a class="list-group-item">' +
                    '<center> <b style="color:#2C3E50">Address</b> </center>' +
                    '</a>' +
                    '<a class="list-group-item">' +
                    'Room No. ' + students[i].address.block + '-' + students[i].address.roomNum + ' Hall of Residence ' + students[i].address.hallno + '</a>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div></div>'
            }
            document.getElementById("wrappercse").innerHTML = codeBlock;
            document.getElementById("wrapperece").innerHTML = codeBlock;
        }
    })
}
function cseStudent(branch){
    console.log("Branch is : " + branch);
    getAllStudents(branch);
}

function getAllMedicines(){
    window.location.href = "#admin/#allMedicines";
}

function setLimit(id,medicineQuantity){
    document.getElementById('medicineId').value = id;
}

var setlimit = document.getElementById('set-Limit');
setlimit.addEventListener('submit', setLimitMedi);

function setLimitMedi(e) {
    e.preventDefault();
    var id = document.getElementById('medicineId').value;
    var limit = document.getElementById('limit').value;
    axios.put('/compounder/setlimit/' + id, {
        limit : limit
    }).then(function(response) {
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Limit has been set',
            showConfirmButton: false,
            timer: 2000
        })
        window.location.href= "/usertype";        
    });  
}
