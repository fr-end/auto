module.exports = function(localStorage,Q,events,ajax,autoService){

    var storageEventsInited = false;

    if( !storageEventsInited ) {
        window.addEventListener('storage', function (event) {
            console.log(event, 'storage');
            if (event.key === 'wishlist' || event.key === 'defaultUser' || event.key === 'user') {
                auto.dispatchWishListCount();
            }
        });
        events.subscribe('user', function () {
            auto.dispatchWishListCount();
			var user = localStorage.getItem('user');
			if (user !== 'null') {
				for (var key in localStorage){
					if (!isNaN(Number(key))){
						localStorage.removeItem(key);
					}
				}
				var url = '/db/wishlist/';
				ajax.getPromise(url)
					.then((function (response) {
						response = JSON.parse(response);
						localStorage.setItem('wishlist', JSON.stringify(response.wishlistIDs || "[]"));
						response.wishlistObjects.forEach(function(car){
							localStorage.setItem(String(car.carId), JSON.stringify(car));
						});
						events.publish('loadedLocal');
					}));
				//window.dispatchEvent(new Event('hashchange'));
			}else {
				for (var key in localStorage){
					if (!isNaN(Number(key))){
						localStorage.removeItem(key);
					}
				}
				console.log("!!!!");
				var promises = [];
				JSON.parse(localStorage['defaultUser']).forEach(function(carId){
					promises.push(autoService.getCar(carId)
						.then(function(data) {
							console.log("!!!!", carId, typeof carId);
							console.log("!!!", data);
							localStorage[String(carId)] = JSON.stringify(data);
						}));
				});
				Q.all(promises).then(function(){
					events.publish('loadedLocal');
				});
				//window.dispatchEvent(new Event('hashchange'));
			}
        });
        storageEventsInited = true;
    }
	var auto = {
		init: function () {
			if (!localStorage.getItem('defaultUser')){
				localStorage.setItem('defaultUser', JSON.stringify([]));
			}
			if (!localStorage.getItem('users')){
				localStorage.setItem('users', JSON.stringify(['defaultUser']));
			}
            this.dispatchWishListCount();
		},
		addUser: function ( username ) {
			var user = JSON.parse( localStorage.getItem( username ) );
			if ( !user ) {
				localStorage.setItem( username, JSON.stringify( [] ) );
				//console.log( 'User added ' + username );
			}
			var users = JSON.parse( localStorage.getItem( 'users' ) );
			if ( users.indexOf(username) === -1){
				users.push(username);
				localStorage.setItem( 'users', JSON.stringify( users ) );
				//console.log( 'User added to userslist' );
			}
			
			//console.log( username + ' has wishlist and in userslist' );
			return false;
		},
		inList: function (carId) {
			var user = localStorage.getItem('user');
			if (user !== 'null') {
				var wishlist = JSON.parse( localStorage.getItem( 'wishlist' ) || "[]");
				return wishlist.indexOf(carId) !== -1;
			}
			var wishlist = JSON.parse( localStorage.getItem( 'defaultUser' ) || "[]");
			return wishlist.indexOf(carId) !== -1;
		},
		addCar: function (carId) {
            console.log('addCar');
			autoService.getCar(carId)
				.then((function (data) {
					var user = localStorage.getItem('user');
					if (user !== 'null'){
						console.log('user not null');
						var url = '/db/wishlist/';
						var wishlist = {};
						wishlist.carID = carId;
						wishlist.action = 'addCar';
						wishlist.carObject = data;

						ajax.getPromisePost(url, wishlist)
							.then((function (response) {
								localStorage.setItem('wishlist', response);
								console.log('response in mongoService post', response);
								localStorage[String(data.carId)] = JSON.stringify(data);
								this.dispatchWishListCount();
							}).bind(this));
						return;
					}
					console.log('user null');

					var car = data;
					var username = 'defaultUser';
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
            console.log('delCar');
			var user = localStorage.getItem('user');
			if (user !== 'null'){
				var url = '/db/wishlist/';
				var wishlist = {};
				wishlist.carID = carId;
				wishlist.action = 'delCar';
				wishlist.carObject = localStorage.getItem(carId);

				ajax.getPromisePost(url, wishlist)
					.then((function (response) {
						localStorage.setItem('wishlist', response);
						localStorage.removeItem( String( carId ));
						console.log('response in mongoService post', response);
                        this.dispatchWishListCount();
					}).bind(this));

				return;
			}

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
			console.log('getCategories');
			var user = localStorage.getItem('user');
			if (user !== 'null'){
				var wishlist = JSON.parse( localStorage.getItem('wishlist') || "[]");
			} else {
				username = username || 'defaultUser';
				var wishlist = JSON.parse( localStorage.getItem( username ));
			}
			var deferred=Q.defer();
			//console.log('localStorage-getCategories');
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
			console.log('getMarks');
			var user = localStorage.getItem('user');
			if (user !== 'null'){
				var wishlist = JSON.parse( localStorage.getItem('wishlist') || "[]");
			} else {
				username = username || 'defaultUser';
				var wishlist = JSON.parse( localStorage.getItem( username ));
			}
			var deferred=Q.defer();
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
			console.log('getModels');
			var user = localStorage.getItem('user');
			if (user !== 'null'){
				var wishlist = JSON.parse( localStorage.getItem('wishlist') || "[]");
			} else {
				username = username || 'defaultUser';
				var wishlist = JSON.parse( localStorage.getItem( username ));
			}
			var deferred=Q.defer();
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
			var user = localStorage.getItem('user');
			if (user !== 'null') {
				var wishlist = JSON.parse( localStorage.getItem('wishlist') || "[]");
			}else{
				username = username || 'defaultUser';
				var wishlist = JSON.parse( localStorage.getItem( username ));
			}
			var deferred=Q.defer();
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
            var user = localStorage.getItem('user');
            var wishlist;
            if (user !== 'null'){
                console.log(wishlist,'wishlist');
                wishlist = JSON.parse( localStorage.getItem( 'wishlist' ) || "[]");
                console.log(wishlist,'wishlist');
            } else {
                username = username || 'defaultUser';
                wishlist = JSON.parse( localStorage.getItem( username ));
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
            }
			return wishlist.length;
		},
        dispatchWishListCount: function(){
            var user = localStorage.getItem('user');
            var wishlistName;
            if( user !== 'null' ){
                wishlistName = 'wishlist';
            } else {
                wishlistName = 'defaultUser'
            }
            var wishlist = JSON.parse( localStorage.getItem( wishlistName ) || "[]");
            var wishListCount = wishlist.length;
            var evt = document.createEvent('Event');
			evt.initEvent('wishListCount',true,true);
			evt.wishListCount = wishListCount;
			document.dispatchEvent(evt);
        },
        getGearboxes: function(){
            return Q.fcall();
        },
        hasExtendedSearch: false
	};

    auto.init();

	return auto;
};