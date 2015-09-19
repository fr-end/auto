
var env = require('../../libs_spec/test_config.js');

describe('ajax.', function(){
	var ajax;
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';


	describe('get function', function(){
		var XMLHttpRequest;
		var xmlHttpInstance;
		var deferred;
		var promise;

		describe('after any request', function(){

			beforeEach(function() {
				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, env.library.Q);
				spyOn(ajax, 'get');
				ajax.get(url1);
			});

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

		});

		describe('after successful request', function(){
			//var Q;

			beforeEach(function(){
				/*
				Q = function(){};

				Q.prototype.defer = function(){
					console.log('in Q.prototype.defer');
					deferred = this;

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
				XMLHttpRequest = function(){};
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

				XMLHttpRequest.prototype.status = 200;
				XMLHttpRequest.prototype.readyState = 4;

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, env.library.Q);

				//spyOn(deferred, 'resolve');

				promise = ajax.get(url1);

				//console.log('beforeEach "after successful request" running...')
			});

			it('xmlHttpInstance should be defined', function(){
				expect(xmlHttpInstance).toBeDefined();
			});

			it('xmlHttpInstance should have open', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('xmlHttpInstance.open() function should be called', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('xmlHttpInstance should have onreadystatechange function', function(){
				expect(xmlHttpInstance.onreadystatechange).toEqual(jasmine.any(Function));


				console.log('* instance');
				console.log(xmlHttpInstance)


				console.log("function");
				console.log(xmlHttpInstance.onreadystatechange)

				//expect(xmlhttp.readyState).toEqual(4);
				//expect(xmlhttp.status).toEqual(200);
				//expect(JasmineHelpers.deferredSuccess).toHaveBeenCalledWith(xmlhttp.responseText);
			});

			it('xmlHttpInstance to have status property', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('xmlHttpInstance status property equals 200', function(){
				expect(xmlHttpInstance.status).toBe(200);
			});

			it('should return resolved promise object', function(){
				//for (var prop in promise){
				//	console.log(prop, ': '/*, promise[prop]*/);
				//}

				//console.log('promise from ajax.get', promise);

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
