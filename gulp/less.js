var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    less = require("gulp-less"),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require("gulp-csso"),
    notify = require("gulp-notify"),
    sourcemaps = require('gulp-sourcemaps'),
    server = require("browser-sync");

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
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// В зависимости от операционной системы уведомления от notify могут не отображаться на рабочем столе