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
      removeComments: false,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});
