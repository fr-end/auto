//https://auto.ria.com/api/categories

module.exports = (function(){

    var config = {
        autoRiaUaHost: '/proxy'
    };

    var ajax = require('../../library/ajax/ajax.js');

	var auto = {
		getCategories: function () {
			//https://auto.ria.com/api/categories?langId=2
			var langId = 2;
			var url = config.autoRiaUaHost + '/api/categories?langId=' + langId;
			return ajax.getPromise(url);
		},
		getMarks: function ( categoryId) {
			//https://auto.ria.com/api/categories/1/marks/_with_active_ads/_with_count
			var url = config.autoRiaUaHost + '/api'+
						'/categories/' +	categoryId + 
						'/marks' + 
						'/_with_active_ads' + 
						'/_with_count';
			return ajax.getPromise(url);
		},		
		getModels: function ( categoryId, markaId ) {
			//https://auto.ria.com/api/categories/1/marks/98/models/_with_count
			var url = config.autoRiaUaHost + '/api'+
						'/categories/' +	categoryId + 
						'/marks/' + markaId +
						'/models/' +
						'/_with_count';
			return ajax.getPromise(url);
		},
		getCarIds: function ( searchParams ) {
			//https://auto.ria.com/blocks_search_ajax/searchPanel/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
			searchParams.countPage = searchParams.countPage || 10;
			var page='';
			if (searchParams.page) {
				page='&page=' + searchParams.page;
			}
			var url = config.autoRiaUaHost + '/blocks_search_ajax/search/'+
						'?category_id=' + searchParams.categoryId +
						'&state[]=0&s_yers[]=0&po_yers[]=0&currency=1' + 
						'&marka_id[0]=' + searchParams.markaId +
						'&model_id[0]=' + searchParams.modelId +
						'&countpage='   + searchParams.countPage +
						page;
			return ajax.getPromise(url).then(function(data){
				var carIDs = JSON.parse(data).result.search_result.ids;
				return carIDs;
			});
		},
		getCarsCount: function ( searchParams, success ) {
			//https://auto.ria.com/blocks_search_ajax/searchPanel/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
			searchParams.countPage = searchParams.countPage || 10;
			var page='';
			if (searchParams.page) {
				page='&page=' + searchParams.page;
			}
			var url = config.autoRiaUaHost + '/blocks_search_ajax/count/'+
						'?category_id=' + searchParams.categoryId +
						'&state[]=0&s_yers[]=0&po_yers[]=0&currency=1' + 
						'&marka_id[0]=' + searchParams.markaId +
						'&model_id[0]=' + searchParams.modelId +
						'&countpage='   + searchParams.countPage +
						page;
			return ajax.getPromise( url, success)
                .then(function (countJSON) {
                        var count = JSON.parse(countJSON);
                        return count.count || 0;
                });
		},
		getCar: function ( carId ) {
			//https://auto.ria.com/blocks_search_ajax/view/auto/14356030/?lang_id=2
			var langId = 2;
			var url = config.autoRiaUaHost + '/blocks_search_ajax/view/auto/'+
						carId +
						'/?lang_id=' + langId;
			return ajax.getPromise(url).then(function (data) {
						var carInfo = JSON.parse(data);
						var autoData = carInfo.result.auto_data;
						var imgUrl = carInfo.result.photo_data.photo ? carInfo.result.photo_data.photo.url : '';
						imgUrl = imgUrl.replace('.','f.');
						
						var carInfoNeeded = {
							carId 		: autoData.auto_id,
							title 		: autoData.marka_data.name + ' ' + autoData.model_data.name +
								 ' ' + autoData.version,							
							categoryId 	: carInfo.result.category_data.category_id,
							categoryName : carInfo.result.category_data.category_name,
							markaId 	: autoData.marka_id,
							markaName 	: autoData.marka_data.name,
							modelId 	: autoData.model_id,
							modelName 	: autoData.model_data.name,
							version		: autoData.version,
							race 		: autoData.race.race,
							fuel 		: autoData.fuel_data ? autoData.fuel_data.name : '---',
							volume 		: autoData.engineVolume || '---',
							gearBox 	: autoData.gearbox_data ? autoData.gearbox_data.name : '---',
							price 		: {
											usd : carInfo.result.price_data.prices[1],
											uah : Math.round(carInfo.result.price_data.prices[3])
										},
							img 		: imgUrl ? 'https://cdn.riastatic.com/photos/' + 
								imgUrl : 'https://img.auto.ria.com/images/no-photo/no-photo-380x250.jpg',
							date 		: carInfo.result.date_data.date_add.day + '.' + 
								carInfo.result.date_data.date_add.full_month + '.' + 
								carInfo.result.date_data.date_add.year,
							description : autoData.description,
							phone 		: carInfo.result.user_phones[0].phone_formatted,
							city 		: carInfo.result.location_data.state.region_name,
						};						
						return carInfoNeeded;
					});
		}
	};

	return auto;

})();


