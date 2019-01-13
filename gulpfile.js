const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');

gulp.task('compile', ['copy'], () => {
    const tsResult = gulp.src(["backend/src/**/*.ts"])
        .pipe(ts({ lib: ["es6", "dom", "esnext"] }));
    return tsResult
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('backend/lib/'))
        .on("end", () => console.log("Backend Typescript compilation done!"));
});

gulp.task('copy', () => {
    const sourceFiles = ['backend/src/schema/typedefs/*.*'];
    const outputPath = 'backend/lib/schema/typedefs';
    return gulp.src(sourceFiles).pipe(gulp.dest(outputPath));
});
