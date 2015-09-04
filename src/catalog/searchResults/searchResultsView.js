module.exports = (function () {

	function View() {
		var self = this;
		self.template = require('./searchResults.handlebars');
		self.loading = 'loading...';

		var viewPortElement = document.querySelector('[class="search-results"]');

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
				console.log('render data');
				console.dir(data);
				console.log('viewPort');
				console.dir(self.viewPort);
				self.viewPort.innerHTML = self.template(data);
			}

    	};

    	viewCommands[viewCmd](data);
	};

	View.prototype.bind = function (event, handler) {
	};

	return View;

})();