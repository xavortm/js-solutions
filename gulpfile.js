const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const scriptsPath = "./src/";
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
  // Sass to css here for each folder
  cb();
}

function cssBundle(cb) {
  cb();
}

function jsTranspile(cb) {
  let folders = getFolders(scriptsPath);

  folders.map((folder) =>
    gulp
      .src(path.join(scriptsPath, folder, "/**/script.js"))
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

exports.build = gulp.series(gulp.parallel(cssTranspile, jsTranspile));

exports.default = gulp.series(build);
