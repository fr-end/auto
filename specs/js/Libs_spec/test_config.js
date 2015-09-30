
var env = {};
env.window = {};
env.window.document = {};
env.window.document.querySelector = function(){
    return;
}

env.closestPathToSrcFolder = '../../../src/';
env.furtherPathToSrcFolder = '../../../../src/';

env.library = {};
env.library.Q = require('q');

//env.library.commonService = require( env.closestPathToSrcFolder + 'library/auto/autoService.js')(env.window.XMLHttpRequest);
/*
env.deferredSuccess = function (args) {
        var deferred = env.library.Q.defer();
        deferred.resolve(args);
        return deferred.promise; // might be deferred.promise();
};

env.deferredFailure = function (args) {
    var deferred = env.library.Q.defer();
    deferred.reject(args);
    return deferred.promise;
};

*/
module.exports = env;
