
'use strict';

/* global $ */
module.exports = function() {
  $.gulp.task('js.process', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.webpack({
        entry: $.path.app,
        output: {
          filename: 'app.js'
        },
        devtool: 'cheap-source-map',
        module: {
          loaders: [
            {
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
      }))
      .pipe($.gulp.dest('./public/js'));
  });
};
