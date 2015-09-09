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
			var result = self.toggleToWishList(carID);
			self.view.toggleClass(event, result);
		});



    }


    Controller.prototype = {
		showCar: function(carId){
			var self = this;
			self.service.getCar2(carId)
				.then(function(data){
					data.inList = !!localStorage.getItem( carId );
					self.view.render(data);
			});
		},
		toggleToWishList:function(carId){
			var self = this;
			if (!localStorage['cars']) {
				localStorage['cars'] = '[]';
			}
			var carsInLocalStorage = JSON.parse(localStorage['cars']);
			for (var i = 0; i < carsInLocalStorage.length; i++){
				if (carsInLocalStorage[i] === carId){
					carsInLocalStorage.splice(i, 1);
					delete localStorage['auto_'+carId];
					localStorage['cars'] = JSON.stringify(carsInLocalStorage);
					return false;
				} 
			}
			carsInLocalStorage.push(carId);
			self.service.getCar2(carId)
				.then(function(data){
					localStorage['auto_'+carId]=JSON.stringify(data);
				});

			localStorage['cars'] = JSON.stringify(carsInLocalStorage);
			return true;
		}
	};

	return Controller;

})();