const gulp = require("gulp"),
  run = require("gulp-run"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify");

function tsc() {
  return run("tsc").exec();
}

function tscClean() {
  return run("rm -rf .build-tsc").exec();
}

function mini() {
  return gulp
    .src(".build-tsc/**/*.js", { sourcemaps: true })
    .pipe(minify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest(".build"));
}

function build() {
  return gulp.series(tsc, mini, tscClean);
}

function watch() {
  return gulp.watch("src/**/*", { ignoreInitial: false }, gulp.series(["build"]));
}

gulp.task("build", build());
gulp.task("watch", watch);
