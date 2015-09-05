module.exports = (function () {

	function View(template) {
		var self = this;
		self.template = template;

	}

	View.prototype.render = function (data) {
		var self = this;		
		var viewPort = document.querySelector('[data-car-id="' + data.carId + '"]');
	    var html = self.template(data);
	    viewPort.innerHTML = html;
	};

	View.prototype.bind = function (event, handler) {

	};

	return View;

})();