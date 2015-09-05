module.exports = (function () {

    var Model       = require('./searchResultsModel.js');
    var model       = new Model();

    var View        = require('./searchResultsView.js');
    var template 	= require('./searchResults.handlebars');
	var view        = new View(template);

    var item 		= require('../../common/car-item/item');
	
	var Controller  = require('./searchResultsController.js');
    var controller  = new Controller(model, view, item);

    return controller;
    
})();