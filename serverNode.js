
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

mongoose.connect(urlMongo, function (err) {

    if(err) throw err;
    //console.log('connected');
    var server = http.createServer(function (request, response) {

        // url module reference https://www.npmjs.com/package/url
        var parsedUrl = url.parse(request.url, true);
        var pathname = parsedUrl.pathname;

        if (pathname.search(/^\/user\/?/) != '-1' && request.method === 'GET'){

            console.log('pathname', pathname);
            var userName = pathname.slice(6);
            console.log('userName',userName);

            //User.create(user);
            User.findById(userName, function(err, user){

                var output = '';
                if (err) next(err);

                if (user) {
                    output += user;
                }

                writeResponseAndEnd(output);

            });

        }

        if (pathname.search(/^\/user\/?/) != '-1' && request.method === 'POST') {

/*
            app.post('/signup', function (req, res, next) {
                var email = cleanString(req.param('email'));
                var pass = cleanString(req.param('pass'));
                if (!(email && pass)) {
                    return invalid();
                }

                User.findById(email, function (err, user) {
                    if (err) return next(err);

                    if (user) {
                        return res.render('signup.jade', { exists: true });
                    }

                    crypto.randomBytes(16, function (err, bytes) {
                        if (err) return next(err);

                        var user = { _id: email };
                        user.salt = bytes.toString('utf8');
                        user.hash = hash(pass, user.salt);

                        User.create(user, function (err, newUser) {
                            if (err) {
                                if (err instanceof mongoose.Error.ValidationError) {
                                    return invalid();
                                }
                                return next(err);
                            }

                            // user created successfully
                            req.session.isLoggedIn = true;
                            req.session.user = email;
                            console.log('created user: %s', email);
                            return res.redirect('/');
                        })
                    })
                })


            });
        */

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
                                    return invalid();
                                }
                                return next(err);
                            }

                            // user created successfully
                            //req.session.isLoggedIn = true;
                            //req.session.user = email;
                            console.log('created user: %s', user);
                            //return res.redirect('/');
                        });
                    })
                });

                function invalid(){
                    console.log('invalid user data validation on the back end!');
                }
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
