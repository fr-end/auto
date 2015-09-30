(function(window) {

    Q = require('q');

    /*render body*/

    var headerTemplate          = require('./modules/header/header.handlebars');
    var headerHtml              = headerTemplate();

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

    var autoService = require('./services/auto/autoService.js');
    var localService = require('./services/local/localService.js');

    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    // for testing serverNode
    var ajax = require('./library/ajax/ajax.js')(XMLHttpRequest, Q);

    //ajax.getPromise('/db');

    ajax
        .getPromise('/db/user/email@e.mail?data=newdata&something=something#hash')
        .then(function(data){console.log(data);});

    // end testing serverNode

    var AuthorizationController = require('./modules/authorization/AuthorizationController.js')(ajax);
    var SearchPanelController = require('./modules/searchPanel/SearchPanelController.js');
    var CarListController = require('./modules/carList/CarListController.js')(document, localStorage, XMLHttpRequest);
    var TopCarsController = require('./modules/topCars/TopCarsController.js');

    var router = require('./library/router/router.js')(AuthorizationController);

    var authorization = new AuthorizationController();
    authorization.init();

    router.route('/', SearchPanelController, autoService, events);
    router.route('/', TopCarsController, autoService, events);

    router.route('search', SearchPanelController, autoService, events);
    router.route('search', CarListController, autoService, events);

    router.route('wishlist', SearchPanelController, localService, events);
    router.route('wishlist', CarListController, localService, events);




})(window);
