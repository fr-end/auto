(function(window) {

    /*render body*/

    var headerTemplate          = require('./common/header/header.handlebars');
    var headerHtml              = headerTemplate();

    var searchPanelTemplate     = require('./common/search/templates/searchPanel.handlebars');
    var searchPanelHtml         = searchPanelTemplate();

    var searchResultsTemplate   = require('./catalog/CarList/CarList.handlebars');
    var searchResultsHtml       = searchResultsTemplate();

    var mainpageTemplate        = require('./mainpage/mainpage.handlebars');
    var mainpageHtml            = mainpageTemplate();

    var footerTemplate          = require('./footer/footer.handlebars');
    var footerHtml              = footerTemplate();

    var carpageTemplate          = require('./common/car-item/car-page.handlebars');
    var carpageHtml              = carpageTemplate();

    var data = {
        header          : headerHtml,
        searchPanel     : searchPanelHtml,
        searchResults   : searchResultsHtml,
        main            : mainpageHtml,
        footer          : footerHtml,
        carpage          : carpageHtml
    };

    var bodyTemplate            = require('./body.handlebars');
    var bodyHtml                = bodyTemplate(data);

    document.body.innerHTML     = bodyHtml;

    // describe classes for modules

    /*compile app*/
    window.app = {};

    var events = require('./library/events/events.js');

    var autoService = require('./library/auto/autoService.js')(XMLHttpRequest);
    var localService = require('./library/local/localService.js')(localStorage,XMLHttpRequest);

    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    var AuthorizationController = require('./common/header/authorization/AuthorizationController.js')();
    var SearchPanelController = require('./common/search/SearchPanelController.js');
    var CarListController = require('./catalog/CarList/CarListController.js')(document, localStorage, XMLHttpRequest);

    var router = require('./common/router/router.js')(AuthorizationController);

    router.route('/', AuthorizationController, localService, events);
    router.route('/', SearchPanelController, autoService, events);

    router.route('search', AuthorizationController, localService, events);
    router.route('search', SearchPanelController, autoService, events);
    router.route('search', CarListController, autoService, events);

    router.route('wishlist', AuthorizationController, localService, events);
    router.route('wishlist', SearchPanelController, localService, events);
    router.route('wishlist', CarListController, localService, events);


    // for testing serverNode
    var Q = require('q');
    var ajax = require('./library/ajax/ajax.js')(XMLHttpRequest, Q);
    console.log(ajax);

    //ajax.getPromise('/db');

    ajax
        .getPromise('/db/user/email@e.mail?data=newdata&something=something#hash')
        .then(function(data){console.log(data);});
    ajax
        .getPromisePost('/db/user', {_id: '%20@e.mail', wishlist: [12,123, 'asdasd', {a: 13}]})
        .then(function(data){console.log(data);});

    // end testing serverNode

})(window);
