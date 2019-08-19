var gulp = require("gulp"),
    posthtml = require("gulp-posthtml"),
    include = require("posthtml-include"),
    htmlmin = require("gulp-htmlmin");

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

// В зависимости от операционной системы уведомления от notify могут не отображаться на рабочем столе