var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var invalidData = require('./../helpers/invalidData.js');

module.exports = function (app) {

    app.get('/wishlist/', function (request, response) {
        var email = request.session.user;
        console.log('request.session.user in get', request.session.user);

        User.findById({_id: email}, function (err, user) {
            if (err) console.log(err); // return next(err)     in express

            if (!user) {
                return response.send(invalidData('no user', 'login', email));
            }

            console.log('user', user);
            response.send(user.wishlistIDs);
        });

    });

    app.post('/wishlist/', function (request, response) {
        console.log('request.url', request.url);
        var email = request.session.user;
        var carID = request.body.carID;

        console.log('request.session.user in post', request.session.user)
        console.log('carId', carID);

        User.findOne({ _id: email }, function (err, doc){
            console.log('user._id', doc._id);
            console.log('user.wishlistIDs', doc.wishlistIDs);
            doc.wishlistIDs.push(carID);
            doc.save();
        });

        //User.update(email, {$addToSet: {wishlistIDs: carID}});
        response.send(null);
    });



};