module.exports = (function () {

	var service = require('../../library/auto/autoService');
	var view 	= require('./itemView');
    var Item = require('./itemController');	

	var item = new Item(service, view);

    return item;
    
})();