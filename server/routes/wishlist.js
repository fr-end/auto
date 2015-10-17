var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var invalidData = require('./../helpers/invalidData.js');

module.exports = function (app) {

    app.get('/wishlist/', function (request, response) {
        var email = request.session.user;
        console.log('request.session.user in get', request.session.user);

        User.findById({_id: email}, function (err, user) {
            if (err)
                console.log(err); // return next(err)     in express
            if (!user) {
                return response.send(invalidData('no user', 'login', email));
            }
            response.send({wishlistIDs: user.wishlistIDs, wishlistObjects: user.wishlistObjects});
        });

    });

    app.post('/wishlist/', function (request, response) {
        //console.log('request.url', request.url);
        var email = request.session.user;
        var carID = request.body.carID;
        var carObject = request.body.carObject;

        User.findOne({ _id: email }, function (err, doc){
            //console.log('user._id', doc._id);
            //console.log('user.wishlistIDs', doc.wishlistIDs);
            var index = doc.wishlistIDs.indexOf(carID);
            if (request.body.action === "addCar" && index ===  -1) {
                doc.wishlistIDs.push(carID);
                doc.wishlistObjects.push(carObject);
            } else if (request.body.action === "delCar"  && index !== -1){
                doc.wishlistIDs.splice(index, 1);
                for (var i=0; i < doc.wishlistObjects.length; i++){
                    if (doc.wishlistObjects[i].carId == carID){
                        doc.wishlistObjects.splice(i, 1);
                        break;
                    }
                }
            }
            doc.save();
            response.send(doc.wishlistIDs);
        });
    });

};