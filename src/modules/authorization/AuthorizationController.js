module.exports = function(ajax){

    var mongoose = require('mongoose');

    var UserModel = require('./AuthorizationModel.js')(ajax);

    var View 		= require('./AuthorizationView.js')();

    function AuthorizationController(){
        this.model = new UserModel();
        this.view = new View();
        this.started = false;
    }

    AuthorizationController.prototype = {
        init: function(){

            var self = this;

            if ( this.started ) {
                return;
            }
            this.started = true;

            this.model
                .checkSession()
                .then(function(sessionString){
                    var sessionObject = JSON.parse(sessionString);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });

            this.view.init(function(){
                self.model.logout().then(function(sessionString) {
                    var sessionObject = JSON.parse(sessionString);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });
            });

            //this.view.bind('clickLogoutButton', function(user){
            //    self.model.logout(user).then(function(data){
            //        console.log(data);
            //    });
            //});

            this.view.bind(
                'clickSignUpSubmitButton',
                function(user){
                    self.model.postUser(user).then(function(sessionString) {
                        var sessionObject = JSON.parse(sessionString);
                        self.view.render('renderAuthMenu', {session: sessionObject});
                    });
                },
                function(errorMsg){
                    self.view.render('renderErrors', { error: errorMsg })
                }
            );

            this.view.bind(
                'clickLoginSubmitButton',
                function(user) {
                    self.model.getUser(user)
                        .then(function (sessionString) {
                            var sessionObject = JSON.parse(sessionString);
                            self.view.render('renderAuthMenu', {session: sessionObject})
                        });
                },
                function(errorMsg){
                    self.view.render('renderErrors', { error: errorMsg })
                }
            );
            /*
            console.log(this.model);
            var user = new mongoose.Document(
                {
                    _id: 'newmail@new.mail',
                    name: 'Vasya Pupkin',
                    password: 111
                }, this.model);

            console.log('user', user);
            console.log('user.toJSON', user.toJSON());
            */
        }
    };

    return AuthorizationController;

};