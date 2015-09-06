(function(window) {

    /*render body*/

    var headerTemplate          = require('./header/header.handlebars');
    var headerHtml              = headerTemplate();

    var searchPanelTemplate     = require('./common/search/templates/searchPanel.handlebars');
    var searchPanelHtml         = searchPanelTemplate();

    var searchResultsTemplate   = require('./catalog/searchResults/searchResults.handlebars');
    var searchResultsHtml       = searchResultsTemplate();

    var mainpageTemplate        = require('./mainpage/mainpage.handlebars');
    var mainpageHtml            = mainpageTemplate();

    var footerTemplate          = require('./footer/footer.handlebars');
    var footerHtml              = footerTemplate();

    var data = {
        header          : headerHtml,
        searchPanel     : searchPanelHtml,
        searchResults   : searchResultsHtml,
        main            : mainpageHtml,
        footer          : footerHtml
    };

    var bodyTemplate            = require('./body.handlebars');
    var bodyHtml                = bodyTemplate(data);

    document.body.innerHTML     = bodyHtml;    

    /*compile app*/
    window.app = {};
    window.app.common = {};
    window.app.catalog = {};
    window.app.library = {};

    app.common.searchPanelController = require('./common/search/search');
    app.catalog.searchResultsController = require('./catalog/searchResults/searchResults.js')

    var commonModulesControllers = [app.common.searchPanelController];

    function checkCommonModulesControllers(){
        for (var i = 0; i < commonModulesControllers.length; i++){
            if (!commonModulesControllers[i].started){
                commonModulesControllers[i].init();
            }
        }
    }

    window.app.library.events = require('./library/events/events.js');


    app.routes = {};

    function route(path, controller){
        app.routes[path] = {controller: controller};
    }

    function router(){
        var hashLessURL = location.hash.slice(1) || '/';


        var hashLessURLArray = hashLessURL.split('/');
        var routeName = hashLessURLArray[0] || '/';

        var searchParams = {};
        for (var i = 1; i < hashLessURLArray.length; i = i + 2){
            searchParams[hashLessURLArray[i]] = hashLessURLArray[i + 1];
        }

        var route = app.routes[routeName];
        
        if (!route.controller.started && route.controller.init) {
            route.controller.init();
        } else if (routeName === '/'){
            route.controller.init();
        }

        if (routeName === 'search') {
            checkCommonModulesControllers();
            route.controller.getCarIDsFromURL(searchParams);
            /*
            route.controller.service.getCarIds(searchParams)
                .then(function (data) {
                    var cars = JSON.parse(data).result.search_result.ids;
                    route.controller.showCars(cars);
                });
            */
        }
    }


    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    route('/', app.common.searchPanelController);
    route('search', app.catalog.searchResultsController);
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
