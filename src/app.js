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

    var AuthorizationController = require('./modules/authorization/AuthorizationController.js')();
    var SearchPanelController = require('./modules/searchPanel/SearchPanelController.js');
    var CarListController = require('./modules/carList/CarListController.js')(document, localStorage, XMLHttpRequest);

    var router = require('./library/router/router.js')(AuthorizationController);

    router.route('/', AuthorizationController, localService, events);
    router.route('/', SearchPanelController, autoService, events);

    router.route('search', AuthorizationController, localService, events);
    router.route('search', SearchPanelController, autoService, events);
    router.route('search', CarListController, autoService, events);

    router.route('wishlist', AuthorizationController, localService, events);
    router.route('wishlist', SearchPanelController, localService, events);
    router.route('wishlist', CarListController, localService, events);


    // for testing serverNode
    var ajax = require('./library/ajax/ajax.js');

    //ajax.getPromise('/db');

    ajax
        .getPromise('/db/user/email@e.mail?data=newdata&something=something#hash')
        .then(function(data){console.log(data);});
    ajax
        .getPromisePost('/db/user', {_id: '%20@e.mail', wishlist: [12,123, 'asdasd', {a: 13}]})
        .then(function(data){console.log(data);});

    // end testing serverNode

})(window);
