module.exports = (function(){

    function Controller(service,view){
        var self = this;
        self.service = service;
        self.view = view;

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