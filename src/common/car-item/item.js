module.exports = (function () {

	var View 		= require('./itemView');
    var Controller 	= require('./itemController');	

	var service 	= require('../../library/auto/autoService');
	var view 		= new View();
	var controller 	= new Controller(service, view);

    return controller;
    
})();