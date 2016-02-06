/**
 * Simple event dispatcher class to notify when we have an event met
 */

class Dispatcher {

    /**
     * A class that can be used for dispatching events to a specified callback.
     * Terminology:
     *  - event trigger: A trigger (usually a string) that is 'emitted' during
     *                  run time. This causes all registered callbacks to be
     *                  invoked.
     *  - callback: A method that is invoked upon receiving an event trigger
     */

    // create our dispatch event list
    constructor() {
        this.dispatch_event_list = {};
    }

    /**
     * Registers a callback(s) with a specified event trigger
     * @param event_trigger (string): A string that represent the event we will emit
     * @param callback (method): A callback that is invoked if the event trigger is emitted
     */
    register(event_trigger, callback) {
        var args = Array.prototype.slice.call(arguments);

        if ( args.length == 2 && typeof args[0] == 'string' && typeof args[1] == 'function') {

        }
    }

    /**
     * Registers a single callback with a specified event trigger
     * @param event_trigger (string): A string that represent the event we will emit
     * @param callback (method): A callback that is invoked if the event_trigger is broadcasted
     */
    registerSingle(event_trigger, callback) {
        if (this.dispatch_event_list[event_trigger] === undefined) {
            this.dispatch_event_list[event_trigger] = [callback];
        } else {
            this.dispatch_event_list[event_trigger].push(callback);
        }
    }

    /**
     * Registers multiple callbacks associated with a specified event trigger
     * @param event_trigger
     * @param arguments: Variable list of callbacks that are associated with an event trigger
     */
    registerMultiple(event_trigger) {
        if (this.dispatch_event_list[event_trigger] === undefined) {
            this.dispatch_event_list[event_trigger] = [callback];
        } else {
            this.dispatch_event_list[event_trigger].push(callback);
        }
    }

    emit(event_trigger) {
        if (this.dispatch_event_list[event_trigger]) {  // if we have this event trigger in our trigger list;
            this.dispatch_event_list[event_trigger].map((callback) => {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                callback.apply(null, args);
            });
        }
    }
}

// create an instance of our dispatcher
let dispatcher = new Dispatcher();

export default dispatcher
