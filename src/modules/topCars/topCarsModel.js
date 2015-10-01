module.exports = (function(){

    var TopCarsModel = function (service){
        this.service = service;
    };

    TopCarsModel.prototype = {
        getTopCarsData: function(){
            return this.service.getTopCarIds().
                then((function(topCarIds) {
                    var carPromises = [];
                    topCarIds.forEach((function (carIdAndType) {
                        if (isNaN(+carIdAndType.id)) {
                            throw new Error('carIds must contain Array of numbers in CarListController.showCars');
                        }
                        var carPromise = this.service.getTopCarPromise(carIdAndType);
                        carPromises.push(carPromise);
                    }).bind(this));
                    return Q.allSettled(carPromises)
                        .then(function (carPromises) {
                            var carBigData;
                            var carsSmallData = [];
                            carPromises.forEach(function (result) {
                                if (result.state === 'fulfilled') {
                                    var resultJSON = JSON.parse(result.value);
                                    console.log(resultJSON);
                                    if (carBigData) {
                                        carsSmallData.push(resultJSON);
                                    } else {
                                        carBigData = resultJSON;
                                    }
                                }
                            });
                            var topCarsData = {
                                big: carBigData,
                                small: carsSmallData
                            };
                            return topCarsData;
                        });
                }).bind(this));
        }
    };

    return TopCarsModel;

})();