
var env = {};
env.window = {};
env.window.document = {};
env.window.document.querySelector = function(){
    return;
}



env.closestPathToSrcFolder = '../../../src/';
env.furtherPathToSrcFolder = '../../../../src/';
env.closestPathToNodeModules = '../../../node_modules/';

env.library = {};
env.library.Q = require(env.closestPathToNodeModules + 'q/q.js');

env.window.XMLHttpRequest = function(){
    var self = this;

    this.readyState = 100500;
    this.status = 100500;

    this.open = function(method, url, boolean){
        self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
    };

    this.onreadystatechange = function(url, deffered){
        if (self.readyState === 4) {
            if(self.status === 200) {
                deferred.resolve(xmlhttp.responseText);
            } else {
                deferred.reject('error');
            }
        }
    };

    this.send = function(){
        return;
    }
};


module.exports = env;




//module.exports = (function (){
//
//    function getXmlHttp(){
//
//        var xmlhttp;
//        try {
//            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
//        } catch (e) {
//            try {
//                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
//            } catch (E) {
//                xmlhttp = false;
//            }
//        }
//        if (!xmlhttp && typeof XMLHttpRequest!=='undefined') {
//            xmlhttp = new XMLHttpRequest();
//        }
//
//        return xmlhttp;
//
//    }
//
//    var ajax = {
//        get:
//            function (url,deferred) {
//                var xmlhttp = getXmlHttp();
//                xmlhttp.open('GET', url, true);
//                xmlhttp.onreadystatechange = function() {
//                    if (xmlhttp.readyState === 4) {
//                        if(xmlhttp.status === 200) {
//                            deferred.resolve(xmlhttp.responseText);
//                        } else {
//                            deferred.reject('error');
//                        }
//                    }
//                };
//                xmlhttp.send(null);
//            }
//    };
//
//    return ajax;
//
//}());
//
