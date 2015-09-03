var searchPanel = document.getElementById('searchPanel');

console.log(searchPanel);

var searchPanelTemplate = require('./common/search/templates/searchPanel.handlebars');
var html = searchPanelTemplate();
searchPanel.innerHTML = html;




var service = require('./library/auto/autoService.js');

var view = require('./common/search/searchView.js');

window.app = {

  search: require('./common/search/searchController.js')(service,view)
  //ents: require('./library/events/events.js'),
};


(function(){  

  var Model = require('./catalog/searchResults/searchResultsModel.js');
  var View = require('./catalog/searchResults/searchResultsView.js');
  var Controller = require('./catalog/searchResults/searchResultsController.js');

  var model = new Model();
  var view = View('searchResultsPanel');
  var controller = new Controller(model, view);

})();





/*
window.app.auto.getCategories()
                .then(function(data){
                  document.getElementById('categories').innerHTML=data;
                });

window.app.auto.getMarks(1)
  .then(function(data){
    document.getElementById('marks').innerHTML=data;
}); 

window.app.auto.getModels(1, 98)
  .then(function(data){
    document.getElementById('models').innerHTML=data;
});                

window.app.auto.getCategories(function(data){
    window.app.events.publish('categories',data);
});

window.app.auto.getMarks(1,function(data){
    window.app.events.publish('marks',data);
});

window.app.auto.getModels(1,98,function(data){
    window.app.events.publish('models',data);
});

window.app.auto.getCarIds(window.app.searchParams,function(data){
    window.app.events.publish('cars',data);
});

window.app.auto.getCarsCount(window.app.searchParams,function(data){
    window.app.events.publish('carsCount',data);
});

window.app.auto.getCar(16001421,function(data){
    window.app.events.publish('car',data);
});

*/

