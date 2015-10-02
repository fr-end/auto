
//var util = require('util');
var mongoose = require('mongoose');
//var express = require('express');
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
    //console.log('connected');
    var server = http.createServer(function (request, response) {

        // url module reference https://www.npmjs.com/package/url
        var parsedUrl = url.parse(request.url, true);
        var pathname = parsedUrl.pathname;
        console.log('parsedUrl',parsedUrl);

        // log in
        if (pathname.search(/^\/user\/?\S/) != '-1' && request.method === 'GET'){
            console.log('parsedUrl', parsedUrl);
            console.log('pathname', pathname);
            var email = pathname.slice(6);
            var pass = parsedUrl.query.password;
            console.log('password', pass);
            console.log('userName', email);


            User.findById(email, function (err, user) {
                if (err) throw err; // return next(err)     in express

                if (!user) {
                    return noSuchUserWithEmail(email);
                }

                // check pass
                if (user.hash != hash(pass, user.salt)) {
                    return wrongPasswordForUser(email);
                }
                console.log('There is such user!', user);

                //req.session.isLoggedIn = true;
                //req.session.user = email;
                //res.redirect('/');
            });

            response.end();
 /*

            User.findById(userName, function(err, user){

                var output = '';
                if (err) next(err);

                if (user) {
                    output += user;
                }

                writeResponseAndEnd(output);

            });
            */
        }

        // signup
        if (pathname.search(/^\/user\/?$/) != '-1' && request.method === 'POST') {

            console.log(pathname);
            var userName = pathname.slice(6);
            console.log(userName);
            request.on('data', function (userData){
                var stringifiedUser = userData.toString();
                var parsedUser = JSON.parse(stringifiedUser);

                User.findById(parsedUser._id, function (err, user) {
                    if (err) return next(err);

                    if (user) {
                        return console.log('user already exists');//return res.render('signup.jade', { exists: true });
                    }

                    crypto.randomBytes(16, function (err, bytes) {
                        if (err) return next(err);

                        var user = { _id: parsedUser._id };
                        user.salt = bytes.toString('utf8');
                        user.hash = hash(parsedUser.password, user.salt);

                        User.create(user, function (err, createdUser) {
                            if (err) {
                                if (err instanceof mongoose.Error.ValidationError) {
                                    return someUncorrectData(parsedUser._id);
                                }
                                return next(err);
                            }

                            // user created successfully
                            //req.session.isLoggedIn = true;
                            //req.session.user = email;
                            console.log('created user: %s', createdUser);
                            //return res.redirect('/');
                        });
                    })
                });


                /*
                User.create(parsedUser, function (err, userSaved) {
                    if (err) throw err;
                    console.log('saved user', userSaved);
                });
                */

                response.end();

            });
            request.on('end', function (){
                response.end();
            });
        }


        function writeResponseAndEnd(result){
            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
            response.write(result);
            response.end();
        }

    });

    server.listen(port , function () {
        console.log('now listening on http://localhost:' + port);
    });
});
