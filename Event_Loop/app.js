const EventEmitter = require('events');
const emitter = new EventEmitter();


//Register a listener
emitter.on('messageLogged', function() {
    console.log('Listener call');
})


//Raise as event
emitter.emit('messageLogged'); //making a nosie, produce  - signalling


