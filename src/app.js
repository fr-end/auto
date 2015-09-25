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

    var events = require('./library/events/events.js');

    var autoService = require('./library/auto/autoService.js')(XMLHttpRequest);
    var localService = require('./library/local/localService.js')(localStorage,XMLHttpRequest);

    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    var HeaderController = require('./common/authorization/AuthorizationController.js')();

    var router = require('./common/router/router.js')(HeaderController);

    var SearchPanelController = require('./common/search/SearchPanelController.js');

    router.route('/', SearchPanelController, autoService, events);
    router.route('search', SearchPanelController, autoService, events);
    router.route('wishlist', SearchPanelController, localService, events);

    // for testing serverNode
    var Q = require('q');
    var ajax = require('./library/ajax/ajax.js')(XMLHttpRequest, Q);
    console.log(ajax);

    //ajax.getPromise('/db');

    ajax
        .getPromise('/db/user/email@e.mail?data=newdata&something=something#hash')
        .then(function(data){console.log(data);});
    // end testing serverNode

})(window);
