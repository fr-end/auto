module.exports = (function () {

    var defaultTemplate	= require('./car.handlebars');

	function View(template) {
		this.template = template || defaultTemplate;
        this.viewPortSelector = undefined;
        this.$viewPort = undefined;
        this.inListSelector = undefined;
        this.$inList = undefined;
	}

	View.prototype.render = function (data) {
        data.price.usd = data.price.usd.toFixed(0);
        data.price.uah = data.price.uah.toFixed(0);
        this.viewPortSelector = '.item[data-car-id="' + data.carId + '"]';
        this.inListSelector = this.viewPortSelector + ' .item-header-like';
	    var html = this.template(data);
        return html;
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