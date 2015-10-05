var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var hash = require('../helpers/hash.js');
var crypto = require('crypto');
//var http = require('http');
//var url = require('url');

module.exports = function (app) {

    // check user session
    app.get('/session/check_user', function(request, response){
        console.log('request.session', request.session);
        response.send(request.session);
    });

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
                return response.send({ error: 'there is no such user with the' + email + ' email' });
            }

            // check pass
            if (user.hash != hash(pass, user.salt)) {
                return wrongPasswordForUser(email);
            }
            console.log('There is such user! He should be logged in!', user);

            request.session.isLoggedIn = true;
            request.session.user = email;

            request.session.reload(function(err) {
                console.log('session reload in login');
            });
            response.send(request.session);
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
                return response.send('user'  + email + ' already exists');//return res.render('signup.jade', { exists: true });
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

                    request.session.save(function(err) {
                        console.log('session saved in signup');
                    });
                    response.send(request.session);
                    //return res.redirect('/');
                });
            })
        });

    });

    // logout
    app.post(/^\/user\/logout\/?$/, function (request, response) {
        console.log('in logout');
        console.log('request.session', request.session);
        console.log('request.session.user', request.session.user);
        request.session.isLoggedIn = false;
        request.session.user = null;
        response.send(request.session);
        //request.redirect('/');
    });

};

function noSuchUserWithEmail(email){
    console.log('there is no such user with the', email, 'email');
}

function wrongPasswordForUser(email){
    console.log('there is uncorrect password for the user with ', email, 'email');
}

function someUncorrectData(email){
    console.log('there are some uncorrect data validation on the backend for', email, 'email');
}
