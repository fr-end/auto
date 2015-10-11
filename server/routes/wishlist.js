var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

module.exports = function (app) {

    app.get('/wishlist/', function (request, response) {
        var email = request.session.user;

        User.findById(email, function (err, user) {
            if (err) throw err; // return next(err)     in express

            //if (!user) {
            //    return response.send(invalidData('no user', 'login', email));
            //}

            console.log('user', user)
            response.send(user.wishlist);
        });
    });

    app.post('/wishlist/', function (request, response) {
        var email = request.session.user;
        var carId = request.body.CarId;
        console.log('carId', carId);
        User.update(email, {$addToSet: {wishlistIDs: carId}});
        response.send(null);
    });



};