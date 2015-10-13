'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
var jshint = require('gulp-jshint');
var minify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

// Generic App start up function
var start = function(environment) {
	return function() {
		nodemon({
			script: 'server.js',
			ext: '*.js',
			env: {
				PORT: 80,
				NODE_ENV: environment
			},
			ignore: ['./node_modules/**']
		}).on('restart', function() {

		});
	};
};

// Startup tasks
gulp.task('start-dev', start('development'));
gulp.task('start-test', start('test'));
gulp.task('start-prod', start('production'));

// JSHint tasks
gulp.task('lint', function() {
	gulp.src(['*.js', '**/**/**/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('compressapp', function() {
	// App
	gulp.src('./app/*.js')
		.pipe(minify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./app'));
	// Controllers
	gulp.src('./app/controllers/*.js')
		.pipe(minify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./app/controllers'));
	// Services
	gulp.src('./app/services/*.js')
		.pipe(minify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./app/services'));
	// App Styles
	gulp.src('./app/styles/*.css')
		.pipe(minifycss())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./app/styles'));
});

// Copy and minify dependencies
gulp.task('deps', ['copy', 'compress']);

// Copy dependencies to /app/lib directory
gulp.task('copy', function() {
	gulp.src([
		// Angular
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-resource/angular-resource.js',
		// Bootstrap
		'node_modules/bootstrap/dist/js/bootstrap.js',
		// jQuery
		'node_modules/jquery/dist/jquery.js',
		// Formly
		'node_modules/angular-formly/dist/formly.js',
		'node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
		'node_modules/api-check/dist/api-check.js'
	])
	.pipe(gulp.dest('./app/lib/js'));

	gulp.src([
		// Bootstrap
		'node_modules/bootstrap/dist/css/bootstrap.css',
		// Font Awesome
		'node_modules/font-awesome/css/font-awesome.css'
	])
	.pipe(gulp.dest('./app/lib/css'));
	
	gulp.src([
		// Fonts
		'node_modules/font-awesome/fonts/**'
	])
	.pipe(gulp.dest('./app/lib/fonts'));
});

// Minify
gulp.task('compress', ['compressjs', 'compresscss']);

// Minify JavaScript
gulp.task('compressjs', function() {
	// Compress dependencies
	gulp.src(['./app/lib/js/*.js', '!./app/lib/js/*.min.js'])
		.pipe(minify())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('./app/lib/js'));
});

// Minify CSS
gulp.task('compresscss', function() {
	// Compress dependencies
	gulp.src(['./app/lib/css/*.css', '!./app/lib/css/*.min.css'])
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./app/lib/css'));
});

// Test tasks
gulp.task('test', ['test-unit', 'test-integration']);

gulp.task('test-integration', ['set-env'] , function() {
	gulp.src('tests/integration/*.js', { read: false })
		.pipe(mocha({reporter: 'spec' }));
});

gulp.task('test-unit', ['set-env'], function() {
	gulp.src('tests/unit/*.js', { read: false })
		.pipe(mocha({reporter: 'spec' }));
});

gulp.task('set-env', function() {
	env({
		vars: {
			NODE_ENV: 'mock'
		}
	});
});
