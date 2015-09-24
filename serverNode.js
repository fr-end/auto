
//var util = require('util');
var mongoose = require('mongoose');
//var express = require('express');

var User = require('./models/user.js');
mongoose.model('User');

var http = require('http');

var port = 8888;

//var auth = {
//    user: 'fr-end',
//    pass: '<yourPassGoesHere>',
//    host: 'ds041693.mongolab.com',
//    port: 41693,
//    name: 'auto'
//};

//var url = util.format('mongodb://%s:%s@%s:%d/%s', auth.user, auth.pass, auth.host, auth.port, auth.name);
var url = 'mongodb://localhost:27017/auto';
console.log(url);

// to connect via shell use the following command
// mongo ds041693.mongolab.com:41693/auto -u fr-end -p '<yourPassGoesHere>'

//'mongodb://fr-end:<yourPassGoesHere>@ds041693.mongolab.com:41693/auto'

mongoose.connect(url, function (err) {

    if(err) throw err;
    //console.log('connected');
    var server = http.createServer(function (request, response) {

        //User.create(user);
        User.findById("email@e.mail", function(err, user){

            var output = '';
            if (err) next(err);

            if (user) {
                output += user;
            }

            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});

            response.write(output);
            response.end();

        });
    });

    server.listen(port , function () {
        console.log('now listening on http://localhost:' + port);
    });
});
