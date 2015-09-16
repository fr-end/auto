module.exports = (function(){

	var localService = require('../../library/local/localService');
    var View 		= require('./itemView.js');
    var template	= require('./car-item.handlebars');

    function itemController(service){
        this.service = service;
        this.view = new View(template);

        this.view.bind('clickAddToWishListButton', (function () {
            var result = this.toggleWishList(this.carId);
            this.view.toggleClass(this.carId, result);
        }).bind(this));

    }


    itemController.prototype = {
		showCar: function(carId){
            this.carId = carId;
			return this.service.getCar(carId)
				.then((function(data){
					data.inList = this.inList( carId );
					return this.view.render(data);
			}).bind(this));
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

	return itemController;

})();