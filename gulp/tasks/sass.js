'use strict';

module.exports = function() {
	$.gulp.task('sass', function() {
		return $.gulp.src('./public/css/app.sass')
		.pipe($.gp.sourcemaps.init())
		.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
		.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
		.pipe($.gp.sourcemaps.write())
		.pipe($.gulp.dest('./public/css'))
		.pipe($.browserSync.stream());
	})
};
