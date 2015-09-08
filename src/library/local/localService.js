module.exports = (function(){
	
	var auto = {
		addUser: function ( email, pas ){
			var users = JSON.parse( localStorage.getItem( "users" ) );
			if ( !users[email] ) {
				users[email].pas = pas;
				users[email].wishlist = [];
				localStorage.setItem( "users", JSON.stringify( users ) );
				console.log('User added ' + email);
				return true;
			} 
			console.log('User not added' + email);
			return false;
		},
		addCar: function ( car, user ) {
			if ( !localStorage.getItem( car.carId ) ){
				localStorage.setItem( String( car.carId ), JSON.stringify( car ));
			}
			var users = JSON.parse( localStorage.getItem( "users" ) );
			users[user].wishlist.push( car.carId );
			localStorage.setItem( "users", JSON.stringify( users ) );

			console.log('Added car');
		},
		delCar: function ( car ) {
			localStorage.removeItem( String( car.carId ));

			console.log('Deleted car');
		},
		getCar: function ( car ) {
			console.log('Getting car');
			return JSON.parse( localStorage.getItem( String( car.carId )));
		},
		getCategories: function () {

			return JSON.parse( localStorage.getItem( 'categories' ));
		},
		getMarks: function ( categoryId ) {
			return JSON.parse( localStorage.getItem( 'marks_'+String( categoryId ) ));
		},
		getModels: function ( categoryId, markId ) {
			return JSON.parse( localStorage.getItem( 'marks_'+String( categoryId, markId ) ));	
		},
		getCarIds: function ( searchParams ) {
			var result = [],
				category,
				mark,
				model;
			if (!searchParams.categoryId) {
				for (category in JSON.parse( localStorage.getItem( 'categories' ))){
					for (mark in JSON.parse( localStorage.getItem( 'marks_'+String( category ) ))){
						for (model in JSON.parse( localStorage.getItem( 'marks_'+String( category, mark ) ))){
							result.concat(JSON.parse( localStorage.getItem( 'models_' + 
								category + '_' + mark + '_' + model ) ));
						}
					}
				}
				return result;
			} else if (!searchParams.markId){
				for (mark in JSON.parse( localStorage.getItem( 'marks_'+String( searchParams.categoryId ) ))){
					for (model in JSON.parse( localStorage.getItem( 'marks_' + 
							String( searchParams.categoryId, mark ) ))){
						result.concat(JSON.parse( localStorage.getItem( 'models_' + 
							searchParams.categoryId + '_' + mark + '_' + model) ));
					}
				}
				return result;
			} else if(!searchParams.modelId){
				for (model in JSON.parse( localStorage.getItem( 'marks_' + 
						String( searchParams.categoryId, searchParams.markId ) ))){
					result.concat(JSON.parse( localStorage.getItem( 'models_' + 
						searchParams.categoryId + '_' + searchParams.markId + '_' + model) ));
				}
				return result;
			} 
			return JSON.parse( localStorage.getItem( 'models_' + 
				searchParams.categoryId + '_' + searchParams.markId + '_' + searchParams.modelId ) );
		},
		getCarCount: function () {

		}
	};

	return auto;
}());