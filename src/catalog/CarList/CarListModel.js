module.exports = (function(){

	function Model(/*service*/){
		//var self = this;
		//self.service = service;
	}
	/*
	Model.prototype.getCarIDs = function(searchParams){
		var self = this;
		self.service.getCarIds(searchParams)
			.then(function (data) {
				console.log(data);
				var carIDs = JSON.parse(data).result.search_result.ids;
				return carIDs;
			});
	}
	*/

	return Model;
	
})();