var gulp = require("gulp"),
    server = require("browser-sync");

gulp.task("server", function () {
  server.init({
    server: {baseDir: "./build"},
    injectChanges: true,
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/less/**/*.less", gulp.series("less")).on("change", server.stream);
  gulp.watch("src/js/*.js", gulp.series("js")).on("change", server.reload);
  gulp.watch("src/*.html", gulp.series("html")).on("change", server.reload);
  gulp.watch("src/template/*.html", gulp.series("html")).on("change", server.reload);
  gulp.watch("src/img/*.+(svg|png|jpg|webp)", gulp.series("copy")).on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "copy_script", "less", "js", "html",));
gulp.task("default", gulp.series("build", "server"));
