module.exports = (function(){

    function Controller(service, view){
        var self = this;
        self.service = service;
        self.view = view;

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
					self.view.render('showCategories', categoriesArray);
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
					self.view.render('showMarks', marks);
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
					self.view.render('showModels', models);
            });
		},
		searchCars: function(){
			var self = this;
			var searchParams = self.view.getParams();

			var href = '#search';
			if (searchParams.categoryId !== '0') {
				href += '/category/' + searchParams.categoryId;
			}
			if (searchParams.markaId !== '0'){
				href += '/mark/' + searchParams.markaId;
			}
			if (searchParams.modelId !== '0'){
				href += '/model/' + searchParams.modelId;
			}

			window.location.href =  href;

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