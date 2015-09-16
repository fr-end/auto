var env = require('./test_config.js');

var Q = require(env.closestPathToNodeModules + 'q/q.js');

//console.log(Q);

var JasmineHelpers = function () {

    var deferredSuccess = function (args) {
        var deferred = Q.defer();
        deferred.resolve(args);
        return deferred.promise();
    };

    var deferredFailure = function (args) {
        var deferred = Q.defer();
        deferred.reject(args);
        return deferred.promise();
    };

    return {
        deferredSuccess: deferredSuccess,
        deferredFailure: deferredFailure
    };
};

module.exports = JasmineHelpers;