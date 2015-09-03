

function View(/*template*/) {

}

View.prototype.render = function (data, viewPort) {
    var aTemplateFunction = require('./car-item.handlebars');
    var html = aTemplateFunction(data);
    viewPort.innerHTML = html;
};

View.prototype.bind = function (event, handler) {

};

var view = new View();

module.exports = view;