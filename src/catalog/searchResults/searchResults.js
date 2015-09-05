module.exports = (function () {

    var Model       = require('./searchResultsModel.js');
    var View        = require('./searchResultsView.js');
    var Controller  = require('./searchResultsController.js');

    var model       = new Model();
    var view        = new View('searchResultsPanel');
    var item 		= require('../../common/car-item/item');

    var controller  = new Controller(model, view, item);

    return controller;
    
})();