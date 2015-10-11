(function(window) {

    Q = require('q');

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

    var autoService = require('./services/auto/autoService.js');


    window.app.buttonSearch = document.getElementById('header-menu-item__search');
    window.app.buttonWishList = document.getElementById('header-menu-item__wish-list');

    // for testing serverNode
    var ajax = require('./library/ajax/ajax.js')(XMLHttpRequest, Q);

    // end testing serverNode

    var AuthorizationController = require('./modules/authorization/AuthorizationController.js')(ajax, events);

    var SearchPanelController = require('./modules/searchPanel/SearchPanelController.js');
    var CarListController = require('./modules/carList/CarListController.js')(document, localStorage, XMLHttpRequest);
    var CarPageController = require('./modules/carPage/CarPageController.js');
    var TopCarsController = require('./modules/topCars/TopCarsController.js');

    var router = require('./library/router/router.js')(AuthorizationController);

    var authorization = new AuthorizationController();
    authorization.init();

    var localService = require('./services/local/localService.js');
    //events.subscribe('user', function(user){
    //    console.log('user', user);
    //
    //    if (user){
    //        var localService = require('./services/mongo/mongoService.js')(localStorage, XMLHttpRequest,Q);
    //    }
    //    else {
    //        var localService = require('./services/local/localService.js');
    //    }
    //
    //    router.route('/', SearchPanelController, autoService, events);
    //    router.route('/', TopCarsController, autoService, events);
    //
    //    router.route('search', SearchPanelController, autoService, events);
    //    router.route('search', CarListController, autoService, events);
    //
    //    router.route('wishlist', SearchPanelController, localService, events);
    //    router.route('wishlist', CarListController, localService, events);
    //
    //    router.route('car', CarPageController, autoService, events);
    //
    //});

    //(function init(){
    //
    //    var user = localStorage.getItem('user');
    //
    //    var url = '/db/user/' + user + '/wishlistIDs/';
    //    console.log('ajax', ajax);
    //    ajax.getPromise(url)
    //        .then(function(data){
    //            console.log('user in mongoService', data);
    //        });
    //
    //})();
    //
    //(function addCar(){
    //    var user = localStorage.getItem('user');
    //
    //    var url = '/db/user/' + user + '/wishlistIDs/';
    //    var wishlist = {};
    //    wishlist.CarId = Math.floor(Math.random() * 10000000);
    //    console.log('ajax', ajax);
    //    ajax.getPromisePost(url, wishlist)
    //        .then(function(data){
    //            console.log('user in mongoService', data);
    //        });
    //})();

    router.route('/', SearchPanelController, autoService, events);
    router.route('/', TopCarsController, autoService, events);

    router.route('search', SearchPanelController, autoService, events);
    router.route('search', CarListController, autoService, events);

    router.route('wishlist', SearchPanelController, localService, events);
    router.route('wishlist', CarListController, localService, events);

    router.route('car', CarPageController, autoService, events);

})(window);
