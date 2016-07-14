'use strict'

module.exports = function(){
  $.gulp.task('nodemon', function(cb){
    var started = false;

    return $.gp.nodemon({
      script: 'app.js'
    }).on('start', function () {
      // to avoid nodemon being started multiple times
      // thanks @matthisk
      if (!started) {
        cb();
        started = true;
      }
    });
  });
}
