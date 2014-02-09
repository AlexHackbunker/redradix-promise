var Promise = function() {
	var self = {},
	callbacks = [],
	args = [],
	state,
	value,
	errorCallbacks=[];

	self.then = function(callback, errorCallback) {

		if (errorCallback !== undefined)  {
			errorCallbacks.push(errorCallback);
		} else {
			if (state == 'initialized') {
				value = callback.apply(this,args);
			} else {
				callbacks.push(callback);
			}
		}
		return self;
	};

	self.resolve = function() {

		if (state == 'initialized' && args == [] ) { return };

	 	args  = [].slice.call(arguments);
	 	state = 'initialized';

		for (i = 0; i < callbacks.length; i++ ) {
			if ( value !== undefined ) {
				value = callbacks[i].call(this,value);
			} else {
				value = callbacks[i].apply(this,args);
			}

		}
		return value;
	};

	self.reject = function(errorFn) {

		for (var i = 0; i < errorCallbacks.length; i++) {
			errorCallbacks[i].apply(this, arguments);
		}

			for (var i = 0; i < callbacks.length; i++) {
			callbacks[i].apply(this, arguments);
		}

	};

	return self;

};