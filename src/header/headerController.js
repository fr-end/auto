module.exports = function(){

    //var Model = require('./headerModel.js');
    var View 		= require('./headerView.js');

    function HeaderController(model){
        this.model = model;
        this.view = new View();
        //this.view.bind('clickAddToWishListButton', (function () {
        //    var result = this.toggleWishList(this.carId);
        //    this.view.toggleClass(this.carId, result);
        //}).bind(this));
    }


    HeaderController.prototype = {
        init: function(){
            var self = this;
            self.view.render('showAuthMenu', {data: 'data'})
        }
    };

    return HeaderController;

};