const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

gulp.task('compile', () => {
    const tsResult = gulp.src(["backend/src/*.ts"])
        .pipe(ts({
            lib: [
                "es6",
                "dom",
                "esnext",
            ],
        }));
    return tsResult
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('backend/lib/'))
        .on("end", () => console.log("Backend Typescript compilation done!"));
});