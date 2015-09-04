

function View(/*template*/) {

}

View.prototype.render = function (data) {
	var viewPort = document.querySelector('[data-car-id="' + data.carId + '"]');
    var aTemplateFunction = require('./car-item.handlebars');
    var html = aTemplateFunction(data);
    viewPort.innerHTML = html;
};

View.prototype.bind = function (event, handler) {

};

var view = new View();

module.exports = view;