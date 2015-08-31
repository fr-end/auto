window.app = {
  auto: require('./library/auto/autoModel.js'),
  events: require('./library/events/events.js'),
  searchParams: {
    categoryId: 1,
    markaId: 98,
    modelId: 953
  }
};

window.app.events.subscribe('categories',function(data){
  document.getElementById('categories').innerHTML=data;    
});

window.app.events.subscribe('marks',function(data){
  document.getElementById('marks').innerHTML=data;    
});

window.app.events.subscribe('models',function(data){
  document.getElementById('models').innerHTML=data;    
});

window.app.events.subscribe('cars',function(data){
  document.getElementById('cars').innerHTML=data;    
});

window.app.events.subscribe('carsCount',function(data){
  document.getElementById('carsCount').innerHTML=data;    
});

window.app.events.subscribe('car',function(data){
  document.getElementById('car').innerHTML=data;    
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




