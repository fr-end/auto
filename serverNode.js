
//var util = require('util');
var mongoose = require('mongoose');
//var express = require('express');

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

        //console.log('request.url', request.url);
        //console.log('request.method', request.method);
        //console.log('parsedUrl',parsedUrl);

        var pathname = parsedUrl.pathname;
        /*
        if (pathname.search(/^\/user\/?/) != '-1' && request.method === 'GET'){

            console.log(pathname);
            var userName = pathname.slice(6);
            console.log(userName);

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
        */
        if (pathname.search(/^\/user\/?/) != '-1' && request.method === 'POST') {
            console.log(pathname);
            var userName = pathname.slice(6);
            console.log(userName);
            request.on('data', function (userData){
                var stringifiedUser = userData.toString();
                var parsedUser = JSON.parse(stringifiedUser);

                var newUser = new User(parsedUser);
                newUser.save(function (err) {
                    if (err) throw err;
                    console.log('newUser saved!', newUser);
                });

                /*
                User.create(parsedUser, function (err, userSaved) {
                    if (err) throw err;
                    console.log('saved user', userSaved);
                });
                */
                response.end();
                //output = countries.appendCountry(query)
                //writeResponseAndEnd(output);
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
