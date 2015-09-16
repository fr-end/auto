
var env = require('../../libs_spec/test_config.js');

var JasmineHelpers = require('../../libs_spec/jasmineHelpers.js')();

console.log(JasmineHelpers.deferredSuccess);

describe('commonService', function(){

    spyOn(env.library.ajax.get);

    beforeEach(function(){
        env.library.ajax.get('some url', 'some promise');
    });

    it('should have getCategories function', function(){
        expect(env.library.commonService.getCategories).toEqual(jasmine.any(Function));
        //expect(commonService.getCategories).not.toThrow();
    });

    describe('getCategories function', function(){

        it('should call ajax.get function', function(){
            expect(env.library.ajax.get).toHaveBeenCalled();
        });

        it('should return deferred.promise object', function(){

        });

    });

});

//module.exports = (function(){
//
//    var config = {
//        autoRiaUaHost: '/proxy'
//    };
//
//    var ajax = require('../../library/ajax/ajax.js');
//    var Q = require('../../../node_modules/q/q.js');
//
//    var auto = {
//        getCategories: function () {
//            var deferred=Q.defer();
//            //https://auto.ria.com/api/categories?langId=2
//            var langId = 2;
//            var url = config.autoRiaUaHost + '/api/categories?langId=' + langId;
//            ajax.get( url, deferred );
//            console.log("autoService-getCategories");
//            return deferred.promise;
//        },
//      return auto;
//})();