$(document).ready(function() {
   
    $('#radioBtn a').on('click', function(){
       var sel = $(this).data('title');
       var tog = $(this).data('toggle');
       $('#'+tog).prop('value', sel);
    
       $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
       $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    })
 

 
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('.star').on('click', function() {
        $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function() {
        $(this).parents('tr').toggleClass('selected');
    });

    $("#myInputmed").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappers .col-md-3").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInputmedean").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappersmedicine .col-md-3").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#studentInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput1").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#studentInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput2").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#studentInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput3").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#studentInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput4").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput5").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput6").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput7").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .col-md-4").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput8").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#printStudent .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput9").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#printStudent .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput10").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#printStudent .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput11").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#printStudent .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput12").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput13").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput14").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput15").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#employeeInformation .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput16").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappers .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput17").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappers .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput18").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappercse .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput19").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappercse .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput20").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperece .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput21").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperece .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput22").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperme .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput23").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperme .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    
    $("#myInput24").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperdesign .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput25").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperdesign .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
  
    $("#myInput26").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappermechatronics .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput27").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrappermechatronics .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#myInput28").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperns .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput29").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#wrapperns .filstudent").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    $("#myInputmed").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    var count = 1;
    var count1 = 1;
    $("#btn2").click(function() {
        console.log("clicked on add more button");
        $("#more").append('</br> <div class="row"><div class="col-md-8 col-sm-8 col-xs-12"><input type="text" list="datalist"  class="form-control"  placeholder="Medicine Name"   required id="medicineName' + count + '"></div><div class="col-md-4 col-sm-4 col-xs-12"><input type="number"  class="form-control"  placeholder="Medicine quantity"   required id="medicineQuantity' + count + '"></div></div>');
        document.getElementById('count').value = count;
        var automedicinename = [];
        var automediciquan = [];
        console.log("Valuew of count : "+ count);
        axios.get('/compounder/allmedicine/').then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].quantity > 0) {
                    automedicinename.push(response.data[i].medicineName);
                    automediciquan.push(response.data[i].quantity);
                }
            }
        });
        autocomplete(document.getElementById("medicineName" + count), document.getElementById("medicineQuantity" + count), automedicinename, automediciquan);
        count++;
    });

    $("#btnremove").click(function() {
        $("#medicineName"+count).remove();
        $("#medicineQuantity"+count).remove();
        // $("#more").remove();
        document.getElementById('count').value = count;
        if(count!==1){
            count--;
        }
    });

    $("#btn3").click(function() {
        $("#employeemore").append('</br> <div class="row"><div class="col-md-8 col-sm-8 col-xs-12"><input type="text" class="form-control"  placeholder="Medicine Name"   required id="employeemedicineName' + count1 + '"></div><div class="col-md-4 col-sm-4 col-xs-12"><input type="number"  class="form-control"  placeholder="Medicine quantity"   required id="employeemedicineQuantity' + count1 + '"></div></div>');
        document.getElementById('employeecount').value = count1;
        var automedicinename = [];
        var automediciquan = [];
        axios.get('/compounder/allmedicine/').then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].quantity > 0) {
                    automedicinename.push(response.data[i].medicineName);
                    automediciquan.push(response.data[i].quantity);
                }
            }
        });
        autocomplete(document.getElementById("employeemedicineName" + count1), document.getElementById("employeemedicineQuantity" + count1), automedicinename, automediciquan);
        count1++;
    });

    $("#btnremove1").click(function() {
        $("#more").remove();
        document.getElementById('count').value = count1;
        count1--;
        console.log("Valuew of count : "+ count1);
    });

    function autocomplete(inp, medquan, arrmed, arrquan) {
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
                console.log("quantity : " + quan);
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
                        medquan.setAttribute('max', arrquan[ind]);
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                    var showdisable = document.getElementById('showdisable');
                    var hideSubmit = document.getElementById('show');
                    hideSubmit.style.display = "block";
                    showdisable.style.display = "none";
                }

            }
            if (count2 === 0) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>No Medicine found with this name</strong>";
                a.appendChild(b);
                // var showdisable = document.getElementById('showdisable');
                // var hideSubmit = document.getElementById('show');
                // hideSubmit.style.display = "none";
                // showdisable.style.display = "block";
                inp.value = "";
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
    
});

$(function() {
    $('input[type=file]').change(function() {
        var t = $(this).val();
        var labelText = 'File : ' + t.substr(12, t.length);
        $(this).prev('label').text(labelText);
    })
});
