var gulp   = require('gulp'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		// imageMin = require('gulp-imagemin'),
		minifyCSS = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify');

gulp.task('bs', function() {
	browserSync.init({
		server: './'
	});
});

gulp.task('styles', function() {
	return gulp.src('./styles/*.scss')
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('base.css'))
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./'))
		.pipe(reload({ stream: true }));
});

gulp.task('scripts', function () {
	return gulp.src('./scripts.js')
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'))
		.pipe(reload({stream:true}));
});

// gulp.task('images', function () {
// 	return gulp.src('./assets/**/*')
// 		.pipe(imageMin())
// 		.pipe(gulp.dest('./assets'));
// });

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('styles/*.scss', ['styles']);
	gulp.watch('./*.js', ['scripts']);
	gulp.watch('./index.html', reload);
});

gulp.task('default', ['styles', 'scripts', 'bs', 'watch']);