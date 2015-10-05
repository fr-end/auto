module.exports = (function () {

    var CarController = require('../car/CarController')(localStorage, XMLHttpRequest);
    var template = require('./car-page.handlebars');
    var View = require('./CarPageView.js');

	function Controller(service) {
        this.service = service;
        this.view = new View();
        this.carController = new CarController(this.service, template);
        this.view.bind('clickAddToWishListButton', (function () {
            var result = this.carController.toggleWishList(this.carId);
            this.view.toggleClass(this.carId, result);
        }).bind(this));
	}

    Controller.prototype = {
        init: function(searchParams){
            try {
                this.carId = searchParams.carId;
                this.carType = searchParams.type;
                this.carController.showCar(this.carId, this.carType)
                    .then((function(data){
                        this.view.render(data);
                    }).bind(this));
            } catch (error) {
                console.log(error);
            }

        }
	};

	return Controller;

})();