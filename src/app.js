(function(window) {

    /*render body*/

    var headerTemplate          = require('./header/header.handlebars');
    var headerHtml              = headerTemplate();

    var searchPanelTemplate     = require('./common/search/templates/searchPanel.handlebars');
    var searchPanelHtml         = searchPanelTemplate();

    var searchResultsTemplate   = require('./catalog/CarList/CarList.handlebars');
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

    // describe classes for modules

    /*compile app*/
    window.app = {};
    window.app.common = {};
    window.app.catalog = {};
    window.app.library = {};
    window.app.library.events = require('./library/events/events.js');

    var commonService = require('./library/auto/autoService.js');
    var localService = require('./library/local/localService.js');

    // SearchPanel

    var SearchPanelController 		= require('./common/search/SearchPanelController.js');

    window.app.common.searchPanel = new SearchPanelController(commonService);
    window.app.common.wishList = new SearchPanelController(localService)

    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    // CarItem
    var carItemView 		= require('./common/car-item/itemView.js');
    var carItemTemplate	= require('./common/car-item/car-item.handlebars');
    var carItemController 	= require('./common/car-item/itemController.js');

    function CarItem(commonService, template, View, Controller, events){
        this.commonService = commonService;
        this.view = new View(template);
        this.controller = new Controller(this.commonService, this.view, events);
    }

    var carItem = new CarItem(  commonService,
                                carItemTemplate,
                                carItemView,
                                carItemController,
                                app.library.events );



 /*   var commonModules = [app.common.searchPanel];

    function checkCommonModulesControllers(searchParams){
        for (var i = 0; i < commonModules.length; i++){
            if (!commonModules[i].controller.started){
                commonModules[i].controller.init(searchParams);
            }
        }
    }
*/
    app.routes = {};

    function route(path, module){
        app.routes[path] = {module: module};
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

        if (!route.module.started && route.module.init) {
            route.module.init(searchParams);
        } else if (routeName === '/'){
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            app.common.searchPanel.init();
        }

        if (routeName === 'search') {
           // checkCommonModulesControllers(searchParams);
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            window.app.common.searchPanel.init(searchParams);
        }

        if (routeName === 'wishlist'){
            window.app.buttonSearch.classList.toggle('active',false);
            window.app.buttonWishList.classList.toggle('active',true);
            window.app.common.wishList.init(searchParams);
        }

    }

    console.log('before hash track');
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    route('/', window.app.common.searchPanel);
    route('search', window.app.common.searchPanel);
    route('wishlist', window.app.common.wishList);

    console.log('routes inited');
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
