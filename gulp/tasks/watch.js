'use strict';

module.exports = function() {
	$.gulp.task('watch', function() {
		$.gulp.watch('./public/js/**/*.js', $.gulp.series('js.lint'));
		$.gulp.watch('./public/css/**/*.sass', $.gulp.series('sass'));
		// $.gulp.watch('./app/views/**/*.jade').on('change', $.gp.browserSync.reload());
		$.gulp.watch('./public/img/**/*.*', $.gulp.series('copy.image'));
		// $.gulp.watch('./public/img/sprites/svg/*.svg', $.gulp.series('sprites_svg'));
	});
};
