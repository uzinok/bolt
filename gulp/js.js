var gulp = require("gulp"),
  concat = require("gulp-concat"),
  minify = require('gulp-minify'),
  babel = require('gulp-babel');

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(concat("main.js", {
      newLine: ";"
    }))
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      },
      exclude: ['tasks']
    }))
    .pipe(gulp.dest("build/js"));
});