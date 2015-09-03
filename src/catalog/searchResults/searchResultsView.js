module.exports = (function () {

	function View(viewPort) {
		if (viewPort instanceof HTMLElement) {
    		var template = require('./searchResults.handlebars');
			var html = template();
			viewPort.innerHTML = html;	
		}		
	}

	View.prototype.render = function(viewCmd, data) {
		var viewCommands = {

    	}

    	viewCommands[viewCmd]();
	};

	View.prototype.bind = function (event, handler) {
	};

	return View;

})();