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

            if ( this.started ) {
                return;
            }
            this.started = true;

            this.checkUserSession();

            this.view.init(this.handleLogout);

            this.bindEventsToView();
        },
        handleLogout: function(){
            var self = this;
            console.log('in handleLogout');
            console.log('this', this);
            console.log('this.model', this.model);

            this.model.logout().then(function(sessionString) {
                var sessionObject = JSON.parse(sessionString);

                self.view.setLocalStorageIsLoggedIn(false);
                self.view.setLocalStorageCurrentUser(null);
                events.publish('user', sessionObject.user);
                self.view.render('renderAuthMenu', {session: sessionObject});
            });
        },
        checkUserSession: function(){
            var self = this;

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

                    if (sessionObject.isLoggedIn) {
                        self.view.setLocalStorageIsLoggedIn(true);

                    } else {
                        self.view.setLocalStorageIsLoggedIn(false);
                    }
                    self.view.setLocalStorageCurrentUser(sessionObject.user);
                    events.publish('user', sessionObject.user);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });
        },
        bindEventsToView: function(){
            var self = this;

            this.view.bind(
                'clickSignUpSubmitButton',
                function(user){
                    self.model
                        .postUser(user)
                        .then( function (sessionStringOrErrorsArray){
                            var message = 'Спасибо вам за регистрацию. Наслаждайтесь :)';
                            self.handleUserSessionOrError(sessionStringOrErrorsArray, message)
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
                            var message = 'Приятного времяпровождения :)';
                            self.handleUserSessionOrError(sessionStringOrErrorsArray, message)
                        });
                },
                function(errorsArray){
                    if (errorsArray.length){
                        self.view.render('renderErrors', errorsArray);
                    }

                }
            );

            this.view.bind('setStorageEvent', function(event){
                if (event.key === 'isLoggedIn') {
                    var parsedOldValue = JSON.parse(event.oldValue);
                    var parsedNewValue = JSON.parse(event.newValue);
                    var currentUser;
                    if (parsedNewValue === true){
                        currentUser = self.view.getLocalStorageCurrentUser();
                    } else {
                        currentUser = null;
                    }
                    //console.log('event.oldValue', event.oldValue);
                    //console.log('event.newValue', event.newValue);
                    if (parsedOldValue != parsedNewValue){
                        //console.log('parsedOldValue', parsedOldValue);
                        //console.log('parsedNewValue', parsedNewValue);
                        //console.log('currentUser', currentUser);
                        events.publish('user', currentUser);
                        self.view.render('renderAuthMenu', {session: {isLoggedIn: parsedNewValue}});
                        //console.log('after rendering');
                    }
                }
            });
        },
        handleUserSessionOrError: function(sessionStringOrErrorsArray, message){
            var parsedSessionOrErrors = JSON.parse(sessionStringOrErrorsArray);
            if (parsedSessionOrErrors.hasOwnProperty('isLoggedIn')){
                this.view.render('renderAuthMenu', {session: parsedSessionOrErrors});
                this.view.setLocalStorageIsLoggedIn(true);
                this.view.setLocalStorageCurrentUser(parsedSessionOrErrors.user);
                events.publish('user', parsedSessionOrErrors.user);
                this.view.hideAuthFormWrapper();

                this.view.showSuccessfulPopup(message);
            } else {
                this.view.render('renderErrors', parsedSessionOrErrors);
            }
        }
    };

    return AuthorizationController;

};