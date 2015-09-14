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

    var Router = require('./common/router/router.js');

    var router = new Router();

    var SearchPanelController = require('./common/search/SearchPanelController.js');

    router.route('/', SearchPanelController,autoService);
    router.route('search', SearchPanelController,autoService);
    router.route('wishlist', SearchPanelController,localService);


})(window);
