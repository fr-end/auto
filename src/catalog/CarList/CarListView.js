module.exports = function (document) {

    var templates = {
            self : require('./CarList.handlebars'),
            loading : require('../../common/loading/loading-window.handlebars')
        };

	function View() {

        this.templates = templates;
        this.loading = 'loading...';
        this.moreSelector = '.search-results__more';

		var viewPortElement = document.querySelector('.search-results');

		if (viewPortElement instanceof HTMLElement) {
            this.$viewPort = viewPortElement;
		} else {
            this.$viewPort = document.createElement("div");
		}
	}

	View.prototype.render = function(viewCmd, data) {

		var self = this;

		var viewCommands = {
            showLoading : function() {
                self.$viewPort.innerHTML = self.templates.loading();
            },
            showAddLoading : function() {
                var viewPortAdd = self.$viewPort.querySelector(self.moreSelector);
                var loadingFragment = document.createElement('div');
                loadingFragment.innerHTML =  self.templates.loading();
                self.$loading = viewPortAdd.parentNode.appendChild(loadingFragment);
            },
            hideAddLoading: function(){
                var viewPortAdd = self.$viewPort.querySelector(self.moreSelector);
                viewPortAdd.parentNode.removeChild(self.$loading);
            },
            showCars : function(data){
                self.$viewPort.innerHTML = self.templates.self(data);
            },
            showAddCars : function(data){
                var carHtmls = data.cars;
                var viewPortList = self.$viewPort.querySelector('.search-results-list');
                var additionalList = document.createDocumentFragment();
                carHtmls.forEach(function(carHtml){
                    var carElement = document.createElement('li');
                    carElement.classList.toggle('search-results-list__item',true);
                    carElement.innerHTML = carHtml;
                    additionalList.appendChild(carElement);
                });
                viewPortList.appendChild(additionalList);
            }

    	};

    	viewCommands[viewCmd](data);
	};

	View.prototype.bind = function (event, handler) {
        if(event === 'showNextPage'){
            document.addEventListener('click',(function(evt){
                this.$more = this.$more || document.querySelector(this.moreSelector);
                if (evt.target === this.$more){
                    handler();
                }
            }).bind(this));
        }
	};

	return View;

};