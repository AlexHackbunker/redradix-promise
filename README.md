#Promise


My Library made for the Redradix ProJS Courses as an excersise

Used Jasmine standalone for TDD 
###Usage

```
    var promise = new Prom();    promise.then(function() { console.log("aquí no llego!");		}, function(e) {			console.log("Nos recuperamos de:", e.message);		}) .then(function() {        	console.log("Todo ok!");      	});
```

## License

MIT © [Alejandro Sevilla]