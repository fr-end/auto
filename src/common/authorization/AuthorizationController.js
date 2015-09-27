module.exports = function(){

    var mongoose = require('mongoose');

    var UserModel = require('./AuthorizationModel.js')(mongoose);

    var View 		= require('./AuthorizationView.js')();

    function AuthorizationController(){
        this.model = UserModel;
        this.view = new View();
    }


    AuthorizationController.prototype = {
        init: function(){

            console.log(this.model);
            var user = new mongoose.Document(
                {
                    _id: 'newmail@new.mail',
                    name: 'Vasya Pupkin',
                    password: 111
                }, this.model);

            console.log('user', user);
            console.log('user.toJSON', user.toJSON());

            this.view.render('showAuthMenu', {session: { isLoggedIn: false}});
/*
            this.view.bind('clickLogInButton', (function () {
                console.log('click', this)
            }).bind(this));

            this.view.bind('clickLogOutButton',(function(){
                console.log('click', this)
            }).bind(this));
*/
            var self = this;
            this.view.bind('clickSomeAuthButton',(function(action, target){

                if (action === 'login'){
                    this.view.showAuthFormWrapper(action, target);
                    this.view.showFormLogIn(action, target);

                } else if (action === 'signUp'){
                    this.view.showAuthFormWrapper(action, target);
                    this.view.showFormSignUp(action, target);
                }

                console.log(action, target);
                console.log('click', this);

            }).bind(this));



        }
    };

    return AuthorizationController;

};