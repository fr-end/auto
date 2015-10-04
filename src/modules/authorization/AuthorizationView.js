module.exports = function (ajax) {

    var template = require('./authorization.handlebars');
    var template_errors = require('./authorization_errors.handlebars');
    var template_popup = require('./authorization_popup.handlebars');

    function View() {
        this.template = template;
        this.template_popup = template_popup;
        this.template_errors = template_errors;
        this.$container = document.querySelector('[data-auth=wrapper]');
        this.$errors = undefined;
        this.$authForm = undefined;
        this.$authFormBackground = undefined;
        this.$authFormSignUp = undefined;
        this.$authFormLogin = undefined;

        this.$signUpSubmitButton = undefined;
        this.$signUpInputEmail = undefined;
        this.$signUpInputPassword = undefined;
        this.$signUpInputPasswordRepeat = undefined;

        this.visibleElements = [];

        this.init = function(handler){
            this.initShowAuthMenu();
            // callback for user logout
            this.bind('clickSomeAuthButton', handler);
            this.bind('clickBackground');

        };
    }

    View.prototype.initShowAuthMenu = function () {
        var popup = document.createElement('div');
        popup.innerHTML = this.template_popup();
        document.body.appendChild(popup.firstElementChild);
    };

    View.prototype.render = function (viewCmd, data) {

        var self = this;

        var viewCommands = {
            renderAuthMenu: function (data){
                console.log('data in renderAuthMenu', data);
                self.$container.innerHTML = self.template(data);
            },
            renderErrors: function(errors){
                console.log('in renderErrors func');
                console.log('errors', errors);
                self.$errors = document.querySelector('[data-auth=errors-wrapper]');
                self.$errors.innerHTML = self.template_errors(errors);
            }
        };

        viewCommands[viewCmd](data);

    };

    View.prototype.bind = function (event, handler, handlerInvalidData) {

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

        function invalidData(type){
            var text = '';
            if (type === 'email'){
                text = 'please provide email!';
            } else if (type === 'pass') {
                text = 'please provide password!';
            } else if (type === 'email pass') {
                text = 'please fill in the fields!';
            } else if (type === 'email wrong') {
                text = 'please provide correct email address!';
            } else if (type === 'pass unequal') {
                text = 'passwords aren\'t equal';
            }
            return text;
        }

        function checkAuthorizationFields(email, password){

            if(!email && password){
                return invalidData('email');
            }  else if(!password && email){
                return invalidData('pass')
            } else if (!(email && password)) {
                return invalidData('email pass');
            }

            var regexForEmailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            if(!regexForEmailValidation.test(email)){
                return invalidData('email wrong');
            }

            return true;

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

                //console.log(email, password, passwordRepeat);

                var checkedAuthorizationFields = checkAuthorizationFields(email, password);

                if (checkedAuthorizationFields !== true){
                    console.log('invelod data');
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                if (password !== passwordRepeat){
                    return handlerInvalidData(invalidData('pass unequal'));
                }

                var newUser = {};
                newUser._id = email;
                newUser.password = password;

                handler(newUser);

                self.hideAuthFormWrapper();
            }
        }

        if (event === 'clickLoginSubmitButton') {

            this.$loginSubmitButton = document.querySelector('[data-auth=form-login-submit]');
            this.$loginInputEmail = document.querySelector('[data-auth=form-login-input-email]');
            this.$loginInputPassword = document.querySelector('[data-auth=form-login-input-pass]');

            this.$loginSubmitButton.onclick = function(evt){
                evt.preventDefault();
                var email = self.$loginInputEmail.value;
                var password = self.$loginInputPassword.value;

                var checkedAuthorizationFields = checkAuthorizationFields(email, password);

                if (checkedAuthorizationFields !== true){
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                console.log(email, password);

                var oldUser = {};
                oldUser._id = email;
                oldUser.password = password;
                handler(oldUser);
                self.hideAuthFormWrapper();
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
                } else if (action === 'logout'){
                    handler();
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