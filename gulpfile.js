const gulp = require("gulp");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const del = require("del");
const gulpWebpack = require("gulp-webpack");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const plumber = require("gulp-plumber");

const path = {
  root: "./build",
  templates: {
    src: "./src/assets/views/pages/*.pug",
    dest: "./build"
  },
  styles: {
    main: "./src/assets/styles/main.scss",
    src: "./src/assets/styles/**/*.scss",
    dest: "./build/styles"
  },
  scripts: {
    src: "./src/assets/scripts/*.js",
    dest: "./build/scripts/"
  },
  fonts: {
    src: "./src/assets/fonts/*.*",
    dest: "./build/fonts/"
  },
  images: {
    src: "./src/assets/images",
    dest: "./build/images/"
  }
};

function templates() {
  return gulp
    .src(path.templates.src)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.templates.dest))
    .pipe(reload({ stream: true }));
}

function styles() {
  return gulp
    .src(path.styles.main)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(postcss(require("./postcss.config")))
    .pipe(sourcemaps.write())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(path.styles.dest))
    .pipe(reload({ stream: true }));
}

function clean() {
  return del(path.root);
}

function scripts() {
  return gulp
    .src(path.scripts.src)
    .pipe(plumber())
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(path.scripts.dest));
}

function watch() {
  gulp.watch(path.styles.src, styles);
  gulp.watch(path.templates.src, templates);
  gulp.watch(path.scripts.src, scripts);
}

function server() {
  browserSync.init({
    server: path.root
  });
  browserSync.watch(path.root + "/**/*.*", browserSync.reload);
}

function fonts() {
  return gulp.src(path.fonts.src).pipe(gulp.dest(path.fonts.dest));
}

function images() {
  return gulp
    .src([path.images.src + `/**/*.*`, "!" + path.images.src + `/icons/*.*`])
    .pipe(gulp.dest(path.images.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.fonts = fonts;
exports.images = images;

// галповский вотчер
gulp.task("watch", () => {
  gulp.watch(`${config.SRC_DIR}/styles/**/*.scss`, gulp.series("styles"));
  gulp.watch(`${config.SRC_DIR}/images/**/*.*`, gulp.series("images"));
  gulp.watch(`${config.SRC_DIR}/scripts/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${config.SRC_DIR}/fonts/*`, gulp.series("fonts"));
  gulp.watch(`${config.VIEWS_DIR}/**/*.pug`, gulp.series("pug"));
});

// GULP:DEV
gulp.task(
  "default",
  gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts, scripts),
    gulp.parallel(watch, server)
  )
);

// GULP:build
gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(styles, templates, images, fonts, scripts))
);
