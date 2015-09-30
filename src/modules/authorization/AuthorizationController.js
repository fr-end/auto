module.exports = function(ajax){

    var mongoose = require('mongoose');

    var UserModel = require('./AuthorizationModel.js')(mongoose);

    var View 		= require('./AuthorizationView.js')(ajax);

    function AuthorizationController(){
        this.model = UserModel;
        this.view = new View();
        this.started = false;
    }

    AuthorizationController.prototype = {
        init: function(){

            if ( this.started ) {
                return;
            }
            this.started = true;

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

            this.view.render('showAuthMenu', {session: { isLoggedIn: false}});

            this.view.bind('clickSomeAuthButton',(function(action, target){

                if (action === 'login'){
                    this.view.showAuthFormWrapper(action, target);
                    this.view.toggleFormLogIn(action, target);

                } else if (action === 'signUp'){
                    this.view.showAuthFormWrapper(action, target);
                    this.view.toggleFormSignUp(action, target);
                }

                console.log(action, target);
                console.log('click', this);

            }).bind(this));

            this.view.bind('clickBackground');

            this.view.bind('clickLoginSubmitButton');

            this.view.bind('clickSignUpSubmitButton');

        }
    };

    return AuthorizationController;

};