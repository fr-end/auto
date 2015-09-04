module.exports = function ( itemController ) {

    var Model       = require('./searchResultsModel.js');
    var View        = require('./searchResultsView.js');
    var Controller  = require('./searchResultsController.js');

    var model       = new Model();
    var view        = new View('searchResultsPanel');
    var controller  = new Controller(model,view,itemController);

    return controller;
    
};