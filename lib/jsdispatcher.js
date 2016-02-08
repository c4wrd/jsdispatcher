'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * jsdispatcher: A class that can be used for dispatching events to a specified callback.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Cory Forward
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Dispatcher = function () {
    _createClass(Dispatcher, null, [{
        key: 'createDispatcher',

        /**
         * Creates an additional dispatcher instance with a given name and adds
         * a Function.prototype that allows you to register events with this
         * instance through Function.dispatcher_name.regsiter
         * @param dispatcher_name
         */
        value: function createDispatcher(dispatcher_name) {

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

    }, {
        key: 'getDispatcher',
        value: function getDispatcher(dispatcher_name) {
            Dispatcher._dispatchers = Dispatcher._dispatchers || {};

            return Dispatcher._dispatchers[dispatcher_name];
        }

        /**
         * Returns the current default dispatcher instance
         */

    }, {
        key: 'getDefault',
        value: function getDefault() {
            return Dispatcher._dispatchers['default'];
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

    }, {
        key: 'createDispatcherPrototype',
        value: function createDispatcherPrototype(dispatcher_name, dispatcher_instance) {
            // Allows us to register a function with function.register(signal)
            Function.prototype[dispatcher_name] = {};
            Function.prototype[dispatcher_name].register = function (signal) {
                dispatcher_instance.register(signal, this); // this is resolved to the callee in this scope
            };
        }

        /**
         * Creates a new dispatcher instance and sets this instance as the default instance.
         * @param defaultInstance: if true we will register this Dispatcher instance as
         * the default dispatcher instance, as well as registering the Function.prototype
         * associated with this instance's register method.
         */

    }]);

    function Dispatcher() {
        var defaultInstance = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        _classCallCheck(this, Dispatcher);

        this._events = {};

        if (defaultInstance == true) {
            Dispatcher._dispatchers = Dispatcher._dispatchers || {};
            Dispatcher._dispatchers['default'] = this;
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

    _createClass(Dispatcher, [{
        key: 'emit',
        value: function emit(signal) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (this._events[signal]) {
                // if we have this event trigger in our trigger list;
                this._events[signal].map(function (callback) {
                    callback.apply(null, args);
                });
                return true;
            }
            return false;
        }

        /**
         * Emits a signal that invokes each of it's callbacks asynchronously
         */

    }, {
        key: 'emitAsync',
        value: function emitAsync(signal) {
            if (this._events[signal]) {
                this._events[signal].map(function (callback) {
                    setTimeout(function () {
                        callback.apply(null, args);
                    }, 0);
                });
            }
        }

        /**
         * Emits the signal if the boolean_expression evaluates to true
         * @param signal
         * @param boolean_expression
         */

    }, {
        key: 'emitIf',
        value: function emitIf(signal, boolean_expression) {
            if (boolean_expression) {
                return this.emit(signal);
            }
            return false;
        }

        /**
         * Registers a callback(s) with a specified event trigger
         * @param signal: A string that represent the event we will emit
         * @param args: that to be registered with this signal
         */

    }, {
        key: 'register',
        value: function register(signal) {
            var _this = this;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            if (typeof signal != 'undefined' && typeof args != 'undefined') {
                this._events[signal] = this._events[signal] || [];

                args.forEach(function (callback) {
                    _this._events[signal].push(callback);
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

    }, {
        key: 'remove',
        value: function remove(signal, callback) {

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

    }, {
        key: 'removeAll',
        value: function removeAll(signal) {
            delete this._events[signal];
        }
    }]);

    return Dispatcher;
}();

/**s
 * The default exports of this module are the class to instantiate new dispatchers,
 * as well as the default dispatcher  which is accessible through $Dispatcher
 */

exports.default = Dispatcher;
var $Dispatcher = exports.$Dispatcher = new Dispatcher(true);
Dispatcher._dispatchers['default'] = $Dispatcher;