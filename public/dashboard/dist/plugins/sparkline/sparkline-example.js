 $(function() {

    /* Use 'html' instead of an array of values to pass options 
    to a sparkline with data in the tag */
    var SparkPrimary          = '#4a89dc',
        SparkPrimaryLight     = '#b1ccf0',
        SparkSuccess          = '#81c784',
        SparkSuccessLight     = '#d6edd7',
        SparkInfo             = '#4fc3f7',
        SparkInfoLight        = '#c4ebfc',
        SparkWarning          = '#f6bb42',
        SparkWarningLight     = '#fce5b7',
        SparkDanger           = '#ef5350',
        SparkDangerLight      = '#f9c1c0',
        SparkWhite            = '#ffffff',
        SparkDarken           = 'rgba(0,0,0,0.2)',
        SparkLighten          = 'rgba(255,255,255,0.4)';

    $('.spark-pie').sparkline('html', {
        type: 'pie', 
        sliceColors: [SparkPrimary,
                     SparkSuccess,
                     SparkInfo,
                     SparkWarning,
                     SparkDanger]
    });

    $('.spark-bar-primary').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        barColor: SparkPrimary,
        negBarColor: SparkPrimaryLight,
    });

    $('.spark-bar-success').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        barColor: SparkSuccess,
        negBarColor: SparkSuccessLight,
    });

    $('.spark-bar-info').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        barColor: SparkInfo,
        negBarColor: SparkInfoLight,
    });

    $('.spark-bar-warning').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        barColor: SparkWarning,
        negBarColor: SparkWarningLight,
    });

    $('.spark-bar-danger').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        barColor: SparkDanger,
        negBarColor: SparkDangerLight,
    });

    $('.spark-bar-zero-primary').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        zeroAxis: false,
        barColor: SparkPrimary,
        negBarColor: SparkPrimaryLight,
    });

    $('.spark-bar-zero-success').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        zeroAxis: false,
        barColor: SparkSuccess,
        negBarColor: SparkSuccessLight,
    });

    $('.spark-bar-zero-info').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        zeroAxis: false,
        barColor: SparkInfo,
        negBarColor: SparkInfoLight,
    });

    $('.spark-bar-zero-warning').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        zeroAxis: false,
        barColor: SparkWarning,
        negBarColor: SparkWarningLight,
    });

    $('.spark-bar-zero-danger').sparkline('html', {
        type: 'bar', 
        barWidth: 4,
        zeroAxis: false,
        barColor: SparkDanger,
        negBarColor: SparkDangerLight,
    });

    $('.spark-line-primary').sparkline('html', {
        type: 'line', 
        lineColor: SparkPrimary,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkLighten,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-line-success').sparkline('html', {
        type: 'line', 
        lineColor: SparkSuccess,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkLighten,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-line-info').sparkline('html', {
        type: 'line', 
        lineColor: SparkInfo,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkLighten,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-line-warning').sparkline('html', {
        type: 'line', 
        lineColor: SparkWarning,
        spotColor: SparkDanger,
        minSpotColor: SparkDanger,
        maxSpotColor: SparkDanger,
        fillColor: SparkLighten,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-line-danger').sparkline('html', {
        type: 'line', 
        lineColor: SparkDanger,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkLighten,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-filled-primary').sparkline('html', {
        type: 'line', 
        lineColor: SparkPrimary,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkPrimaryLight,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-filled-success').sparkline('html', {
        type: 'line', 
        lineColor: SparkSuccess,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkSuccessLight,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-filled-info').sparkline('html', {
        type: 'line', 
        lineColor: SparkInfo,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkInfoLight,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-filled-warning').sparkline('html', {
        type: 'line', 
        lineColor: SparkWarning,
        spotColor: SparkDanger,
        minSpotColor: SparkDanger,
        maxSpotColor: SparkDanger,
        fillColor: SparkWarningLight,
        drawNormalOnTop: false,
        width: '100px',
    });

    $('.spark-filled-danger').sparkline('html', {
        type: 'line', 
        lineColor: SparkDanger,
        spotColor: SparkWarning,
        minSpotColor: SparkWarning,
        maxSpotColor: SparkWarning,
        fillColor: SparkDangerLight,
        drawNormalOnTop: false,
        width: '100px',
    });



    // Demo from original site
    // Bar + line composite charts
    $('#compositebar').sparkline('html', { type: 'bar', barColor: '#aaf' });
    $('#compositebar').sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7], 
        { composite: true, fillColor: false, lineColor: 'red' });


    // Line charts taking their values from the tag
    $('.sparkline').sparkline();

    // Larger line charts for the docs
    $('.largeline').sparkline('html', 
        { type: 'line', height: '2.5em', width: '4em' });

    // Customized line chart
    $('#linecustom').sparkline('html', 
        {height: '1.5em', width: '8em', lineColor: '#f00', fillColor: '#ffa', 
        minSpotColor: false, maxSpotColor: false, spotColor: '#77f', spotRadius: 3});

    // Bar charts using inline values
    $('.sparkbar').sparkline('html', {type: 'bar'});

    $('.barformat').sparkline([1, 3, 5, 3, 8], {
        type: 'bar',
        tooltipFormat: '{{value:levels}} - {{value}}',
        tooltipValueLookups: {
            levels: $.range_map({ ':2': 'Low', '3:6': 'Medium', '7:': 'High' })
        }
    });

    // Tri-state charts using inline values
    $('.sparktristate').sparkline('html', {type: 'tristate'});
    $('.sparktristatecols').sparkline('html', 
        {type: 'tristate', colorMap: {'-2': '#fa7', '2': '#44f'} });

    // Composite line charts, the second using values supplied via javascript
    $('#compositeline').sparkline('html', { fillColor: false, changeRangeMin: 0, chartRangeMax: 10 });
    $('#compositeline').sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7], 
        { composite: true, fillColor: false, lineColor: 'red', changeRangeMin: 0, chartRangeMax: 10 });

    // Line charts with normal range marker
    $('#normalline').sparkline('html', 
        { fillColor: false, normalRangeMin: -1, normalRangeMax: 8 });
    $('#normalExample').sparkline('html', 
        { fillColor: false, normalRangeMin: 80, normalRangeMax: 95, normalRangeColor: '#4f4' });

    // Discrete charts
    $('.discrete1').sparkline('html', 
        { type: 'discrete', lineColor: 'blue', xwidth: 18 });
    $('#discrete2').sparkline('html', 
        { type: 'discrete', lineColor: 'blue', thresholdColor: 'red', thresholdValue: 4 });

    // Bullet charts
    $('.sparkbullet').sparkline('html', { type: 'bullet' });

    // Pie charts
    $('.sparkpie').sparkline('html', { type: 'pie', height: '1.0em' });

    // Box plots
    $('.sparkboxplot').sparkline('html', { type: 'box'});
    $('.sparkboxplotraw').sparkline([ 1, 3, 5, 8, 10, 15, 18 ], 
        {type:'box', raw: true, showOutliers:true, target: 6});

    // Box plot with specific field order
    $('.boxfieldorder').sparkline('html', {
        type: 'box', 
        tooltipFormatFieldlist: ['med', 'lq', 'uq'], 
        tooltipFormatFieldlistKey: 'field'
    });


});


//  $(function() {

//     var sparklineLogin = function() {
//         $('#adv-login-sparkline').sparkline(
//             [10,8,5,7,4,4,1],
//             {
//                 type: 'line',
//                 width: '100%',
//                 height: '100'
//             }
//             );
//     }
//     var refreshSparklines;
//     $(window).resize(function(e) {
//         clearTimeout(refreshSparklines);
//         refreshSparklines = setTimeout(sparklineLogin, 500);
//     });
//     sparklineLogin();
// });



