
var view = (function() {
    function View(/*template*/) {
        //this.template = template;

        this.$searchForm = document.forms.autoSearch;
        this.$selectCategory = document.querySelector('[data-select=category]');
        this.$selectMark = document.querySelector('[data-select=mark]');
        this.$selectModel = document.querySelector('[data-select=model]');

    }

    View.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            getCategories: function () {
                var aTemplateFunction = require('./templates/options.handlebars');
                var html = aTemplateFunction({default: "Любой", items: data});
                self.$selectCategory.innerHTML = html;
            },
            getMarks: function () {
                var aTemplateFunction = require('./templates/optionsWithCount.handlebars');
                var html = aTemplateFunction({default: "Марка", items: data});
                self.$selectMark.innerHTML = html;
            },
            getModels: function () {
                var aTemplateFunction = require('./templates/optionsWithCount.handlebars');
                var html = aTemplateFunction({default: "Модель", items: data});
                self.$selectModel.innerHTML = html;
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

    };

    var searchPanel = document.getElementById('searchPanel');

    console.log(searchPanel);

    var searchPanelTemplate = require('./templates/searchPanel.handlebars');
    var html = searchPanelTemplate();
    searchPanel.innerHTML = html;

    return new View();

})();

module.exports = view;