module.exports = function(HeaderController){

    function Router(){
        this.routes = {};
        window.addEventListener('hashchange', (this.router).bind(this));
        window.addEventListener('load', (this.router).bind(this));
    }

    Router.prototype = {
        route: function(path, Controller, params, events){
            this.routes[path] = { Controller: Controller, params: params, events: events };
        },
        router: function(){
            var hashLessURL = location.hash.slice(1) || '/';

            var hashLessURLArray = hashLessURL.split('/');
            var routeName = hashLessURLArray[0] || '/';

            var searchParams = {};
            for (var i = 1; i < hashLessURLArray.length; i = i + 2){
                searchParams[hashLessURLArray[i]] = hashLessURLArray[i + 1];
            }

            var route = this.routes[routeName];

            var routeController = new route.Controller(route.params, route.events);

            var headerController = new HeaderController();
            headerController.init();

            routeController.init(searchParams);

            if (routeName === '/'){
                window.app.buttonSearch.classList.toggle('active',true);
                window.app.buttonWishList.classList.toggle('active',false);
            }

            if (routeName === 'search') {
                window.app.buttonSearch.classList.toggle('active',true);
                window.app.buttonWishList.classList.toggle('active',false);
            }

            if (routeName === 'wishlist'){
                window.app.buttonSearch.classList.toggle('active',false);
                window.app.buttonWishList.classList.toggle('active',true);
            }
        }
    };

    var router = new Router();

    return router;

};