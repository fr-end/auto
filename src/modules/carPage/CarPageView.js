module.exports = (function () {

    function View() {
        this.$viewPort = document.querySelector('.main');
        this.inListSelector = '.carpage-star';
        this.viewPortCarSelector = '.carpage-wraper';
        this.sliderSmallImgSelector = '.carpage-slider-carousel-cars-item-link__img';
        this.sliderUlSelector = '.carpage-slider-carousel-cars';
    }

    View.prototype.render = function (data) {
        this.$viewPort.innerHTML = data;
        this.$sliderBigImg = document.querySelector('.carpage-slider-bigimg__img');
        this.$sliderBigImg.src = document.querySelector(this.sliderSmallImgSelector).src;
        this.$sliderUl = document.querySelector();
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
        this.$viewPortCar = this.$viewPortCar || document.querySelector(this.viewPortCarSelector);
        this.$viewPortCar.classList.toggle('in-list', result);
    };
    
    View.prototype.toggleSliderBigImg = function ($nextImg) {
        document.querySelector(this.sliderSmallImgSelector + ' .active').classList.toggle('active');
        $nextImg.classList.toggle('active');
        this.$sliderBigImg.src = $nextImg.src;
    }

    return View;

})();