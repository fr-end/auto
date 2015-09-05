module.exports = (function () {

	var service 	= require('../../library/auto/autoService');

	var View 		= require('./itemView');
	var template	= require('./car-item.handlebars');
	var view 		= new View(template);	

    var Controller 	= require('./itemController');	
	var controller 	= new Controller(service, view);

    return controller;
    
})();