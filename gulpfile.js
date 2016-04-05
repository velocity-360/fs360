// including plugins

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

gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/js/jquery.js',
				'./public/js/plugins.js',
				'./public/js/functions.js'
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

gulp.task('default', ['es6-es5', 'build', 'watch'], function(){});