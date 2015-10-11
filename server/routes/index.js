var login = require('./login.js');
var wishlist = require('./wishlist.js');

module.exports = function (app) {

    // login / logout / signup routes
    login(app);

    wishlist(app);
    // error handlers
    //errors(app);
};