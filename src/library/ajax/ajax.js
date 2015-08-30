module.exports = (function (){

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
			function (url,success) {
				var xmlhttp = getXmlHttp();
				xmlhttp.open('GET', url, true);
		      	xmlhttp.onreadystatechange = function() {
			        if (xmlhttp.readyState === 4) {
			           if(xmlhttp.status === 200) {
			                success(xmlhttp.responseText);
			            }
			        }
			    };
	      		xmlhttp.send(null);			
			}
	};

	return ajax;

}());

