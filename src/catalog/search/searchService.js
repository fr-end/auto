module.exports = function(auto,autoSearch){

	autoSearch.elements['category'].addEventListener('change',function(){
		search.loadMarks();
	})	

	autoSearch.elements['mark'].addEventListener('change',function(){
		search.loadModels();
	})

	autoSearch.addEventListener('submit',function(event){
		event.preventDefault();
		search.searchCars();
	});

	var search = {
		loadCategories: function(){
			var self = this;			
			auto.getCategories()
				.then(function(data){
					var categories = JSON.parse(data);
					var select = document.querySelector('[data-select="category"]');
					var docFragment = document.createDocumentFragment();
					categories.forEach(function(item, i) {
						var option = document.createElement('option');
						option.setAttribute('value',item.value);
						option.innerHTML=item.name;
						docFragment.appendChild(option);
					});
					select.appendChild(docFragment);
					self.loadMarks();
				});
		},		
		loadMarks: function(){
			var self = this;
			var categories=autoSearch.elements['category'];
			var category = categories.options[categories.selectedIndex].value;	
			auto.getMarks(category)
			.then(function(data){
				var marks = JSON.parse(data);
				var select = document.querySelector('[data-select="mark"]');
				var def = select.firstElementChild;
				var docFragment = document.createDocumentFragment();
				docFragment.appendChild(def);
				marks.forEach(function(item, i) {
					var option = document.createElement('option');
					option.setAttribute('value',item.value);
					option.innerHTML=item.name+' ('+item.count+')';
					docFragment.appendChild(option);
				});
				select.innerHTML='';
				select.appendChild(docFragment);
				self.loadModels();
			});
		},		
		loadModels: function(){
			var categories=autoSearch.elements['category'];
			var category = categories.options[categories.selectedIndex].value;		
			var marks=autoSearch.elements['mark'];
			var mark = marks.options[marks.selectedIndex].value;			
			auto.getModels(category, mark)
			.then(function(data){
				var models = JSON.parse(data);
				var select = document.querySelector('[data-select="model"]');
				var def = select.firstElementChild;
				console.log(def);
				var docFragment = document.createDocumentFragment();
				docFragment.appendChild(def);				
				models.forEach(function(item, i) {
					var option = document.createElement('option');
					option.setAttribute('value',item.value);
					option.innerHTML=item.name+' ('+item.count+')';
					docFragment.appendChild(option);
				});
				select.innerHTML='';
				select.appendChild(docFragment);
			});
		},
		searchCars: function(){
			var categories=autoSearch.elements['category'];
			var category = categories.options[categories.selectedIndex].value;
			var marks=autoSearch.elements['mark'];
			var mark = marks.options[marks.selectedIndex].value;
			var models=autoSearch.elements['model'];
			var model = models.options[models.selectedIndex].value;			
			var	searchParams = {
					categoryId: category,
				    markaId: mark,
				    modelId: model
			};
			auto.getCarIds(searchParams)
				.then(function(data){
					document.getElementById('cars').innerHTML=JSON.parse(data).result.search_result.ids;
				});
		}
	}

	search.loadCategories();		

	return search;
}