module.exports = function (){

    var Model = require('./HeaderModel.js')();
    var View = require('./HeaderView.js')();

    var HeaderController = function(){
        this.model = new Model();
        this.view = new View();
    };

    HeaderController.prototype = {
        init: function (){
            document.addEventListener('wishListCount',(function(e){
                if(e.hasOwnProperty('wishListCount')){
                    this.view.setWishListCount(e.wishListCount);
                }
            }).bind(this));
            console.log('(this.model.data)',this.model.data)
            return this.view.render(this.model.data);
        }
    };

    return HeaderController;

};