module.exports = (function(){

    var View = require('./TopCarsView.js');
    var Model = require('./TopCarsModel.js');
    var Car = require('../car/CarController.js')(localStorage, XMLHttpRequest);

    var TopCarsController = function (service){
        this.service = service
        this.view = new View();
        this.model = new Model(this.service);
    };

    TopCarsController.prototype = {
        init : function(){
            this.view.render();
            this.model.getTopCars()
                .then((function(carIdsJSON){
                    var carIds = JSON.parse(carIdsJSON);
                    if(!Array.isArray(carIds)){
                        throw new Error('carIds is not Array in CarListController.showCars');
                    }
                    var carPromises = [];
                    carIds.forEach((function(carId){
                        if(isNaN(+carId.id)){
                            throw new Error('carIds must contain Array of numbers in CarListController.showCars');
                        }
                        var car = new Car(this.service,this.events);
                        var carPromise = car.showCar(carId.id);
                        carPromises.push(carPromise);
                    }).bind(this));
                    console.log(carPromises,'carPromises');
                    Q.allSettled(carPromises)
                        .then(function(carPromises){
                            var carHtmls = [];
                            carPromises.forEach(function(result){
                                if (result.state === 'fulfilled') {
                                    carHtmls.push(result.value);
                                }
                            });
                            return carHtmls;
                        });
                }).bind(this))
                .then((function(carHtmls){
                    this.view.render();
                }).bind(this));
        }
    };

    return TopCarsController;

})();