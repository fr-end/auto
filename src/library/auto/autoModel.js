//https://auto.ria.com/api/categories

module.exports = (function(){
	var ajax = require('../../library/ajax/ajax.js');

	var auto = {
		getCategories: function ( success ) {
			//https://auto.ria.com/api/categories?langId=2
			var langId = 2;
			var url = 'http://localhost:8080/proxy/api/categories?langId=' + langId;
			ajax.get( url, success );
		},
		getMarks: function ( categoryId, success ) {
			//https://auto.ria.com/api/categories/1/marks/_with_active_ads/_with_count
			var url = 'http://localhost:8080/proxy/api'+
						'/categories/' +	categoryId + 
						'/marks' + 
						'/_with_active_ads' + 
						'/_with_count';
			ajax.get( url, success );
		},		
		getModels: function ( categoryId, markaId, success ) {
			//https://auto.ria.com/api/categories/1/marks/98/models/_with_count
			var url = 'http://localhost:8080/proxy/api'+
						'/categories/' +	categoryId + 
						'/marks/' + markaId +
						'/models/' +
						'/_with_count';
			ajax.get( url, success );
		},
		getCars: function ( searchParams, success ) {
			//https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
			searchParams.countPage = searchParams.countPage || 10;
			var page='';
			if (searchParams.page) {
				page='&page=' + searchParams.page;
			}
			var url = 'http://localhost:8080/proxy/blocks_search_ajax/search/'+
						'?category_id=' + searchParams.categoryId +
						'&state[]=0&s_yers[]=0&po_yers[]=0&currency=1' + 
						'&marka_id[0]=' + searchParams.markaId +
						'&model_id[0]=' + searchParams.modelId +
						'&countpage='   + searchParams.countPage +
						page;
			ajax.get( url, success );		
		},
		getCarsCount: function ( searchParams, success ) {
			//https://auto.ria.com/blocks_search_ajax/search/?category_id=1&state[]=0&s_yers[]=0&po_yers[]=0&currency=1&marka_id[0]=98&model_id[0]=953&countpage=10
			searchParams.countPage = searchParams.countPage || 10;
			var page='';
			if (searchParams.page) {
				page='&page=' + searchParams.page;
			}
			var url = 'http://localhost:8080/proxy/blocks_search_ajax/count/'+
						'?category_id=' + searchParams.categoryId +
						'&state[]=0&s_yers[]=0&po_yers[]=0&currency=1' + 
						'&marka_id[0]=' + searchParams.markaId +
						'&model_id[0]=' + searchParams.modelId +
						'&countpage='   + searchParams.countPage +
						page;
			ajax.get( url, success );
		},
		getCar: function ( carId, success ) {
			//https://auto.ria.com/demo/bu/searchPage/v2/view/auto/16110240/?lang_id=2
			var langId = 2;
			var url = 'http://localhost:8080/proxy/demo/bu/searchPage/v2/view/auto/'+
						carId +
						'/?lang_id=' + langId;
			ajax.get( url, success );
		}

	};

	return auto;

}());


