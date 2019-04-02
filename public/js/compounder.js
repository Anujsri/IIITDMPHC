window.location.href = "#compounder/#addPatients"
 
window.onload = function() {

}

function changePassword() {
    var d = document.getElementById('changePasswordbox');
    d.style.display = "block";
}

var automedicinename = [];
var automediciquan = [];
var autoroll = [];
axios.get('/compounder/allmedicine/').then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].quantity > 0) {
            automedicinename.push(response.data[i].medicineName);
            automediciquan.push(response.data[i].quantity);
        }
    }
});
axios.get('/student/getroll/').then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
        autoroll.push(response.data[i].rollnum);
    }
});
autocomplete(document.getElementById("medicineName0"), automedicinename, automediciquan);
autocomplete(document.getElementById("employeemedicineName0"), automedicinename, automediciquan);
autocompleteRoll(document.getElementById("rollnumber"), autoroll);
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
    axios.put('/compounder/editprofile/{{compounder._id}}', {
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

var id = '{{compounder._id}}';
var compounderName = '{{compounder.name}}';
var addstuden = document.getElementById('add-student');
addstuden.addEventListener('submit', addStudent);

function addStudent(e) {
    // Prevent actual submit
    e.preventDefault();
    var rollNumber = document.getElementById('rollnumber').value;
    var rollnumber = Number(rollNumber);
    var diseases = document.getElementById('diseases').value;
    var count = document.getElementById('count').value;
    var doctorName = document.getElementById('doctorName').value;
    var patientType = "Student";
    var counter = 0;
    var medicineName = [];
    var medicineQuantity = [];
    if (count === undefined) {
        var medicine = document.getElementById("medicineName0").value;
        var quantity = document.getElementById("medicineQuantity0").value;
        medicineName.push(medicine);
        medicineQuantity.push(quantity);
    } else {
        for (var i = 0; i <= count; i++) {
            var medicine = document.getElementById("medicineName" + i).value;
            var quantity = document.getElementById("medicineQuantity" + i).value;
            medicineName.push(medicine);
            medicineQuantity.push(quantity);
        }
    }
    var sts;
    // Connect to socket.io
    try {
        var socket = io();
    } catch (err) {
        console.log(err.message)
    }
    // Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...');
        // Clear Message    
        axios.post('/student/getStudent', { rollnumber: rollnumber }).then(function(response) {
            var patientName = response.data.name;
            var patientEmail = response.data.email;
            var phone = response.data.phone;
            var status = document.getElementById('comments');
            var statusDefault = status.textContent;
            var setStatus = function(s) {
                // Set status
                status.textContent = s;
                if (s !== statusDefault) {
                    var delay = setTimeout(function() {
                        setStatus(statusDefault);
                    }, 4000);
                }
            }
            socket.on('status', function(data) {
                // get message status
                setStatus((typeof data === 'object') ? data.message : data);
                // If status is clear, clear text
                if (data.clear) {
                    // textarea.value = '';
                }
            });
            // Emit to server input
            socket.emit('input', {
                patientName: patientName,
                patientEmail: patientEmail,
                idnumber: rollnumber,
                medicineName: medicineName,
                medicineQuantity: medicineQuantity,
                diseases: diseases,
                patientType: patientType,
                id: id,
                name: compounderName,
                doctorName: doctorName,
                phone: response.data.phone
            });
            window.location.href = "#allPatient";
            allPatient();
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Your gave medicine to ' + patientName,
                showConfirmButton: false,
                timer: 2000
            })
        })
    }
    document.getElementById('doctorName').value = '';
    document.getElementById('rollnumber').value = '';
    document.getElementById('diseases').value = '';
    document.getElementById("medicineName0").value = '';
    document.getElementById("medicineQuantity0").value = '';
    for (var i = 0; i <= count; i++) {
        document.getElementById("medicineName" + i).value = '';
        document.getElementById("medicineQuantity" + i).value = '';
    }
}

var addemployee = document.getElementById('add-employee');
addemployee.addEventListener('submit', addEmployee);

function addEmployee(e) {
    // Prevent actual submit
    e.preventDefault();
    var employeeName = document.getElementById('employeeName').value;
    var pfnumber = document.getElementById('pfnumber').value;
    var employeediseases = document.getElementById('employeediseases').value;
    var employeeEmail = document.getElementById('employeeEmail').value;
    var employeecount = document.getElementById('employeecount').value;
    var doctorName = document.getElementById('employeedoctorName').value;
    var phone = document.getElementById('phone').value;
    var patientType = "Employee";
    var counter = 0;
    if (phone.length < 10) {
        var message = document.getElementById('errorMessages');
        document.getElementById('errPhone').innerHTML = "Mobile No. should have 10 numbers";
        errorMessages.style.display = "block";
    } else {
        var employeemedicineName = [];
        var employeemedicineQuantity = [];
        if (employeecount === undefined) {
            var medicine = document.getElementById("employeemedicineName0").value;
            var quantity = document.getElementById("employeemedicineQuantity0").value;
            employeemedicineName.push(medicine);
            employeemedicineQuantity.push(quantity);
        } else {
            for (var i = 0; i <= employeecount; i++) {
                var medicine = document.getElementById("employeemedicineName" + i).value;
                var quantity = document.getElementById("employeemedicineQuantity" + i).value;
                employeemedicineName.push(medicine);
                employeemedicineQuantity.push(quantity);
            }
        }
        var sts;
        // Connect to socket.io
        try {
            var socket = io();
        } catch (err) {
          
            console.log(err.message)
        }
        // Check for connection
        if (socket !== undefined) {
            console.log('Connected to socket...');
            // Clear Message    
            var status = document.getElementById('comments');
            var statusDefault = status.textContent;
            var setStatus = function(s) {
                // Set status
                status.textContent = s;
                if (s !== statusDefault) {
                    var delay = setTimeout(function() {
                        setStatus(statusDefault);
                    }, 4000);
                }
            }
            socket.on('status', function(data) {
                // get message status
                setStatus((typeof data === 'object') ? data.message : data);
                // If status is clear, clear text
                if (data.clear) {
                    // textarea.value = '';
                }
            });
            // Emit to server input
            socket.emit('input', {
                patientName: employeeName,
                idnumber: pfnumber,
                medicineName: employeemedicineName,
                medicineQuantity: employeemedicineQuantity,
                diseases: employeediseases,
                patientEmail: employeeEmail,
                patientType: patientType,
                id: id,
                name: compounderName,
                doctorName: doctorName,
                phone: phone
            });
        }
        allPatient();
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your gave medicine to ' + patientName,
            showConfirmButton: false,
            timer: 2000
        })
        document.getElementById('employeeName').value = '';
        document.getElementById('pfnumber').value = '';
        document.getElementById('employeediseases').value = '';
        document.getElementById("employeemedicineName0").value = '';
        document.getElementById("employeemedicineQuantity0").value = '';
        document.getElementById('employeeEmail').value = '';
        document.getElementById('employeedoctorName').value = '';
        document.getElementById('phone').value = '';
        for (var i = 0; i <= employeecount; i++) {
            document.getElementById("employeemedicineName" + i).value = '';
            document.getElementById("employeemedicineQuantity" + i).value = '';
        }
    }
}


var addMedicine = document.getElementById('add-medicine');
addMedicine.addEventListener('submit', addMedicines);

function addMedicines(e) {
    // Prevent actual submit
    e.preventDefault();
    var medicineName = document.getElementById('amedicineName').value;
    var medicinePrice = document.getElementById('amedicinePrice').value;
    var medicineQuantity = document.getElementById('amedicineQuantity').value;
    var companyName = document.getElementById('companyName').value;
    axios.post('/compounder/addMedicine/{{compounder._id}}', {
        medicineName: medicineName,
        medicineQuantity: medicineQuantity,
        companyName: companyName,
        price: medicinePrice
    }).then(function(response) {
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Medicine has been addded',
            showConfirmButton: false,
            timer: 2000
        })
        allPatient();
        document.getElementById('amedicineName').value = '';
        document.getElementById('amedicineQuantity').value = '';
        document.getElementById('companyName').value = '';
        document.getElementById('amedicineName').value = '';
    });
}


function getAllMedicines() {
    window.location.href = "#compounder/#allMedicines";
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
    window.location.href = "#compounder/#profile";
}

function allPatient() {
    window.location.href = "#compounder/#allPatient";
    $("#studentInformation").load(window.location.href + " #studentInformation");
    $("#employeeInformation").load(window.location.href + " #employeeInformation");
}

function addPatients() {
    window.location.href = "#compounder/#addpatient";
}

function caddMedicine() {
    window.location.href = "#compounder/#addmedicine";
}

function showAnalytics() {
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
    window.location.href = "#compounder/#graphs";
}

function autocomplete(inp, arrmed, arrquan) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        var count2 = 0;
        /*for each item in the array...*/
        for (i = 0; i < arrmed.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            var str = arrmed[i];
            var quan = arrquan[i];
            if (str.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                count2++;
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + str.substr(0, val.length) + "</strong>";
                b.innerHTML += str.substr(val.length) + " " + "<div class='pull-right' style='padding-top : 0px'>In hand : " + "<b>" + quan + "</b>" + "</div>";
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + str + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var ind = arrmed.indexOf(inp.value);
                    var maxinput = document.getElementById('medicineQuantity0');
                    maxinput.setAttribute('max', arrquan[ind]);
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                var showdisable = document.getElementById('showdisable');
                var hideSubmit = document.getElementById('show');
                var employeeshowdisable = document.getElementById('employeeshowdisable');
                var hideSubmitemployee = document.getElementById('employeeshow');
                hideSubmit.style.display = "block";
                showdisable.style.display = "none";
                hideSubmitemployee.style.display = "block";
                employeeshowdisable.style.display = "none";
            }

        }
        if (count2 === 0) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>No Medicine found with this name</strong>";
            a.appendChild(b);
            var showdisable = document.getElementById('showdisable');
            var hideSubmit = document.getElementById('show');
            hideSubmit.style.display = "none";
            showdisable.style.display = "block";

        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}


function autocompleteRoll(inp, arrmed) {

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        var count2 = 0;
        /*for each item in the array...*/
        for (i = 0; i < arrmed.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            var str = arrmed[i].toString();
            if (str.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                count2++;
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + str.substr(0, val.length) + "</strong>";
                b.innerHTML += str.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + str + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }

        if (count2 === 0) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>Roll Number Found</strong>";
            a.appendChild(b);
            document.getElementById("rollnumber").value = "";
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}