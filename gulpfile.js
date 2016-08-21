// including plugins
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    to5 = require('gulp-6to5');


gulp.task('es6-es5', function(){
	return gulp.src([
				'./public/app/ServerApp.js',
				'./public/app/*/**.js',
				'./public/app/*/*/**.js'
			]
		)
		.pipe(to5())
		.pipe(gulp.dest('./public/build/es5/'));
});

gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/custom.css',
                './public/css/bootstrap.css',
                './public/css/style.css',
                './public/css/dark.css',
                './public/css/font-icons.css',
                './public/css/animate.css',
                './public/css/magnific-popup.css',
                './public/css/font-awesome.min.css',
                './public/css/components/pricing-table.css',
                './public/css/responsive.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/build/css/'))
});

gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/js/jquery.js',
				'./public/js/plugins.js',
				'./public/js/functions.js',
                './public/js/lpform.js'
    		]
    	)
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('watch', function() {
    gulp.watch(['./public/app/ServerApp.js', './public/app/*/**.js', './public/app/*/*/**.js'], ['es6-es5']);
});

gulp.task('default', ['es6-es5', 'build', 'css', 'watch'], function(){});