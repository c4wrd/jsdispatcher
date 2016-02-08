"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple event dispatcher class to notify when we have an event met
 */

var Dispatcher = function () {

    /**
     * A class that can be used for dispatching events to a specified callback.
     * Terminology:
     *  - signal: A trigger (usually a string) that is 'emitted' during
     *            run time. This causes all registered callbacks to be invoked.
     *  - callback: A method that is invoked upon receiving an event trigger
     */

    // create our dispatch event list

    function Dispatcher() {
        var _this = this;

        _classCallCheck(this, Dispatcher);

        var dispatcher_instance = this;
        Function.prototype.register = function (signal) {
            dispatcher_instance.register(signal, _this);
        };
        this._events = {};
    }

    /**
     * Emits a signal for any registered listeners to handle
     * @param signal: The signal to emit to any listeners
     */

    _createClass(Dispatcher, [{
        key: "emit",
        value: function emit(signal) {
            var _arguments = arguments;

            if (this._events[signal]) {
                // if we have this event trigger in our trigger list;
                this._events[signal].map(function (callback) {
                    var args = Array.prototype.slice.call(_arguments);
                    args.shift();
                    callback.apply(null, args);
                });
                return true;
            }
            return false;
        }

        /**
         * Emits the signal if the boolean_expression evaluates to true
         * @param signal
         * @param boolean_expression
         */

    }, {
        key: "emitIf",
        value: function emitIf(signal, boolean_expression) {
            if (boolean_expression) {
                return this.emit(signal);
            }
            return false;
        }

        /**
         * Registers a callback(s) with a specified event trigger
         * @param signal :| string: A string that represent the event we will emit
         * @param callback :| method(s): Callback that is invoked if the event trigger is emitted.
         *                              Multiple callbacks can be applied by additional parameters.
         */

    }, {
        key: "register",
        value: function register(signal, callback) {
            var _this2 = this;

            if (signal === undefined || callback === undefined) {
                return false;
            }

            var args = Array.prototype.slice.call(arguments);
            args.shift(); // shift out our event trigger

            if (this._events[signal] === undefined) {
                this._events[signal] = args;
            } else {
                args.forEach(function (item) {
                    _this2._events[signal].push(callback);
                });
            }

            return true;
        }

        /**
         * Removes a callback from a signal, should it exist
         * @param signal: The signal to remove the callback from
         * @param callback: The specified callback to remove
         * @returns {boolean}: True if the removal was successful, otherwise false
         */

    }, {
        key: "remove",
        value: function remove(signal, callback) {
            // if our signal or callback is undefined, or the signal doesn't exist in our event list
            if (signal === undefined || callback === undefined || this._events[signal] === undefined) {
                return false;
            }

            if (this._events[signal].indexOf(callback) == -1) {
                return false;
            } else {
                this._events[signal].splice(this._events[signal].indexOf(callback), 1);
                return true;
            }
        }

        /**
         * Removes all callbacks from a given signal
         * @param signal: signal to remove all callbacks from
         */

    }, {
        key: "removeAll",
        value: function removeAll(signal) {
            this._events[signal] = undefined;
        }
    }]);

    return Dispatcher;
}();

exports.default = Dispatcher;