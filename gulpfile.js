var gulp = require('gulp');                 //  main gulp module
var args = require('yargs').argv;           //  tool for getting the arguments (file paths) in a stream
var concat = require('gulp-concat');        //  module for concatenation files into one file
var connect = require('gulp-connect');      //  allow livereload our files in webbrowser
var connect_for_proxy = require('connect'); //  coonect for proxy
var url = require('url');                   //  url tool
var proxy = require('proxy-middleware');    //  proxy
var sass = require('gulp-sass');            //  module for SASS->CSS convertion
var concatCss = require('gulp-concat-css')  //  module for concatenation CSS files into one file

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

var browserify = require('browserify');
var browserifyHandlebars = require('browserify-handlebars');
var source = require('vinyl-source-stream');

gulp.task('html', function () {
    return gulp
        .src(config.allhtml)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
})

gulp.task('png', function () {
    return gulp
        .src(config.allpng)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
})

gulp.task('jpg', function () {
    return gulp
        .src(config.alljpg)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
})

gulp.task('css', function () {
    return gulp
        .src(config.allsass)
        .pipe(sass().on('error', sass.logError))    //  transform sass to css
        .pipe(concatCss("main.css", { rebaseUrls: false } ))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('js_check', function(){
    log('Analyzing sourse with JSHint and JSCS');   // function at the bottom of our gulpfile.js
    return gulp
        .src(config.alljs)
        .pipe(gulpif(args.verbose, gulpprint()))    // if specify flag --verbose in console then show all the checked files
        //.pipe(jscs()) // if we further specify some code style guide :)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'), { verbose: true}); // jshint needs a special reporter
        //.pipe(jshint.reporter('fail'))              // Stop if our code is invalid after previous functions
});

gulp.task('browserify', ['js_check'],  function() {
    return browserify('./src/app.js',{
          transform: [browserifyHandlebars]
        })
        .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('server', function(){
    connect.server({
        port: 8080,                                 // Server started at http://localhost:8080
        root: 'build',                              // place where our main files are
        livereload: true,                           // livereload for our server
        middleware: function(connect, o) {
            return [ (function() {
                var url = require('url');
                var proxy = require('proxy-middleware');
                var options = url.parse(config.proxy.pathto);
                options.route = config.proxy.path;
                return proxy(options);
            })() ];                     
        }
    })
});


gulp.task('default', [ 'html', 'png', 'jpg', 'css', 'browserify', 'server' ], function(){
    gulp.watch( config.alljs, ['browserify']);       // Watch for changes in all js files in 'src' folder
    gulp.watch( config.allsass, ['css']);
    gulp.watch( config.allhtml, ['html']);
    gulp.watch( config.alltemplates, ['browserify']);
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

