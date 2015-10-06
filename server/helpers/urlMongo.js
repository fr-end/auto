var util = require('util');
var password = require('../../pass.js');

// for connection to the mongo hosted by Dima's server
var auth = {
    user: 'admin',
    password: password,
    host: '176.111.61.10',
    name: 'auto'
};
var urlMongo = util.format('mongodb://%s:%s@%s/%s', auth.user, auth.password, auth.host, auth.name);

// to connect via the mongo shell use the following command
// mongo --host 176.111.61.10 -u admin -p fr-end --authenticationDatabase auto
//console.log(urlMongo);
// 'mongodb://admin:<some_pass_goes_here>@176.111.61.10/auto'


// via mongolab
//var auth = {
//    user: 'fr-end',
//    password: '<yourPassGoesHere>',
//    host: 'ds041693.mongolab.com',
//    port: 41693,
//    name: 'auto'
//};
// var urlMongo = util.format('mongodb://%s:%s@%s:%d/%s', auth.user, auth.password, auth.host, auth.port, auth.name);
//console.log(urlMongo);
//'mongodb://fr-end:<yourPassGoesHere>@ds041693.mongolab.com:41693/auto'

// to connect via the mongo shell use the following command
// mongo ds041693.mongolab.com:41693/auto -u fr-end -p '<yourPassGoesHere>'


// via localhost
//var urlMongo = 'mongodb://localhost:27017/auto';
//console.log(urlMongo);

module.exports = urlMongo;