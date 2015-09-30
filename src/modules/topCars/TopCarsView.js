module.exports = (function(){

    var template = require('./topCars.handlebars');

    var TopCarsView = function (){
        this.template = template;

    };

    TopCarsView.prototype = {
        render : function(data){
            var viewPort = document.querySelector('.search-results-wrapper');
            viewPort.innerHTML = this.template(data);
        }
    };

    return TopCarsView;

})();