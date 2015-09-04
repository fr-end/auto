module.exports = (function(service){

	function Model(service){
		var self = this;
		self.cars = [];
		self.service = service;
	}

	Model.prototype.getCars = function(data) {
		var carIds = data.split(',');
		var self = this;
		self.cars = [];
		carIds.forEach(function(item){

		});
	};

	var model = new Model(service);

	return model;
	
});