module.exports = (function(){

	var localService = require('../../library/local/localService');
    var View 		= require('./itemView.js');
    var template	= require('./car-item.handlebars');


    function Controller(service, events){
		this.events = events;
        this.service = service;
        this.view = new View(template);

		this.events.subscribe('search ids', (function(ids){
			ids.forEach((function (carId) {
				this.showCar(carId);
			}).bind(this));
		}).bind(this));

		this.view.bind('clickAddToWishListButton',(function(carID){
			var result = this.toggleWishList(carID);
			this.view.toggleClass(carID, result);
		}).bind(this));



    }


    Controller.prototype = {
		showCar: function(carId){
			this.service.getCar2(carId)
				.then((function(data){
					data.inList = this.inList( carId );
					this.view.render(data);
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

	return Controller;

})();