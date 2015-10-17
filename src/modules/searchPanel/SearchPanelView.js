module.exports = function(window, document) {

    var template = require('./templates/searchPanel.handlebars');

    function View() {

        this.template = template;
        this.$viewPort = document.querySelector('.main') || document.createElement('div');

    }

    View.prototype.init = function(viewPortSelector) {
        this.$searchForm = this.$viewPort.querySelector('[data-search=form]');
        this.$selectCategory = this.$viewPort.querySelector('[data-select=category]');
        this.$selectMark = this.$viewPort.querySelector('[data-select=mark]');
        this.$selectModel = this.$viewPort.querySelector('[data-select=model]');
        this.$selectGearbox = this.$viewPort.querySelector('.search-parameters-gearbox-type__select');
        if(this.$viewPort.querySelector('.search-parameters-show-extended__button')!== null){
            this.$viewPort.querySelector('.search-parameters-show-extended__button').addEventListener('click', (function (event) {
                event.preventDefault();
                this.$viewPort.querySelector('.search-parameters-extended').style.display = 'block';
                this.$viewPort.querySelector('.search-parameters-show-extended').style.display = 'none';
            }).bind(this));
        }
    };

    View.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            self: function (searchParams) {
                data = searchParams || {};
                data._yearFrom = [];
                data._yearTo = [];
                data.hasExtendedSearch = searchParams.hasExtendedSearch;
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
                self.$viewPort.innerHTML = self.template(data);
                self.init();
            },
            showCategories: function (data) {
                setOptions(self.$selectCategory, {default: 'Любой', items: data});
            },
            showMarks: function (data) {
                setOptions(self.$selectMark, {default: 'Марка', items: data});
            },
            showModels: function (data) {
                setOptions(self.$selectModel, {default: 'Модель', items: data});
            },
            showGearboxes: function (data) {
                setOptions(self.$selectGearbox, {default: 'Любая', items: data});
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
        var form = this.$viewPort.querySelector('form[name="autoSearch"]');
        console.dir(form.elements);
        return {
            categoryId: form.elements['category'].value,
            markaId: form.elements['mark'].value,
            modelId: form.elements['model'].value,
            yearFrom: form.elements['year-from'].value,
            yearTo: form.elements['year-to'].value,
            priceFrom: form.elements['price-from'].value,
            priceTo: form.elements['price-to'].value,
           // fuelId: form.elements['fuel'].value,
            engineVolumeFrom: form.elements['engine-from'].value,
            engineVolumeTo: form.elements['engine-to'].value,
            gearboxId: form.elements['gearbox-type'].value,
            raceFrom: form.elements['race-from'].value,
            raceTo: form.elements['race-to'].value,
            withPhoto: form.elements['only-with-photo'].checked ? 1 : 0
        };
    };

    var optionsTemplate = require('./templates/options.handlebars');

    function setOptions( selectElement, data ){
        if ( selectElement && selectElement instanceof HTMLSelectElement) {
            selectElement.innerHTML = optionsTemplate(data);
        }
    }
 

    return View;
};
