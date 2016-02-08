/**
 * This example will show the use of a dispatcher in the event you use an asynchronous
 * method and would like to update some field when it is complete
 */

var dispatcher = require("../lib/jsdispatcher.js").$Dispatcher;

function pong() {
    console.log('pong');
    setTimeout(() => {
        dispatcher.emit('ping');
    }, 1000);
}

function ping() {
    console.log('ping');
    setTimeout(() => {
        dispatcher.emit('pong');
    }, 1000);
}

pong.register('pong');
ping.register('ping');

ping();