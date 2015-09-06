module.exports = (function(){

	var service = require('../../library/auto/autoService.js');

	var View 			= require('./searchView.js');
	var templates		= {
		main: 				require('./templates/searchPanel.handlebars'),
		options: 			require('./templates/options.handlebars'),
		optionsWithCount: 	require('./templates/optionsWithCount.handlebars')
	};
	var view 			= new View(templates);

	var Controller 		= require('./searchController.js');
	var controller 		= new Controller(service, view);

	return controller;

})();
