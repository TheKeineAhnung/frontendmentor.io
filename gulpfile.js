// Import everything important
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");

// For SASS -> CSS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sassLint = require("gulp-sass-lint");

// HTML
const htmlmin = require("gulp-htmlmin");
const htmlhint = require("gulp-htmlhint");

// PHP
const phplint = require("gulp-phplint");

// JavaScript
const babel = require("gulp-babel");
const jshint = require("gulp-jshint");
const uglify = require("gulp-uglify");

// Define Important Varaibles
const src = "src";
const dist = "dist";

// Function for reload the Browser
const reload = (done) => {
  browserSync.reload();
  done();
};

// Function for serve the dev server in borwsaer
const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: `${dist}`,
    },
  });
  done();
};

// Compile sass/scss into css with gulp
const css = () => {
  // Find SASS
  return (
    gulp
      .src(`${src}/sass/**/*.{sass,scss}`)
      // Init Plumber
      .pipe(plumber())
      // Lint SASS
      .pipe(
        sassLint({
          options: {
            formatter: "stylish",
          },
          rules: {
            "final-newline": 0,
            "no-mergeable-selectors": 1,
            indentation: 0,
          },
        })
      )
      // Format SASS
      .pipe(sassLint.format())
      // Start Source Map
      .pipe(sourcemaps.init())
      // Compile SASS -> CSS
      .pipe(sass({ outputStyle: "compressed" }))
      .on("error", sass.logError)
      // Add Autoprefixer & cssNano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Write Source Map
      .pipe(sourcemaps.write(""))
      // Write everything to destination folder
      .pipe(gulp.dest(`${dist}/css`))
      // Reload Page
      .pipe(browserSync.stream())
  );
};

// Compile .html to minify .html
const html = () => {
  // Find SASS
  return (
    gulp
      .src(`${src}/*.html`)
      // Init Plumber
      .pipe(plumber())
      // Lint html
      .pipe(htmlhint())
      // Minify html
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          html5: true,
          removeEmptyAttributes: true,
          removeTagWhitespace: true,
          sortAttributes: true,
          sortClassName: true,
        })
      )
      // Write everything to destination folder
      .pipe(gulp.dest(`${dist}`))
  );
};

// Compile .php to minify .php
const php = () => {
  // Find php
  return (
    gulp
      .src(`${src}/*.php`)
      // Init Plumber
      .pipe(plumber())
      // Write everything to destination folder
      .pipe(gulp.dest(`${dist}`))
  );
};

// Compile .php to minify .php
const phpSub = () => {
  // Find PHP
  return (
    gulp
      .src(`${src}/php/**/*.php`)
      // Write everything to destination folder
      .pipe(gulp.dest(`${dist}/php`))
  );
};

// Compile .js to minify .js
const script = () => {
  // Find JavaScript
  return (
    gulp
      .src(`src/js/**/*.js`)
      // Init Plumber
      .pipe(
        plumber((error) => {
          gutil.log(error.message);
        })
      )
      // Start useing source maps
      .pipe(sourcemaps.init())
      // Use Babel
      .pipe(babel())
      // JavaScript Lint
      .pipe(jshint())
      // Report of jslint
      .pipe(jshint.reporter("jshint-stylish"))
      // Minify
      .pipe(uglify())
      // Write Sourcemap
      .pipe(sourcemaps.write(""))
      // Write everything to destination folder
      .pipe(gulp.dest(`${dist}/js`))
      // Update Browser
      .pipe(browserSync.stream())
  );
};

// Compile .html to minify .html in html
const htmlSub = () => {
  return (
    gulp
      .src(`${src}/html/**/*.html`)
      .pipe(plumber())
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          html5: true,
          removeEmptyAttributes: true,
          removeTagWhitespace: true,
          sortAttributes: true,
          sortClassName: true,
        })
      )
      // Write destination folder
      .pipe(gulp.dest(`${dist}/html`))
  );
};

// add png pics
const png = () => {
  return (
    gulp
      .src(`${src}/img/**/*.png`)
      // Write destination folder
      .pipe(gulp.dest(`${dist}/img`))
  );
};

// add icons
const icons = () => {
  return (
    gulp
      .src(`${src}/icons/**/*.ico`)
      // Write destination folder
      .pipe(gulp.dest(`${dist}/icons`))
  );
};

// Function to watch our Changes and refreash page
const watch = () =>
  gulp.watch(
    [
      `${src}/*.html`,
      `${src}/html/**/*.html`,
      `${src}/*.php`,
      `${src}/php/**/*.php`,
      `${src}/sass/**/*.{sass,scss}`,
      `${src}/js/**/*.js`,
      `${src}/img/**/*.png`,
      `${src}/icons/**/*.ico`,
    ],
    gulp.series(css, script, html, htmlSub, php, phpSub, png, icons, reload)
  );

// All Tasks for this Project
const dev = gulp.series(
  css,
  script,
  html,
  htmlSub,
  php,
  phpSub,
  png,
  icons,
  serve,
  watch
);

// Just Build the Project
const build = gulp.series(css, script, html, htmlSub, php, phpSub, png, icons);

// Default function (used when type gulp)
exports.dev = dev;
exports.build = build;
exports.default = build;
