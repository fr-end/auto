module.exports = function () {

    var template = require('./authorization.handlebars');
    var template_popup = require('./authorization_popup.handlebars');

    function View() {
        this.template = template;
        this.template_popup = template_popup;
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
        this.visibleErrors = [];

        this.init = function(handler){
            this.initShowAuthMenu();
            // callback for user logout
            this.bind('clickSomeAuthButton', handler);
            this.bind('clickBackground');
            this.bind('clearErrorsOnInputData');
        };
    }

    View.prototype.initShowAuthMenu = function () {
        var popup = document.createElement('div');
        popup.innerHTML = this.template_popup();
        document.body.appendChild(popup.firstElementChild);
    };

    View.prototype.handleErrorAddition = function(node, currentError){
        node.classList.remove('is-not-displayed');
        node.innerHTML = currentError.text;
        this.visibleErrors.push(node);
    };

    View.prototype.handleErrorRemoval = function(node){
        node.classList.add('is-not-displayed');
        node.innerHTML = '';
    };

    View.prototype.render = function (viewCmd, data) {

        var self = this;

        var viewCommands = {
            renderAuthMenu: function (data){
                console.log('data in renderAuthMenu', data);
                self.$container.innerHTML = self.template(data);
            },
            renderErrors: function(errorsArray){
                var dataAuthLoginString = '[data-auth=form-login-input-';
                var dataAuthSignUpString = '[data-auth=form-signup-input-';
                var fullQueryString;

                if (!self.$errors){
                    self.$errors = document.querySelector('[data-auth=errors-wrapper]');
                }

                if (!self.$ErrorLoginEmail){
                    fullQueryString = dataAuthLoginString + 'email-error]';
                    self.$ErrorLoginEmail = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorLoginPassword){
                    fullQueryString = dataAuthLoginString + 'password-error]';
                    self.$ErrorLoginPassword = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorSignUpEmail){
                    fullQueryString = dataAuthSignUpString + 'email-error]';
                    self.$ErrorSignUpEmail = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorSignUpPassword){
                    fullQueryString = dataAuthSignUpString + 'password-error]';
                    self.$ErrorSignUpPassword = document.querySelector(fullQueryString);
                }

                console.log('in renderErrors func');
                for (var i = 0; i < errorsArray.length; i++){
                    console.log('errorsArray[i]', errorsArray[i]);

                    // errors from front end

                    if (errorsArray[i].form === 'login'){
                        if (errorsArray[i].type === 'email' || errorsArray[i].type === 'email wrong'){
                            self.handleErrorAddition(self.$ErrorLoginEmail, errorsArray[i]);
                        }
                        if (errorsArray[i].type === 'pass'){
                            self.handleErrorAddition(self.$ErrorLoginPassword, errorsArray[i]);
                        }
                    }

                    if (errorsArray[i].form === 'signup'){

                        if (errorsArray[i].type === 'email' || errorsArray[i].type === 'email wrong'){
                            self.handleErrorAddition(self.$ErrorSignUpEmail, errorsArray[i]);
                        }

                        if (errorsArray[i].type === 'pass' || errorsArray[i].type === 'pass unequal'){
                            self.handleErrorAddition(self.$ErrorSignUpPassword, errorsArray[i]);
                        }

                    }

                    // errors from backend

                    if (errorsArray[i].form === 'login'){
                        if (errorsArray[i].type === 'no user'){
                            self.handleErrorAddition(self.$ErrorLoginEmail, errorsArray[i]);
                        } else if (errorsArray[i].type === 'wrong password'){
                            self.handleErrorAddition(self.$ErrorLoginPassword, errorsArray[i]);
                        }
                    }

                    if (errorsArray[i].form === 'signup'){
                        if (errorsArray[i].type === 'user already exists'){
                            self.handleErrorAddition(self.$ErrorSignUpEmail, errorsArray[i]);
                        }
                    }
                }
            }
        };

        viewCommands[viewCmd](data);

    };

    View.prototype.bind = function (event, handler, handlerInvalidData) {

        var self = this;

        function removeErrorsFromForm(){

            if (self.visibleErrors.length){
                var length = self.visibleErrors.length;
                for (var i = length - 1; i >= 0; i--){
                    self.handleErrorRemoval(self.visibleErrors[i]);
                    self.visibleErrors.pop();
                }
            }
        }

        if (event === 'clearErrorsOnInputData'){

            if (!this.$authFormSignUp) {
                this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
            }

            this.$authFormSignUp.oninput = function (evt) {
                removeErrorsFromForm();
            };

            if (!this.$authFormLogin){
                this.$authFormLogin = document.querySelector('[data-auth=form-login]');
            }

            this.$authFormSignUptoLogin.oninput = function (evt) {
                removeErrorsFromForm();
            };

        }


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

        function CustomError(type, text, form){
            this.type = type;
            this.text = text;
            this.form = form;
        }

        function invalidData(type, form){
            var errors = [];
            var text;
            if (type === 'email'){
                text = 'please provide email!';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'pass') {
                text = 'please provide password!';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'email pass') {
                text = 'please fill in the fields!';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'email wrong') {
                text = 'please provide correct email address!';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'pass unequal') {
                text = 'passwords aren\'t equal';
                errors.push(new CustomError(type, text, form));
            }
            console.log('errors in invalidData func',errors);
            return errors;
        }

        function checkAuthorizationFields(email, password, form){

            if(!email && password){
                return invalidData('email', form);
            }  else if(!password && email){
                return invalidData('pass', form);
            } else if (!(email && password)) {
                return invalidData('email pass', form);
            }

            var regexForEmailValidation =
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            if(!regexForEmailValidation.test(email)){
                return invalidData('email wrong', form);
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
                var form = 'signup';
                //console.log(email, password, passwordRepeat);

                var checkedAuthorizationFields = checkAuthorizationFields(email, password, form);

                if (checkedAuthorizationFields !== true){
                    console.log('invalid data');
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                if (password !== passwordRepeat){
                    return handlerInvalidData(invalidData('pass unequal', form));
                }

                var newUser = {};
                newUser._id = email;
                newUser.password = password;

                handler(newUser);
            };
        }

        if (event === 'clickLoginSubmitButton') {

            this.$loginSubmitButton = document.querySelector('[data-auth=form-login-submit]');
            this.$loginInputEmail = document.querySelector('[data-auth=form-login-input-email]');
            this.$loginInputPassword = document.querySelector('[data-auth=form-login-input-pass]');

            this.$loginSubmitButton.onclick = function(evt){
                evt.preventDefault();
                var email = self.$loginInputEmail.value;
                var password = self.$loginInputPassword.value;
                var form = 'login';

                var checkedAuthorizationFields = checkAuthorizationFields(email, password, form);

                if (checkedAuthorizationFields !== true){
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                console.log(email, password);

                var oldUser = {};
                oldUser._id = email;
                oldUser.password = password;
                handler(oldUser);
            };
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
        var i;

        //console.log(this.visibleElements);

        //if (!this.visibleElements.length){
        //    return;
        //}

        for (i = 0; i < this.visibleElements.length; i++){
            this.visibleElements[i].classList.add('is-not-displayed');
        }

        this.visibleElements = [];
        this.clearInputs();
        this.clearErrors();
    };

    View.prototype.clearInputs = function(){
        console.log('in clearInputs func');

        var i;
        var loginInputs = this.$authFormSignUp.getElementsByTagName('input');
        var signUpInputs = this.$authFormLogin.getElementsByTagName('input');
        console.log('loginInputs', loginInputs);

        function loopThroughtInputs(inputs){
            for (i = 0; i < inputs.length; i++){
                if (inputs[i].value === 'OK'){
                    continue;
                } else {
                    inputs[i].value = '';
                }
            }
        }

        loopThroughtInputs(loginInputs);
        loopThroughtInputs(signUpInputs);

    };

    View.prototype.clearErrors = function(){
        var i;
        if (this.visibleErrors.length){
            for (i = 0; i < this.visibleErrors.length; i++){
                this.handleErrorRemoval(this.visibleErrors[i]);
            }
        }
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