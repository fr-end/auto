

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
            var defaultOption = self.$selectMark.firstElementChild;
            var docFragment = document.createDocumentFragment();
            docFragment.appendChild(defaultOption);
            data.forEach(function (item, i) {
                var option = document.createElement('option');
                option.setAttribute('value', item.value);
                option.innerHTML = item.name + ' (' + item.count + ')';
                docFragment.appendChild(option);
            });
            self.$selectMark.innerHTML = '';
            self.$selectMark.appendChild(docFragment);

        },
        getModels: function(){
            var defaultOption = self.$selectModel.firstElementChild;
            var docFragment = document.createDocumentFragment();
            docFragment.appendChild(defaultOption);
            data.forEach(function(item, i) {
                var option = document.createElement('option');
                option.setAttribute('value', item.value);
                option.innerHTML = item.name + ' (' + item.count + ')';
                docFragment.appendChild(option);
            });
            self.$selectModel.innerHTML = '';
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

View.prototype.bind = function (event, handler) {
    var self = this;

    if (event === 'changeCategory'){
        self.$selectCategory.addEventListener('change', function(){
            handler();
        });
    }

    if (event === 'changeMark'){
        self.$selectMark.addEventListener('change', function(){
            handler();
        });
    }

    // the following code just from todoMVC
    /*

    if (event === 'newTodo') {
        $on(self.$newTodo, 'change', function () {
            handler(self.$newTodo.value);
        });

    } else if (event === 'removeCompleted') {
        $on(self.$clearCompleted, 'click', function () {
            handler();
        });

    } else if (event === 'toggleAll') {
        $on(self.$toggleAll, 'click', function () {
            handler({completed: this.checked});
        });

    } else if (event === 'itemEdit') {
        $delegate(self.$todoList, 'li label', 'dblclick', function () {
            handler({id: self._itemId(this)});
        });

    } else if (event === 'itemRemove') {
        $delegate(self.$todoList, '.destroy', 'click', function () {
            handler({id: self._itemId(this)});
        });

    } else if (event === 'itemToggle') {
        $delegate(self.$todoList, '.toggle', 'click', function () {
            handler({
                id: self._itemId(this),
                completed: this.checked
            });
        });

    } else if (event === 'itemEditDone') {
        self._bindItemEditDone(handler);

    } else if (event === 'itemEditCancel') {
        self._bindItemEditCancel(handler);
    }
    */
};

var view = new View();

module.exports = view;