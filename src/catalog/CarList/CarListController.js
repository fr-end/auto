module.exports = (function () {

    var Model       = require('./CarListModel.js');
    var View        = require('./CarListView.js');

    var Car = require('../../common/car-item/itemController.js');

    var Q = require('../../../node_modules/q/q.js');

	function CarListController(service, events) {
        this.service = service;
        this.model = new Model(service);
        this.view = new View();
        this.events = events;
	}

    CarListController.prototype = {

		getCarIDsFromURL: function(searchParams){
			this.service.getCarIds(searchParams).then((function(data){
				this.showCars(data);
			}).bind(this));
		},

		showCars: function(carIds) {
            carGets = [];
            carIds.forEach((function(carId){
                var car = new Car(this.service,this.events);
                carGets.push(car.showCar(carId));
            }).bind(this));
            Q.allSettled(carGets)
                .then(function(data){
                    console.log('allSettled');
                    var cars=[];
                    console.log(data,'data');
                    data.forEach(function(result){
                        if (result.state === "fulfilled") {
                            cars.push(result.value);
                        } else {
                          //  var reason = result.reason;
                        }
                    });
                    console.log(cars,'cars');
                    return cars;
                })
                .then((function(cars){
                    console.log(cars,'cars');
                    this.view.render('showCars', { cars : cars});
                }).bind(this));
		}
	
	};

	return CarListController;

})();