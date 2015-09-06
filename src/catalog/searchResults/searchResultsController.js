module.exports = (function () {

	function Controller(service, model, view, item) {
		var self = this;
		self.service = service;
		self.view = view;
		self.model = model;	
		self.item = item;
	}

	Controller.prototype = {

		getCarIDsFromURL: function(searchParams){
			var self = this;
			self.service.getCarIds(searchParams).then(function(data){
				var carIDs = JSON.parse(data).result.search_result.ids;
				console.log(carIDs);
				self.showCars(carIDs);
			});
		},

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