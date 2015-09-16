
var env = require('../../libs_spec/test_config.js');

var ajax = require(env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(env.window.XMLHttpRequest);

var JasmineHelpers = require('../../libs_spec/jasmineHelpers.js')();
//console.log(ajax);
var xmlhttp = new env.window.XMLHttpRequest();

describe('ajax.', function(){

	spyOn(ajax.get);

	describe('get function', function(){

		it('should exists', function(){
			expect(ajax.get).toEqual(jasmine.any(Function));
			//expect(ajax.get).not.toThrow();
		});

		describe('after successful request', function(){
			beforeEach(function() {
				var deffered = env.library.Q.defer();
				xmlhttp.readyState = 4;
				xmlhttp.status = 200;
				ajax.get('some url', deffered);
				JasmineHelpers.deferredSuccess(xmlhttp.responseText);
			});


			it('should call deferred.resolve response text', function(){

				expect(xmlhttp.readyState).toEqual(4);
				expect(xmlhttp.status).toEqual(200);
				expect(JasmineHelpers.deferredSuccess).toHaveBeenCalledWith(xmlhttp.responseText);
			});
		});

		describe('after unsuccessful request', function(){


			beforeEach(function() {

				xmlhttp.readyState = 4;
				xmlhttp.status = 404;
			});


			it('should call deferred.reject with error message', function() {
				expect(xmlhttp.readyState).toEqual(4);
				expect(xmlhttp.status).not.toEqual(200);

			});
		});

	});
});
/*

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
			function (url,deferred) {
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
			}
	};

	return ajax;

}());

 */