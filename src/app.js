(function() {
    var service = require('./library/auto/autoService.js');
    var SearchView = require('./common/search/searchView.js');
    var SearchController = require('./common/search/searchController.js');
    var CarItemController = require('./common/car-item/itemController.js');
    
    window.app = {};

    app.view = new SearchView();

    var controller = new SearchController(service, app.view);

    app.view.$searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        controller.searchCars();
    });

    controller.init();

    var itemController = new CarItemController(service,require('./common/car-item/itemView'));

    // do not consider the following code
    /*
    var routes = {};
    //
    function route(path, view, controller) {
        routes[path] = {view: view, controller: controller};
    }
    var el = null;
    function router () {
        // Lazy load view element:
        el = el || document.getElementById('cars');
        console.log(el)
        // Current route url (getting rid of '#' in hash as well):
        var url = location.hash.slice(1) || '/';
        console.log(url);
        // Get route by url:
        var route = routes[url];
        // Do we have both a view and a route?
        if (el && route.controller) {
            // Render route template with John Resig's template engine:
            el.innerHTML = 'HELLO';//tmpl(route.templateId, new route.controller());
        }
    }

    window.addEventListener('hashchange', router);
    // Listen on page load:
    window.addEventListener('load', router);

    route('/', app.view, controller);
    */
})(window);

/*
window.app.auto.getCategories()
                .then(function(data){
                  document.getElementById('categories').innerHTML=data;
                });

window.app.auto.getMarks(1)
  .then(function(data){
    document.getElementById('marks').innerHTML=data;
}); 

window.app.auto.getModels(1, 98)
  .then(function(data){
    document.getElementById('models').innerHTML=data;
});                

window.app.auto.getCategories(function(data){
    window.app.events.publish('categories',data);
});

window.app.auto.getMarks(1,function(data){
    window.app.events.publish('marks',data);
});

window.app.auto.getModels(1,98,function(data){
    window.app.events.publish('models',data);
});

window.app.auto.getCarIds(window.app.searchParams,function(data){
    window.app.events.publish('cars',data);
});

window.app.auto.getCarsCount(window.app.searchParams,function(data){
    window.app.events.publish('carsCount',data);
});

window.app.auto.getCar(16001421,function(data){
    window.app.events.publish('car',data);
});

*/

