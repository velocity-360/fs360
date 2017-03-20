


$(document).ready(function() {

	// Easy pie chart
	$('.easypie-success').easyPieChart({
		scaleColor: false,
		trackColor: 'rgba(0,0,0,0.035)',
		barColor: '#81c784',
		lineWidth: 8,
		lineCap: 'butt',
		size: 80
	});
	$('.easypie-warning').easyPieChart({
		scaleColor: false,
		trackColor: 'rgba(0,0,0,0.035)',
		barColor: '#f6bb42',
		lineWidth: 8,
		lineCap: 'butt',
		size: 80
	});
	$('.easypie-danger').easyPieChart({
		scaleColor: false,
		trackColor: 'rgba(0,0,0,0.035)',
		barColor: '#ef5350',
		lineWidth: 8,
		lineCap: 'butt',
		size: 80
	});
	$('.easypie-info').easyPieChart({
		scaleColor: false,
		trackColor: 'rgba(0,0,0,0.035)',
		barColor: '#4fc3f7',
		lineWidth: 8,
		lineCap: 'butt',
		size: 80
	});

	// Morris Area Chart
	// Resize functions
	MorrisAreaChart();
	$(window).resize(function() {
		if($('#morris-hero-area').length) {
			window.MorrisAreaChart.redraw();
		}
	});


	// Sparkline Chart
	$(function() {
		var sparkDash01 = function() {
			$('.spark-dash-01').sparkline(
				[1,8,5,7,4,4,1],
				{
					type: 'line',
					width: '100%',
					height: '38',
					lineColor: '#ffffff',
					spotColor: '#ffffff',
					minSpotColor: '#ffffff',
					maxSpotColor: '#ffffff',
					fillColor: 'transparent',
				}
				);
		}
		var sparkDash02 = function() {
			$('.spark-dash-02').sparkline(
				[8,7,5,7,9,10,3],
				{
					type: 'line',
					width: '100%',
					height: '38',
					lineColor: '#ffffff',
					spotColor: '#ffffff',
					minSpotColor: '#ffffff',
					maxSpotColor: '#ffffff',
					fillColor: 'transparent',
				}
				);
		}
		var sparkDash03 = function() {
			$('.spark-dash-03').sparkline(
				[1,9,5,7,9,2,8],
				{
					type: 'line',
					width: '100%',
					height: '38',
					lineColor: '#ffffff',
					spotColor: '#ffffff',
					minSpotColor: '#ffffff',
					maxSpotColor: '#ffffff',
					fillColor: 'transparent',
				}
				);
		}

		// Responsive function for sparkline chart
		var refreshSparkDash01;
		var refreshSparkDash02;
		var refreshSparkDash03;

		$(window).resize(function(e) {
			clearTimeout(refreshSparkDash01);
			clearTimeout(refreshSparkDash02);
			clearTimeout(refreshSparkDash03);

			refreshSparkDash01 = setTimeout(sparkDash01, 500);
			refreshSparkDash02 = setTimeout(sparkDash02, 500);
			refreshSparkDash03 = setTimeout(sparkDash03, 500);
		});

		sparkDash01();
		sparkDash02();
		sparkDash03();
	});

});


// Morris Area Chart
function MorrisAreaChart() {
	if($('#morris-hero-area').length) {
		  window.MorrisAreaChart = Morris.Area({
			element: 'morris-hero-area',
                padding: 10,
                behaveLikeLine: true,
                gridEnabled: false,
                gridLineColor: '#e1e8ed',
                axes: true,
                fillOpacity: .7,
                // grid: false,
                data: [
                	{period: '2017-01',roosa: 600,manook: 600,weet: 600},
                    {period: '2017-02',roosa: 1778,manook: 7294,weet: 12441},
                    {period: '2017-03',roosa: 4912,manook: 12969,weet: 3501},
                    {period: '2017-04',roosa: 3767,manook: 3597,weet: 5701},
                    {period: '2017-05',roosa: 6420,manook: 1822,weet: 2303},
                    {period: '2017-06',roosa: 5670,manook: 4293,weet: 1881},
                    {period: '2017-07',roosa: 4820,manook: 3795,weet: 1588},
                    {period: '2017-08',roosa: 25073,manook: 5967,weet: 5175},
                    {period: '2017-09',roosa: 17687,manook: 25460,weet: 18028},
                    {period: '2017-10',roosa: 20140,manook: 10123,weet: 15042},
                    ],
                lineColors: ['#b2ddb4', '#81c784', '#50b154'],
                xkey: 'period',
                ykeys: ['roosa', 'manook', 'weet'],
                labels: ['Roosa UI', 'Manook UI', 'Weet Landing'],
                pointSize: 0,
                lineWidth: 0,
                hideHover: 'auto'
		});
	}
}

// Chart js Doughnut
if($('#chart-donut').length) {
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

	var chartJsDashDonut = {
		datasets: [{
		    data: [
		        '1547',
		        '855',
		        '241',
		    ],
		    backgroundColor: [
		        window.chartColors.primary,
		        window.chartColors.warning,
		        window.chartColors.danger,
		    ],
		    label: 'My dataset' // for legend
		}],
		labels: [
		    "WordPress",
		    "HTML",
		    "Muse",
		]
	};

	window.onload = function() {
		var ctxDashDonut = document.getElementById("chart-donut").getContext("2d");
		window.myDoughnutChart = new Chart(ctxDashDonut, {
		    type: 'doughnut',
		    data: chartJsDashDonut,
		    animation:{
		        animateScale:true
		    },
		    options: {
		        responsive: true,
		        legend: {
		            position: 'bottom',
		        },
		        title: {
		            display: false,
		        }
		    }
		});
	}
}