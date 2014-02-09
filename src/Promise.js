var Promise = function() {
	var self = {},
	callbacks = [],
	args = [],
	state,
	value,
	errorCallbacks= [],
	thrownError = false,
	blockError;

	self.then = function(callback, errorCallback) {

		if (state == 'initialized') {
			value = callback.apply(this,args);
		} else {
			errorCallbacks.push(errorCallback);
			callbacks.push(callback);
		}

		return self;
	};

	self.resolve = function() {

		if (state == 'initialized' && args == [] ) { return };

	 	args  = [].slice.call(arguments);
	 	state = 'initialized';

		for (var i = 0; i < callbacks.length; i++ ) {

			if ( blockError !== undefined ) {

				if (errorCallbacks[i] !== undefined) {
					errorCallbacks[i].call(this, blockError);
				}

			} else  {

				try {
					if ( value !== undefined ) {
						value = callbacks[i].call(this,value);
					} else {
						value = callbacks[i].apply(this,args);
					}
				} catch(e) {
					value = undefined;
					blockError = e;
				}

			} // else

		} // for
		return value;
	};

	self.reject = function(errorFn) {

		for (var i = 0; i < errorCallbacks.length; i++) {

			if ( errorCallbacks[i] === undefined ) {
				if (thrownError) {
					callbacks[i].apply(this, arguments);
				}
			} else {
				errorCallbacks[i].apply(this, arguments);
				thrownError = true;
			}
		}

	};

	return self;

};