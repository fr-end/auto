module.exports = function(Q){

    var View = require('./TopCarsView.js');
    var Model = require('./TopCarsModel.js')(Q);
    var Car = require('../car/CarController.js')(localStorage, XMLHttpRequest);

    var TopCarsController = function (service){
        this.service = service;
        this.view = new View();
        this.model = new Model(this.service);
    };

    TopCarsController.prototype = {
        init : function(){
            this.view.render();
            this.model.getTopCarsData()
                        .then((function(topCarsData){
                            console.log(topCarsData,'topCarsData');
                            this.view.render(topCarsData);
                        }).bind(this));
        }
    };

    return TopCarsController;

};