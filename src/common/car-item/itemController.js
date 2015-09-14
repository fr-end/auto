module.exports = (function(){

	var localService = require('../../library/local/localService');
    var View 		= require('./itemView.js');
    var template	= require('./car-item.handlebars');


    function Controller(service, events){
		this.events = events;
        this.service = service;
        this.view = new View(template);

        self = this;

		self.events.subscribe('search ids', function(ids){
			ids.forEach(function (carId) {
				self.showCar(carId);
			});
		});

		self.view.bind('clickAddToWishListButton',function(carID){
			var result = self.toggleWishList(carID);
			self.view.toggleClass(carID, result);
		});



    }


    Controller.prototype = {
		showCar: function(carId){
			var self = this;
			self.service.getCar2(carId)
				.then(function(data){
					data.inList = self.inList( carId );
					self.view.render(data);
			});
		},
		inList: function(carId){
			return localService.inList(carId);
		},
		toggleWishList: function(carId){
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