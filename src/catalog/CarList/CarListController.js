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
			this.service.getCarIds(searchParams).then((function(data){
				this.showCars(data);
			}).bind(this));
		},

		showCars: function(data) {
			this.view.render('showCars', { cars : data });
			this.events.publish('search ids', data);
		}
	
	};

	return Controller;

})();