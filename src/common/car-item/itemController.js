module.exports = (function(){

    function Controller(service,view, events){
        var self = this;

		self.events = events;
        self.service = service;
        self.view = view;

		self.events.subscribe('search ids', function(ids){
			ids.forEach(function (carId) {
				self.showCar(carId);
			});
		});
    }


    Controller.prototype = {
		showCar: function(carId){
			console.log(carId);
			var self = this;
			self.service.getCar2(carId)
				.then(function(data){
					data.inList = !!localStorage.getItem( carId );
					self.view.render(data);
			});
		}
	};

	return Controller;

})();