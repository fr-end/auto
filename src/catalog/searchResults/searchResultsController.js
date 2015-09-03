
module.exports = (function () {

	function Controller(model, view, itemController) {
		var self = this;
		self.view = view;
		self.model = model;	
		self.itemController = itemController;

		console.dir(view);

		self.view.render('showLoading',{});
	}

	Controller.prototype = {

		showCars: function(data){
			var self = this;
			var cars = data.split(',');
			self.view.render('showCars', { cars : cars });
			cars.forEach(function(carId){
				console.log(carId);
				var viewPort = document.querySelector('[data-car-id="' + carId + '"]');
				self.itemController.showCar(carId,viewPort);
			});
		}
	
	};

	return Controller;

})();