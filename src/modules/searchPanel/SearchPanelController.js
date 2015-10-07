module.exports = (function(){


    var View 			= require('./SearchPanelView.js')(window, window.document);

    function Controller(service, events){
        this.service = service;
        this.view = new View();
        this.started = false;
    }

    Controller.prototype = {
		init: function(searchParams){
            this.view.render('self');
			searchParams = searchParams || {};
			var self = this;
			self.service.getCategories()
				.then((function(searchParams, data){
					var categoriesArray = JSON.parse(data);
					categoriesArray.forEach(function(item){
						if(String(item.value) === String(searchParams.categoryId)){
							item.selected = true;
						}
					});
					this.view.render('showCategories', categoriesArray);
					this.loadMarks(searchParams);
				}).bind(this,searchParams));
			self.started = true;
			self.view.bind('changeCategory',function(){
				self.loadMarks({});
			});

			self.view.bind('changeMark',function(){
				self.loadModels({});
			});

			self.view.bind('clickSubmit',function(){
				self.searchCars({});
			});
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