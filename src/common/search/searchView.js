

function View(/*template*/) {
    //this.template = template;

    this.$searchContainer = document.forms.autoSearch;
    this.$selectCategory = document.querySelector('[data-select=category]');
    this.$selectMark = document.querySelector('[data-select=mark]');
    this.$selectModel = document.querySelector('[data-select=model]');

}

View.prototype.render = function (viewCmd, data) {
    var self = this;
    var viewCommands = {
        getCategories: function () {
            var select = document.querySelector('[data-select="category"]');
            var docFragment = document.createDocumentFragment();
            data.forEach(function (item, i) {
                var option = document.createElement('option');
                option.setAttribute('value', item.value);
                option.innerHTML = item.name;
                docFragment.appendChild(option);
            });
            self.$selectCategory.appendChild(docFragment);
        },
        getMarks: function () {
            var select = document.querySelector('[data-select="mark"]');
            var def = select.firstElementChild;
            var docFragment = document.createDocumentFragment();
            docFragment.appendChild(def);
            data.forEach(function (item, i) {
                var option = document.createElement('option');
                option.setAttribute('value', item.value);
                option.innerHTML = item.name + ' (' + item.count + ')';
                docFragment.appendChild(option);
            });
            select.innerHTML = '';
            self.$selectMark.appendChild(docFragment);

        },
        getModels: function(){
            var def = self.$selectModel.firstElementChild;
            console.log(def);
            var docFragment = document.createDocumentFragment();
            docFragment.appendChild(def);
            data.forEach(function(item, i) {
                var option = document.createElement('option');
                option.setAttribute('value',item.value);
                option.innerHTML=item.name+' ('+item.count+')';
                docFragment.appendChild(option);
            });
            self.$selectModel.innerHTML='';
            self.$selectModel.appendChild(docFragment);
        }
    };
/*
        // the following code just from todoMVC
            //self.$todoList.innerHTML = self.template.show(parameter);
        },
        removeItem: function () {
            self._removeItem(parameter);
        },
        updateElementCount: function () {
            self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
        },
        clearCompletedButton: function () {
            self._clearCompletedButton(parameter.completed, parameter.visible);
        },
        contentBlockVisibility: function () {
            self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
        },
        toggleAll: function () {
            self.$toggleAll.checked = parameter.checked;
        },
        setFilter: function () {
            self._setFilter(parameter);
        },
        clearNewTodo: function () {
            self.$newTodo.value = '';
        },
        elementComplete: function () {
            self._elementComplete(parameter.id, parameter.completed);
        },
        editItem: function () {
            self._editItem(parameter.id, parameter.title);
        },
        editItemDone: function () {
            self._editItemDone(parameter.id, parameter.title);
        }
    };
*/
    viewCommands[viewCmd]();
};

var view = new View();

module.exports = view;