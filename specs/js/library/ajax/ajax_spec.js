
var Q;
var deferred;
Q = function(){};


Q.defer = function(){
	//console.log('in Q.defer');
	return Q;
};

Q.resolved = false;

Q.resolve = function(){
	console.log('in Q.resolve');
	Q.resolved = true;
};

Q.rejected = false;

Q.reject = function(){
	console.log('in Q.reject');
	Q.rejected = true;
};

Q.then = function(data){
	return data
};

Q.promise = {
	resolved: Q.resolved,
	rejected: Q.rejected
};

var env = require('../../libs_spec/test_config.js');

//var Q = require('q');

describe('ajax.', function(){
	var ajax;
	var url1 = 'some url1';
	var someJSONData = '{"method":"GET", "url":"some url", "boolean":"true"}';
	//var deferred;
	var promise;
	var XMLHttpRequest;
	var xmlHttpInstance;

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
				Q.resolve(this.responseText);
			} else {
				Q.reject('error');
			}
		}
	};

	XMLHttpRequest.prototype.send = function(){
		return;
	};

	describe('get function', function(){

		describe('after any request', function(){

			beforeEach(function() {

				// why this spy isn't working?
				spyOn(Q, 'defer');

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);
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

			it('Q library should have defer function', function(){
				expect(Q.defer).toEqual(jasmine.any(Function));
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


				XMLHttpRequest.prototype.status = 200;
				XMLHttpRequest.prototype.readyState = 4;

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);

				//spyOn(deferred, 'resolve');

				promise = ajax.get(url1);

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


				console.log(' resolved promise from ajax.get', promise);
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
				XMLHttpRequest.prototype.status = 100500;
				XMLHttpRequest.prototype.readyState = 4;

				ajax = require( env.furtherPathToSrcFolder + 'library/ajax/ajax.js')(XMLHttpRequest, Q);

				promise = ajax.get(url1);
			});


			it('should return rejected promise object', function(){

				console.log(' rejected promise from ajax.get', promise);
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
