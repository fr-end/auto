

var env = require('./../libs_spec/test_config.js');

var View = require(env.closestPathToSrcFolder + 'modules/searchPanel/SearchPanelView.js')(env.window, env.window.document);

describe('View', function(){
    /*
    var templates = {};
    templates.options = {}
    */
    var templates = {template1: 1};
    var view = new View(templates/*, document*/);
    it('should have templates property', function(){
        expect(view.templates).toBeTruthy();
    });
});




//module.exports = (function() {
//
//    function View(templates) {
//
//        var self = this;
//
//        self.templates = templates;
//
//        self.$searchForm        = document.querySelector('[data-search=form]');
//        self.$selectCategory    = document.querySelector('[data-select=category]');
//        self.$selectMark        = document.querySelector('[data-select=mark]');
//        self.$selectModel       = document.querySelector('[data-select=model]');
//
//    }
//
//    View.prototype.render = function (viewCmd, data) {
//        var self = this;
//        var viewCommands = {
//            showCategories: function (data) {
//                self.$selectCategory.innerHTML = self.templates.options({default: 'Любой', items: data});
//            },
//            showMarks: function (data) {
//                self.$selectMark.innerHTML = self.templates.optionsWithCount({default: 'Марка', items: data});
//            },
//            showModels: function (data) {
//                self.$selectModel.innerHTML = self.templates.optionsWithCount({default: 'Модель', items: data});
//            }
//        };
//
//        viewCommands[viewCmd](data);
//    };
//
//    View.prototype.bind = function (event, handler) {
//        var self = this;
//
//        if (event === 'changeCategory') {
//            self.$selectCategory.addEventListener('change', function () {
//                handler();
//            });
//        }
//
//        if (event === 'changeMark') {
//            self.$selectMark.addEventListener('change', function () {
//                handler();
//            });
//        }
//
//        if (event === 'clickSubmit') {
//            self.$searchForm.addEventListener('submit', function(event){
//                event.preventDefault();
//                handler();
//            });
//        }
//
//    };
//
//    View.prototype.setParams = function(params){
//        this.$selectCategory
//    };
//
//    View.prototype.getParams = function(){
//        var self = this;
//        var categories = self.$selectCategory;
//        var category = categories.options[categories.selectedIndex].value;
//        var marks = self.$selectMark;
//        var mark = marks.options[marks.selectedIndex].value;
//        var models = self.$selectModel;
//        var model = models.options[models.selectedIndex].value;
//        var	searchParams = {
//            categoryId: category,
//            markaId: mark,
//            modelId: model
//        };
//        return searchParams;
//    };
//
//
//    //refactor the following piece of code
//
//
//
//    return View;
//})();
