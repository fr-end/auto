
var env = {};
env.window = {};
env.window.document = {};
env.window.document.querySelector = function(){
    return;
}

env.closestPathToSrcFolder = '../../../src/';
env.furtherPathToSrcFolder = '../../../../src/';
env.closestPathToNodeModules = '../../../node_modules/';

env.window.XMLHttpRequest = function(){
    var self = this;

    this.readyState = 100500;
    this.status = 100500;

    this.open = function(method, url, boolean){
        //self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
        self.responseText = '{"method":"GET", "url":"some url", "boolean":"true"}';
    };

    this.onreadystatechange = function(url, deffered){
        if (self.readyState === 4) {
            if(self.status === 200) {
                deferred.resolve(self.responseText);
            } else {
                deferred.reject('error');
            }
        }
    };

    this.send = function(){
        return;
    }
};

env.library = {};
env.library.Q = require(env.closestPathToNodeModules + 'q/q.js');
env.library.ajax = require( env.closestPathToSrcFolder + 'library/ajax/ajax.js')(env.window.XMLHttpRequest);
env.library.commonService = require( env.closestPathToSrcFolder + 'library/auto/autoService.js')(env.window.XMLHttpRequest);


env.deferredSuccess = function (args) {
        var deferred = env.library.Q.defer();
        deferred.resolve(args);
        return deferred.promise();
};

env.deferredFailure = function (args) {
    var deferred = env.library.Q.defer();
    deferred.reject(args);
    return deferred.promise();
};


module.exports = env;
