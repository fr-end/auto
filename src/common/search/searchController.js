module.exports = (function(){

    function Controller(service, view, searchResultsController){
        var self = this;
        self.service = service;
        self.view = view;
        self.searchResultsController = searchResultsController;

        self.view.bind('changeCategory',function(){
            self.loadMarks();
        });

        self.view.bind('changeMark',function(){
            self.loadModels();
        });

		self.view.bind('clickSubmit',function(){
            self.searchCars();
		});
    }

    Controller.prototype = {
		init: function(){
			var self = this;
			self.service.getCategories()
				.then(function(data){
					var categoriesArray = JSON.parse(data);
					self.view.render('categories', categoriesArray);
					self.loadMarks();
				});
		},

		loadMarks: function(){
			var self = this;
			var categories = self.view.$selectCategory;
			var category = categories.options[categories.selectedIndex].value;

			self.service.getMarks(category)
				.then(function(data){
					var marks = JSON.parse(data);
					self.view.render('marks', marks);
					self.loadModels();
			});
		},
		loadModels: function(){
            var self = this;
            var categories = self.view.$selectCategory;
            var category = categories.options[categories.selectedIndex].value;
            var mark = self.view.$selectMark.options[self.view.$selectMark.selectedIndex].value;

			self.service.getModels(category, mark)
                .then(function(data) {
                    var models = JSON.parse(data);
					self.view.render('models', models);
            });
		},
		searchCars: function(){
			var self = this;
			var searchParams = self.view.getParams();
			self.service.getCarIds(searchParams)
				.then(function(data){
					var cars = JSON.parse(data).result.search_result.ids;
					self.searchResultsController.showCars(cars);
				});
		}
	};
	/*
	Controller.prototype.setView = function (locationHash) {
		var self = this;

		var route = locationHash.split('/')[1];
		var page = route || '';
		self._updateFilterState(page);
	};

	Controller.prototype._updateFilterState = function (currentPage) {
		// Store a reference to the active route, allowing us to re-filter todo
		// items as they are marked complete or incomplete.
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this.view.render('setFilter', currentPage);
	};
	*/

	return Controller;
})();