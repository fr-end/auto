module.exports = function (){

    var template = require('./header.handlebars');

    var HeaderView = function(){
        this.template = template;
    };

    HeaderView.prototype = {
        render : function(data){
            return this.template(data);
        },
        setWishListCount: function(count){
            var wishListCount = document.querySelector('.header-menu-item-wishlist-count');
            wishListCount.innerText = count;
        }
    };

    return HeaderView;
};