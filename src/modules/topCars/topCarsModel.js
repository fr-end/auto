module.exports = (function(){

    var ajax = require('../../library/ajax/ajax.js')(XMLHttpRequest, Q);

    var TopCarsModel = function (service){
        this.service = service;
    };

    TopCarsModel.prototype = {
        getTopCars: function(){
            return this.service.getTopCars();
        }
    };

    return TopCarsModel;

})();