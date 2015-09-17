var env = require('../../libs_spec/test_config.js');

describe('CarListController',function(){
    var Q = env.library.Q;
    var CarList = require(env.furtherPathToSrcFolder+'catalog/CarList/CarListController.js');
    var events = {};
    var service = {
        getCarIds: function (searchParams, username) {
            var deferred = Q.defer();
            var carIds = ["35435234","3453452","435453","353454"];
            deferred.resolve(carIds);
            return deferred.promise;
        }
    };

    beforeEach(function(){
        var carList = new CarList(service,events);
    });



});