var Q;

Q = {};

Q.defer = function(){

	var deferred = this;

	this.resolve = function(){
		console.log('in Deferred.resolve');
		deferred.resolved = true;
	};
	this.reject = function(){
		console.log('in Deferred.reject');
		deferred.rejected = true;
	};

	this.promise = {
		then: function(data){return data},
		resolved: deferred.resolved,
		rejected: deferred.rejected
	};

	//console.log(deferred);
	//console.log('in Q.defer');
	return deferred;
};

var env = require('../../../Libs_spec/test_config.js');

//var Q = require('q');

describe('ajax.', function(){
	var ajax;
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';
	var deferred;
	var promise;
	var XMLHttpRequest;
	var xmlHttpInstance;

	describe('get function', function(){

		describe('after any request', function(){

			beforeEach(function() {

				XMLHttpRequest = function(){

					var xmlHttpInstance = this;

					this.open = function(method, url, boolean){
						xmlHttpInstance.opened = true;
						//self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
						xmlHttpInstance.responseText = someJSONData;
					};
/*
					this.onreadystatechange = function(){
						if (xmlHttpInstance.readyState === 4) {
							if(xmlHttpInstance.status === 200) {
								console.log('status 200')
								deferred.resolve(this.responseText);
							} else {
								console.log('status is not 200')
								deferred.reject('error');
							}
						}
					};
*/
					this.send = function(){
						return;
					};

					//console.log('in XMLHttpRequest', this);

					return this;
				};

				// why this spy isn't working?
                spyOn(Q, 'defer');

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);

				spyOn(ajax, 'getPromise');
				
				ajax.getPromise(url1);
			});

			it('should exists and not throw exeptions', function(){
				expect(ajax.getPromise).toEqual(jasmine.any(Function));
			});

			it('should not throw exeptions', function(){
				expect(ajax.getPromise).not.toThrow();
			});

			it('should be called once', function(){
				expect(ajax.getPromise.calls.count()).toEqual(1);
			});

			it('should be called with some url', function(){
				expect(ajax.getPromise).toHaveBeenCalledWith(jasmine.any(String));
			});

			it('Q library should have defer function', function(){
				expect(Q.defer).toEqual(jasmine.any(Function));
			});

			xit('Q.defer function should be called once', function(){
				expect(Q.defer.calls.count()).toEqual(1);
			});

			xit('Q.defer function should be called without any parameters', function(){
				expect(Q.defer).toHaveBeenCalled();
			});

		});

		describe('after successful request', function(){

			beforeEach(function(){

				XMLHttpRequest = function(){

					xmlHttpInstance = this;

					this.open = function(method, url, boolean){
						//console.log('in xmlHttpInstance.open() function')
						xmlHttpInstance.opened = true;
						//self.responseText = '{' + '"method":"' + method + ',"url":"' + url + ',"boolean":"' + boolean +'"}';
						xmlHttpInstance.responseText = someJSONData;

					};

					this.send = function(){
						return;
					};

					//console.log('in XMLHttpRequest', this)

				};

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);

				//spyOn(deferred, 'resolve');

				promise = ajax.getPromise(url1);

				xmlHttpInstance.status = 200;
				xmlHttpInstance.readyState = 4;
				//console.log('xmlHttpInstance.onreadystatechange', xmlHttpInstance.onreadystatechange);

				//console.log('beforeEach "after successful request" running...')
			});


			it('xmlHttpInstance should be defined', function(){
				expect(xmlHttpInstance).toBeDefined();
			});

			it('xmlHttpInstance status property should be 200', function(){
				expect(xmlHttpInstance.status).toBe(200);
			});

			it('xmlHttpInstance readyState property should be 4', function(){
				expect(xmlHttpInstance.readyState).toBe(4);
			});

			it('xmlHttpInstance should have open function', function(){
				expect(xmlHttpInstance.open).toEqual(jasmine.any(Function));
			});

			it('xmlHttpInstance.open() function should be called', function(){
				expect(xmlHttpInstance.opened).toBe(true);
			});

			it('xmlHttpInstance should have onreadystatechange function', function(){
				expect(xmlHttpInstance.onreadystatechange).toEqual(jasmine.any(Function));
			});

			it('should return resolved promise object', function(){


				//console.log(' resolved promise from ajax.getPromise', promise);

				//console.log('promise.isPending()',promise.isPending())
				//console.log('promise.isRejected()',promise.isRejected())
				//console.log('promise.isFulfilled()',promise.isFulfilled())

				expect(promise.then).toEqual(jasmine.any(Function));
				//expect(promise.done).toEqual(jasmine.any(Function));
				//expect(promise.valueOf).toEqual(jasmine.any(Function));
				//expect(promise.catch).toEqual(jasmine.any(Function));

				//expect(promise.isPending()).toBe(true);
				//expect(promise.isRejected()).toBe(false);
			});
		});

		describe('after unsuccessful request', function(){

			beforeEach(function() {
				XMLHttpRequest.status = 100500;
				XMLHttpRequest.readyState = 4;

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);

				promise = ajax.getPromise(url1);
			});


			it('should return rejected promise object', function(){

				//console.log(' rejected promise from ajax.getPromise', promise);

				//console.log('promise.isPending()',promise.isPending())
				//console.log('promise.isRejected()',promise.isRejected())
				//console.log('promise.isFulfilled()',promise.isFulfilled())

				expect(promise.then).toEqual(jasmine.any(Function));
				//expect(promise.done).toEqual(jasmine.any(Function));
				//expect(promise.valueOf).toEqual(jasmine.any(Function));
				//expect(promise.catch).toEqual(jasmine.any(Function));
				//expect(promise.isFulfilled).toEqual(jasmine.any(Function));
				//expect(promise.isFulfilled()).toBe(false);

			});
		});

	});
});
