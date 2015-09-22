module.exports = function (document) {

    var templates = {
            self : require('./CarList.handlebars'),
            loading : require('../../common/loading/loading-window.handlebars')
        }

	function View() {

        this.templates = templates;
        this.loading = 'loading...';

		var viewPortElement = document.querySelector('[class="search-results"]');

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
			showCars : function(data){
				console.log('render data');
				console.dir(data);
				console.log('viewPort');
				console.dir(self.viewPort);
				self.$viewPort.innerHTML = self.templates.self(data);
			}

    	};

    	viewCommands[viewCmd](data);
	};

	View.prototype.bind = function (event, handler) {
        if(event === 'showNextPage'){
            this.$viewPort.querySelector('.search-results__more').addEventListener("click",handler);
            var dum = 1;
        }
	};

	return View;

};