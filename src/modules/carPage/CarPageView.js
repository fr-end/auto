module.exports = (function () {

    function View() {
        this.$viewPort = document.querySelector('.main');
        this.inListSelector = '.carpage-star';
        this.viewPortSelector = '.carpage-wraper';
    }

    View.prototype.render = function (data) {
        this.$viewPort.innerHTML = data;
    };

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

    return View;

})();