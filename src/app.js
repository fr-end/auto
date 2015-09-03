
var service = require('./library/auto/autoService.js');
var View = require('./common/search/searchView.js');
var Controller = require('./common/search/searchController.js');

var view = new View();

var controller = new Controller(service, view);
console.log(view);
view.$searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    controller.searchCars();
});
controller.init();

var Router = require('./routes.js');
/*
window.app = {

  searchController: require('./common/search/searchController.js')(service,view)
  //ents: require('./library/events/events.js'),
};
*/


// refactor it


//route definition
var route = {
    path: '#/',
    on: searchPanel
}

function searchPanel(){

}

Router.add(route);


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

