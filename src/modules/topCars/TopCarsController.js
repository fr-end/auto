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
            this.model.getTopCarIds()
                .then((function(topCarIds){
                    var carPromises = [];
                    topCarIds.forEach((function(carIdAndType){
                        if(isNaN(+carIdAndType.id)){
                            throw new Error('carIds must contain Array of numbers in CarListController.showCars');
                        }
                        console.log(carIdAndType);
                        var carPromise = this.model.getTopCarPromise(carIdAndType);
                        carPromises.push(carPromise);
                    }).bind(this));
                    console.log(carPromises,'carPromises');
                    Q.allSettled(carPromises)
                        .then(function(carPromises){
                            var carBigData;
                            var carsSmallData = [];
                            carPromises.forEach(function(result){
                                console.log(result.state);
                                if (result.state === 'fulfilled') {
                                    var resultJSON = JSON.parse(result.value);
                                    if(carBigData){
                                        carsSmallData.push(resultJSON);
                                    } else {
                                        carBigData = resultJSON;
                                    }
                                }
                            });
                            var carsData = {
                                big: carBigData,
                                small: carsSmallData
                            };
                            return carsData;
                        })
                        .then((function(carsData){
                            console.log(carsData,'carsData');
                            console.log(carsData.big['photoBig'],'big.photoBig')
                            this.view.render(carsData);
                        }).bind(this));
                }).bind(this));
        }
    };

    return TopCarsController;

})();