var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var hash = require('../helpers/hash.js');
var crypto = require('crypto');
//var http = require('http');
//var url = require('url');
module.exports = function (app) {

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

}