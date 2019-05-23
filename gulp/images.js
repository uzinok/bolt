var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var rename = require("gulp-rename");

gulp.task("sprite", function () {
  return gulp.src(["src/img/for_sprite/*.svg"])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("src/img/"));
});

gulp.task("opti_img", function () {
  return gulp.src(["src/img/**/**"])
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest("src/img/"));
});

gulp.task("webp_convert", function () {
  return gulp.src(["src/img/*.+(png|jpg)"])
    .pipe(webp({
      quality: 95
    }))
    .pipe(gulp.dest("src/img/"));
});
