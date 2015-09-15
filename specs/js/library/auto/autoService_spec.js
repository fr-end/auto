var pathToSrcFolder =   '../../../../src/';
var pathToNodeModules = '../../../../node_modules/';


var commonService = require( pathToSrcFolder + 'library/auto/autoService.js');

var ajax = require( pathToSrcFolder + 'library/ajax/ajax.js');
var Q = require( pathToNodeModules + 'q/q.js');

describe('commonService', function(){

    it('should have getCategories function', function(){
        expect(commonService.getCategories).toEqual(jasmine.any(Function));
        //expect(commonService.getCategories).not.toThrow();
    });

});