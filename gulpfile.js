var gulp = require('gulp'), 			//main gulp module
	less = require('gulp-less'), 		//module for LESS->CSS convertion
	concat = require('gulp-concat'),	//module for concatenation of files into one file
	concatCss = require('gulp-concat-css'), //module for concatenation CSS files into one file
	browserify = require('browserify'),
	connect = require('gulp-connect'); 	//module for 'require' compile of *.js files 
											//!!!! it is recommended to ass watchify https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

gulp.task('css', function() {
	gulp.src('src/**/*.less') 			//search all *.less files in 'src' directory and all subdirectories
		.pipe(less())					//convert *.less to CSS
		.pipe(concatCss('main.css'))	//concatenate all files into one with name 'main.css'
		.pipe(gulp.dest('build'));		//save file to 'build' dir

})

gulp.task('scripts', function() {
	browserify({
        entries: 'src/app.js',
        extensions: ['.js'],
        debug: true
    })			
		.bundle()		//complie app.js
		.pipe(gulp.dest('build'));		//save file to 'build' dir
})


gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.less', ['css']);
});

gulp.task('server', function() {
	connect.server({
		root: 'build',
        port: 8080
    });
})

gulp.task('src', ['scripts', 'css']);

gulp.task('build', ['src', 'server']);

gulp.task('default', ['src', 'watch', 'server']);