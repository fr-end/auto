module.exports = (function () {

	function Controller(model, view, item) {
		var self = this;
		self.view = view;
		self.model = model;	
		self.item = item;
	}

	Controller.prototype = {

		showCars: function(data) {
			var self = this;
			console.log('input data');
			console.dir(data);
			self.view.render('showCars', { cars : data });
			data.forEach(function (carId) {
				self.item.showCar(carId);
			});
		}
	
	};

	return Controller;

})();