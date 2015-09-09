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

		self.view.bind('clickAddToWishListButton',function(event, carID){
			console.log(carID);
			self.toggleToWishList(carID);
			console.log(localStorage['cars'])
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
		},
		toggleToWishList:function(carId){
			if (!localStorage['cars']) {
				localStorage['cars'] = '["' + carId + '"]';
				return;
			}
			var carsInLocalStorage = JSON.parse(localStorage['cars']);
			for (var i = 0; i < carsInLocalStorage.length; i++){
				if (carsInLocalStorage[i] === carId){
					carsInLocalStorage.splice(i, 1);
					localStorage['cars'] = JSON.stringify(carsInLocalStorage);
					return;
				} 
			}
			carsInLocalStorage.push(carId);
			
			localStorage['cars'] = JSON.stringify(carsInLocalStorage);

		}
	};

	return Controller;

})();