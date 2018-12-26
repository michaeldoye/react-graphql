const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const bump = require("gulp-bump");

/**
 * Main compile task
 */
gulp.task('compile', ['bump'], function() {

    // All typescript files
    const tsResult = gulp.src(["backend/src/*.ts"])
        // Typescript compile
        .pipe(ts({
            lib: [
                "es6",
                "dom",
                "esnext",
            ],
        }))
        .on("end", function() {
            console.log("Typescript compilation done!");
        });

    // Return all files
    return tsResult
        .pipe(uglify())
        .on('end', function() {
            console.log('Uglify done!');
        })
        .pipe(sourcemaps.write())

        // Output to destination folder
        .pipe(gulp.dest('backend/lib/'))
        .on('end', function() {
            console.log('Build Completed!');
        });
});

gulp.task('bump', function() {
    gulp.src('package.json')
        .pipe(bump())
        .pipe(gulp.dest('../'));
});

gulp.task('watch', function () {
    // watch for TS changes
    gulp.watch(['backend/src/*.ts', 'gulpfile.js'], ['compile']);
});

