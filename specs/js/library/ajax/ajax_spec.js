
var env = require('../../libs_spec/test_config.js');


console.log(env.library.ajax);


describe('ajax.', function(){

	var deferred = env.library.Q.defer();
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';

	beforeEach(function() {

		spyOn(env.library.ajax, 'get');
		env.library.ajax.get(url1, deferred);

	});



	describe('get function', function(){

		it('should exists and not throw exeptions', function(){
			expect(env.library.ajax.get).toEqual(jasmine.any(Function));
		});

		it('should not throw exeptions', function(){
			expect(env.library.ajax.get).not.toThrow();
		});

		it('should be called once', function(){
			expect(env.library.ajax.get.calls.count()).toEqual(1);
		});

		it('should be called with url and deffered object', function(){
			expect(env.library.ajax.get).toHaveBeenCalledWith(jasmine.any(String), deferred);
		});

		describe('after successful request', function(){
			//console.log(deferred)
			//var xmlhttp = new env.window.XMLHttpRequest();
			//xmlhttp.readyState = 4;
			//xmlhttp.status = 200;
			//xmlhttp.responseText = someJSONData;
			//xmlhttp.onreadystatechange(url1, deferred);

			it('should call deferred.resolve response text', function(){


				//expect(xmlhttp.readyState).toEqual(4);
				//expect(xmlhttp.status).toEqual(200);
				//expect(JasmineHelpers.deferredSuccess).toHaveBeenCalledWith(xmlhttp.responseText);
			});
		});
/*
		describe('after unsuccessful request', function(){

			beforeEach(function() {

			});


			it('should call deferred.reject with error message', function() {

			});
		});
*/
	});
});

/*
module.exports = function (XMLHttpRequest){

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

}

*/