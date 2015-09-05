module.exports = (function () {

	function View() {
		var self = this;
		self.template = require('./car-item.handlebars');

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