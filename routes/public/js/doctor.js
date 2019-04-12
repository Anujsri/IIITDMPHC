window.location.href = "#compounder/#allMedicines"
window.onload = function() {
     axios.get('/compounder/allmedicine').then(function(response) {
        var dataPoints1 = [];
        var dataPoints2 = [];
        var dataPoints3 = [];
        var minimum = response.data[0].medicineName;
        var len = response.data.length;
        var maximum = response.data[len - 1].medicineName;
        for (var i = 0; i < len; i++) {
            var medicine1 = {};
            var medicine2 = {};
            var medicine3 = {};
            medicine1.label = response.data[i].medicineName;
            medicine1.label = response.data[i].medicineName;
            medicine1.y = response.data[i].medicineQuantity;
            medicine2.y = response.data[i].quantity;
            medicine3.label = response.data[i].medicineName;
            medicine3.y = response.data[i].price;
            dataPoints1.push(medicine1);
            dataPoints2.push(medicine2);
            dataPoints3.push(medicine3);
        }

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
            },
            axisY2: {
                title: "In Stock - Units",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E"
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

        var chart2 = new CanvasJS.Chart("chartContainer2", {
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

function changePassword() {
    var d = document.getElementById('changePasswordbox');
    d.style.display = "block";
}
'{{#if success_msg}}'
Swal.fire({
    position: 'top-end',
    type: 'success',
    title: '{{success_msg}}',
    showConfirmButton: false,
    timer: 2000
})
'{{/if}}'
 
var changepassword = document.getElementById('change-Password');
changepassword.addEventListener('submit', changePass);

function changePass(e) {
    e.preventDefault();
    var password = document.getElementById('changePass').value;
    var changeConPass = document.getElementById('changeConPass').value;
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
            var d = document.getElementById('changePasswordbox');
            d.style.display = "none";
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

function editProfile() {
    console.log("In edit profile");
    var name = document.getElementById('ename').value;
    var phone = document.getElementById('ephone').value;
    var address = document.getElementById('eaddress').value;
    var city = document.getElementById('ecity').value;
    var state = document.getElementById('estate').value;
    var zip = document.getElementById('ezip').value;
    axios.put('/doctor/editprofile/{{doctor._id}}', {
        name: name,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip
    }).then(function(response) {
        $("#here").load(window.location.href + " #here");
    });
}

function getAllMedicines() {
    window.location.href = "#doctor/#allMedicines";
    axios.get('/compounder/allmedicines/').then(function(response) {
        var codeBlock = '';
        for (var i = 0; i < response.data.length; i++) {
            codeBlock += '<div class="col-md-3 col-sm-4 col-xs-6">' +
                '<div class="box box-primary">' +
                '<div class="box-body box-profile">' +
                '<img class="profile-user-img img-responsive img-circle" src="/image/medicine.png" alt="User profile picture"><br>' +
                '<ul class="list-group list-group-unbordered">' +
                '<a href="#" class="list-group-item">' +
                '<b style="color : #566573">Company</b> <div class="pull-right">' + response.data[i].companyName + '</div>' +
                '</a>' +
                '<a href="#" class="list-group-item">' +
                '<b style="color : #566573">Medicine</b> <div class="pull-right">' + response.data[i].medicineName + '</div>' +
                '</a>' +
                '<a href="#" class="list-group-item">' +
                '<b style="color : #566573">Ordered Quantity</b> <div class="pull-right">' + response.data[i].medicineQuantity + '</div>' +
                '</a>' +
                '<a href="#" class="list-group-item">' +
                '<b style="color : #566573">In hand</b> <div class="pull-right">' + response.data[i].quantity + '</div>' +
                '</a>' +
                '<a href="#" class="list-group-item">' +
                '<b style="color : #566573">Price</b> <div class="pull-right">' + response.data[i].price + '</div>' +
                '</a>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>'
        }
        document.getElementById("wrappers").innerHTML = codeBlock;
    })
}

function myProfile() {
    window.location.href = "#doctor/#profile";
}

function allPatientstu() {
    window.location.href = "#doctor/#students";
    $("#studentInformation").load(window.location.href + " #studentInformation");
}

function allPatientemp() {
    window.location.href = "#doctor/#employee";
    $("#employeeInformation").load(window.location.href + " #employeeInformation");
}


function showAnalytics() {
    window.location.href = "#doctor/#graphs";
}