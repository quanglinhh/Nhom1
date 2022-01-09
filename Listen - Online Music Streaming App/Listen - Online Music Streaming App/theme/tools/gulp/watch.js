const gulp = require('gulp');
const concat = require('gulp-concat');
const sync = require('browser-sync').create();
const reload = sync.reload;
const build = require('./build');
const func = require('./functions');

const dist = build.config.path.dist;

//=> Default paths
const paths = {
    baseDir: './' + dist,
    html: build.config.path.src + '/**/*.html',
    scss: build.config.path.src + '/assets/scss/**/*.scss',
    js: build.config.path.src + '/assets/js/**/*.js'
};

//=> Watch file task
gulp.task('watch-files', function () {
    func.objectWalkRecursive(build.build.preview, function (val, key) {
        if (typeof val.src !== 'undefined') {
            if (typeof val.bundle !== 'undefined') {
                const bundle = val;
                if (typeof bundle.src !== 'undefined' && typeof bundle.bundle !== 'undefined') {
                    for (const type in bundle.src) {
                        if (!bundle.src.hasOwnProperty(type)) continue;

                        func.dotPaths(bundle.src[type]);
                        const outputFile = func.baseFileName(bundle.bundle[type]);

                        switch (type) {
                            case 'styles':
                                gulp.src(bundle.src[type]).pipe(concat(outputFile)).pipe(func.cssBuild()())
                                    .pipe(func.outputPath(bundle.bundle[type], outputFile)()).pipe(sync.stream());
                                break;

                            case 'scripts':
                                gulp.src(bundle.src[type]).pipe(concat(outputFile)).pipe(func.jsBuild()())
                                    .pipe(func.outputPath(bundle.bundle[type], outputFile)());
                                break;

                            default:
                                break;
                        }
                    }
                }
            }

            if (typeof val.output !== 'undefined') {
                const bundle = val;
                if (typeof bundle.src !== 'undefined' && typeof bundle.output !== 'undefined') {
                    for (const type in bundle.src) {
                        if (!bundle.src.hasOwnProperty(type)) continue;

                        func.dotPaths(bundle.src[type]);
                        switch (type) {
                            case 'scripts':
                                gulp.src(bundle.src[type]).pipe(func.jsBuild()()).pipe(func.outputPath(bundle.output[type])());
                                break;

                            case 'html':
                                gulp.src(bundle.src[type]).pipe(gulp.dest(dist));
                                break;

                            default:
                                break;
                        }
                    }
                }
            }
        }
    });
});

//=> Browser sync task
gulp.task('browserSync', function () {
    sync.init({
        injectChanges: true,
        server: {
            baseDir: paths.baseDir
        }
    });
});

//=> Watch tasks
gulp.task('watch', ['browserSync'], function () {
    gulp.watch(paths.scss, ['watch-files']);
    gulp.watch([paths.html, paths.js], ['watch-files']).on('change', reload);
});