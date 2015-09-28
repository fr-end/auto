module.exports = function () {

    var template = require('./authorization.handlebars');
    var template_popup = require('./authorization_popup.handlebars');

    function View() {
        this.template = template;
        this.template_popup = template_popup;
        this.$container = document.querySelector('[data-auth=wrapper]');


    }

    View.prototype.render = function (viewCmd, data) {

        var self = this;

        var viewCommands = {
            showAuthMenu: function (data) {
                self.$container.innerHTML = self.template(data);
                var popup = document.createElement('div');
                popup.innerHTML = self.template_popup();
                document.body.appendChild(popup.firstElementChild);
            }
        };

        viewCommands[viewCmd](data);

    };

    View.prototype.bind = function (event, handler) {

        var self = this;

        function listenClickSomeAuthButton (evt){
            if (evt.target.getAttribute('data-auth') === 'signUp' ||
                evt.target.getAttribute('data-auth') === 'login' ||
                evt.target.getAttribute('data-auth') === 'logout') {
                evt.preventDefault();
                var action = evt.target.getAttribute('data-auth');
                handler(action, evt.target);

                self.$container.removeEventListener('click', listenClickSomeAuthButton);

                self.bind('clickBackground');

            }
        }

        if (event === 'clickSomeAuthButton') {
            this.$container.addEventListener('click', listenClickSomeAuthButton);
        }

        function listenClickBackground(evt) {
            console.log(evt.target);
            var parent = document.querySelector('[data-auth=form]');
            console.log(!isDescendant(parent, evt.target));
            if (!isDescendant(parent, evt.target)) {
                //self.hideAuthFormWrapper();
            }
        }

        function isDescendant(parent, child) {
            var node = child.parentNode;
            while (node !== null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }

        if (event === 'clickBackground') {
            document.body.addEventListener('click', listenClickBackground);

            //this.$container.onclick =  null;
            //handler();

            //this.$container.onclick = null;
            //document.body.onclick = function (evt) {
            //    //self.toggleAuthFormWrapper();
            //
            //    console.log(evt.target);
            //
            //};
        }

    };


    View.prototype.showAuthFormWrapper = function (action, target) {
        var self = this;

        this.$authForm = document.querySelector('[data-auth=form]');
        this.$authFormBackground = document.querySelector('[data-auth=background]');
        this.$authForm.classList.remove('is-not-displayed');
        this.$authFormBackground.classList.remove('is-not-displayed');


        //document.body.onclick = function (){
        //    self.$authForm.classList.add('is-not-displayed');
        //    self.$authFormBackground.classList.add('is-not-displayed');
        //    document.body.onclick = null;
        //};
        /*
        if (!document.body.onclick) {

            document.body.onclick = function (evt) {
                self.toggleAuthFormWrapper();

                console.log(evt.target);

            };
            //this.$authForm.onclick = function (evt){
            //    evt.preventDefault();
            //}
        } else {
            document.body.onclick = null;
            this.$authForm.onclick = null;
        }


        this.$LogIntoSignUpButton = document.querySelector('[data-auth=form-signup-to-login]');
        */
    };

    View.prototype.hideAuthFormWrapper = function(){
        this.$authForm.classList.add('is-not-displayed');
        this.$authFormBackground.classList.add('is-not-displayed');
    };

    View.prototype.showFormSignUp = function (action, target) {
        this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
        this.$authFormSignUp.classList.toggle('is-not-displayed');

    };

    View.prototype.showFormLogIn = function (action, target) {
        this.$authFormLogin = document.querySelector('[data-auth=form-login]');
        this.$authFormLogin.classList.toggle('is-not-displayed');
    };


    //View.prototype.toggleEventForTabs = function () {
    //
    //    this.$LogIntoSignUpButton = document.querySelector('[data-auth=form-signup-to-login]');
    //    this.$SignUptoLogInButton = document.querySelector('[data-auth=form-signup-to-login]');
    //
    //    if (!this.$LogIntoSignUpButton.onclick){
    //        this.$LogIntoSignUpButton.onclick = function(event){
    //            event.preventDefault();
    //            this.toggleFormSignUp();
    //        }
    //    }
/*
        if (event === 'clickLogIntoSignUpButton') {

            this.$LogIntoSignUpButton.onclick = function (evt) {
                if (evt.target.getAttribute('data-auth') === 'login') {
                    handler();
                }
            }
        }

        if (event === 'clickLogOutButton') {
            this.$container.onclick = function (evt) {
                if (evt.target.getAttribute('data-auth') === 'logout') {
                    handler();
                }
            }
        }
    }
    */


    return View;

};