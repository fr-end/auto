
module.exports = (function () {

	function Controller(view, model) {
		var self = this;
		self.view = view;
		self.model = model;	
	}

	Controller.prototype = {

		showCars: function(data){
			var self = this;
			self.view.render('showCars', data);
		}
	
	};

	return Controller;

})();