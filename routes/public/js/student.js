window.location.href = "#student/profile";
'{{#if student.completed}}'
var rollNumber = '{{student.rollnum}}';
var res = rollNumber.substring(0, 4);
document.getElementById('batch').innerHTML = "Batch " + res;
var editForm = document.getElementById('edit-student');
editForm.addEventListener('submit', editStudent);

function editStudent(e) {
    // Prevent actual submit
    e.preventDefault();
    var name = document.getElementById('inputName').value;
    var phone = document.getElementById('inputPhone').value;
    var rollnum = document.getElementById('inputRoll').value;
    var hallno = document.getElementById('ehall').value;
    var block = document.getElementById('eblock').value;
    var roomNum = document.getElementById('eroomNum').value;
    var program = document.getElementById('eprogram').value;
    var branch = document.getElementById('ebranch').value;
    if (phone.length) {
        swal.fire({
            title: '{{error}}',
            text: "Mobile No. should have 10 digit",
            showConfirmButton: false,
            timer: 2000,
            type: "error"
        });
    } else {
        axios.put('/student/editprofile/{{student._id}}', {
            name: name,
            phone: phone,
            rollnum: rollnum,
            hallno: hallno,
            block: block,
            roomNum: roomNum,
            program: program,
            branch: branch
        }).then(function(response) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Your profile has been changed',
                showConfirmButton: false,
                timer: 2000
            })
            $("#here1").load(window.location.href + " #here1");
        });
    }
}

function getActivity() {
    window.location.href = "#student/medicalrecord";
    var rollNumberstu = '{{student.rollnum}}';
    axios.post('/patient/getactivity', { idnumber: rollNumberstu }).then((response) => {
        var codeBlock = '';
        for (var i = 0; i < response.data.length; i++) {
            var html1 = '';
            var day;
            var monthnum;
            if (response.data[i].dateFormat.datenum < 10) {

                day = "0" + response.data[i].dateFormat.datenum;

            } else {
                day = response.data[i].dateFormat.datenum;
            }
            if (response.data[i].dateFormat.month < 10) {
                monthnum = "0" + response.data[i].dateFormat.month;

            } else {
                monthnum = response.data[i].dateFormat.month;
            }

            for (var j = 0; j < response.data[i].medicineName.length; j++) {
                html1 += '<div class="row">' +
                    '<li >' +
                    '<div class="col-sm-7 col-xs-7">' + response.data[i].medicineName[j].name + '</div>' +
                    '<div class="col-sm-5 col-xs-5"> Qty : ' +
                    response.data[i].medicineName[j].quantity + '</div>' +
                    '</li>' +
                    '</div>'
            }
            codeBlock += '<div class="col-md-4 col-sm-6 col-xs-12">' +
                '<div class="box box-primary">' +
                '<div class="box-body box-profile">' +
                '<img class="profile-user-img img-responsive img-circle" src="/image/medicine.png" alt="User profile picture"><br>' +
                '<ul class="list-group list-group-unbordered">' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Diseases Name</b> <div class="pull-right">' + response.data[i].diseases + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<center> <b style="color:#2C3E50">Medicine Information</b> </center>' +
                '</a>' +
                '<a class="list-group-item"><ol>' + html1 +
                '</ol></a>' +
                '<a class="list-group-item">' +
                '<b style="color:#2C3E50">Date</b> <div class="pull-right">' + day + '/' + monthnum + '/' + response.data[i].dateFormat.year + '  ' + response.data[i].dateFormat.dayName + '</div>' +
                '</a>' +
                '<a class="list-group-item">' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Compunder : </b>' + response.data[i].givenbyname +
                '</div>' +
                '<div class="col-md-6">' +
                '<b style="color:#2C3E50">Doctor : </b>' + response.data[i].doctorName + '</div>' +
                '</div>' +
                '</a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>'
        }
        document.getElementById('record').innerHTML = codeBlock;
    })
}

'{{else}}'
var addForm = document.getElementById('add-student');
addForm.addEventListener('submit', addStudent);

function addStudent(e) {
    // Prevent actual submit
    e.preventDefault();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var rollnum = document.getElementById('roomNum').value;
    var hallno = document.getElementById('hall').value;
    var block = document.getElementById('block').value;
    var roomNum = document.getElementById('roomNum').value;
    var program = document.getElementById('program').value;
    var branch = document.getElementById('branch').value;
    if (phone.length<10) {
        swal.fire({
            title: '{{error}}',
            text: "Mobile No. should have 10 digit",
            showConfirmButton: false,
            timer: 2000,
            type: "error"
        });
    } else {
        axios.post('/student/completeprofile/{{user._id}}', {
            name: name,
            phone: phone,
            rollnum: rollnum,
            hallno: hallno,
            block: block,
            roomNum: roomNum,
            program: program,
            branch: branch
        }).then(function(response) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Your profile has been saved',
                showConfirmButton: false,
                timer: 2000
            })
            $("#here1").load(window.location.href + " #here1");
        });
    }
}
'{{/if}}'

function getDoctor() {
    window.location.href = '#student/doctors';
}

function getCompounder() {
    window.location.href = '#student/nursingstaff';
}
