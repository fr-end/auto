module.exports = (function(){

	var localService = require('../../library/local/localService');
    var View 		= require('./itemView.js');
    var template	= require('./car-item.handlebars');

    var evented = false;

    function itemController(service, events){
		this.events = events;
        this.service = service;
        this.view = new View(template);

		this.events.subscribe('search ids', (function(ids){
			ids.forEach((function (carId) {
				this.showCar(carId);
			}).bind(this));
		}).bind(this));

        if(!evented) {
            this.view.bind('clickAddToWishListButton', (function (carId) {
                var result = this.toggleWishList(carId);
                this.view.toggleClass(carId, result);
            }).bind(this));
            evented = true;
        }

    }


    itemController.prototype = {
		showCar: function(carId){
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