var gulp = require("gulp"),
    concat = require("gulp-concat"),
    minify = require('gulp-minify');

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(concat("main.js", {
      newLine: ";"
    }))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      exclude: ['tasks']
    }))
    .pipe(gulp.dest("build/js"));
});
