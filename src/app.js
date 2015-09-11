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
    localService.initLocalService();

    // SearchPanel

    var SearchPanelView 			= require('./common/search/SearchPanelView.js');
    var searchPanelTemplates		= {
        options: 			require('./common/search/templates/options.handlebars'),
        optionsWithCount: 	require('./common/search/templates/optionsWithCount.handlebars')
    };
    var SearchPanelController 		= require('./common/search/SearchPanelController.js');


    function SearchPanel(service, templates, View, Controller){
        this.service = service;
        this.view = new View(templates);
        this.controller = new Controller(this.service, this.view);
    }

    window.app.common.searchPanel = new SearchPanel(commonService, searchPanelTemplates, SearchPanelView, SearchPanelController);
    window.app.common.wishList = new SearchPanel(localService, searchPanelTemplates, SearchPanelView, SearchPanelController);

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

    // CarList

    var CarListModel       = require('./catalog/CarList/CarListModel.js');
    var CarListView        = require('./catalog/CarList/CarListView.js');
    var carListTemplate 	= require('./catalog/CarList/CarList.handlebars');
    var CarListController  = require('./catalog/CarList/CarListController.js');

    function CarList(service, template, Model,  View, Controller, events){
        this.service = service;
        this.model = new Model(service);
        this.view = new View(template);
        this.controller = new Controller(this.service, this.model, this.view, events);
    }

    app.catalog.CarList = new CarList(  commonService,
                                        carListTemplate,
                                        CarListModel,
                                        CarListView,
                                        CarListController,
                                        app.library.events );

    // WhishList CarList

    app.catalog.WhishListCarList = new CarList(  localService,
        carListTemplate,
        CarListModel,
        CarListView,
        CarListController,
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

        if (!route.module.controller.started && route.module.controller.init) {
            route.module.controller.init(searchParams);
        } else if (routeName === '/'){
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            route.module.controller.init();
        }

        if (routeName === 'search') {
           // checkCommonModulesControllers(searchParams);
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            window.app.common.searchPanel.controller.init(searchParams);
            route.module.controller.getCarIDsFromURL(searchParams);
        }

        if (routeName === 'wishlist'){
            window.app.buttonSearch.classList.toggle('active',false);
            window.app.buttonWishList.classList.toggle('active',true);
            window.app.common.wishList.controller.init(searchParams);
            window.app.catalog.WhishListCarList.controller.getCarIDsFromURL(searchParams);

            //alert('wishlist');
           // checkCommonModulesControllers();
            //route.module.controller.init();
        }

    }

    console.log('before hash track');
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    route('/', app.common.searchPanel);
    route('search', app.catalog.CarList);
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
