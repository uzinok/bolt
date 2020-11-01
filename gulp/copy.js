var gulp = require("gulp");

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/*.{woff, woff2}*",
    "src/img/*.+(png|jpg|svg|webp|ico|gif)*",
  ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("copy_script", function (){
  return gulp.src("src/scripts/*.js")
    .pipe(gulp.dest("build/js"));
})

gulp.task("copy_css", function (){
  return gulp.src("src/css/*.css")
    .pipe(gulp.dest("build/css"));
})