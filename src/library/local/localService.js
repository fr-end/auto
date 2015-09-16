module.exports = (function(){

	var autoService = require('../auto/autoService');
	var Q = require('../../../node_modules/q/q.js');
	
	var auto = {
		init: function () {
			if (!localStorage.getItem('defaultUser')){
				localStorage.setItem('defaultUser', JSON.stringify([]));
			}
			if (!localStorage.getItem('users')){
				localStorage.setItem('users', JSON.stringify(['defaultUser']));
			}
		},
		addUser: function ( username ) {
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
		inList: function (carId, username) {
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ) );
			return wishlist.indexOf(carId) !== -1;
		},
		addCar: function ( carId, username ) {
			autoService.getCar(carId)
				.then(function (data) {
					var car = data;
					username = username || 'defaultUser';
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
				});
		},
		delCar: function ( carId, username ) {
			username = username || 'defaultUser';
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
            var deferred=Q.defer();
            deferred.resolve(JSON.parse( localStorage.getItem( carId ) ));
            return deferred.promise;
		},
		getCategories: function ( username ) {
			var deferred=Q.defer();
			console.log('localStorage-getCategories');
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
            var carsQueue = [];
			wishlist.forEach((function(carId, i, wishlist){
                carsQueue.push(this.getCar(carId));
			}).bind(this));
            Q.allSettled(carsQueue)
                .then(function(carsQueue) {
                    console.log('allSettled');
                    var cars = [];
                    console.log(carsQueue, 'data');
                    carsQueue.forEach(function (result) {
                        if (result.state === "fulfilled") {
                            cars.push(result.value);
                        } else {
                            //  var reason = result.reason;
                        }
                    });
                    console.log(cars, 'cars');
                    var categoriesIds = [];
                    var categories = [];
                    cars.forEach(function(item){
                        if (categoriesIds.indexOf(item.categoryId) === -1){
                            categoriesIds.push(item.categoryId);
                            var category = {};
                            category['name'] = item.categoryName;
                            category['value'] = String(item.categoryId);
                            categories.push(category);
                        }
                    });
                    var categoriesString = JSON.stringify(categories);
                    deferred.resolve(categoriesString);
                });
			return deferred.promise;
		},
		getMarks: function ( categoryId, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
            var wishlist = JSON.parse( localStorage.getItem( username ));
            var carsQueue = [];
            wishlist.forEach((function(carId, i, wishlist){
                carsQueue.push(this.getCar(carId));
            }).bind(this));
            Q.allSettled(carsQueue)
                .then(function(carsQueue){
                    var cars = [];
                    carsQueue.forEach(function (result) {
                        if (result.state === "fulfilled") {
                            cars.push(result.value);
                        } else {
                            //  var reason = result.reason;
                        }
                    });
                    var marksIds= [];
                    var marks = [];
                    cars.forEach(function(item){
                        if ( item.categoryId == categoryId){
                            if (marksIds.indexOf( item.markaId ) === -1){
                                marksIds.push(item.markaId);
                                var marka = {};
                                marka['name'] = item.markaName;
                                marka['value'] = String(item.markaId);
                                marka['count'] = 1;
                                marks.push(marka);
                            } else {
                                marks.some(function (marka) {
                                    if (marka.value == item.markaId) {
                                        marka.count += 1;
                                    }
                                });
                            }
                        }
                    });
                    var marksString = JSON.stringify(marks);
                    deferred.resolve(marksString);
                });
			return deferred.promise;
		},
		getModels: function ( categoryId, markaId, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var modelsIds = [];
			var models = [];

			wishlist.forEach(function(carId, index){
				var item = auto.getCar(carId);
				if (( String(item.categoryId) === categoryId ) && ( String(item.markaId) === markaId )){
					if (modelsIds.indexOf( item.modelId ) === -1){
						modelsIds.push(item.modelId);
						var model = {};
						model['name'] = item.modelName;
						model['value'] = String(item.modelId);
						model['count'] = 1;
						models.push(model);
					} else {
						models.some(function (model) {
							if (model.value == item.modelId) {
								model.count += 1;
							}
						});
					}
				}

			});
			var modelsString = JSON.stringify(models);
			deferred.resolve(modelsString);
			console.log(modelsString);
			return deferred.promise;
		},
		getCarIds: function ( searchParams, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
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
			} else if((searchParams.categoryId)&&(searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach((function(carId, index){
					this.getCar(carId)
                        .then(function(data){
                            if (( String(item.categoryId) === searchParams.categoryId ) &&
                                ( String(item.markaId) === searchParams.markaId )){
                                carsIds.push(String(carId));
                            }
                        });
				}).bind(this));
			} else if((searchParams.categoryId)&&(!searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.getCar(carId);
					if ( String(item.categoryId) === searchParams.categoryId ){
							carsIds.push(carId);
					}
				});
			} else carsIds = wishlist;
			deferred.resolve(carsIds);
			return deferred.promise;
		},
		getCarCount: function ( searchParams, username  ) {
			username = username || 'defaultUser';
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

    auto.init();

	return auto;
}());