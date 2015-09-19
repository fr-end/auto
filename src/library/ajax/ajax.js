module.exports = function (XMLHttpRequest, Q){

	function getXmlHttp(){

		var xmlhttp;
		try {
		  xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
		  try {
		    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		  } catch (E) {
		    xmlhttp = false;
		  }
		}
		if (!xmlhttp && typeof XMLHttpRequest!=='undefined') {
		  xmlhttp = new XMLHttpRequest();
		}

		return xmlhttp;

	}

	var ajax = {
		get: 
			function (url) {
				var deferred = Q.defer();
				var xmlhttp = getXmlHttp();

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
			}
	};

	return ajax;

};

