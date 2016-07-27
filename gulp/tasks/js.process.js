
'use strict';

/* global $ */
module.exports = function() {
  $.gulp.task('js.process', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.webpack({
        entry: $.path.app,
        output: {
          path: '/build/assets/js',
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
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};
