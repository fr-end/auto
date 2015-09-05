module.exports = (function(){

	var View 			= require('./searchView.js');
	var Controller 		= require('./searchController.js');	

	var templates		= {
		main: 				require('./templates/searchPanel.handlebars'),
		options: 			require('./templates/options.handlebars'),
		optionsWithCount: 	require('./templates/optionsWithCount.handlebars')
	};

	var service = require('../../library/auto/autoService.js');	
	var view 			= new View(templates);
	var searchResults 	= require('../../catalog/searchResults/searchResults.js');

	var controller 		= new Controller(service, view, searchResults);
	return controller;

})();
