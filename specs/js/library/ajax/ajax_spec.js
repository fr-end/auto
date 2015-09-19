
var env = require('../../libs_spec/test_config.js');

describe('ajax.', function(){
	var ajax;
	var deferred;
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';
	var XMLHttpRequest;


	beforeEach(function() {

		XMLHttpRequest = function(){};
		ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(env.window.XMLHttpRequest, env.library.Q);
		spyOn(ajax, 'get');
		ajax.get(url1);
		console.log('called')

	});



	describe('get function', function(){

		it('should exists and not throw exeptions', function(){
			expect(ajax.get).toEqual(jasmine.any(Function));
		});

		it('should not throw exeptions', function(){
			expect(ajax.get).not.toThrow();
		});

		it('should be called once', function(){
			expect(ajax.get.calls.count()).toEqual(1);
		});

		it('should be called with some url', function(){
			expect(ajax.get).toHaveBeenCalledWith(jasmine.any(String));
		});

		describe('after any request', function(){



		});

		describe('after successful request', function(){
			//var Q;
			var xmlHttpInstance;
			var deferred;
			var promise;
			beforeEach(function(){
				/*
				Q = function(){};

				Q.prototype.defer = function(){
					console.log('in Q.prototype.defer');
					deffered = this;

					this.prototype.resolve = function(){
						this.resolved = true;
					};
					this.prototype.reject = function(){
						this.rejected = true;
					};
					this.prototype.promise = {};

					return this;
				};
				*/
				XMLHttpRequest.prototype.status = 200;
				XMLHttpRequest.prototype.readyState = 4;

				XMLHttpRequest.prototype.open = function(method, url, boolean){
					xmlHttpInstance = this;
					xmlHttpInstance.opened = true;
					//self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
					xmlHttpInstance.responseText = someJSONData;
				};

				XMLHttpRequest.prototype.onreadystatechange = function(){
					if (this.readyState === 4) {
						if(this.status === 200) {
							deferred.resolve(this.responseText);
						} else {
							deferred.reject('error');
						}
					}
				};

				XMLHttpRequest.prototype.send = function(){
					return;
				};

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, env.library.Q);

				//spyOn(deferred, 'resolve');

				promise = ajax.get(url1);

				console.log('beforeEach running...')
			});

			//console.log(deferred)
			//var xmlhttp = new env.window.XMLHttpRequest();
			//xmlhttp.readyState = 4;
			//xmlhttp.status = 200;
			//xmlhttp.responseText = someJSONData;
			//xmlhttp.onreadystatechange(url1, deferred);

			it('xmlHttpInstance.open() function', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('should call xmlHttpInstance.open() function', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('should call deferred.resolve with response text', function(){
				//expect(deferred.resolve).toHaveBeenCalled();
				console.log('promise from ajax.get', promise);

				console.log('* instance');
				console.log(xmlHttpInstance)
				for (var prop in xmlHttpInstance){
					console.log(prop)
				}
				console.log('deferred', deferred)
				console.log("function");
				console.log(xmlHttpInstance.onreadystatechange)

				//expect(xmlhttp.readyState).toEqual(4);
				//expect(xmlhttp.status).toEqual(200);
				//expect(JasmineHelpers.deferredSuccess).toHaveBeenCalledWith(xmlhttp.responseText);
			});

			it('should return resolved promise object', function(){
				//for (var prop in promise){
				//	console.log(prop, ': '/*, promise[prop]*/);
				//}

				expect(promise.then).toEqual(jasmine.any(Function));
				expect(promise.done).toEqual(jasmine.any(Function));
				expect(promise.valueOf).toEqual(jasmine.any(Function));
				expect(promise.catch).toEqual(jasmine.any(Function));

				expect(promise.isPending()).toBe(true);
				expect(promise.isRejected()).toBe(false);
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

describe('ajax.', function(){


	var deferred = env.library.Q.defer();
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';

	describe('get function', function(){
		var ajax;
		var XMLHttpRequest = function(){};

		beforeEach(function() {
			console.log(XMLHttpRequest)
			ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest);

			spyOn('ajax', 'get');

			ajax.get(url1, deferred);

		});

		it('should exists and not throw exeptions', function(){
			expect(ajax.get).toEqual(jasmine.any(Function));
		});

		it('should not throw exeptions', function(){
			console.log(ajax.get)
			expect(ajax.get).not.toThrow();
		});

		it('should be called once', function(){
			expect(ajax.get.calls.count()).toEqual(1);
		});

		it('should be called with url and deffered object', function(){
			expect(ajax.get).toHaveBeenCalledWith(jasmine.any(String), deferred);
		});

		describe('after successful request', function(){

			var xmlHttpInstance;

			beforeEach(function(){
				XMLHttpRequest.prototype.readyState = 100500;
				XMLHttpRequest.prototype.readyState = 100500;

				XMLHttpRequest.prototype.open = function(method, url, boolean){
					console.log('* bla open');
					console.log(this);
					xmlHttpInstance = this;
					//self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
					this.responseText = '{"method":"GET", "url":"some url", "boolean":"true"}';
				};

				XMLHttpRequest.prototype.onreadystatechange = function(url, deffered){
					if (this.readyState === 4) {
						if(this.status === 200) {
							deferred.resolve(this.responseText);
						} else {
							deferred.reject('error');
						}
					}
				};

				XMLHttpRequest.prototype.send = function(){
					return;
				};

				//spyOn(env.library.ajax, 'get');

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest);
				ajax.get(url1, deferred);
			});

			//console.log(deferred)
			//var xmlhttp = new env.window.XMLHttpRequest();
			//xmlhttp.readyState = 4;
			//xmlhttp.status = 200;
			//xmlhttp.responseText = someJSONData;
			//xmlhttp.onreadystatechange(url1, deferred);

			it('should call deferred.resolve response text', function(){

				console.log('* instance');
				console.log(xmlHttpInstance)
				xmlHttpInstance.status = 200;
				xmlHttpInstance.readyState = 4;
				console.log("instance");

				console.log("function");
				console.log(xmlHttpInstance.onreadystatechange)

			});
		});

	});
});

*/

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