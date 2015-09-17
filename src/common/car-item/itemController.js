module.exports = function(localStorage, XMLHttpRequest){

	var localService = require('../../library/local/localService')(localStorage, XMLHttpRequest);
    var View 		= require('./itemView.js');

    function ItemController(service){
        this.service = service;
        this.view = new View();

        this.view.bind('clickAddToWishListButton', (function () {
            var result = this.toggleWishList(this.carId);
            this.view.toggleClass(this.carId, result);
        }).bind(this));

    }


    ItemController.prototype = {
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

	return ItemController;

};