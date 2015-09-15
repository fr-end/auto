module.exports = (function () {

	function View(template) {
		var self = this;
		self.template = template;

	}

	View.prototype.render = function (data) {
		var self = this;		
		var viewPort = document.querySelector('[data-car-id="' + data.carId + '"]');
        data.price.usd = data.price.usd.toFixed(0);
        data.price.uah = data.price.uah.toFixed(0);
	    var html = self.template(data);
	    viewPort.innerHTML = html;
        return html;
	};

	View.prototype.bind = function (event, handler) {

		var self = this;

		if (event === 'clickAddToWishListButton') {
			document.body.addEventListener('click', function (evt) {
				if (evt.target.hasAttribute('data-item-id')){
					var carID = evt.target.getAttribute('data-item-id');
					handler(carID);
				}
			});
		}

	};

	View.prototype.toggleClass = function (carId, result){
		var viewPort = document.querySelector('[data-car-id="' + carId + '"] .item');
		viewPort.classList.toggle('in-list', result);
	};

	return View;

})();