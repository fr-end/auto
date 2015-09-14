module.exports = (function () {

    var Model       = require('./CarListModel.js');
    var View        = require('./CarListView.js');
    var template 	= require('./CarList.handlebars');

	function Controller(service, events) {
		var self = this;
		self.service = service;
		self.model = new Model(service);
		self.view = new View(template);;
		self.events = events;
	}

	Controller.prototype = {

		getCarIDsFromURL: function(searchParams){
			var self = this;
			self.service.getCarIds(searchParams).then(function(data){
				console.log('getCarIDsFromURL');
				console.log(data);
				//var carIDs = JSON.parse(data).result.search_result.ids;
				self.showCars(data);
			});
		},

		showCars: function(data) {
			console.log('showCars');
			console.log(data);
			var self = this;
			self.view.render('showCars', { cars : data });
			self.events.publish('search ids', data);
		}
	
	};

	return Controller;

})();