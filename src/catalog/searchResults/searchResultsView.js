module.exports = (function () {

	function View(viewPortId) {
		var self = this;
		self.template = require('./searchResults.handlebars');
		self.loading = 'loading...';

		viewPortElement = document.getElementById(viewPortId);

		if (viewPortElement instanceof HTMLElement) {
			self.viewPort = viewPortElement;
		} else {
			self.viewPort = document.createDocumentFragment();
		}
	}

	View.prototype.render = function(viewCmd, data) {

		var self = this;

		var viewCommands = {
			showLoading : function() {
				self.viewPort.innerHTML = self.loading;
			},
			showCars : function(data){
				self.viewPort.innerHTML = self.template(data);
			}

    	}

    	viewCommands[viewCmd](data);
	};

	View.prototype.bind = function (event, handler) {
	};

	return View;

})();