/**
 *
 * jsdispatcher: A class that can be used for dispatching events to a specified callback.
 *
 * Terminology:
 *  - signal: A trigger (usually a string) that is 'emitted' during
 *            run time. This causes all registered callbacks to be invoked.
 *  - callback: A method that is invoked upon receiving an event trigger
 **/

class Dispatcher {

    /**
     * Creates an additional dispatcher instance with a given name and adds
     * a Function.prototype that allows you to register events with this
     * instance through Function.dispatcher_name.regsiter
     * @param dispatcher_name
     */
    static createDispatcher(dispatcher_name) {

        // our dispatchers instance
        Dispatcher._dispatchers = Dispatcher._dispatchers || {};

        if (!(dispatcher_name === undefined)) {
            var _dispatcher = new Dispatcher();
            Dispatcher.createDispatcherPrototype(dispatcher_name, _dispatcher);
            Dispatcher._dispatchers[dispatcher_name] = _dispatcher;
            return _dispatcher;
        }
    }

    /**
     * Retrieves a dispatcher for a given name, should it exist.
     */
    static getDispatcher(dispatcher_name) {
        Dispatcher._dispatchers = Dispatcher._dispatchers || {};

        return Dispatcher._dispatchers[dispatcher_name];
    }

    /**
     * Registers an additional register Function prototype method with a specified
     *  dispatcher instance
     * @param dispatcher_name: The name of the dispatcher, accessible as
     *                         Function.dispatcher_name
     * @param dispatcher_instance: The instance of which to register events with
     *
     * To associate this dispatcher with events, you can invoke from
     * Function.dispatcher_name.register(...)
     */
    static createDispatcherPrototype(dispatcher_name, dispatcher_instance) {
        // Allows us to register a function with function.register(signal)
        Function.prototype[dispatcher_name] = {};
        Function.prototype[dispatcher_name].register = function (signal) {
            dispatcher_instance.register(signal, this); // this is resolved to the callee in this scope
        };
    }

    /**
     * Creates a new dispatcher instnace
     * @param createPrototype: if true we will register this Dispatcher instance as
     * the default dispatcher instance associated with Function.prototype.register
     */
    constructor(createPrototype = true) {
        this._events = {};

        if (createPrototype == true) {
            var _dispatcher = this;

            // Allows us to register a function with function.register(signal)
            Function.prototype.register = function (signal) {
                _dispatcher.register(signal, this); // this is resolved to the callee in this scope
            };
        }
    }

    /**
     * Emits a signal for any registered listeners to handle
     * @param signal: The signal to emit to any listeners
     * @param args: The arguments to apply to the callbacks associated
     *  with this signal
     */
    emit(signal, ...args) {
        if (this._events[signal]) {  // if we have this event trigger in our trigger list;
            this._events[signal].map((callback) => {
                callback.apply(null, args);
            });
            return true;
        }
        return false;
    }

    /**
     * Emits a signal that invokes each of it's callbacks asynchronously
     */
    emitAsync(signal) {

    }

    /**
     * Emits the signal if the boolean_expression evaluates to true
     * @param signal
     * @param boolean_expression
     */
    emitIf(signal, boolean_expression) {
        if (boolean_expression) {
            return this.emit(signal);
        }
        return false;
    }

    /**
     * Registers a callback(s) with a specified event trigger
     * @param signal :| string: A string that represent the event we will emit
     * @param args :| Callbacks that to be registered with this signal
     */
    register(signal, ...args) {
        if (typeof signal != 'undefined' && typeof callback != 'undefined') {
            this._events[signal] = this._events[signal] || [];

            args.forEach((callback) => {
                this._events[signal].push(callback);
            });

            return true;
        }
        return false;
    }

    /**
     * Removes a callback from a signal, should it exist
     * @param signal: The signal to remove the callback from
     * @param callback: The specified callback to remove
     * @returns {boolean}: True if the removal was successful, otherwise false
     */
    remove(signal, callback) {

        // if our signal or callback is undefined, or the signal doesn't exist in our event list
        if (signal === undefined || callback === undefined || this._events[signal] === undefined) {
            if (!(this._events[signal].indexOf(callback) == -1)) {
                this._events[signal].splice(this._events[signal].indexOf(callback), 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Removes all callbacks from a given signal
     * @param signal: signal to remove all callbacks from
     */
    removeAll(signal) {
        delete this._events[signal];
    }
}


export default Dispatcher