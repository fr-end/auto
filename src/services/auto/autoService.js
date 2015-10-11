//https://auto.ria.com/api/categories

module.exports = (function(){

    var config = {
        autoRiaUaHost: '/proxy'
    };

    var ajax = require('../../library/ajax/ajax.js')(XMLHttpRequest, Q);

    var auto = {
        getCategories: function () {
            //https://auto.ria.com/api/categories?langId=2
            var langId = 2;
            var url = config.autoRiaUaHost + '/api/categories?langId=' + langId;
            return ajax.getPromise(url);
        },
        getMarks: function (categoryId) {
            //https://auto.ria.com/api/categories/1/marks/_with_active_ads/_with_count
            var url = config.autoRiaUaHost + '/api' +
                '/categories/' + categoryId +
                '/marks' +
                '/_with_active_ads' +
                '/_with_count';
            return ajax.getPromise(url);
        },
        getModels: function (categoryId, markaId) {
            //https://auto.ria.com/api/categories/1/marks/98/models/_with_count
            var url = config.autoRiaUaHost + '/api' +
                '/categories/' + categoryId +
                '/marks/' + markaId +
                '/models/' +
                '_with_count';
            return ajax.getPromise(url);
        },
        getCarIds: function (searchParams) {
            //https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
            searchParams.countPage = searchParams.countPage || 10;
            var url = config.autoRiaUaHost + '/blocks_search_ajax/search/';
            url += '?category_id=' + searchParams.categoryId;
            url += urlParam('state[]', '0');
            url += urlParam('s_yers[]', searchParams.yearFrom);
            url += urlParam('po_yers[]', searchParams.yearTo);
            url += urlParam('price_ot', searchParams.priceFrom);
            url += urlParam('price_do', searchParams.priceTo);
            url += urlParam('type[' + (searchParams.fuelId - 1) +']', searchParams.fuelId);
            url += urlParam('engineVolumeFrom', searchParams.engineVolumeFrom);
            url += urlParam('engineVolumeTo', searchParams.engineVolumeTo);
            url += urlParam('gearbox[' + (searchParams.gearboxId - 1) +']', searchParams.gearboxId);
            url += urlParam('raceFrom', searchParams.raceFrom);
            url += urlParam('raceTo', searchParams.raceTo);
            url += urlParam('with_photo', searchParams.withPhoto);
            url += urlParam('currency',1);
            url += urlParam('marka_id[0]', searchParams.markaId);
            url += urlParam('model_id[0]', searchParams.modelId);
            url += urlParam('countpage', searchParams.countPage);
            url += urlParam('page',searchParams.page);
            console.log(url);
            return ajax.getPromise(url).then(function (data) {
                var carIDs = JSON.parse(data).result.search_result.ids;
                return carIDs;
            });
        },
        getCarsCount: function (searchParams, success) {
            //https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
            searchParams.countPage = searchParams.countPage || 10;

            var url = config.autoRiaUaHost + '/blocks_search_ajax/count/';
            url += '?category_id=' + searchParams.categoryId;
            url += '&state[]=0&s_yers[]=0&po_yers[]=0&currency=1';
            url += '&marka_id[0]=' + searchParams.markaId;
            url += '&model_id[0]=' + searchParams.modelId;
            url += '&countpage=' + searchParams.countPage;
            url += '&page=' + searchParams.page;
            return ajax.getPromise(url, success)
                .then(function (countJSON) {
                    var count = JSON.parse(countJSON);
                    return count.count || 0;
                });
        },
        getCarNew: function (carId) {
            //new
            //https://auto.ria.com/newauto_blocks/search_ad?auto_id=1312366
            var langId = 2;
            var url;
            url = config.autoRiaUaHost + '/newauto_blocks/search_ad?auto_id=' + carId;
            return ajax.getPromise(url).then(function (data) {
                try {
                    var autoData = JSON.parse(data);
                    console.log(url,'url');
                    console.log(autoData,'carInfo');
                    var imgUrl = autoData.photo;
                    imgUrl = imgUrl.replace('.', 'f.');
                    var carPhotos = [];
                    autoData.photos.forEach(function (photo) {
                        carPhotos.push('https://cdn.riastatic.com/photos/' + photo.src.replace('.', 'f.'));
                    });
                    var carInfoNeeded = {
                        carId 		: autoData.auto_id,
                        title 		: autoData.marka + ' ' + autoData.model,
                        year		: autoData.years,
                        categoryId 	: autoData.category_id,
                        categoryName : '',
                        markaId 	: autoData.marka_id,
                        markaName 	: autoData.marka,
                        modelId 	: autoData.model_id,
                        modelName 	: autoData.model,
                        version		: autoData.version,
                        race 		: 0,
                        fuel 		: autoData.fuel,
                        volume 		: autoData.fuel_rate || '---',
                        gearBox 	: autoData.gear,
                        door		: autoData.door,
                        drive		: autoData.drive,
                        seats		: autoData.seats,
                        color		: '',
                        priceUsd    : Math.round(autoData.price_uah),
                        priceUah 	: Math.round(autoData   ['price usd']),
                        img			: imgUrl ? 'https://cdn.riastatic.com/photos/' +
                        imgUrl : 'https://img.auto.ria.com/images/no-photo/no-photo-380x250.jpg',
                        date		: autoData.updatedAt,
                        description	: autoData.description,
                        phone		: autoData.autosalon.phones[0].phone_formatted,
                        author		: autoData.autosalon.name,
                        city		: autoData.autosalon.city,
                        photos		: carPhotos
                    };
                    return carInfoNeeded;
                } catch (error) {
                    console.log(error);
                }

            });
        },
        getCar:function (carId, carType) {
            if(carType === 'new'){
                return this.getCarNew(carId);
            }
            //used
            //https://auto.ria.com/blocks_search_ajax/view/auto/14356030/?lang_id=2
            var langId = 2;
            var url;
            url = config.autoRiaUaHost + '/blocks_search_ajax/view/auto/' +
                carId + '/?lang_id=' + langId;
            return ajax.getPromise(url).then(function (data) {
                try {
                    var carInfo = JSON.parse(data);
                    var autoData = carInfo.result.auto_data;
                    var imgUrl = carInfo.result.photo_data.photo ? carInfo.result.photo_data.photo.url : '';
                    imgUrl = imgUrl.replace('.', 'f.');
                    var carPhotos = [];
                    carInfo.result.photo_data.photos.forEach(function (photo) {
                        carPhotos.push('https://cdn.riastatic.com/photosnew/' + photo.seo_link.replace('.', 'f.'));
                    });
                    var carInfoNeeded = {
                        carId 		: autoData.auto_id,
                        title 		: autoData.marka_data.name + ' ' + autoData.model_data.name +
                        ' ' + autoData.version,
                        year		: autoData.years,
                        categoryId 	: carInfo.result.category_data.category_id,
                        categoryName : carInfo.result.category_data.category_name,
                        markaId 	: autoData.marka_id,
                        markaName 	: autoData.marka_data.name,
                        modelId 	: autoData.model_id,
                        modelName 	: autoData.model_data.name,
                        version		: autoData.version,
                        race 		: autoData.race.race,
                        fuel 		: autoData.fuel_data ? autoData.fuel_data.name : '',
                        volume 		: autoData.engineVolume || '',
                        gearBox 	: autoData.gearbox_data ? autoData.gearbox_data.name : '',
                        door		: autoData.door,
                        drive		: autoData.drive_data ? autoData.drive_data.name : '',
                        seats		: autoData.seats,
                        color		: autoData.color_data.name,
                        priceUsd    : Math.round(carInfo.result.price_data.prices[1]),
                        priceUah 	: Math.round(carInfo.result.price_data.prices[3]),
                        img			: imgUrl ? 'https://cdn.riastatic.com/photos/' +
                        imgUrl : 'https://img.auto.ria.com/images/no-photo/no-photo-380x250.jpg',
                        date		: carInfo.result.date_data.date_add.day + '.' +
                        carInfo.result.date_data.date_add.full_month + '.' +
                        carInfo.result.date_data.date_add.year,
                        description	: autoData.description,
                        phone		: carInfo.result.user_phones[0].phone_formatted,
                        author		: carInfo.result.user_data.firstName,
                        city		: carInfo.result.location_data.state.region_name,
                        photos		: carPhotos
                    };
                    return carInfoNeeded;
                } catch (error) {
                    console.dir(error);
                }

            });
        },
        getTopCarIds: function () {
            //https://auto.ria.com/demo/bu/mainPage/rotator/main?page=0&type=all&limit=5&pakets=3
            var url = config.autoRiaUaHost + '/demo/bu/mainPage/rotator/main?page=0&type=all&limit=5&pakets=3';
            return ajax.getPromise(url)
                .then(function(carIdsJSON){
                    var topCarIds = JSON.parse(carIdsJSON);
                    if(!Array.isArray(topCarIds)){
                        throw new Error('carIds is not Array in CarListController.showCars');
                    }
                    return topCarIds;
                });
        },
        getTopCarPromise: function (carIdAndType) {
            //https://auto.ria.com/demo/bu/mainPage/rotator/item/16274478?type=bu&langId=2&showCity=0
            //https://auto.ria.com/demo/bu/mainPage/rotator/item/65309?type=new&langId=2&showCity=0
            var url = config.autoRiaUaHost + '/demo/bu/mainPage/rotator/item/' + carIdAndType.id + '?type=' +
                        carIdAndType.type + '&langId=2&showCity=0';
            return ajax.getPromise(url);
        },
        getGearboxes: function (searchParams) {
            //https://auto.ria.com/api/categories/1/gearboxes?langId=2
            var url = config.autoRiaUaHost + '/api/categories/' + searchParams.categoryId + '/gearboxes?langId=2';
            return ajax.getPromise(url)
                .then(function(data){
                    try {
                        return JSON.parse(data);
                    } catch (err) {
                        return {};
                    }
                });
        },
        getFuels: function() {
            //https://auto.ria.com/api/fuels?langId=2
            var url = config.autoRiaUaHost + '/fuels?langId=2';
            return ajax.getPromise(url)
                .then(function(data){
                    try {
                        return JSON.parse(data);
                    } catch (err) {
                        return {};
                    }
                });
        }
	};

	return auto;

    function urlParam(name, value){
        return value ? '&' + name + '=' + value : '';
    }

})();


