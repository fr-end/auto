module.exports = function (document, localStorage, XMLHttpRequest, Q, CarController) {

    var Model       = require('./CarListModel.js');
    var View        = require('./CarListView.js')(document);

	function CarListController(service, events) {
        this._inited = false;
        this.service = service;
        this.model = new Model(service);
        this.view = new View();
        this.events = events;
        this.view.bind('showNextPage',(function(){
            this.getNextCars();
        }).bind(this));
	}

    CarListController.prototype = {

        init: function(searchParams) {
            if (!this._inited) {
                this.getCarIDsFromURL(searchParams);
                this._inited = true;
                console.log('CarListController.init()');
            }
        },

		getCarIDsFromURL: function(searchParams){
            this.model.setSearchParams(searchParams);
            this.view.render('showLoading');
            this.model.getCarIds()
                .then((this.getCarPromices).bind(this))
                .then((this.showCars).bind(this));
		},

        getNextCars: function(){
            this.view.render('showAddLoading');
            this.model.nextPage();
            this.model.getCarIds()
                .then((this.getCarPromices).bind(this))
                .then((this.showAddCars).bind(this));
        },

        getCarPromices: function(carIds){
            console.log('getCarPromices');
            if(!Array.isArray(carIds)){
                throw new Error('carIds is not Array in CarListController.showCars');
            }
            var carPromises = [];
            carIds.forEach((function(carId){
                if(isNaN(+carId)){
                    throw new Error('carIds must contain Array of numbers in CarListController.showCars');
                }
                var car = new CarController(this.service);
                var carPromise = car.showCar(carId);
                carPromises.push(carPromise);
            }).bind(this));
            return carPromises;
        },

        showCars: function(carPromises) {
            Q.allSettled(carPromises)
                .then(function(carPromises){
                    var carHtmls = [];
                    carPromises.forEach(function(result){
                        if (result.state === 'fulfilled') {
                            carHtmls.push(result.value);
                        }
                    });
                    return carHtmls;
                })
                .then((function(carHtmls){
                    this.view.render('showCars', { cars : carHtmls, hasMore: this.model.getHasMore(),
                        moreCount: this.model.getMoreCount()});
                }).bind(this));
        },
        showAddCars: function(carPromises) {
            Q.allSettled(carPromises)
                .then(function(carPromises){
                    var carHtmls = [];
                    carPromises.forEach(function(result){
                        if (result.state === 'fulfilled') {
                            carHtmls.push(result.value);
                        }
                    });
                    return carHtmls;
                })
                .then((function(carHtmls){
                    this.view.render('showAddCars', { cars : carHtmls, hasMore: this.model.getHasMore(),
                        moreCount: this.model.getMoreCount()});
                    this.view.render('hideAddLoading');
                }).bind(this));
        }
	
	};

	return CarListController;

};