'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	scss = require('gulp-sass'),
	ngAnnotate = require('gulp-ng-annotate'),
	webserver = require('gulp-webserver');

gulp.task('css-vendor', function () {
	gulp.src([
		'app/bower_components/bootstrap/dist/css/bootstrap.css',
		'app/bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'app/bower_components/angular/angular-csp.css'
	])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('app/css/_concat'));
});

gulp.task('css-vendor-prod', function () {
	gulp.src([
		'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
		'app/bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
		'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'app/bower_components/angular/angular-csp.css'
	])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('build/css/_concat'));
});

gulp.task('scss', function () {
	gulp.src('app/css/scss/**/*.scss')
	.pipe(scss())
	.pipe(concat('all-sass.css'))
	.pipe(gulp.dest('app/css'));
});

gulp.task('css', function () {
	gulp.src([
		'app/css/**/*.css',
		'!app/css/scss/**/*.*',
		'!app/css/_concat/**/*.*'
	])
		.pipe(concat('app.css'))
		.pipe(gulp.dest('app/css/_concat'));
});

gulp.task('css-prod', ['scss'], function () {
	gulp.src([
		'app/css/**/*.css',
		'!app/css/scss/**/*.*',
		'!app/css/_concat/**/*.*'
	])
		.pipe(concat('app.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('build/css/_concat'));
});

gulp.task('js-vendor', function () {
	gulp.src([
		'app/bower_components/angular/angular.js',
		'app/bower_components/angular-ui-router/release/angular-ui-router.js',
		'app/bower_components/jquery/dist/jquery.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'app/bower_components/firebase/firebase-debug.js',
		'app/bower_components/angularfire/dist/angularfire.js'
	])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('app/js/_concat'));
});

gulp.task('js-vendor-prod', function () {
	gulp.src([
		'app/bower_components/angular/angular.min.js',
		'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'app/bower_components/jquery/dist/jquery.min.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
		'app/bower_components/firebase/firebase.js',
		'app/bower_components/angularfire/dist/angularfire.min.js'
	])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('build/js/_concat'));
});

gulp.task('js', function () {
	gulp.src([
		'app/js/**/*.js',
		'app/components/**/*.js',
		'!app/js/_concat/**/*.*',
		'!app/**/*_test.js'
	])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app/js/_concat'));
});

gulp.task('js-prod', function () {
	gulp.src([
		'app/js/**/*.js',
		'app/components/**/*.js',
		'!app/js/_concat/**/*.*',
		'!app/**/*_test.js'
	])
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('build/js/_concat'));
});

gulp.task('watch', function () {
	gulp.watch('app/css/scss/**/*.scss', ['scss', 'css']);
	gulp.watch('app/css/**/*.css', ['scss', 'css']);
	gulp.watch('app/**/*.js', ['js']);
});

gulp.task('webserver', function () {
	gulp.src('app')
		.pipe(webserver({
			port: 8088,
			livereload: true,
			open: true
		}));
});

gulp.task('webserver-prod', function () {
	gulp.src('build')
		.pipe(webserver({
			port: 8088,
			livereload: true,
			open: true
		}));
});

gulp.task('default', [
	'css-vendor',
	'scss',
	'css',
	'js-vendor',
	'js',
	'watch',
	'webserver'
]);

gulp.task('html-prod', function () {
	gulp.src('app/**/*.html')
		.pipe(gulp.dest('build'));
});

gulp.task('build', [
	'css-vendor-prod',
	'css-prod',
	'js-vendor-prod',
	'js-prod',
	'html-prod',
	'webserver-prod'
]);


