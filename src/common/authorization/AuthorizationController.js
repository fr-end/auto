module.exports = function(){

    var UserModel = require('./AuthorizationModel.js');

    var View 		= require('./AuthorizationView.js')();

    function AuthorizationController(){
        this.model = UserModel;
        this.view = new View();

        //this.view.bind('clickSignUpButton', (function () {
        //    var result = this.toggleWishList(this.carId);
        //    this.view.toggleClass(this.carId, result);
        //}).bind(this));
    }


    AuthorizationController.prototype = {
        init: function(){

            // why mongoose is defined here? ))
            console.log(this.model);
            var user = new mongoose.Document(
                {
                    _id: 'newmail@new.mail',
                    name: 'Vasya Pupkin',
                    password: 111
                }
                , this.model);

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
            this.view.bind('clickSomeAuthButton',(function(action, target){
                console.log(action, target);
                console.log('click', this)
            }).bind(this));
        }
    };

    return AuthorizationController;

};