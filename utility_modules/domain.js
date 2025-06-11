var EventEmitter = require('events').EventEmitter;
var domain = require('domain');

var emitter1 = new EventEmitter();

//Create domain
var domain1 = domain.create();

domain1.on('error', function(err) {
    console.log("domain1 handled this error ("+err.message+")");
});


//explicit binding
domain1.add(emitter1);

emitter1.on('error', function(err) {
    console.log("listener handle this error ("+err.message+")");
});

emitter1.emit('error', new Error('To be handled by listener'));
emitter1.removeAllListeners('error');
emitter1.emit('error', new Error('To be handled by domain1'));