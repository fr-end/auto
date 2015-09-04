
module.exports = (function () {

	function Controller(model, view, itemController) {
		var self = this;
		self.view = view;
		self.model = model;	
		self.itemController = itemController;
	}

	Controller.prototype = {

		showCars: function(data){
			var self = this;
			console.log('input data');
			console.dir(data);
			self.view.render('showCars', { cars : data });
			data.forEach(function(carId){
				self.itemController.showCar(carId);
			});
		}
	
	};

	return Controller;

})();