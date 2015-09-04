module.exports = function(service,view){

    function Controller(){
        var self = this;
        self.service = service;
        self.view = view;

    }


    Controller.prototype = {
		showCar: function(carId){
			var self = this;
			service.getCar(carId)
				.then(function(data){
					var carInfo = JSON.parse(data);
					var imgUrl = carInfo.result.photo_data.photo ? carInfo.result.photo_data.photo.url : "";
					imgUrl = imgUrl.replace(".","f.");
					var carInfoNeeded = {
						img : imgUrl ? "https://cdn.riastatic.com/photos/" + imgUrl : "https://img.auto.ria.com/images/no-photo/no-photo-380x250.jpg",
						carId : carInfo.result.auto_data.auto_id,
						title : carInfo.result.auto_data.marka_data.name + " " + carInfo.result.auto_data.model_data.name + " " 
								+ carInfo.result.auto_data.version,
						priceUSD : carInfo.result.price_data.prices[1],
						priceUAH : Math.round(carInfo.result.price_data.prices[3]),
						date : carInfo.result.date_data.date_add.day+"."+carInfo.result.date_data.date_add.full_month+"."+carInfo.result.date_data.date_add.year,
						description : carInfo.result.auto_data.description,
						race : carInfo.result.auto_data.race.race,
						fuel : carInfo.result.auto_data.fuel_data ? carInfo.result.auto_data.fuel_data.name : "---",
						volume : carInfo.result.auto_data.engineVolume || "---",
						transmission : carInfo.result.auto_data.gearbox_data ? carInfo.result.auto_data.gearbox_data.name : "---",
						tel : carInfo.result.user_phones[0].phone_formatted,
						city : carInfo.result.location_data.state.region_name,
					};
					view.render(carInfoNeeded);
			});
		}
	}

    var controller = new Controller();

	return controller;
}