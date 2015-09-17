module.exports = (function(){

	function Model(service){
        this.service = service;
        this.searchParams = {};
    }

    Model.prototype = {
        getSearchParams: function(){
            return this.searchParams;
        },
        setSearchParams: function(searchParams){
            this.searchParams = searchParams || {};
        },
        nextPage: function(){
            this.searchParams.page = this.searchParams.page || 0;
            this.searchParams.page++;
            return this.getSearchParams();
        }

    };

	return Model;
	
})();