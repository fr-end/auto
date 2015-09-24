module.exports = (function () {

    var template	= require('./header.handlebars');

    function View() {
        this.template = template;
        this.$container = document.querySelector('[data-auth=wrapper]')
    }

    View.prototype.render = function(viewCmd, data) {

        var self = this;


        var viewCommands = {

            showAuthMenu : function(data){

                //var html = this.template(data);
                self.$container.innerHTML = self.template(data)
                //return html;
                //self.$viewPort.innerHTML = self.templates.self(data);
            }
        };

        viewCommands[viewCmd](data);

    };
/*
    View.prototype.bind = function (event, handler) {

        var self = this;

        if (event === 'clickAddToWishListButton') {
            document.body.addEventListener('click', (function (evt) {
                this.$inList = this.$inList || document.querySelector(this.inListSelector);
                if (evt.target === this.$inList){
                    handler();
                }
            }).bind(this));
        }

    };

    View.prototype.toggleClass = function (carId, result){
        this.$viewPort = this.$viewPort || document.querySelector(this.viewPortSelector);
        this.$viewPort.classList.toggle('in-list', result);
    };
*/
    return View;

})();