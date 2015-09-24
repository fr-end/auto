module.exports = function () {

    var template	= require('./Authorization.handlebars');

    function View() {
        this.template = template;
        this.$container = document.querySelector('[data-auth=wrapper]')
    }

    View.prototype.render = function(viewCmd, data) {

        var self = this;

        var viewCommands = {

            showAuthMenu : function(data){
                self.$container.innerHTML = self.template(data)
            }
        };

        viewCommands[viewCmd](data);

    };

    View.prototype.bind = function (event, handler) {

        var self = this;
/*
        if (event === 'clickLogInButton') {
            this.$container.onclick = function (evt) {
                if (evt.target.getAttribute('data-auth') === 'login'){
                    handler();
                }
            }
        }

        if (event === 'clickLogOutButton') {
            this.$container.onclick = function (evt) {
                if (evt.target.getAttribute('data-auth') === 'logout'){
                    handler();
                }
            }
        }
*/
        if (event === 'clickSomeAuthButton') {
            this.$container.onclick = function (evt) {
                if (evt.target.getAttribute('data-auth') === 'signUp' ||
                    evt.target.getAttribute('data-auth') === 'login' ||
                    evt.target.getAttribute('data-auth') === 'logout'){

                    var action = evt.target.getAttribute('data-auth');
                    handler(action, evt.target);
                }
            }
        }

    };

    return View;

};