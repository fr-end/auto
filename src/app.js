var auto = require('./library/auto/autoModel.js'),
    events = require('./library/events/events.js');

events.subscribe('categories',function(data){
  document.getElementById('categories').innerHTML=data;    
});

events.subscribe('marks',function(data){
  document.getElementById('marks').innerHTML=data;    
});

events.subscribe('models',function(data){
  document.getElementById('models').innerHTML=data;    
});

events.subscribe('cars',function(data){
  document.getElementById('cars').innerHTML=data;    
});

events.subscribe('carsCount',function(data){
  document.getElementById('carsCount').innerHTML=data;    
});

events.subscribe('car',function(data){
  document.getElementById('car').innerHTML=data;    
});

auto.getCategories(function(data){
    events.publish('categories',data);
});

auto.getMarks(1,function(data){
    events.publish('marks',data);
});

auto.getModels(1,98,function(data){
    events.publish('models',data);
});

var searchParams = {
    categoryId: 1,
    markaId: 98,
    modelId: 953
};

auto.getCars(searchParams,function(data){
    events.publish('cars',data);
});

auto.getCarsCount(searchParams,function(data){
    events.publish('carsCount',data);
});

auto.getCar(16001421,function(data){
    events.publish('car',data);
});




