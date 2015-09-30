var env = require('../../libs_spec/test_config.js');

describe('CarListController',function(){
    var Q = env.library.Q;
    var document = {
        querySelector: function(){

        },
        createDocumentFragment: function(){

        }
    };
    var localStorage = {
        getItem: function(){

        },
        setItem: function(){

        },
        removeItem: function(){

        }
    };
    var XMLHttpRequest = {};
    //var carList = require(env.furtherPathToSrcFolder+'catalog/carList/CarListController.js')(document, localStorage, XMLHttpRequest);
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
        //var carList = new carList(service,events);
    });


    it('true expect to be true', function(){
        expect(true).toBe(true);
    });

});