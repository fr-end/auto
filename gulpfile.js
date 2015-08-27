var gulp = require('gulp');
var args = require('yargs').argv;       //  tool for getting the arguments (file paths) in a stream
var concat = require('gulp-concat');
var connect = require('gulp-connect');  //  allow livereload our files in webbrowser
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css')

// the config object from gulp.config.js file
var config = require('./gulp.config.js')();

// the following modules are plugins 
// plugins might be substitutes by one more general tool 'gulp-load-plugins' with flag ({ lazy: true })
// plugins define what tasks do


var jshint = require('gulp-jshint');    //  Detects errors and potential problems in code
var jscs = require('gulp-jscs');        //  JS code style checker (style guide) 
                                        //  and uses .jscsrc file with rules for checking.
var util = require('gulp-util');        //  Helps to write some logs out
var gulpprint = require('gulp-print');  //  For printing all the files that gulp is 'touching' in a process
var gulpif = require('gulp-if');        //  Plugin for adding 'if' condition to a stream (process)

gulp.task('css', function () {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))    //  transform sass to css
        .pipe(concatCss("main.css", { rebaseUrls: false } ))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('check_js', function(){
    log('Analyzing sourse with JSHint and JSCS');   // function at the bottom of our gulpfile.js
    return gulp
        .src(config.alljs)
        .pipe(gulpif(args.verbose, gulpprint()))    // if specify flag --verbose in console then show all the checked files
        //.pipe(jscs()) // if we further specify some code style guide :)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'), { verbose: true}) // jshint needs a special reporter
        .pipe(jshint.reporter('fail'))              // Stop if our code is invalid after previous functions
        .pipe(concat('all.js'))                     
        .pipe(gulp.dest('./build/'));               // Place concatenated file into build folder
});

gulp.task('concat_js', [ 'check_js' ], function(){
    return gulp
        .src(config.alljs)
        .pipe(concat('all.js'))                     // Concat js files if there in no warnings in js files
        .pipe(gulp.dest('./build/'))                // Place concatenated file into build folder
        .pipe(connect.reload());                    // Livereload for our all.js file
});

gulp.task('connect', function(){
    connect.server({
        port: 8080,                                 // Server started at http://localhost:8080
        root: 'build',                              // place where our main files are
        livereload: true                            // livereload for our server
    });
});

gulp.task('default', [ 'connect', 'concat_js', 'css' ], function(){
    gulp.watch( config.alljs, ['concat_js']);       // Watch for changes in all js files in 'src' folder
    gulp.watch( config.allsass, ['css']);
});

////////////////////////////////////////////

function log(msg){
    if (typeof(msg) === 'object'){
        for (var item in msg){
            if (msg.hasOwnProperty(item)){
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}

//gulp.task('default', ['watch']);