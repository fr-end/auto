module.exports = function () {

    var template = require('./authorization.handlebars');
    var template_popup = require('./authorization_popup.handlebars');

    function View() {
        this.template = template;
        this.template_popup = template_popup;
        this.$container = document.querySelector('[data-auth=wrapper]');

        this.visibleElements = [];
        this.visibleErrors = [];

        this.init = function(handler){
            this.initShowAuthMenu();
            // callback for user logout
            this.bind('clickSomeAuthButton', handler);
            this.bind('clickBackground');
            this.bind('clickOkButtonAfterSign');
            //this.bind('clearErrorsOnInputData');
        };
    }

    View.prototype.setLocalStorageIsLoggedIn = function(boolean){
        window.localStorage.setItem('isLoggedIn', boolean);
    };

    View.prototype.setLocalStorageCurrentUser = function(user){
        window.localStorage.setItem('user', user);
    };

    View.prototype.getLocalStorageCurrentUser = function(){
        //console.log('window.localStorage.getItem(user);', window.localStorage.getItem('user'));
        return window.localStorage.getItem('user');
    };

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
                //console.log('data in renderAuthMenu', data);
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

                if (!self.$ErrorLoginGeneral){
                    fullQueryString = dataAuthLoginString + 'general-error]';
                    self.$ErrorLoginGeneral = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorSignUpEmail){
                    fullQueryString = dataAuthSignUpString + 'email-error]';
                    self.$ErrorSignUpEmail = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorSignUpPassword){
                    fullQueryString = dataAuthSignUpString + 'password-error]';
                    self.$ErrorSignUpPassword = document.querySelector(fullQueryString);
                }

                if (!self.$ErrorSignUpGeneral){
                    fullQueryString = dataAuthSignUpString + 'general-error]';
                    self.$ErrorSignUpGeneral = document.querySelector(fullQueryString);
                }

                //console.log('in renderErrors func');
                for (var i = 0; i < errorsArray.length; i++){
                    //console.log('errorsArray[i]', errorsArray[i]);

                    // errors from front end

                    if (errorsArray[i].form === 'login'){
                        if (errorsArray[i].type === 'email' || errorsArray[i].type === 'email wrong'){
                            self.handleErrorAddition(self.$ErrorLoginEmail, errorsArray[i]);
                        }
                        if (errorsArray[i].type === 'pass'){
                            self.handleErrorAddition(self.$ErrorLoginPassword, errorsArray[i]);
                        }

                        if (errorsArray[i].type === 'email pass'){
                            self.handleErrorAddition(self.$ErrorLoginGeneral, errorsArray[i]);
                        }
                    }

                    if (errorsArray[i].form === 'signup'){

                        if (errorsArray[i].type === 'email' || errorsArray[i].type === 'email wrong'){
                            self.handleErrorAddition(self.$ErrorSignUpEmail, errorsArray[i]);
                        }

                        if (errorsArray[i].type === 'pass' || errorsArray[i].type === 'pass unequal'){
                            self.handleErrorAddition(self.$ErrorSignUpPassword, errorsArray[i]);
                        }

                        if (errorsArray[i].type === 'email pass'){
                            self.handleErrorAddition(self.$ErrorSignUpGeneral, errorsArray[i]);
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

        //if (event === 'clearErrorsOnInputData'){
        //
        //    if (!this.$authFormSignUp) {
        //        this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
        //    }
        //
        //    this.$authFormSignUp.oninput = function (evt) {
        //        removeErrorsFromForm();
        //    };
        //
        //    if (!this.$authFormLogin){
        //        this.$authFormLogin = document.querySelector('[data-auth=form-login]');
        //    }
        //
        //    this.$authFormSignUptoLogin.oninput = function (evt) {
        //        removeErrorsFromForm();
        //    };
        //
        //}

        if (event === 'setStorageEvent'){
            window.addEventListener('storage', handler);
        }

        if (event === 'clickOkButtonAfterSign'){
            if (!this.$sucessfulButton){
                this.$sucessfulButton = document.querySelector('[data-auth=success-button]');
            }
            this.$sucessfulButton.onclick = function(evt){
                evt.preventDefault();
                self.hideAuthFormWrapper();
            }
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
                text = 'Пожалуйста, введите ваш e-mail.';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'pass') {
                text = 'Пожалуйста, введите пароль.';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'email pass') {
                text = 'Пожалуйста, заполните форму.';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'email wrong') {
                text = 'Пожалуйста, введите корректный e-mail адрес.';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'pass unequal') {
                text = 'Пароли не соответствуют друг другу.';
                errors.push(new CustomError(type, text, form));
            }
            //console.log('errors in invalidData func',errors);
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
            this.$signUpChekboxKeepLoggedIn  = document.querySelector('[data-auth=form-signup-input-remember-me]');

            this.$signUpSubmitButton.onclick = function(evt){
                evt.preventDefault();
                var email = self.$signUpInputEmail.value;
                var password = self.$signUpInputPassword.value;
                var passwordRepeat = self.$signUpInputPasswordRepeat.value;
                var checkedKeepLoggedIn = self.$signUpChekboxKeepLoggedIn.checked;
                var form = 'signup';
                //console.log(email, password, passwordRepeat);

                var checkedAuthorizationFields = checkAuthorizationFields(email, password, form);

                if (checkedAuthorizationFields !== true){
                    //console.log('invalid data');
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                if (password !== passwordRepeat){
                    return handlerInvalidData(invalidData('pass unequal', form));
                }
                //console.log('self.$signUpChekboxKeepLoggedIn', self.$signUpChekboxKeepLoggedIn);
                //console.log('checkedKeepLoggedIn', checkedKeepLoggedIn);
                var newUser = {};
                newUser._id = email;
                newUser.password = password;
                newUser.checkedKeepLoggedIn = checkedKeepLoggedIn;
                handler(newUser);
            };
        }

        if (event === 'clickLoginSubmitButton') {

            this.$loginSubmitButton = document.querySelector('[data-auth=form-login-submit]');
            this.$loginInputEmail = document.querySelector('[data-auth=form-login-input-email]');
            this.$loginInputPassword = document.querySelector('[data-auth=form-login-input-pass]');
            this.$loginChekboxKeepLoggedIn = document.querySelector('[data-auth=form-login-input-remember-me]');
            this.$loginSubmitButton.onclick = function(evt){
                evt.preventDefault();
                var email = self.$loginInputEmail.value;
                var password = self.$loginInputPassword.value;
                var checkedKeepLoggedIn = self.$loginChekboxKeepLoggedIn.checked;
                //console.log('checkedKeepLoggedIn', checkedKeepLoggedIn)
                var form = 'login';

                var checkedAuthorizationFields = checkAuthorizationFields(email, password, form);

                if (checkedAuthorizationFields !== true){
                    return handlerInvalidData(checkedAuthorizationFields);
                }

                //console.log(email, password);

                var oldUser = {};
                oldUser._id = email;
                oldUser.password = password;
                oldUser.checkedKeepLoggedIn = checkedKeepLoggedIn;
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
        this.removeErrorsFromForm();
    };

    View.prototype.clearInputs = function(){
        //console.log('in clearInputs func');

        var i;

        if (!this.$authFormSignUp){
            this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
        }

        if (!this.$authFormLogin){
            this.$authFormLogin = document.querySelector('[data-auth=form-login]');
        }

        var loginInputs = this.$authFormSignUp.getElementsByTagName('input');
        var signUpInputs = this.$authFormLogin.getElementsByTagName('input');
        //console.log('loginInputs', loginInputs);


        //here and in the template set default value. also handle values on server side.
        function loopThroughtInputs(inputs){
            for (i = 0; i < inputs.length; i++){
                //console.log('inputs[i]', inputs[i].type);
                if (inputs[i].value === 'OK'){
                    continue;
                } else if (inputs[i].type === 'checkbox' && inputs[i].value === 'on'){
                    // checkbox "keep logged in"
                    //console.log('inputs[i].checked', inputs[i].checked);
                    inputs[i].checked = false;
                } else {
                    inputs[i].value = '';
                }
            }
        }

        loopThroughtInputs(loginInputs);
        loopThroughtInputs(signUpInputs);

    };

    View.prototype.removeErrorsFromForm = function(){
        //console.log('in clear errors func');
        //console.log('this.visibleErrors', this.visibleErrors);
        var i;
        if (this.visibleErrors.length){
            var length = this.visibleErrors.length;
            for (i = length - 1; i >= 0; i--){
                this.handleErrorRemoval(this.visibleErrors[i]);
                this.visibleErrors.pop();
            }
        }
    };

    View.prototype.toggleFormSignUp = function () {
        if (!this.$authFormSignUp){
            this.$authFormSignUp = document.querySelector('[data-auth=form-signup]');
        }

        this.$authFormSignUp.classList.toggle('is-not-displayed');
        this.visibleElements.push(this.$authFormSignUp);
    };

    View.prototype.toggleFormLogIn = function () {
        if (!this.$authFormLogin){
            this.$authFormLogin = document.querySelector('[data-auth=form-login]');
        }
        this.$authFormLogin.classList.toggle('is-not-displayed');
        this.visibleElements.push(this.$authFormLogin);
    };

    View.prototype.showSuccessfulPopup = function(text){
        //console.log('in showSuccessfulPopup func');
        //console.log('this.visibleElements', this.visibleElements)
        if (!this.$successfulWrapper){
            this.$successfulWrapper = document.querySelector('[data-auth=success]');
        }

        if (!this.$successfulText){
            this.$successfulText = document.querySelector('[data-auth=success-text]');
        }

        this.$successfulText.innerHTML = text;
        this.$authFormBackground.classList.remove('is-not-displayed');
        this.$authForm.classList.remove('is-not-displayed');
        this.$successfulWrapper.classList.remove('is-not-displayed');
        this.visibleElements.push(this.$authFormBackground, this.$authForm, this.$successfulWrapper);
    };

    return View;

};