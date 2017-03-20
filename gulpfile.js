// including plugins
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    to5 = require('gulp-6to5')


gulp.task('es6-es5', function(){
	return gulp.src([
                './src/serverapp.js',
                './src/*/**.js',
                './src/*/*/**.js'
			]
		)
		.pipe(to5())
		.pipe(gulp.dest('./public/dist/es5/'))
});

gulp.task('css', function(){
    return gulp.src(
            [            
                './public/css/base.css',
                './public/css/DateTimePicker.css',
                './public/css/owl.carousel.css',
                './public/css/owl.theme.default.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/css/fontello/**']
        )
        .pipe(gulp.dest('./public/dist/css/fontello/'))
})

gulp.task('copy-lightbox', function(){
    return gulp.src(
            ['./public/img/lightbox/**']
        )
        .pipe(gulp.dest('./public/dist/img/lightbox/'))
})

//gulp.task('copy', ['copy-fonts', 'copy-lightbox'], function(){})
gulp.task('copy', ['copy-fonts'], function(){})


gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/js/jquery-1.11.2.min.js',
                './public/js/common_scripts_min.js',
                './public/js/functions.js',
                './public/js/DateTimePicker.js',
                './public/js/theia-sticky-sidebar.js',
                './public/js/sidebar-config.js',
                './public/js/sweetalert.min.js',
                './public/js/velocity360.js',
                './public/js/tutorials.js'
    		]
    	)
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/'))
});

gulp.task('dashboard-css', function(){
    return gulp.src(
            [       
                './public/dash/dist/css/vendor/bootstrap.min.css',
                './public/dash/dist/icons/entypo/entypo.min.css',
                './public/dash/dist/icons/fa/css/font-awesome.min.css',
                './public/dash/dist/icons/flag-icon/css/flag-icon.min.css',
                './public/dash/dist/icons/material-icon/material-icon.min.css',
                './public/dash/dist/icons/weather-icon/css/weather-icons.min.css',
                './public/dash/dist/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css',
                './public/dash/dist/plugins/datatable/datatables.min.css',
                './public/dash/dist/plugins/datepicker/css/datepicker.min.css',
                './public/dash/dist/plugins/medium-editor/css/medium-editor.min.css',
                './public/dash/dist/plugins/medium-editor/css/themes/bootstrap.min.css',
                './public/dash/dist/plugins/morris/morris.min.css',
                './public/dash/dist/plugins/prettify/themes/tomorrow-night.min.css',
                './public/dash/dist/plugins/selectize/css/selectize.min.css',
                './public/dash/dist/plugins/sortable/sortable.min.css',
                './public/dash/dist/plugins/stepy/jquery.stepy.min.css',
                './public/dash/dist/plugins/pace/pace.css',
                './public/dash/dist/plugins/summernote/summernote.min.css',
                './public/dash/dist/css/bootstrap.custom.css',
                './public/dash/dist/css/style.css',
                './public/dash/dist/css/helper.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/dash/css/'))
})

gulp.task('copy-dash-entypo', function(){
    return gulp.src(
            ['./public/dash/dist/icons/entypo/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/dash/css/fonts/'))
})

gulp.task('copy-dash-fonts', function(){
    return gulp.src(
            [
                './public/dash/dist/css/fonts/**',
                './public/dash/dist/icons/entypo/fonts/**',
                './public/dash/dist/icons/fa/fonts/**'
            ]
        )
        .pipe(gulp.dest('./public/dist/dash/fonts/'))
})

gulp.task('dashboard-build', function(){
    return gulp.src(
            [
                './public/dash/dist/js/vendor/modernizr.min.js',
                './public/dash/dist/js/vendor/jquery.min.js',
                './public/dash/dist/js/vendor/bootstrap.min.js',
                './public/dash/dist/js/vendor/raphael.min.js',
                './public/dash/dist/plugins/nicescroll/jquery.nicescroll.min.js',
                './public/dash/dist/plugins/ismobile/isMobile.min.js',
                './public/dash/dist/plugins/blockui/blockui.min.js',
                './public/dash/dist/plugins/prettify/prettify.min.js',
                './public/dash/dist/plugins/clipboard/clipboard.min.js',
                './public/dash/dist/plugins/filestyle/bootstrap-filestyle.min.js',
                './public/dash/dist/plugins/pace/pace.min.js',
                './public/dash/dist/js/apps.js',
                './public/dash/dist/js/layout-default.js'
            ]
        )
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/dash/js/'))
});

gulp.task('dash', ['dashboard-css', 'copy-dash-entypo', 'copy-dash-fonts', 'dashboard-build'], function(){})


gulp.task('watch', function() {
    gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['es6-es5', 'build'])
})

gulp.task('prod', ['es6-es5', 'build', 'css', 'copy', 'dash'], function(){})

gulp.task('default', ['es6-es5', 'build', 'css', 'copy', 'dash', 'watch'], function(){})

