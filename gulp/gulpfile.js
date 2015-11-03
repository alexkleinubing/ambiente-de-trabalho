/**
 * Created by Alex Kleinubing, based on many StackOverflow answers.
 * To install each plugin: npm install --save-dev gulp-plumber
 * To install all package.json: npm install
 */
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var gutil       = require('gulp-util');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

/**
 * VARS
 */
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
var source = {
    sass: './_source/sass/',
    css: './_source/css/',
    js: './_source/js/',
}
var dist = {
    sass: './_source/css/',
    css: './css/',
    js: './js/',
}
var targetFiles = {
    sass: [// use all sass file dont _underscored
        source.sass + '**/*.{sass,scss}',
    ],
    css: [ // add all css files on sequence
        source.css + 'bootstrap.css',
        source.css + 'style.css',
        source.css + 'syntax.css',
    ],
    js: [ //add all js files on sequence
        source.js + 'jquery.js',
        source.js + 'bootstrap.js',
        source.js + 'scripts.js',
    ]
}


/**
 * TASKS
**/
//Build the Jekyll Site
gulp.task('jekyll-build', ['sass'],  function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['css', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function() {
    return gulp.src(targetFiles.sass)
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);this.emit('end');
        }}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(dist.sass));
});

gulp.task('css', ['sass'], function() {
  return gulp.src(targetFiles.css)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);this.emit('end');
    }}))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', function() {
  gulp.src(targetFiles.js)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);this.emit('end');
    }}))
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(dist.js));
});


gulp.task('watch', ['css', 'js'], function() {
  gulp.watch(source.js, ['js']);
  gulp.watch(source.sass+'**/*.{sass,scss}', ['css']);
  gulp.watch(source.css, ['css']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*', 'img/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
