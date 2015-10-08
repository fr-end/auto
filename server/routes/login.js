var User = require('../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var hash = require('../helpers/hash.js');
var crypto = require('crypto');

var day = 24 * 60 * 60 * 1000;

module.exports = function (app) {

    // check user session
    app.get('/session/check_user', function(request, response){
        console.log('request.session', request.session);
        response.send(request.session);
    });

    // log in
    app.post(/^\/user\/check_user\/?$/, function(request, response, next){
        console.log('request.body', request.body);
        console.log('request.session', request.session);

        var email = request.body._id;
        console.log('userName', email);
        var pass = request.body.password;

        User.findById(email, function (err, user) {
            if (err) throw err; // return next(err)     in express

            if (!user) {
                return response.send(invalidData('no user', 'login', email));
            }

            // check pass
            if (user.hash != hash(pass, user.salt)) {
                return response.send(invalidData('wrong password', 'login', email));
            }

            request.session.isLoggedIn = true;
            request.session.user = email;

            request.session.reload(function(err) {
                if (err) throw err;
                console.log('session reload in login');
            });
            response.send(request.session);
            //response.redirect('/');
        });

    });

    // signup
    app.post(/^\/user\/?$/, function(request, response, next) {
        var email = request.body._id;
        console.log('userName', email);
        var pass = request.body.password;
        var checkedKeepLoggedIn = request.body.checkedKeepLoggedIn;
        console.log('checkedKeepLoggedIn', checkedKeepLoggedIn)
        console.log('request.session', request.session);

        User.findById(email, function (err, user) {
            if (err) return next(err);

            if (user) {
                return response.send(invalidData('user already exists', 'signup', email));
            }

            crypto.randomBytes(16, function (err, bytes) {
                if (err) return next(err);

                var user = { _id: email };
                user.salt = bytes.toString('utf8');
                user.hash = hash(pass, user.salt);

                User.create(user, function (err, createdUser) {
                    if (err) {
                        if (err instanceof mongoose.Error.ValidationError) {
                            return someUncorrectData(email);
                        }
                        return next(err);
                    }

                    // user created successfully
                    request.session.isLoggedIn = true;
                    request.session.user = email;
                    console.log('request.session.cookie', request.session.cookie)
                    if (checkedKeepLoggedIn){
                        request.session.cookie.maxAge = 14 * day ; // 14 days
                    } else {
                        //request.session.cookie.expires = false;
                        request.session.cookie.maxAge = day; // day
                    }

                    console.log('request.session.cookie', request.session.cookie);
                    request.session.save(function(err) {
                        console.log('session saved in signup');
                    });
                    response.send(request.session);
                    //return response.redirect('/');
                });
            })
        });

    });

    // logout
    app.post(/^\/user\/logout\/?$/, function (request, response) {
        console.log('in logout');
        console.log('request.session', request.session);
        console.log('request.session.user', request.session.user);
        request.session.isLoggedIn = false;
        request.session.user = null;
        response.send(request.session);
        //request.redirect('/');
    });

};

function someUncorrectData(email){
    console.log('there are some uncorrect data validation on the backend for', email, 'email');
}

function CustomError(type, text, form){
    this.type = type;
    this.text = text;
    this.form = form;
}

function invalidData(type, form, email){
    var errors = [];
    var text;
    if (type === 'no user'){
        text = 'Нет пользователя с таким ' + email + ' e-mail';
        errors.push(new CustomError(type, text, form))
    } else if (type === 'user already exists') {
        text = 'Пользователь ' + email + ' уже существует. Пожалуйста, войдите в аккаунт.';
        errors.push(new CustomError(type, text, form))
    } else if (type === 'wrong password') {
        text = 'Неверный пароль для пользователя ' +  email;
        errors.push(new CustomError(type, text, form))
    }
    console.log('errors in invalidData func ',errors);
    return errors;
}
