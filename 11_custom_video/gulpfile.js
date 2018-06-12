'use strict';

const fs = require('fs');
const browserify = require('browserify');
const babelify = require('babelify');
const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const inject = require('gulp-inject');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;


let pathConfig = {
  build: {
    html: 'build/',
    js: 'build/js/',
    style: 'build/css/',
    img: 'build/img',
    public: 'build/public',
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/css/main.scss',
    img: 'src/img/**/*.*',
    public: 'public/**/*.*',
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/css/**/*.scss',
    img: 'src/img/**/*.*',
    public: 'public/**/*.*',
  },
  clean: './build',
};

let serverConfig = {
  server: {
    baseDir: './build',
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'frontEd',
};

gulp.task('html:build', function() {
  return gulp.src(pathConfig.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(pathConfig.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
  return browserify(pathConfig.src.js)
    .transform(babelify.configure({
      presets: ['es2015'],
    }))
    .bundle()
    .pipe(source(pathConfig.src.js))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename('main.js'))
    .pipe(gulp.dest(pathConfig.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function() {
  return gulp.src(pathConfig.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathConfig.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function() {
  return gulp.src(pathConfig.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true,
    }))
    .pipe(gulp.dest(pathConfig.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('public:build', function() {
  return gulp.src(pathConfig.src.public)
    .pipe(gulp.dest(pathConfig.build.public))
    .pipe(reload({stream: true}));
});

gulp.task('clean', function(cb) {
  rimraf(pathConfig.clean, () => {
    fs.mkdir(pathConfig.clean, () => {
      fs.writeFile(pathConfig.clean + '/.keep', '', cb);
    });
  });
});

gulp.task('watch', function() {
  watch([pathConfig.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([pathConfig.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([pathConfig.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([pathConfig.watch.img], function(event, cb) {
    gulp.start('img:build');
  });
  watch([pathConfig.watch.public], function(event, cb) {
    gulp.start('public:build');
  });
});

gulp.task('build', [
  'js:build',
  'style:build',
  'image:build',
  'public:build',
  'html:build',
]);


gulp.task('webserver', function() {
  browserSync(serverConfig);
});

gulp.task('default', ['build', 'webserver', 'watch']);
