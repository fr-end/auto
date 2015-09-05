module.exports = (function(){

	var service = require('../../library/auto/autoService.js');

	var View 		= require('./searchView.js');
	var Controller 	= require('./searchController.js');

	var view 		= new View()
	var searchResults = require('../../catalog/searchResults/searchResults.js');

	var controller 	= new Controller(service, view, searchResults);

	return controller;

})();
