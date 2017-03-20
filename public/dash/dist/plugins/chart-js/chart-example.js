Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.responsiveAnimationDuration = 0.5;

window.chartColors = {
	primary		: 'rgb(74, 137, 220)',
	success		: 'rgb(129, 199, 132)',
	info		: 'rgb(79, 195, 247)',
	warning		: 'rgb(246, 187, 66)',
	danger		: 'rgb(239, 83, 80)',
	grey		: 'rgb(231,233,237)'
};

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

var color 	= Chart.helpers.color;
var MONTHS 	= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var exampleChartData01 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        label: "My First dataset",
        backgroundColor: window.chartColors.grey,
        borderColor: window.chartColors.grey,
        data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
        fill: false,
    }, {
        label: "My Second dataset",
        fill: false,
        backgroundColor: window.chartColors.primary,
        borderColor: window.chartColors.primary,
        data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
    }]
};

var exampleChartData02 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
		label: "My First dataset",
		borderColor: window.chartColors.primary,
		backgroundColor: color(window.chartColors.primary).alpha(0.5).rgbString(),
		data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
	}, {
		label: "My Second dataset",
		borderColor: window.chartColors.success,
		backgroundColor: color(window.chartColors.success).alpha(0.5).rgbString(),
		data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
	}, {
		label: "My Third dataset",
		borderColor: window.chartColors.warning,
		backgroundColor: color(window.chartColors.warning).alpha(0.5).rgbString(),
		data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
	}, {
		label: "My Third dataset",
		borderColor: window.chartColors.danger,
		backgroundColor: color(window.chartColors.danger).alpha(0.5).rgbString(),
		data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
	}]
};

var exampleChartData03 = {
	datasets: [{
	    data: [
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	    ],
	    backgroundColor: [
	        color(chartColors.primary).alpha(0.5).rgbString(),
	        color(chartColors.success).alpha(0.5).rgbString(),
	        color(chartColors.warning).alpha(0.5).rgbString(),
	        color(chartColors.danger).alpha(0.5).rgbString(),
	        color(chartColors.info).alpha(0.5).rgbString(),
	    ],
	    label: 'My dataset' // for legend
	}],
	labels: [
	    "Ayam Penyet",
	    "Susu Jahe",
	    "Sego Kucing",
	    "Teh Anget",
	    "Mendoan",
	]
};

var exampleChartData04 = {
	datasets: [{
	    data: [
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	        randomScalingFactor(),
	    ],
	    backgroundColor: [
	        window.chartColors.primary,
	        window.chartColors.success,
	        window.chartColors.warning,
	        window.chartColors.danger,
	        window.chartColors.info,
	    ],
	    label: 'My dataset' // for legend
	}],
	labels: [
	    "Ayam Penyet",
	    "Susu Jahe",
	    "Sego Kucing",
	    "Teh Anget",
	    "Medoan",
	]
};

var exampleChartData05 = {
	labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
	datasets: [{
	    label: "My First dataset",
	    backgroundColor: color(window.chartColors.info).alpha(0.2).rgbString(),
	    borderColor: window.chartColors.info,
	    pointBackgroundColor: window.chartColors.info,
	    data: [
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor()
	    ]
	}, {
	    label: "My Second dataset",
	    backgroundColor: color(window.chartColors.warning).alpha(0.2).rgbString(),
	    borderColor: window.chartColors.warning,
	    pointBackgroundColor: window.chartColors.warning,
	    data: [
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor(), 
	        randomScalingFactor()
	    ]
	}]
};

window.onload = function() {

    var ctxLine = document.getElementById("chart-line").getContext("2d");
    window.myLine = new Chart(ctxLine, {
	    type: 'line',
	    data: exampleChartData01,
	    options: {
	        responsive: true,
	        title:{
	            display:true,
	            text:'Chart.js Line Chart'
	        },
	        tooltips: {
	            mode: 'index',
	            intersect: false,
	        },
	        hover: {
	            mode: 'nearest',
	            intersect: true
	        },
	        scales: {
	            xAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Month'
	                }
	            }],
	            yAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Value'
	                }
	            }]
	        }
	    }
    });

    var ctxLineStacked = document.getElementById("chart-line-stacked").getContext("2d");
    window.myLine = new Chart(ctxLineStacked, {
	    type: 'line',
	    data: exampleChartData02,
	    options: {
	        responsive: true,
	        title:{
	            display:true,
	            text:'Chart.js Line Chart - Stacked Area'
	        },
	        tooltips: {
	            mode: 'index',
	            intersect: false,
	        },
	        hover: {
	            mode: 'nearest',
	            intersect: true
	        },
	        scales: {
	            xAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Month'
	                }
	            }],
	            yAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Value'
	                }
	            }]
	        }
	    }
    });

    var ctxBar = document.getElementById("chart-bar").getContext("2d");
    window.myBar = new Chart(ctxBar, {
	    type: 'bar',
	    data: exampleChartData01,
	    options: {
	        responsive: true,
	        title:{
	            display:true,
	            text:'Chart.js Line Chart'
	        },
	        tooltips: {
	            mode: 'index',
	            intersect: false,
	        },
	        hover: {
	            mode: 'nearest',
	            intersect: true
	        },
	        scales: {
	            xAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Month'
	                }
	            }],
	            yAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Value'
	                }
	            }]
	        }
	    }
    });

    var ctxBarStacked = document.getElementById("chart-bar-stacked").getContext("2d");
    window.myBar = new Chart(ctxBarStacked, {
	    type: 'bar',
	    data: exampleChartData01,
	    options: {
	        responsive: true,
	        title:{
	            display:true,
	            text:'Chart.js Line Chart - Stacked Area'
	        },
	        tooltips: {
	            mode: 'index',
	            intersect: false,
	        },
	        hover: {
	            mode: 'nearest',
	            intersect: true
	        },
	        scales: {
	            xAxes: [{
	            	stacked: true,
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Month'
	                }
	            }],
	            yAxes: [{
	            	stacked: true,
	                display: true,
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Value'
	                }
	            }]
	        }
	    }
    });


    var ctxPolar = document.getElementById("chart-polar-area");
    window.myPolarArea = Chart.PolarArea(ctxPolar, {
	    data: exampleChartData03,
	    options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Polar Area Chart'
            },
            scale: {
              ticks: {
                beginAtZero: true
              },
              reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
	    }
    });


    var ctxPie = document.getElementById("chart-pie").getContext("2d");
    window.myPie = new Chart(ctxPie, {
        type: 'pie',
	    data: exampleChartData04,
	    options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Pie Chart'
            }
	    }
    });

    window.myRadar = new Chart(document.getElementById("chart-radar"), {
        type: 'radar',
	    data: exampleChartData05,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            },
            scale: {
              ticks: {
                beginAtZero: true
              }
            }
        }
    });

};