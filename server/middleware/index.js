var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

module.exports = function (app, urlMongo) {
    //app.use(express.logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.use(cookieParser());
    app.use(expressSession({
        secret: 'secret',
        store: new MongoStore(
            {
                url: urlMongo,
                ttl: 14 * 24 * 60 * 60 // = 14 days. Default
            }
        ),
        resave: false,
        saveUninitialized: true /*,
         cookie : {
         maxAge : 60 * 1000 // 60 seconds
         }*/
    }));

    // this is good enough for now but you'll
    // want to use connect-mongo or similar
    // for persistant sessions

    //app.use(express.cookieParser());
    //app.use(express.session({ secret: 'building a blog' }));
    //app.use(express.bodyParser());
    //
    //// expose session to views
    //app.use(function (req, res, next) {
    //    res.locals.session = req.session;
    //    next();
    //})
};
