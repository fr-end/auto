module.exports = (function(){

	function Model(service){
        this.service = service;
        this.searchParams = {};
        this.searchParams.countPage = 10;
        this.searchParams.page = 0;
        this.carsCount = 0;
    }

    Model.prototype = {
        getSearchParams: function(){
            return this.searchParams;
        },
        setSearchParams: function(searchParams){
            this.searchParams = searchParams || {};
            this.searchParams.page = this.searchParams.page || 0;
            this.searchParams.countPage = this.searchParams.countPage || 10;
            this.carsCount = this.service.getCarsCount(this.searchParams);
        },
        nextPage: function(){

            this.searchParams.page++;
            return this.getSearchParams();
        },
        getCarIds: function(){
            return this.service.getCarIds(this.searchParams);
        },
        getMoreCount: function(){
            return Math.max(0,this.carsCount - this.searchParams.page*this.searchParams.countPage - 10);
        },
        getHasMore: function(){
            return this.getMoreCount() > 0;
        }

    };

	return Model;
	
})();