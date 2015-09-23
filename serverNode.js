
var mongoose = require('mongoose');
//var express = require('express');

var User = require('./models/user.js');
mongoose.model('User');

var http = require('http');

var port = 8888;

mongoose.connect('mongodb://localhost:27017/auto', function (err) {

    if(err) throw err;

    var server = http.createServer(function (request, response) {

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
