module.exports = (function(){

    var TopCarsModel = function (service){
        this.service = service;
    };

    TopCarsModel.prototype = {
        getTopCarIds: function(){
            return this.service.getTopCarIds();
        },
        getTopCarPromise: function(carIdAndType){
            return this.service.getTopCarPromise(carIdAndType);
        }
    };

    return TopCarsModel;

})();