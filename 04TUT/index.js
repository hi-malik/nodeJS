const logEvents = require('./logEvents')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter{}

// initalise object
const myEmitter = new MyEmitter();

// add listner for the log event
myEmitter.on('log', (msg) => logEvents(msg))


setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted!')
}, 2000)