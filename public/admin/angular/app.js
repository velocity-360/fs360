
var modules = [
    'EmailModule', 
    'DuplicatesModule', 
    'ScrapeModule', 
    'CourseModule',
    'CoursesModule',
    'SeriesModule',
    'GeneralServiceModule',
    'RestServiceModule',
    'UploadServiceModule',
    'AccountServiceModule'
];

var app = angular.module('FullStack360Admin', modules, function($interpolateProvider) {
    // set custom delimiters for angular templates
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});


app.directive('spinner', function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startSpinner: '=spin'
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var opts = {
              lines: 13,
              length: 20,
              width: 10,
              radius: 30,
              corners: 1,
              rotate: 0,
              direction: 1,
              color: '#fff',
              speed: 1,
              trail: 60,
              shadow: false,
              hwaccel: false,
              className: 'spinner',
              zIndex: 2e9
            };
            var spinner = new Spinner(opts);
            scope.$watch('startSpinner', function (startSpinner) {
                if (startSpinner) {
                    spinner.spin(element[0]);
                } 
                else {
                    spinner.stop();
                }
            });
        }
    }
});


app.directive('knob', function() {
    return {
        restrict: 'A',
        replace: false,
        scope: {
            knobValue: '=time'
        },
        link: function (scope, element, attrs) {
            scope.$watch('knobValue', function (knobValue) {
                element.knob({
                    'format': function (v) {
                        return v + " min";
                    }
                });
                element.val(knobValue).trigger('change');
            });
        }
    }
});


