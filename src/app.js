(function() {

    var service = require('./library/auto/autoService.js');
    var SearchView = require('./common/search/searchView.js');
    var SearchController = require('./common/search/searchController.js');
    var CarItemController = require('./common/car-item/itemController.js');

    var itemController = new CarItemController(service,require('./common/car-item/itemView'));

    var searchResultsModel = require('./catalog/searchResults/searchResultsModel.js');
    var searchResultsView = require('./catalog/searchResults/searchResultsView.js');
    var searchResultsController = require('./catalog/searchResults/searchResultsController.js');

    var $searchResultsModel = new searchResultsModel();
    var $searchResultsView = new searchResultsView('searchResultsPanel');
    var $searchResultsController = new searchResultsController($searchResultsModel, $searchResultsView, itemController);
    
    window.app = {};

    app.view = new SearchView();

    var controller = new SearchController(service, app.view, $searchResultsController);

    app.view.$searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        controller.searchCars();
    });

    controller.init();

    
/*
    $searchResultsController.showCars(['16128163','16092934','16145329','16001421','12336790','15550632','11666166','16053415','15433627','16145311']);
*/
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

(function(){  



})();
