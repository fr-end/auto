module.exports = function(window, document) {

    var templates		= {
        self:               require('./templates/searchPanel.handlebars'),
        options: 			require('./templates/options.handlebars'),
        optionsWithCount: 	require('./templates/optionsWithCount.handlebars')
    };

    function View() {

        this.templates = templates;
        this.$viewPort = document.querySelector('.main');
        //this.init();

    }

    View.prototype.init = function(viewPortSelector) {
        this.$searchForm = document.querySelector('[data-search=form]');
        this.$selectCategory = document.querySelector('[data-select=category]');
        this.$selectMark = document.querySelector('[data-select=mark]');
        this.$selectModel = document.querySelector('[data-select=model]');
        document.querySelector('.search-parameters-show-extended__button').addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.search-parameters-extended').style.display = 'block';
            document.querySelector('.search-parameters-show-extended').style.display = 'none';
        });
    };

    View.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            self: function (searchParams) {
                data = searchParams || {};
                data._yearFrom = [];
                data._yearTo = [];
                var currentYear = new Date().getFullYear();
                for(var i=currentYear;i>=1900;i--){
                    data._yearFrom.push({
                        value: i,
                        selected: i==searchParams.yearFrom
                    });
                    data._yearTo.push({
                        value: i,
                        selected: i==searchParams.yearTo
                    });
                }
                self.$viewPort.innerHTML = self.templates.self(data);
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
        var dum = 1;
    };

    View.prototype.getParams = function(){
        var form = document.forms.autoSearch;
        console.dir(form.elements);
        return {
            categoryId: form.elements['category'].value,
            markaId: form.elements['mark'].value,
            modelId: form.elements['model'].value,
            yearFrom: form.elements['year-from'].value,
            yearTo: form.elements['year-to'].value,
            priceFrom: form.elements['price-from'].value,
            priceTo: form.elements['price-to'].value,
            fuelId: form.elements['fuel'].value,
            engineVolumeFrom: form.elements['engine-from'].value,
            engineVolumeTo: form.elements['engine-to'].value,
            gearboxId: form.elements['gearbox-type'].value,
            raceFrom: form.elements['race-from'].value,
            raceTo: form.elements['race-to'].value,
            withPhoto: form.elements['only-with-photo'].checked ? 1 : 0
        }
    };


 

    return View;
};
