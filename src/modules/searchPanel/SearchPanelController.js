module.exports = (function(){


    var View 			= require('./SearchPanelView.js')(window, window.document);

    function Controller(service, events){
        this.service = service;
        this.view = new View();
        this.started = false;
    }

    Controller.prototype = {
		init: function(searchParams){
            searchParams = searchParams || {};
            searchParams.hasExtendedSearch = this.service.hasExtendedSearch;
            console.dir(searchParams,'searchParams');
            this.view.render('self',searchParams);
			this.service.getCategories()
				.then((function(searchParams, data){
					var categoriesArray = JSON.parse(data);
					categoriesArray.forEach(function(item){
						if(String(item.value) === String(searchParams.categoryId)){
							item.selected = true;
						}
					});
					this.view.render('showCategories', categoriesArray);
					this.loadMarks(searchParams);
                    this.loadGearboxes();
				}).bind(this,searchParams));
			this.started = true;
			this.view.bind('changeCategory',(function(){
				this.loadMarks({});
                this.loadGearboxes();
			}).bind(this));

			this.view.bind('changeMark',(function(){
				this.loadModels({});
			}).bind(this));

			this.view.bind('clickSubmit',(function(){
				this.searchCars({});
			}).bind(this));
		},

		loadMarks: function(searchParams){
			var self = this;
			var categories = self.view.$selectCategory;
			var category = categories.options[categories.selectedIndex].value;

			self.service.getMarks(category)
				.then(function(data){
					var marks = JSON.parse(data);
					marks.forEach(function(item){
						if(String(item.value) === String(searchParams.markaId)){
							item.selected = true;
						}
					});
					self.view.render('showMarks', marks);
					self.loadModels(searchParams);
			});
		},
		loadModels: function(searchParams){
            var self = this;
            var categories = self.view.$selectCategory;
            var category = categories.options[categories.selectedIndex].value;
            var mark = self.view.$selectMark.options[self.view.$selectMark.selectedIndex].value;

            if(category == 0 || mark == 0){
                return
            }

			self.service.getModels(category, mark)
                .then(function(data) {
                    var models = JSON.parse(data);
					models.forEach(function(item){
						if(String(item.value) === String(searchParams.modelId)){
							item.selected = true;
						}
					});
					self.view.render('showModels', models);
            });
		},
        loadGearboxes: function () {
            var categories = this.view.$selectCategory;
            var categoryId = categories.options[categories.selectedIndex].value;
            this.service.getGearboxes(categoryId)
                .then((function(data){
                    this.view.render('showGearboxes',data);
                }).bind(this));
        },
		searchCars: function(){
			var searchParams = this.view.getParams();

			var hashLessURL = location.hash.slice(1) || '/';

			var hashLessURLArray = hashLessURL.split('/');
			var routeName = hashLessURLArray[0] || 'search';

			var href = '#' + routeName;
            for(param in searchParams){
                href += searchParams[param] && searchParams[param] !== '0' ? '/' + param + '/' + searchParams[param] : '';
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