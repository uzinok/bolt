const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');

// clean
const del = require('del');
// rename
const rename = require('gulp-rename');
// sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// browserSync
const browserSync = require('browser-sync').create();

// styles
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

// scripts
const babel = require('gulp-babel');
const minify = require('gulp-minify');

// html
const htmlmin = require('gulp-htmlmin');

const paths = {
    clean: 'dest',
    styles: {
        src: 'src/styles/*.less',
        watch: 'src/styles/**/*.less',
        dest: 'dest/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        watch: 'src/scripts/**/*.js',
        dest: 'dest/scripts/'
    },
    html: {
        src: 'src/**/*.html',
        watch: 'src/**/*.html',
        dest: 'dest/'
    }
}

// clean
function clean() {
    return del(paths.clean);
}

// copy
function copy() {
    return src([
            "./src/fonts/*.{woff2,woff}",
            "./src/*.ico",
            "./src/img/**/*.{svg,jpg,jpeg,png,webp,avif}",
            "./src/favicons/*",
            "./src/*.webmanifest"
        ], {
            base: "./src"
        })
        .pipe(dest("./dest"));
}

// styles
function styles() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// scripts
function scripts() {
    return src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// html
// http://mozilla.github.io/nunjucks/
function html() {
    return src(paths.html.src)
        .pipe(htmlmin({
            removeComments: false,
            collapseWhitespace: true
        }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// watch
function watchFiles() {
    watch(paths.styles.watch, styles)
    watch(paths.scripts.watch, scripts)
    watch(paths.html.watch, html)
}

// server
function server() {
    browserSync.init({
        server: {
            baseDir: './dest/'
        }
    });

    watchFiles();
}

// clean
exports.clean = clean;
// copy
exports.copy = copy;
// styles
exports.styles = styles;
// watchFiles
exports.watchFiles = watchFiles;
// scripts
exports.scripts = scripts;
// html
exports.html = html;
// server
exports.server = server;

exports.build = series(clean, copy, parallel(styles, scripts, html))

exports.default = series(clean, copy, parallel(scripts, styles, html), server);

/**
 * Дополнительные задачи
 */
// img
const squoosh = require('gulp-libsquoosh');
const svgSprite = require('gulp-svg-sprite');
// fonts
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

// img
function optiImg() {
    return src("./src/img/**/*.{png,jpg}", {
            base: 'src'
        })
        .pipe(squoosh())
        .pipe(dest("src/"))
}

function createWebp() {
    return src("./src/resource/img/**/*.{jpg,png}")
        .pipe(
            squoosh({
                webp: {}
            })
        )
        .pipe(dest("./src/img"));
}

function createAvif() {
    return src("./src/resource/img/**/*.{jpg,png}")
        .pipe(
            squoosh({
                avif: {}
            })
        )
        .pipe(dest("./src/img"));
}

function sprite() {
    return src("./src/resource/svg/*.svg")
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(dest("./src/img"));
}

// fonts
function fonts() {
    src(['src/resource/fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(dest('src/fonts/'));
    return src(['src/resource/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(dest('src/fonts/'));
}

// createWebp
exports.createWebp = createWebp;
// createAvif
exports.createAvif = createAvif;
// optiImg
exports.optiImg = optiImg;
// sprite
exports.sprite = sprite;
// fonts
exports.fonts = fonts;
