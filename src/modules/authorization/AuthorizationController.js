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

            function handleSessionOrErrors(sessionStringOrErrorsArray){
                var parsedSessionOrErrors = JSON.parse(sessionStringOrErrorsArray);
                console.log('in handleSessionOrErrors func');
                if (parsedSessionOrErrors.hasOwnProperty('isLoggedIn')){
                    self.view.render('renderAuthMenu', {session: parsedSessionOrErrors});
                    console.log('parsedSessionOrErrors', parsedSessionOrErrors);
                    console.log('parsedSessionOrErrors.cookie.originalMaxAge', parsedSessionOrErrors.cookie.originalMaxAge);

                    // current session ends after user closes a browser
                    console.log('parsedSessionOrErrors.cookie.originalMaxAge == 0', parsedSessionOrErrors.cookie.originalMaxAge == 0);
                    //if (parsedSessionOrErrors.cookie.originalMaxAge == 0){
                    //    console.log('self.view.setCookieToZero();');
                    //    self.view.setCookieToZero();
                    //}

                    self.view.hideAuthFormWrapper();
                } else {
                    //console.log('in else sessionStringOrErrorsArray', parsedSessionOrErrors);
                    self.view.render('renderErrors', parsedSessionOrErrors);
                }
            }

            this.view.bind(
                'clickSignUpSubmitButton',
                function(user){
                    self.model
                        .postUser(user)
                        .then(handleSessionOrErrors);
                },
                function(errorsArray){
                    if (errorsArray.length){
                        self.view.render('renderErrors', errorsArray);
                    }
                }
            );

            this.view.bind(
                'clickLoginSubmitButton',
                function(user) {
                    self.model
                        .getUser(user)
                        .then(handleSessionOrErrors);
                },
                function(errorsArray){
                    if (errorsArray.length){
                        self.view.render('renderErrors', errorsArray);
                    }

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