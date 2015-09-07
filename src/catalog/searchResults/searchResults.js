module.exports = (function () {

    var service = require('../../library/auto/autoService.js');

    var Model       = require('./searchResultsModel.js');
    var model       = new Model(service);

    var View        = require('./searchResultsView.js');
    var template 	= require('./searchResults.handlebars');
	var view        = new View(template);

    var item 		= require('../../common/car-item/item');

	var Controller  = require('./searchResultsController.js');
    var controller  = new Controller(service, model, view, item);

    return controller;
    
})();