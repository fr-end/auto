
var mongoose = require('mongoose');
var express = require('express');


var middleware = require('./middleware/index.js');
var routes = require('./routes/index.js');

var port = 8888;

var urlMongo = require('./helpers/urlMongo.js')

mongoose.connect(urlMongo, function (err) {

    if(err) throw err;

    console.log('connected to mongo');

    var app = express();

    middleware(app, urlMongo);

    routes(app);

    app.listen(port);

});
