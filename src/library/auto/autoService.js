//https://auto.ria.com/api/categories

module.exports = (function(){

	var config = {
		autoRiaUaHost: 'http://localhost:8080/proxy'
	};

	var ajax = require('../../library/ajax/ajax.js');
	var Q = require('../../../node_modules/q/q.js');

	var auto = {
		getCategories: function () {
			var deferred=Q.defer();
			//https://auto.ria.com/api/categories?langId=2
			var langId = 2;
			var url = config.autoRiaUaHost + '/api/categories?langId=' + langId;
			ajax.get( url, deferred );
			return deferred.promise;
		},
		getMarks: function ( categoryId) {
			//https://auto.ria.com/api/categories/1/marks/_with_active_ads/_with_count
			var deferred=Q.defer();
			var url = config.autoRiaUaHost + '/api'+
						'/categories/' +	categoryId + 
						'/marks' + 
						'/_with_active_ads' + 
						'/_with_count';
			ajax.get( url, deferred );
			return deferred.promise;			
		},		
		getModels: function ( categoryId, markaId ) {
			//https://auto.ria.com/api/categories/1/marks/98/models/_with_count
			var deferred=Q.defer();			
			var url = config.autoRiaUaHost + '/api'+
						'/categories/' +	categoryId + 
						'/marks/' + markaId +
						'/models/' +
						'/_with_count';
			ajax.get( url, deferred );
			return deferred.promise;				
		},
		getCarIds: function ( searchParams ) {
			//https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
			var deferred=Q.defer();		
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
			ajax.get( url, deferred );	
			return deferred.promise;					
		},
		getCarsCount: function ( searchParams, success ) {
			//https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
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
			ajax.get( url, success );
		},
		getCar: function ( carId, success ) {
			//https://auto.ria.com/blocks_search_ajax/view/auto/14356030/?lang_id=2
			var langId = 2;
			var url = config.autoRiaUaHost + '/blocks_search_ajax/view/auto/'+
						carId +
						'/?lang_id=' + langId;
			ajax.get( url, success );
		}

	};

	return auto;

}());


