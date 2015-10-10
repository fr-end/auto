module.exports = function(ajax, events){

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

                    //var evt = document.createEvent('Event');
                    //evt.initEvent('userLoggedIn',true,true);
                    //evt.wishListCount = sessionObject.user;
                    //document.dispatchEvent(evt);

                    //console.log('events', events)
                    //console.log('sessionObject.user', sessionObject.user);
                    events.publish('user', sessionObject.user);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });

            this.view.init(function(){
                self.model.logout().then(function(sessionString) {
                    var sessionObject = JSON.parse(sessionString);
                    events.publish('user', sessionObject.user);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });
            });

            this.view.bind(
                'clickSignUpSubmitButton',
                function(user){
                    self.model
                        .postUser(user)
                        .then( function (sessionStringOrErrorsArray){
                            var parsedSessionOrErrors = JSON.parse(sessionStringOrErrorsArray);
                            if (parsedSessionOrErrors.hasOwnProperty('isLoggedIn')){
                                self.view.render('renderAuthMenu', {session: parsedSessionOrErrors});
                                //console.log('parsedSessionOrErrors', parsedSessionOrErrors);
                                //console.log('parsedSessionOrErrors.cookie.originalMaxAge', parsedSessionOrErrors.cookie.originalMaxAge);

                                // current session ends after user closes a browser
                                //console.log('parsedSessionOrErrors.cookie.originalMaxAge == 0', parsedSessionOrErrors.cookie.originalMaxAge == 0);
                                //if (parsedSessionOrErrors.cookie.originalMaxAge == 0){
                                //    console.log('self.view.setCookieToZero();');
                                //    self.view.setCookieToZero();
                                //}
                                events.publish('user', parsedSessionOrErrors.user);
                                self.view.hideAuthFormWrapper();
                                self.view.showSuccessfulPopup('Спасибо вам за регистрацию. Наслаждайтесь :)');

                            } else {
                                //console.log('in else sessionStringOrErrorsArray', parsedSessionOrErrors);
                                self.view.render('renderErrors', parsedSessionOrErrors);
                            }
                        });
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
                        .then( function (sessionStringOrErrorsArray){
                            var parsedSessionOrErrors = JSON.parse(sessionStringOrErrorsArray);
                            if (parsedSessionOrErrors.hasOwnProperty('isLoggedIn')){
                                self.view.render('renderAuthMenu', {session: parsedSessionOrErrors});
                                events.publish('user', parsedSessionOrErrors.user);
                                self.view.hideAuthFormWrapper();

                                self.view.showSuccessfulPopup('Приятного времяпровождения :)');
                            } else {

                                self.view.render('renderErrors', parsedSessionOrErrors);
                            }
                        });
                },
                function(errorsArray){
                    if (errorsArray.length){
                        self.view.render('renderErrors', errorsArray);
                    }

                }
            );
         }
    };

    return AuthorizationController;

};