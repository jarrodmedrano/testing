var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('bundle', plugins.shell.task([
    // this bundles all of the code we wrote and excludes anything
    // in dependencies.js (which are all of our external dependencies)
    'jspm bundle-sfx src/js/index.js build/build.js --minify'
]));

gulp.task('deploy', plugins.shell.task([
    'git subtree push --prefix build websites master'
]));

gulp.task('move', function() {
    gulp.src('./img/**/*.{gif,png,jpg,svg}')
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('./build/img'));
    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build', ['bundle', 'move']);