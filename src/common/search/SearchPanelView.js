module.exports = function(window, document) {

    var templates		= {
        self:               require('./templates/searchPanel.handlebars'),
        options: 			require('./templates/options.handlebars'),
        optionsWithCount: 	require('./templates/optionsWithCount.handlebars')
    };

    function View() {

        this.templates = templates;
        this.init();

    }

    View.prototype.init = function(){
        this.$viewPort              = document.querySelector('.search');
        this.$searchForm        = document.querySelector('[data-search=form]');
        this.$selectCategory    = document.querySelector('[data-select=category]');
        this.$selectMark        = document.querySelector('[data-select=mark]');
        this.$selectModel       = document.querySelector('[data-select=model]');
    };

    View.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            self: function (data) {
                var html = self.templates.self(data);
                var selfFragment = document.createElement('div');
                selfFragment.innerHTML = html;
                self.$viewPort.parentNode.replaceChild(selfFragment.firstElementChild,self.$viewPort);
                self.init();
            },
            showCategories: function (data) {
                self.$selectCategory.innerHTML = self.templates.options({default: 'Любой', items: data});
            },
            showMarks: function (data) {
                self.$selectMark.innerHTML = self.templates.optionsWithCount({default: 'Марка', items: data});
            },
            showModels: function (data) {
                self.$selectModel.innerHTML = self.templates.optionsWithCount({default: 'Модель', items: data});
            }
        };

        viewCommands[viewCmd](data);
    };

    View.prototype.bind = function (event, handler) {
        var self = this;

        if (event === 'changeCategory') {
            self.$selectCategory.addEventListener('change', function () {
                handler();
            });
        }

        if (event === 'changeMark') {
            self.$selectMark.addEventListener('change', function () {
                handler();
            });
        }

        if (event === 'clickSubmit') {
            self.$searchForm.addEventListener('submit', function(event){
                event.preventDefault();
                handler();
            });
        }

    };

    View.prototype.setParams = function(params){
        this.$selectCategory
    };

    View.prototype.getParams = function(){
        var self = this;
        var categories = self.$selectCategory;
        var category = categories.options[categories.selectedIndex].value;
        var marks = self.$selectMark;
        var mark = marks.options[marks.selectedIndex].value;
        var models = self.$selectModel;
        var model = models.options[models.selectedIndex].value;
        var	searchParams = {
            categoryId: category,
            markaId: mark,
            modelId: model
        };
        return searchParams;
    };
    /*
    View.prototype._setFilter = function (currentPage) {
        document.querySelector('.selected').className = '';
        document.querySelector('[href="#/' + currentPage + '"]').className = 'selected';
    };
    */

    //refactor the following piece of code

 

    return View;
}
