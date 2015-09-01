module.exports = function(service,view){

    function Controller(){
        var self = this;
        self.service = service;
        self.view = view;

        self.view.bind('changeCategory',function(){
            self.loadMarks();
        });

        self.view.bind('changeMark',function(){
            self.loadModels();
        });

        // refactor it
        view.$searchContainer.addEventListener('submit',function(event){
            event.preventDefault();
            self.searchCars();
        });
    }


    Controller.prototype = {
		loadCategories: function(){
			var self = this;
			service.getCategories()
				.then(function(data){
					var categoriesArray = JSON.parse(data);
					view.render('getCategories', categoriesArray);
					self.loadMarks();
			});
		},		
		loadMarks: function(){
			var self = this;
			var categories=view.$selectCategory;
			var category = categories.options[categories.selectedIndex].value;

			service.getMarks(category)
				.then(function(data){
					var marks = JSON.parse(data);
                    view.render('getMarks', marks);
					self.loadModels();
			});
		},		
		loadModels: function(){
            var self = this;
            var categories=view.$selectCategory;
            var category = categories.options[categories.selectedIndex].value;
            var mark = view.$selectMark.options[view.$selectMark.selectedIndex].value;

            service.getModels(category, mark)
                .then(function(data) {
                    var models = JSON.parse(data);
                    view.render('getModels', models);
            });
		},
		searchCars: function(){
			var categories = view.$selectCategory;
			var category = categories.options[categories.selectedIndex].value;
			var marks = view.$selectMark;
			var mark = marks.options[marks.selectedIndex].value;
			var models = view.$selectModel;
			var model = models.options[models.selectedIndex].value;			
			var	searchParams = {
					categoryId: category,
				    markaId: mark,
				    modelId: model
			};
			service.getCarIds(searchParams)
				.then(function(data){
					document.getElementById('cars').innerHTML=JSON.parse(data).result.search_result.ids;
				});
		}
	}

    var controller = new Controller();

    controller.loadCategories();

	return controller;
}