module.exports = (function(){
	
	var auto = {
		addUser: function ( username ){
			var user = JSON.parse( localStorage.getItem( username ) );
			if ( !user ) {
				localStorage.setItem( username, JSON.stringify( [] ) );
				console.log( 'User added ' + username );
			} 
			var users = JSON.parse( localStorage.getItem( 'users' ) );
			if ( users.indexOf(username) === -1){
				users.push(username);
				localStorage.setItem( 'users', JSON.stringify( users ) );
				console.log( 'User added to userslist' );
			}
			
			console.log( username + ' has wishlist and in userslist' );
			return false;
		},
		addCar: function ( car, username ) {
			username = username || 'dafeultUser';
			if ( !localStorage.getItem( String(car.carId) ) ){
				localStorage[String(car.carId)] = JSON.stringify( car );
				console.log('Car added to storage');
			}
			console.log('Car in storage');
			
			var wishlist = JSON.parse( localStorage.getItem( username ) );

			if (wishlist.indexOf(String(car.carId)) === -1){
				wishlist.push( String(car.carId) );
				localStorage.setItem( username, JSON.stringify( wishlist ) );
				console.log('Car added to wishlist');
			}
			console.log('Car in wishlist');
		},
		delCar: function ( carId, username ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ) );
			var carIndex = wishlist.indexOf( carId );
			console.log(carIndex);
			if (carIndex !== -1){
				wishlist.splice( carIndex, 1 );
				localStorage.setItem( username, JSON.stringify( wishlist ) );
				console.log('Car deleted from wishlist');
			}

			var userslist = JSON.parse( localStorage.getItem( 'users' ) );
			if ( userslist.some(function(user){
				console.log(user);
				console.log(JSON.parse( localStorage.getItem( user )));
				if ( JSON.parse( localStorage.getItem( user )).indexOf( carId ) !== -1 ){
					console.log('Car not deleted from storage');
					return true;
				}
			})) {
				return;
			}

			localStorage.removeItem( String( carId ));
			console.log('Deleted car from storage');
		},	
		getCar: function ( carId ) {
			console.log('Getting car');
			return JSON.parse( localStorage.getItem( carId ) );
		},
		getCategories: function ( username ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var categoriesIds = [];

			wishlist.forEach(function(carId, i, wishlist){
				var item = auto.getCar(carId);
				if (categoriesIds.indexOf(item.categoryId) === -1){
					categoriesIds.push(item.categoryId);
				}
			});
			return categoriesIds; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
		},
		getMarks: function ( categoryId, username ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var marksIds = [];

			wishlist.forEach(function(carId, index){
				var item = auto.getCar(carId);
				if ( String(item.categoryId) === categoryId){
					if (marksIds.indexOf( String(item.markaId) ) === -1){
						marksIds.push(item.markaId);
					}
				}

			});

			return marksIds;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
		},
		getModels: function ( categoryId, markaId, username ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var modelsIds = [];

			wishlist.forEach(function(carId, index){
				var item = auto.getCar(carId);
				if (( String(item.categoryId) === categoryId ) && ( String(item.markaId) === markaId )){
					if (modelsIds.indexOf( String(item.modelId) ) === -1){
						modelsIds.push(item.modelId);
					}
				}

			});

			return modelsIds; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		},
		getCarIds: function ( searchParams, username ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var carsIds = [];
			if ((searchParams.categoryId)&&(searchParams.markaId)&&(searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId ) &&
						( String(item.modelId) === searchParams.modelId )){
							carsIds.push(String(carId));
					}
				});
				return carsIds;
			} else if((searchParams.categoryId)&&(searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId )){
							carsIds.push(String(carId));
					}
				});
				return carsIds;
			} else if((searchParams.categoryId)&&(!searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if ( String(item.categoryId) === searchParams.categoryId ){
							carsIds.push(carId);
					}
				});
				return carsIds;
			} 
			return wishlist;
		},
		getCarCount: function ( searchParams, username  ) {
			username = username || 'dafeultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var carsCount = 0;
			if ((searchParams.categoryId)&&(searchParams.markaId)&&(searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId ) &&
						( String(item.modelId) === searchParams.modelId )){
							++carsCount;
					}
				});
				return carsCount;
			} else if((searchParams.categoryId)&&(searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId )){
							++carsCount;
					}
				});
				return carsCount;
			} else if((searchParams.categoryId)&&(!searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if ( String(item.categoryId) === searchParams.categoryId ){
							++carsCount;
					}
				});
				return carsCount;
			}
			return wishlist.length;
		}
	};

	return auto;
}());