'use strict';

module.exports = function() {
	$.gulp.task('serve', function() {
		$.browserSync.init(null, {
      proxy: "http://localhost:3000",
      files: ["public/**/*.*"],
      port: 5000,
    });

		$.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css', './app/views/**/*.jade'], $.browserSync.reload);
	});

};
