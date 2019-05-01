const gulp = require("gulp");

function defaultTask(cb) {
    console.log("GULPFILE DEFAULT TASK EXECUTING......");
    cb();
}
gulp.task("copy-db", function () {
    return gulp.src("./packages/shared/core/lib/data.json")
    .pipe(gulp.dest("./dist/shared/core/lib/"));
});
exports.default = defaultTask;