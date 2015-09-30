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

            this.view.render('showAuthMenu', {session: { isLoggedIn: false}});
            this.view.init();

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