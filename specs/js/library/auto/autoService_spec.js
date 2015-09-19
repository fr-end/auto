
var env = require('../../libs_spec/test_config.js');

//console.log(env.library.commonService);
/*
describe('commonService', function(){


    it('should have getCategories function', function(){
        expect(env.library.commonService.getCategories).toEqual(jasmine.any(Function));
        expect(env.library.commonService.getCategories).not.toThrow();
    });

    it('should have getMarks function', function(){
        expect(env.library.commonService.getMarks).toEqual(jasmine.any(Function));
        expect(env.library.commonService.getMarks).not.toThrow();
    });

    describe('getCategories function', function(){

        var url = 'some url';

        var deferred;
        var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';

        beforeEach(function(){
            deferred = env.library.Q.defer();
            spyOn(env.library.ajax, 'get'); //.and.stub(deferred.resolve(someJSONData)); .and.returnValue(deferred.resolve(someJSONData));
        });

        afterEach(function(){
            deferred = null;
            env.library.ajax.get.calls.reset();
        });

        it('should call ajax.get function once', function(){

            env.library.ajax.get('some url', deferred);

            expect(env.library.ajax.get).toHaveBeenCalled();
            expect(env.library.ajax.get.calls.count()).toEqual(1);
        });

        it('should return deferred.promise object', function(){

            env.library.ajax.get('some url', deferred);

            //console.log(env.library.commonService.getCategories());
            //console.log(deferred.promise);

            //expect(env.library.commonService.getCategories()).toEqual(deferred.promise)
        });

    });

});
*/

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
//        }
//      return auto;
//})();