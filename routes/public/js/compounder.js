
function showAnalytics() {
    axios.get('/compounder/allmedicine').then(function(response) {
        var dataPoints1 = [];
        var dataPoints2 = [];
        var dataPoints3 = [];
        var maximum;
        var max = [];
        var minimum = response.data[0].medicineName;
        var len = response.data.length;
        
        
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

