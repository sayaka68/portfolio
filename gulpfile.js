const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmp = require("gulp-merge-media-queries");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");

function browserInit(done) {
	browserSync.init({
		server: {
			baseDir: "./",
		},
		port: 3000,
	});
	done();
}

function compileSass() {
	return gulp
		.src("./src//assets/sass/**/*.scss")
		.pipe(
			plumber({
				errorHanler: function (error) {
					console.error(error.message); // error.messageFormatted から error.message へ
					this.emit("end"); // エラー後もタスクを続行するため
				},
			})
		)
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([autoprefixer(), cssSorter()]))
		.pipe(mmp())
		.pipe(gulp.dest("./assets/css/"))
		.pipe(browserSync.stream());
}

function browserReload(done) {
	browserSync.reload();
	done();
}

function watch() {
	gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass));
	gulp.watch("./**/*").on("change", browserSync.reload);
}

exports.default = gulp.series(compileSass, browserInit, watch);
