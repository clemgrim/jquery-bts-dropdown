var gulp   	   = require('gulp'),
	uglify     = require('gulp-uglify'),
	ignore     = require('gulp-ignore'),
	rimraf     = require('gulp-rimraf'),
	rename     = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber	   = require('gulp-plumber'),
	watch 	   = require('gulp-watch'),
	jshint	   = require('gulp-jshint'),
	reporter   = require('jshint-stylish'),
	livereload = require('gulp-livereload'),
	project    = 'jquery-bts-dropdown',
	mainfile   = project + '.js';

gulp.task('watch', ['js'], function(){
	gulp.watch(mainfile, ['js']);

	gulp.src([mainfile, './test/index.html'])
	  	.pipe(watch())
	  	.pipe(livereload());
});

gulp.task('js', function(){
	gulp.src(mainfile)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter(reporter))
		.pipe(jshint.reporter('fail'))
		.pipe(sourcemaps.init())
		.pipe(uglify({mangle: true}))
		.pipe(sourcemaps.write())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('./'));
});

gulp.task('server', function(){
	require('opn')('http://localhost/' + project + '/test');
});

gulp.task('default', ['server', 'watch']);