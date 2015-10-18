(function(window) {
    "use strict";
    
    var Q = require('q');

    /*render body*/

    var HeaderController = require('./modules/header/HeaderController.js')();

    var header = new HeaderController();

    var headerHtml              = header.init();

    var footerTemplate          = require('./modules/footer/footer.handlebars');
    var footerHtml              = footerTemplate();

    var data = {
        header          : headerHtml,
        footer          : footerHtml
    };

    var bodyTemplate            = require('./body.handlebars');
    var bodyHtml                = bodyTemplate(data);

    document.body.innerHTML     = bodyHtml;

    // describe classes for modules

    /*compile app*/
    window.app = {};

    var events = require('./library/events/events.js');
    var ajax = require('./library/ajax/ajax.js')(XMLHttpRequest, Q);
    var autoService = require('./services/auto/autoService.js')(ajax);
    var localService = require('./services/local/localService.js')(localStorage,Q,events,ajax,autoService);

    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    var AuthorizationController = require('./modules/authorization/AuthorizationController.js')(ajax, events);

    var SearchPanelController = require('./modules/searchPanel/SearchPanelController.js');
    var CarController = require('./modules/car/CarController.js')(localStorage, XMLHttpRequest, localService);
    var CarListController = require('./modules/carList/CarListController.js')(document, localStorage, XMLHttpRequest, Q, CarController);
    var CarPageController = require('./modules/carPage/CarPageController.js')(CarController);
    var TopCarsController = require('./modules/topCars/TopCarsController.js')(Q);

    var router = require('./library/router/router.js')(AuthorizationController,events);

    var authorization = new AuthorizationController();
    authorization.init();

    router.route('/', SearchPanelController, autoService, events);
    router.route('/', TopCarsController, autoService, events);

    router.route('search', SearchPanelController, autoService, events);
    router.route('search', CarListController, autoService, events);

    router.route('wishlist', SearchPanelController, localService, events);
    router.route('wishlist', CarListController, localService, events);

    router.route('car', CarPageController, autoService, events);

})(window);
