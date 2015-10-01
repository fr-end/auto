module.exports = (function () {

    var CarController = require('../car/CarController')(localStorage, XMLHttpRequest);
    var template = require('./car-page.handlebars');
    var View = require('./CarPageView.js');

	function Controller(service) {
        this.service = service;
        console.dir(service);
        this.view = new View();
        this.carController = new CarController(this.service, template);
        this.view.bind('clickAddToWishListButton', (function () {
            var result = this.carController.toggleWishList(this.carId);
            this.view.toggleClass(this.carId, result);
        }).bind(this));
	}

    Controller.prototype = {
        init: function(searchParams){
            //console.log(this.carController.showCar(searchParams.carId));
            this.carId = searchParams.carId
            this.carController.showCar(this.carId)
                .then((function(data){

                    this.view.render(data);
                }).bind(this));
        }
	};

	return Controller;

})();