const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');
// clean
const del = require('del');
// less
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
// html
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');
// js
const babel = require('gulp-babel');
const webpackStream = require('webpack-stream');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
// browserSync
const browserSync = require('browser-sync').create();
// error
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
// map
const sourcemaps = require('gulp-sourcemaps');

/**
 * clean
 */
const clean = () => {
    return del('build');
}
exports.clean = clean;

/**
 * copy
 */
const copy = () => {
    return src([
            'src/fonts/*.+(woff|woff2|ttf)*',
            'src/img/*.+(png|jpg|svg|webp|ico|gif|JPG)*',
            'src/favicon.ico'
        ], {
            base: 'src'
        })
        .pipe(dest('build'));
}
exports.copy = copy;

const copy_script = () => {
    return src('src/scripts/*.js')
        .pipe(dest('build/js'));
}
exports.copy_script = copy_script;

const copy_css = () => {
    return src('src/css/*.css')
        .pipe(dest('build/css'));
}
exports.copy_css = copy_css;

/**
 * less
 */
const lessToCss = () => {
    return src('src/less/style.less')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Less',
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
        .pipe(gcmq())
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(dest('build/css'))
        .pipe(browserSync.stream());
}
exports.lessToCss = lessToCss;

/**
 * html
 */
const htmlTo = () => {
    return src('src/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'html',
                    message: err.message
                }
            })
        }))
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({
            removeComments: false,
            collapseWhitespace: true
        }))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}
exports.htmlTo = htmlTo;

/**
 * scripts
 */
// const scripts = () => {
//   return src('./src/js/main.js')
//     .pipe(plumber({
//       errorHandler: notify.onError(function (err) {
//         return {
//           title: 'js',
//           message: err.message
//         }
//       })
//     }))
//     .pipe(webpackStream({
//       output: {
//         filename: 'main.js',
//       },
//       module: {
//         rules: [{
//           test: /\.m?js$/,
//           exclude: /(node_modules|bower_components)/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env']
//             }
//           }
//         }]
//       }
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write())
//     .pipe(dest('build/js'))
//     .pipe(browserSync.stream());
// }
// exports.scripts = scripts;

const scripts = () => {
    return src('src/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'js',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js', {
            newLine: ';'
        }))
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
        .pipe(sourcemaps.write())
        .pipe(dest('build/js'))
        .pipe(browserSync.stream());
}
exports.scripts = scripts;

/**
 * browserSync
 */
const server = () => {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    });

    watch('src/less/**/*.less', lessToCss);
    watch('src/*.html', htmlTo);
    watch(['src/fonts/*.{woff, woff2, ttf}*', 'src/img/*.+(png|jpg|svg|webp|ico|gif|JPG)*', ], copy);
    watch('src/scripts/*.js', copy_script);
    watch('src/css/*.css', copy_css);
    watch('src/js/**/*.js', scripts);
}
exports.server = server;

/**
 * default
 */
exports.default = series(clean, parallel(copy, copy_script, copy_css, lessToCss, scripts, htmlTo), server);

/**
 * images
 */
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');


// svg
const setSprite = () => {
    return src(['resource/svg/*.svg'])
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(dest('resource/svg/'));
}
exports.setSprite = setSprite;

const cleanSprite = () => {
    return del('resource/svg/sprite.svg');
}
exports.cleanSprite = cleanSprite;

exports.sprite = series(cleanSprite, setSprite);

// webp_convert
const webp_convert = () => {
    return src(['src/img/*.+(png|jpg)'])
        .pipe(webp())
        .pipe(dest('src/img/'));
}
exports.webp_convert = webp_convert;

// opti_img
const opti_img = () => {
    return src(['src/img/**/**'])
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(dest('src/img/'));
}
exports.opti_img = opti_img;


const opti_svg = () => {
    return src(['resource/svg/*.svg'])
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{
                removeViewBox: true
            }]
        }))
        .pipe(dest('resource/svg/'));
}
exports.opti_svg = opti_svg;

/**
 * fonts
 */
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

const fonts = () => {
    src(['resource/fonts/*.ttf'])
        .pipe(dest('src/fonts/'));
    src(['resource/fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(dest('src/fonts/'));
    return src(['resource/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(dest('src/fonts/'));
}
exports.fonts = fonts;

/**
 * build
 */
/**
 * less to build
 */

const lessToCssBuild = () => {
    return src('src/less/style.less')
        .pipe(less())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(gcmq())
        .pipe(csso())
        .pipe(dest('build/css'))
}
exports.lessToCssBuild = lessToCssBuild;

/**
 * scripts to build
 */
const scriptsBuild = () => {
    return src('src/js/*.js')
        .pipe(concat('main.js', {
            newLine: ';'
        }))
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
        .pipe(dest('build/js'))
}
exports.scriptsBuild = scriptsBuild;

// const scriptsBuild = () => {
//   return src('./src/js/main.js')
//     .pipe(webpackStream({
//       output: {
//         filename: 'main.js',
//       },
//       module: {
//         rules: [{
//           test: /\.m?js$/,
//           exclude: /(node_modules|bower_components)/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env']
//             }
//           }
//         }]
//       }
//     }))
//     .pipe(dest('build/js'));
// }
// exports.scriptsBuild = scriptsBuild;

/**
 * html to build
 */
const htmlToBuild = () => {
    return src('src/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({
            removeComments: false,
            collapseWhitespace: true
        }))
        .pipe(dest('build'))
}
exports.htmlToBuild = htmlToBuild;

exports.build = series(clean, parallel(copy, copy_script, copy_css, lessToCssBuild, scriptsBuild, htmlToBuild));
