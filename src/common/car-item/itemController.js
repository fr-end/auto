module.exports = (function(){

	var localService = require('../../library/local/localService');

    function Controller(service,view, events){
        var self = this;

		self.events = events;
        self.service = service;
        self.view = view;

		self.events.subscribe('search ids', function(ids){
			ids.forEach(function (carId) {
				self.showCar(carId);
			});
		});

		self.view.bind('clickAddToWishListButton',function(carID){
			var result = self.toggleToWishList(carID);
			self.view.toggleClass(carID, result);
		});



    }


    Controller.prototype = {
		showCar: function(carId){
			var self = this;
			self.service.getCar2(carId)
				.then(function(data){
					data.price.usd = data.price.usd.toFixed(0);
					data.price.uah = data.price.uah.toFixed(0);
					data.inList = self.inList( carId );
					self.view.render(data);
			});
		},
		inList: function(carId){
			return localService.inList(carId);
		},
		toggleToWishList: function(carId){
			if(this.inList(carId)){
				localService.delCar(carId);
				return false;
			} else {
				localService.addCar(carId);
				return true;
			}
		}
	};

	return Controller;

})();