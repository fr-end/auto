
module.exports = (function() {

    function View(templates) {

        var self = this;

        self.templates = templates;

        self.$searchForm        = document.querySelector('[data-search=form]');
        self.$selectCategory    = document.querySelector('[data-select=category]');
        self.$selectMark        = document.querySelector('[data-select=mark]');
        self.$selectModel       = document.querySelector('[data-select=model]');

    }
    /*
    View.prototype.init = function(){

    };
    */
    View.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            showCategories: function () {
                self.$selectCategory.innerHTML = self.templates.options({default: 'Любой', items: data});
            },
            showMarks: function () {
                self.$selectMark.innerHTML = self.templates.optionsWithCount({default: 'Марка', items: data});
            },
            showModels: function () {
                self.$selectModel.innerHTML = self.templates.optionsWithCount({default: 'Модель', items: data});
            }
        };

        viewCommands[viewCmd]();
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
})();
