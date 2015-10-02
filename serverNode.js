
//var util = require('util');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var hash = require('./helpers/hash.js');
var crypto = require('crypto');


var User = require('./models/user.js');
mongoose.model('User');

var http = require('http');
var url = require('url');
var port = 8888;

//var auth = {
//    user: 'fr-end',
//    pass: '<yourPassGoesHere>',
//    host: 'ds041693.mongolab.com',
//    port: 41693,
//    name: 'auto'
//};

//var urlMongo = util.format('mongodb://%s:%s@%s:%d/%s', auth.user, auth.pass, auth.host, auth.port, auth.name);
var urlMongo = 'mongodb://localhost:27017/auto';
console.log(urlMongo);

// to connect via shell use the following command
// mongo ds041693.mongolab.com:41693/auto -u fr-end -p '<yourPassGoesHere>'

//'mongodb://fr-end:<yourPassGoesHere>@ds041693.mongolab.com:41693/auto'

function noSuchUserWithEmail(email){
    console.log('there is no such user with the', email, 'email');
}

function wrongPasswordForUser(email){
    console.log('there is uncorrect password for the user with ', email, 'email');
}

function someUncorrectData(email){
    console.log('there are some uncorrect data validation on the backend for', email, 'email');
}




mongoose.connect(urlMongo, function (err) {

    if(err) throw err;

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.use(cookieParser());
    app.use(expressSession({
        secret: 'secret',
        store: new MongoStore(
            {
                url: urlMongo,
                ttl: 14 * 24 * 60 * 60 // = 14 days. Default
            }
        ),
        resave: false,
        saveUninitialized: true /*,
        cookie : {
            maxAge : 60 * 1000 // 60 seconds
        }*/
    }));
    //console.log('connected');
    // log in
    app.post(/^\/user\/check_user\/?$/, function(request, response, next){
        console.log('request.body', request.body);
        console.log('request.session', request.session);
        // url module reference https://www.npmjs.com/package/url
        //var parsedUrl = url.parse(request.url, true);
        //var pathname = parsedUrl.pathname;
        //console.log('parsedUrl',parsedUrl);

        var email = request.body._id;
        console.log('userName', email);
        var pass = request.body.password;

        User.findById(email, function (err, user) {
            if (err) throw err; // return next(err)     in express

            if (!user) {
                return noSuchUserWithEmail(email);
            }

            // check pass
            if (user.hash != hash(pass, user.salt)) {
                return wrongPasswordForUser(email);
            }
            console.log('There is such user! He should be logged in!', user);

            request.session.isLoggedIn = true;
            request.session.user = email;
            //res.redirect('/');
        });

    });

    // signup
    app.post(/^\/user\/?$/, function(request, response, next) {
        var email = request.body._id;
        console.log('userName', email);
        var pass = request.body.password;
        console.log('request.session', request.session);

        User.findById(email, function (err, user) {
            if (err) return next(err);

            if (user) {
                return console.log('user already exists');//return res.render('signup.jade', { exists: true });
            }

            crypto.randomBytes(16, function (err, bytes) {
                if (err) return next(err);

                var user = { _id: email };
                user.salt = bytes.toString('utf8');
                user.hash = hash(pass, user.salt);

                User.create(user, function (err, createdUser) {
                    if (err) {
                        if (err instanceof mongoose.Error.ValidationError) {
                            return someUncorrectData(email);
                        }
                        return next(err);
                    }

                    // user created successfully
                    request.session.isLoggedIn = true;
                    request.session.user = email;
                    console.log('created user: %s', createdUser);
                    //return res.redirect('/');
                });
            })
        });

    });

    app.listen(port);

});
