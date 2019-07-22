var gulp = require("gulp");
var plumber = require("gulp-plumber");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var csso = require("gulp-csso");


gulp.task("less", function () {
  return gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
});
