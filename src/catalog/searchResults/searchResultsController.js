
module.exports = (function () {

	function Controller(viewPort) {
		var self = this;
		self.model = require('./searchResultsService.js');
		view = require('./searchResultsView.js');
		var searchResultsViewPort = document.getElementById(viewPort);
		self.view = view(searchResultsViewPort);
	}

	Controller.prototype.setViewPort = function(first_argument) {
		// body...
	};

	Controller.prototype.showCars = function (data) {
		var self = this;
		self.view.render('showCars', data);
	};

	return Controller;

})();