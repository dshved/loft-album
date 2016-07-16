'use strict';

global.$ = {
	package: require('./package.json'),
	config: require('./gulp/config'),
	path: {
		task: require('./gulp/paths/tasks.js'),
		app: require('./gulp/paths/app.js')
	},
	gulp: require('gulp'),
	browserSync: require('browser-sync').create(),
	gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	// 'sprites_svg',
    'nodemon',
	$.gulp.parallel(
		'sass',
		'js.lint'
		),
	$.gulp.parallel(
		'watch',
		'serve'
		)
	));
