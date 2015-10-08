module.exports = (function () {

    function View() {
        this.$viewPort = document.querySelector('.main');
        this.inListSelector = '.carpage-star';
        this.viewPortCarSelector = '.carpage-wrapper';

        this.sliderSmallImgSelector = '.carpage-slider-carousel-cars-item-link__img';
        this.sliderSelector = '.carpage-slider';
        this.sliderContainer = 'carpage-slider-container';
        this.sliderBigImgClass = 'carpage-slider-bigimg__img';
        this.sliderArrowPreviousClass = 'carpage-slider-bigimg-previous__arrow';
        this.sliderArrowNextClass = 'carpage-slider-bigimg-next__arrow';
    }

    View.prototype.render = function (data) {
        this.$viewPort.innerHTML = data;
        this.$sliderContainer = document.querySelector('.' + this.sliderContainer);
        this.$sliderBigImg = document.querySelector('.'+this.sliderBigImgClass);
        document.querySelector(this.sliderSmallImgSelector).classList.add('active');
        this.$sliderBigImg.src = document.querySelector(this.sliderSmallImgSelector).src;
        document.querySelector(this.sliderSelector).addEventListener('click',(this.clickOnSlider).bind(this));
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
        document.querySelector('.active').classList.toggle('active');
        $nextImg.classList.toggle('active');

        var toDelete = document.querySelector('.'+this.sliderBigImgClass);
        toDelete.classList.add('toDelete');

        var bigImg = document.createElement('div');
        bigImg.className = "carpage-slider-bigimg left";
        var img = document.createElement('img');
        img.src = $nextImg.src;

        bigImg.appendChild(img);
        this.$sliderContainer.insertAdjacentElement('afterBegin', bigImg);
        
        bigImg.classList.remove('left');
        toDelete.remove();
        //this.$sliderContainer.remove(toDelete);

        // this.$sliderBigImg.src = $nextImg.src;
    };

    View.prototype.clickOnSlider = function(event){
        var nextImg;
        if (event.target.classList.contains(this.sliderSmallImgSelector.slice(1))) {
            this.toggleSliderBigImg(event.target);
        } else
            if (event.target.classList.contains(this.sliderArrowNextClass)||
                event.target.classList.contains(this.sliderBigImgClass)){
                nextImg = document.querySelector('.active').parentElement.parentElement;
                nextImg = nextImg.nextElementSibling ? nextImg.nextElementSibling.firstElementChild
                    .firstElementChild : nextImg.parentElement.firstElementChild.firstElementChild.firstElementChild;
                this.toggleSliderBigImg(nextImg, );
            } else
                if (event.target.classList.contains(this.sliderArrowPreviousClass)){
                    nextImg = document.querySelector('.active').parentElement.parentElement;
                    nextImg = nextImg.previousElementSibling ? nextImg.previousElementSibling.firstElementChild
                        .firstElementChild : nextImg.parentElement.lastElementChild.firstElementChild.firstElementChild;
                    this.toggleSliderBigImg(nextImg);
                }
        event.preventDefault();
    };

    return View;

})();