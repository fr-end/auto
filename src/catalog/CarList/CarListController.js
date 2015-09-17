module.exports = function (document, localStorage, XMLHttpRequest) {

    var Model       = require('./CarListModel.js');
    var View        = require('./CarListView.js')(document);

    var Car = require('../../common/car-item/itemController.js')(localStorage, XMLHttpRequest);

    var Q = require('../../../node_modules/q/q.js');

	function CarListController(service, events) {
        this.service = service;
        this.model = new Model(service);
        this.view = new View();
        this.events = events;

        this.view.bind("showNextPage",(function(){
            this.getNextCars();
        }).bind(this));
	}

    CarListController.prototype = {

		getCarIDsFromURL: function(searchParams){
            this.model.setSearchParams(searchParams);
            this.getCarIds();
		},

        getNextCars: function(){
            this.model.nextPage();
            this.getCarIds();
        },

        getCarIds: function(){
            this.service.getCarIds(this.model.getSearchParams()).then((function(data){
                this.showCars(data);
            }).bind(this));
        },

		showCars: function(carIds) {
            if(!Array.isArray(carIds))throw new Error('carIds is not Array in CarListController.showCars');
            carGets = [];
            carIds.forEach((function(carId){
                if(isNaN(+carId))throw new Error('carIds must contain Array of numbers in CarListController.showCars');
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

};