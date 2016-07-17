'use strict';

module.exports = function() {
	$.gulp.task('js.process', function() {

		return $.browserify('./public/js/main.js').bundle()
			.pipe($.vinyl('app.js'))
			.pipe($.buffer())
			.pipe($.gp.uglify())
			.pipe($.gulp.dest('./public/js'));

		// return $.gulp.src($.path.app)
		// 	.pipe(browserified)
		// 	// .pipe($.gp.sourcemaps.init())
		// 	// .pipe($.gp.concat('app.js'))
		// 	// .pipe($.gp.sourcemaps.write())
		// 	// .pipe($.gp.uglify())
		// 	.pipe($.gulp.dest($.config.root + '/assets/js'))
	})
};
