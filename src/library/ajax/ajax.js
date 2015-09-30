module.exports = function (XMLHttpRequest, Q){

	var ajax = {
		getPromise: function (url) {
				var deferred = Q.defer();
				var xmlhttp = new XMLHttpRequest();

				xmlhttp.open('GET', url, true);
		      	xmlhttp.onreadystatechange = function() {
			        if (xmlhttp.readyState === 4) {
			           if(xmlhttp.status === 200) {
			                deferred.resolve(xmlhttp.responseText);
			            } else {
			            	deferred.reject('error');
			            }
			        }
			    };
	      		xmlhttp.send(null);
                return deferred.promise;
			},
        getPromisePost: function(url, postJSONData) {
            var deferred = Q.defer();
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open('POST', url, true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    if(xmlhttp.status === 200) {
                        deferred.resolve(xmlhttp.responseText);
                    } else {
                        deferred.reject('error');
                    }
                }
            };
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send(JSON.stringify(postJSONData));
            return deferred.promise;
        }
	};

	return ajax;

};

