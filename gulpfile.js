const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const srcPath = "./src/";
const distPath = "./dist/";

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function build(cb) {
  cb();
}

function cssTranspile(cb) {
  let folders = getFolders(srcPath);

  folders.map((folder) =>
    gulp
      .src(path.join(srcPath, folder, "/**/*.scss"))
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(distPath + "/" + folder))
  );

  cb();
}

function cssBundle(cb) {
  cb();
}

function jsTranspile(cb) {
  let folders = getFolders(srcPath);

  folders.map((folder) =>
    gulp
      .src(path.join(srcPath, folder, "/**/script.js"))
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(concat(folder + ".js"))
      .pipe(gulp.dest(distPath + "/" + folder))
  );
  cb();
}

function watchFiles() {
  let folders = getFolders(srcPath);

  gulp.watch("src/**/script.js", jsTranspile);
  gulp.watch("src/**/*.scss", cssTranspile);
}

const watch = gulp.parallel(watchFiles);

exports.build = gulp.series(gulp.parallel(cssTranspile, jsTranspile));
exports.watch = watch;

exports.default = gulp.series(build);
