module.exports = (function(){

    var View = require('./TopCarsView.js');

    var TopCarsController = function (){
        this.view = new View();

    }

    TopCarsController.prototype = {
        init : function(){
            this.view.render();
        }
    }

    return TopCarsController;

})();