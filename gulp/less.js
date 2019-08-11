var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    less = require("gulp-less"),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require("gulp-csso"),
    notify = require("gulp-notify");


gulp.task("less", function () {
  return gulp.src("src/less/style.less")
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: "Less",
          message: err.message
        }
      })
    }))
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(gulp.dest("build/css"));
});