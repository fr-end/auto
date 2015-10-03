
//var util = require('util');
var mongoose = require('mongoose');
var express = require('express');

var middleware = require('./middleware/index.js');
var routes = require('./routes');









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

    var app = express();

    middleware(app, urlMongo);

    routes(app);

    app.listen(port);

});
