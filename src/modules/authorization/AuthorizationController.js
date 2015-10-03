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

            this.renderView();
            this.view.init(function(){
                self.model.logout().then(function(session) {
                    var sessionObject = JSON.parse(session);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });
            });

            //this.view.bind('clickLogoutButton', function(user){
            //    self.model.logout(user).then(function(data){
            //        console.log(data);
            //    });
            //});

            this.view.bind('clickSignUpSubmitButton', function(user){
                self.model.postUser(user).then(function(session) {
                    var sessionObject = JSON.parse(session);
                    self.view.render('renderAuthMenu', {session: sessionObject});
                });
            });

            this.view.bind('clickLoginSubmitButton', function(user){
                self.model.getUser(user).then(function(session) {
                    var sessionObject = JSON.parse(session);
                    self.view.render('renderAuthMenu', {session: sessionObject})
                });
            });
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
        },
        renderView: function(){

            this.view.render('showAuthMenu', {session: { isLoggedIn: false}});
        }
    };

    return AuthorizationController;

};