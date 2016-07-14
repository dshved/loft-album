var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  svgSprite	 = require('gulp-svg-sprite'),
  sass = require('gulp-sass');

gulp.task('sass', function () {
  return sass('./public/css/**/*.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

var svg_config = {
  shape : {
    id : {
      generator : "icon-%s"
    }
  },
  mode : {
    symbol : {
      prefix : "%s",
      sprite : "bg-sprite.svg",
      render : { scss : true },
      example : true
    }
  }
};

gulp.task('svg', function () {
  gulp.src('.**/*.svg', {cwd: './public/img/svg'})
    .pipe(svgSprite(svg_config)).on('error', function(error){
      console.log(error + " error");
  })
    .pipe(gulp.dest('./public/img/svg'));
});


gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch('./public/js/**/*.js', ['lint']);
});


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'svg',
  'sass',
  'develop',
  'watch'
]);
