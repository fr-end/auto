module.exports = function (ajax) {

    var template = require('./authorization.handlebars');
    var template_popup = require('./authorization_popup.handlebars');

    function View() {
        this.template = template;
        this.template_popup = template_popup;
        this.$container = document.querySelector('[data-auth=wrapper]');
        this.$authForm = undefined;
        this.$authFormBackground = undefined;
        this.$authFormSignUp = undefined;
        this.$authFormLogin = undefined;

        this.$signUpSubmitButton = undefined;
        this.$signUpInputEmail = undefined;
        this.$signUpInputPassword = undefined;
        this.$signUpInputPasswordRepeat = undefined;

        this.visibleElements = [];

        this.init = function(){
            this.bind('clickSomeAuthButton');
            this.bind('clickBackground');
            this.bind('clickLoginSubmitButton');
            this.bind('clickSignUpSubmitButton');
        };
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

        if (event === 'clickSomeAuthButton') {
            this.$container.onclick = listenClickSomeAuthButton;

            this.$authFormSignUptoLogin = document.querySelector('[data-auth=form-signup-to-login]');

            this.$authFormSignUptoLogin.onclick = clickInAuthFormTabs;

            this.$authFormLogintoSignUp = document.querySelector('[data-auth=form-login-to-signup]');

            this.$authFormLogintoSignUp.onclick = clickInAuthFormTabs;
        }

        if (event === 'clickBackground') {
            var popupBackground = document.querySelector('[data-auth=popup-background]');

            //document.body.addEventListener('click', listenClickBackground);

            popupBackground.onclick = listenClickBackground;
        }

        if (event === 'clickSignUpSubmitButton') {

            this.$signUpSubmitButton = document.querySelector('[data-auth=form-signup-submit]');
            this.$signUpInputEmail = document.querySelector('[data-auth=form-signup-input-email]');
            this.$signUpInputPassword = document.querySelector('[data-auth=form-signup-input-pass]');
            this.$signUpInputPasswordRepeat = document.querySelector('[data-auth=form-signup-input-pass-repeat]');

            this.$signUpSubmitButton.onclick = function(evt){
                evt.preventDefault();
                var email = self.$signUpInputEmail.value;
                var password = self.$signUpInputPassword.value;
                var passwordRepeat = self.$signUpInputPasswordRepeat.value;

                console.log(email, password, passwordRepeat);

                if (password !== passwordRepeat){
                    console.log ('PASSWORDS AREN"T EQUAL!');
                    return;
                }

                ajax.getPromisePost('/db/user', {_id: email, password: password})
                    .then(function(data){console.log(data);});

                //self.hideAuthFormWrapper();
            }
        }

        function listenClickSomeAuthButton (evt){
            if (evt.target.getAttribute('data-auth') === 'signUp' ||
                evt.target.getAttribute('data-auth') === 'login' ||
                evt.target.getAttribute('data-auth') === 'logout') {
                evt.preventDefault();
                var action = evt.target.getAttribute('data-auth');

                if (action === 'login'){
                    self.showAuthFormWrapper();
                    self.toggleFormLogIn();

                } else if (action === 'signUp'){
                    self.showAuthFormWrapper();
                    self.toggleFormSignUp();
                }
            }
        }

        function clickInAuthFormTabs(evt){
            self.toggleFormLogIn();
            self.toggleFormSignUp();
            evt.preventDefault();
        }

        function listenClickBackground(evt) {
            //console.log(evt.target);
            var parent = document.querySelector('[data-auth=form]');
            //console.log(!isDescendant(parent, evt.target));
            if (!isDescendant(parent, evt.target)) {
                self.hideAuthFormWrapper();
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
    };

    View.prototype.showAuthFormWrapper = function () {
        this.$authForm = document.querySelector('[data-auth=form]');
        this.$authFormBackground = document.querySelector('[data-auth=popup-background]');
        this.$authForm.classList.remove('is-not-displayed');
        this.$authFormBackground.classList.remove('is-not-displayed');
        this.visibleElements.push(this.$authForm, this.$authFormBackground);

    };

    View.prototype.hideAuthFormWrapper = function(){

        //console.log(this.visibleElements);

        //if (!this.visibleElements.length){
        //    return;
        //}

        for (var i = 0; i < this.visibleElements.length; i++){
            this.visibleElements[i].classList.add('is-not-displayed');
        }

        this.visibleElements = [];
    };

    View.prototype.toggleFormSignUp = function () {

        this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
        this.$authFormSignUp.classList.toggle('is-not-displayed');
        this.visibleElements.push(this.$authFormSignUp);
    };

    View.prototype.toggleFormLogIn = function () {
        this.$authFormLogin = document.querySelector('[data-auth=form-login]');
        this.$authFormLogin.classList.toggle('is-not-displayed');
        this.visibleElements.push(this.$authFormLogin);
    };

    return View;

};