module.exports = (function () {

	var View 		= require('./itemView');
	var Controller 	= require('./itemController');	

	var template	= require('./car-item.handlebars');

	var service 	= require('../../library/auto/autoService');
	var view 		= new View(template);	

	var controller 	= new Controller(service, view);

    return controller;
    
})();