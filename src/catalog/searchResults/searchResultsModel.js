module.exports = (function(){

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

	return Model;
	
})();