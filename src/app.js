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

    var autoService = require('./library/auto/autoService.js');
    var localService = require('./library/local/localService.js');

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

    var carItem = new CarItem(  autoService,
                                carItemTemplate,
                                carItemView,
                                carItemController,
                                app.library.events );


    app.routes = {};

    function router(){

        var hashLessURL = location.hash.slice(1) || '/';

        var hashLessURLArray = hashLessURL.split('/');
        var routeName = hashLessURLArray[0] || '/';

        var searchParams = {};
        for (var i = 1; i < hashLessURLArray.length; i = i + 2){
            searchParams[hashLessURLArray[i]] = hashLessURLArray[i + 1];
        }

        var route = app.routes[routeName];

        var routeController = new route.Controller(route.params);

        if (!routeController.started && routeController.init) {
            routeController.init(searchParams);
        } else if (routeName === '/'){
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            routeController.init();
        }

        if (routeName === 'search') {
           // checkCommonModulesControllers(searchParams);
            window.app.buttonSearch.classList.toggle('active',true);
            window.app.buttonWishList.classList.toggle('active',false);
            routeController.init(searchParams);
        }

        if (routeName === 'wishlist'){
            window.app.buttonSearch.classList.toggle('active',false);
            window.app.buttonWishList.classList.toggle('active',true);
            routeController.init(searchParams);
        }

    }

    function route(path, Controller, params){
        app.routes[path] = { Controller: Controller, params: params };
    }


    var SearchPanelController = require('./common/search/SearchPanelController.js');

    route('/', SearchPanelController,autoService);
    route('search', SearchPanelController,autoService);
    route('wishlist', SearchPanelController,localService);

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);



})(window);
