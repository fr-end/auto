module.exports = (function () {

    var CarController = require('../car/CarController')(localStorage, XMLHttpRequest);
    var template = require('./car-page.handlebars');
    var View = require('./CarPageView.js');

	function Controller(service, events) {
        this.service = service;
        this.view = new View();
        this.carController = new CarController(this.service, template);
        this.events = events;
	}

    Controller.prototype = {
        init: function(searchParams){
            console.log('init');
            //console.log(this.carController.showCar(searchParams.carId));
            this.carController.showCar(searchParams.carId)
                .then((function(data){

                    console.log(this.view);
                    this.view.render(data);
                }).bind(this));
        }
	};

	return Controller;

})();