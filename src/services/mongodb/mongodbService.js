module.exports = function(localStorage,XMLHttpRequest,Q){

	var ajax = require('../../library/ajax/ajax.js');
	var autoService = require('../auto/autoService');
	//var Q = require('../../../node_modules/q/q.js');
	
	var auto = {
		init: function () {
			var user = localStorage.getItem('user');

			var url = '/user/' + user + '/wishlistIDs/';
			console.log('ajax', ajax);
			ajax.getPromise(url)
				.then(function(){
					console.log('user in mongoService', user);
				});

            this.dispatchWishListCount();
		},
		inList: function (carId, username) {
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ) );
			return wishlist.indexOf(carId) !== -1;
		},
		addCar: function ( carId, username ) {
			autoService.getCar(carId)
				.then((function (data) {
					var car = data;
					username = username || 'defaultUser';
					if ( !localStorage.getItem( String(car.carId) ) ){
						localStorage[String(car.carId)] = JSON.stringify( car );
						//console.log('Car added to storage');
					}
					//console.log('Car in storage');

					var wishlist = JSON.parse( localStorage.getItem( username ) );

					if (wishlist.indexOf(String(car.carId)) === -1){
						wishlist.push( String(car.carId) );
						localStorage.setItem( username, JSON.stringify( wishlist ) );
                        this.dispatchWishListCount(username);
						//console.log('Car added to wishlist');
					}
					//console.log('Car in wishlist');
				}).bind(this));
		},
		delCar: function ( carId, username ) {
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ) );
			var carIndex = wishlist.indexOf( carId );
			//console.log(carIndex);
			if (carIndex !== -1){
				wishlist.splice( carIndex, 1 );
				localStorage.setItem( username, JSON.stringify( wishlist ) );
                this.dispatchWishListCount(username);
				//console.log('Car deleted from wishlist');
			}

			var userslist = JSON.parse( localStorage.getItem( 'users' ) );
			if ( userslist.some(function(user){
				//console.log(user);
				//console.log(JSON.parse( localStorage.getItem( user )));
				if ( JSON.parse( localStorage.getItem( user )).indexOf( carId ) !== -1 ){
					//console.log('Car not deleted from storage');
					return true;
				}
			})) {
				return;
			}

			localStorage.removeItem( String( carId ));
			//console.log('Deleted car from storage');
		},	
		getCar: function ( carId ) {
            var deferred=Q.defer();
            deferred.resolve(this.readCar(carId));
            return deferred.promise;
		},
        readCar: function(carId){
            return JSON.parse( localStorage.getItem( carId ) );
        },
		getCategories: function ( username ) {
			var deferred=Q.defer();
			//console.log('localStorage-getCategories');
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var categoriesIds = [];
			var categories = [];

			wishlist.forEach(function(carId, i, wishlist){
				var item = auto.readCar(carId);
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
			//console.log(categoriesString);
			return deferred.promise;
		},
		getMarks: function ( categoryId, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var marksIds = [];
			var marks = [];

			wishlist.forEach(function(carId, index){
				var item = auto.readCar(carId);
				if ( String(item.categoryId) === categoryId){
					if (marksIds.indexOf( item.markaId ) === -1){
						marksIds.push(item.markaId);
						var marka = {};
						marka['name'] = item.markaName;
						marka['value'] = String(item.markaId);
						marka['count'] = 1;
						marks.push(marka);
					} else {
						marks.some(function (marka) {
							if (String(marka.value) === String(item.markaId)) {
								marka.count += 1;
							}
						});
					}
				}

			});
			var marksString = JSON.stringify(marks);
			deferred.resolve(marksString);
			//console.log(marksString);
			return deferred.promise;
		},
		getModels: function ( categoryId, markaId, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var modelsIds = [];
			var models = [];

			wishlist.forEach(function(carId, index){
				var item = auto.readCar(carId);
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
							if (String(model.value) === String(item.modelId)) {
								model.count += 1;
							}
						});
					}
				}

			});
			var modelsString = JSON.stringify(models);
			deferred.resolve(modelsString);
			//console.log(modelsString);
			return deferred.promise;
		},
		getCarIds: function ( searchParams, username ) {
			var deferred=Q.defer();
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var carsIds = [];
			if ((searchParams.categoryId)&&(searchParams.markaId)&&(searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId ) &&
						( String(item.modelId) === searchParams.modelId )){
							carsIds.push(String(carId));
					}
				});
			} else if((searchParams.categoryId)&&(searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId )){
							carsIds.push(String(carId));
					}
				});
			} else if((searchParams.categoryId)&&(!searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if ( String(item.categoryId) === searchParams.categoryId ){
							carsIds.push(carId);
					}
				});
			} else {
                carsIds = wishlist;
            }
            searchParams.page = searchParams.page || 0;
			deferred.resolve(carsIds.slice(searchParams.page*10, searchParams.page*10+10));
			return deferred.promise;
		},
		getCarsCount: function ( searchParams, username  ) {
			username = username || 'defaultUser';
			var wishlist = JSON.parse( localStorage.getItem( username ));
			var carsCount = 0;
			if ((searchParams.categoryId)&&(searchParams.markaId)&&(searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId ) &&
						( String(item.modelId) === searchParams.modelId )){
							++carsCount;
					}
				});
				return carsCount;
			} else if((searchParams.categoryId)&&(searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if (( String(item.categoryId) === searchParams.categoryId ) && 
						( String(item.markaId) === searchParams.markaId )){
							++carsCount;
					}
				});
				return carsCount;
			} else if((searchParams.categoryId)&&(!searchParams.markaId)&&(!searchParams.modelId)){
				wishlist.forEach(function(carId, index){
					var item = auto.readCar(carId);
					if ( String(item.categoryId) === searchParams.categoryId ){
							++carsCount;
					}
				});
				return carsCount;
			}
			return wishlist.length;
		},
        dispatchWishListCount: function(username){
            var wishListCount = this.getCarsCount({},username);
            var evt = document.createEvent('Event');
			evt.initEvent('wishListCount',true,true);
			evt.wishListCount = wishListCount;
			document.dispatchEvent(evt);
        }        ,
        getGearboxes: function(){
            return Q.fcall();
        }
	};

    auto.init();

	return auto;
};