describe("Promise", function() {

	var promise;

	beforeEach(function() {
		promise = new Promise();
	});

	it("should have a method resolve", function() {
		expect(promise.then).toBeDefined();
	});

	it("should have a method then", function() {
		expect(promise.then).toBeDefined();
	});

	it("should have a method reject", function() {
		expect(promise.reject).toBeDefined();
	});

});

describe("Then", function() {

	var promise;

	beforeEach(function() {
		promise = new Promise();

		function Error(message) {
			this.message = message;
		}
	});

	it("should be able to receive a callback ", function() {

		var thenCallback;

		promise.then( function(v) {
			thenCallback = 'Hola Mundo';
		});

		promise.resolve();
		expect(thenCallback).toEqual('Hola Mundo');

	});

	it("should be able to receive various callbacks ", function() {

		var callbackOneValue, callbackTwoValue;

		promise.then( function(v) {
			console.log("Me resuelvo con el valor recibido inicialmente " ,v );
			callbackOneValue = v;
		});

		promise.then( function(z) {
			console.log("Soy otro callback y devuelvo el valor almacenado", z);
			callbackTwoValue = z;
		});

		promise.resolve(12);

		expect(callbackOneValue).toEqual(12);
		expect(callbackTwoValue).toEqual(12);

	});

	it("should be able to receive error callbacks in order ", function() {

		var rejectCallError, rejectCallError2;

		promise.then( function(v) {
			console.log("Me resuelvo con el valor recibido inicialmente " ,v );
		}, function(e) {
			console.log("Oh, oh...", e.message);
			rejectCallError = e.message;
		});

		promise.then( function(v) {
			console.log("Segundo cb de éxito: " ,v );
		}, function(e) {
			console.log("Segundo cb de error: ", e.message);
			rejectCallError2 = e.message;
		});

		function MyError(message) {
			this.message = message;
	 }

		promise.reject(new MyError('Error'));
		expect(rejectCallError).toEqual('Error');
		expect(rejectCallError2).toEqual('Error');

	});

	it("should be able to receive a promise ", function() {

		var promise2, promise1returnValue, promise2returnValue;

		promise2 = promise.then( function(v) {
			console.log("Promesa 1 resuelta con" ,v );
			promise1returnValue = v;
		});

		promise2.then( function() {
			console.log("Promesa 2 resuelta!! ");
			promise2returnValue = 'OK';
		});

		promise.resolve(42);
		expect(promise1returnValue).toEqual(42);
		expect(promise2returnValue).toEqual('OK');

	});

	it("should be able return a value to next parameter ", function() {

		var promiseReturnValue;

		promise.then( function(v) {
			console.log("Promesa 1 resuelta con" ,v );
			return v * 2;
		}).then( function(v2) {
			console.log("El doble es ", v2);
			promiseReturnValue = v2;
		});

		promise.resolve(42);
		expect(promiseReturnValue).toEqual(84);

	});

	it("should be continue with then callbakcks if one block gives error", function() {

		var promiseThen1ReturnValue, promiseThen2ReturnValue;

		promise.then( function() {
			console.log("Aquí no llego" );
		}, function(e) {
			console.log("Nos recuperamos de:", e.message);
			promiseThen1ReturnValue = e.message;
		}).then( function() {
			console.log("Todo OK");
			promiseThen2ReturnValue = 'Todo OK';
		});

		promise.reject(new Error('La frustracion'));
		expect(promiseThen1ReturnValue).toEqual('La frustracion');
		expect(promiseThen2ReturnValue).toEqual('Todo OK');

	});

	it("should continue executing untile last capture", function() {

		var promiseThen1ReturnValue, promiseThen2ReturnValue;

		promise.then( function() {
			console.log("Aquí no llego" );
		}, function(e) {
			console.log("Nos recuperamos de:", e.message);
			promiseThen1ReturnValue = e.message;
		}).then( function() {
			console.log("Todo OK");
			promiseThen2ReturnValue = 'Todo OK';
		});



		promise.reject(new Error('La frustracion'));
		expect(promiseThen1ReturnValue).toEqual('La frustracion');
		expect(promiseThen2ReturnValue).toEqual('Todo OK');

	});

	it("should reject the promise return if a block throws an exception", function() {

		var errorMessage;

		promise.then(function() {
			console.log('Esto sale por pantalla');
		})
		.then(function() {
			throw new Error("Oh my!");
		})
		.then(null, function(e) {
			console.log("Capturo el error:", e.message);
			errorMessage = e.message;
		});

		promise.resolve(42);

		expect(errorMessage).toEqual('Oh my!');

	});


});

describe("Resolve", function() {

	var promise;

	beforeEach(function() {
		promise = new Promise();
	});

	it("should be able to resolve with a initial value", function() {

		var resolveValue;

		promise.then( function(v) {
			console.log("Me resuelvo con el valor recibido inicialmente " ,v );
			resolveValue = v;
		});

		promise.resolve(12);
		expect(resolveValue).toEqual(12);


	});

	it("should be able to rembember first resolve value and not change", function() {

		var resolveValue;

		promise.resolve(12);

		promise.then( function(v) {
			console.log("Me resuelvo con el valor recibido inicialmente " ,v );
			resolveValue = v;
		});

		promise.then( function(z) {
			console.log("Soy otro callback y devuelvo el valor almacenado", z);
		});

		promise.resolve(42);
		expect(resolveValue).toEqual(12);
		expect(resolveValue).not.toEqual(42);

	});

});

describe("Reject", function() {

	var promise;

	beforeEach(function() {
		promise = new Promise();
	});

	it("should be able to receive a function witn an error message ", function() {

		var rejectCallError;

		promise.then( function(v) {
			console.log("Me resuelvo con el valor recibido inicialmente " ,v );
		}, function(e) {
			console.log("Oh, oh...", e.message);
			rejectCallError = e.message;
		});

		function MyError(message) {
			this.message = message;
		}

		promise.reject(new MyError('Error'));
		expect(rejectCallError).toEqual('Error');

	});

	it("should fall error if block doesn´t capture error", function() {

		var promiseThen1ReturnValue, promiseThen2ReturnValue, promiseThen3ReturnValue;

		promise.then( function() {
			console.log("Aquí no llego" );
			promiseThen1ReturnValue = 'Aquí no llego';
		}).then( function() {
			console.log("Aquí tampoco");
			promiseThen2ReturnValue = 'Aquí tampoco';
		}).then( null, function(e) {
			console.log("El error ha caido hasta aquí", e.message);
			promiseThen3ReturnValue = 'El error ha caido hasta aquí';
		});

		promise.reject(new Error('Imparable'));
		expect(promiseThen1ReturnValue).toBeUndefined();
		expect(promiseThen2ReturnValue).toBeUndefined();
		expect(promiseThen3ReturnValue).toBe('El error ha caido hasta aquí');

	});

});