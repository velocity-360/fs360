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
                './public/css/bootstrap.css',
                './public/css/themify-icons.css',
                './public/css/flexslider.css',
                './public/css/lightbox.min.css',
                './public/css/ytplayer.css',
                './public/css/theme-gunmetal.css',
                './public/css/custom.css',
                './public/css/google-fonts.css',
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('copy-lightbox', function(){
    return gulp.src(
            ['./public/img/lightbox/**']
        )
        .pipe(gulp.dest('./public/dist/img/lightbox/'))
})

gulp.task('copy', ['copy-fonts', 'copy-lightbox'], function(){})


gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/js/jquery.min.js',
                './public/js/bootstrap.min.js',
                './public/js/flexslider.min.js',
                './public/js/lightbox.min.js',
                './public/js/masonry.min.js',
                './public/js/spectragram.min.js',
                './public/js/ytplayer.min.js',
                './public/js/countdown.min.js',
                './public/js/smooth-scroll.min.js',
                './public/js/parallax.js',
                './public/js/scripts.js',
    		]
    	)
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/'))
});

gulp.task('watch', function() {
//    gulp.watch(['./public/app/ServerApp.js', './public/app/*/**.js', './public/app/*/*/**.js'], ['es6-es5']);
    gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js'], ['es6-es5'])
})

gulp.task('prod', ['es6-es5', 'build', 'css', 'copy'], function(){})

gulp.task('default', ['es6-es5', 'build', 'css', 'copy', 'watch'], function(){})

