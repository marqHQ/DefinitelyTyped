/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./nodereadablestream.d.ts"/>
/// <reference path="./xhrstreamreader.d.ts"/>

declare module 'goog:goog.net.streams.XhrNodeReadableStream' {
    import alias = goog.net.streams.XhrNodeReadableStream;
    export default alias;
}

declare namespace goog.net.streams {
    /**
     * The XhrNodeReadableStream class.
     *
     * @implements {goog.net.streams.NodeReadableStream}
     * @struct
     * @final
     * @package
     */
    class XhrNodeReadableStream extends __XhrNodeReadableStream {}
    abstract class __XhrNodeReadableStream implements goog.net.streams.NodeReadableStream {
        /**
         * @param {!goog.net.streams.XhrStreamReader} xhrReader The XhrStreamReader
         *    object that handles the events of the underlying Xhr.
         */
        constructor(xhrReader: goog.net.streams.XhrStreamReader);

        /**
         * @const
         * @private {?goog.log.Logger} the logger.
         */
        private readonly logger_: any /*missing*/;

        /**
         * The xhr reader.
         *
         * @private {!goog.net.streams.XhrStreamReader} the xhr reader.
         */
        private xhrReader_: any /*missing*/;

        /**
         * The callback map, keyed by eventTypes.
         *
         * @private {!Object<Array<function(!Object=)>>}
         */
        private callbackMap_: any /*missing*/;

        /**
         * The callback-once map, keyed by eventTypes.
         *
         * @private {!Object<Array<function(!Object=)>>}
         */
        private callbackOnceMap_: any /*missing*/;

        /**
         * Handles any new data from XHR.
         *
         * @param {!Array<!Object>} messages New messages, to be delivered in order
         *    and atomically.
         * @private
         */
        private onData_(messages: Object[]): void;

        /**
         * Deliver messages to registered callbacks.
         *
         * Exceptions are caught and logged (debug), and ignored otherwise.
         *
         * @param {!Array<!Object>} messages The messages to be delivered
         * @param {!Array<function(!Object=)>} callbacks The callbacks.
         * @private
         */
        private doMessages_(messages: Object[], callbacks: (_0: Object) => void[]): void;

        /**
         * Handles any state changes from XHR.
         *
         * @private
         */
        private onStatusChange_(): void;

        /**
         * Run status change callbacks.
         *
         * @param {string} eventType The event type
         * @private
         */
        private doStatus_(eventType: string): void;

        /**
         * Log an error
         *
         * @param {string} message The error message
         * @private
         */
        private handleError_(message: string): void;

        /**
         * Register a callback to handle I/O events.
         *
         * See https://iojs.org/api/events.html
         *
         * Note that under the object mode, an event of DATA will deliver a message
         * of 1) JSON compliant JS object, including arrays; or 2) an ArrayBuffer.
         *
         * Ordering: messages will be delivered to callbacks in their registration
         * order. There is no ordering between on() and once() callbacks.
         *
         * Exceptions from callbacks will be caught and ignored.
         *
         * @param {string} eventType The event type
         * @param {function(!Object=)} callback The call back to handle the event with
         * an optional input object
         * @return {goog.net.streams.NodeReadableStream} this object
         */
        on(eventType: string, callback: (_0: Object) => void): goog.net.streams.NodeReadableStream;

        /**
         * Register a callback to handle I/O events. This is an alias to on().
         *
         * @param {string} eventType The event type
         * @param {function(!Object=)} callback The call back to handle the event with
         * an optional input object
         * @return {goog.net.streams.NodeReadableStream} this object
         */
        addListener(eventType: string, callback: (_0: Object) => void): goog.net.streams.NodeReadableStream;

        /**
         * Unregister an existing callback, including one-time callbacks.
         *
         * @param {string} eventType The event type
         * @param {function(!Object=)} callback The call back to unregister
         * @return {goog.net.streams.NodeReadableStream} this object
         */
        removeListener(eventType: string, callback: (_0: Object) => void): goog.net.streams.NodeReadableStream;

        /**
         * Register a one-time callback to handle I/O events.
         *
         * @param {string} eventType The event type
         * @param {function(!Object=)} callback The call back to handle the event with
         * an optional input object
         * @return {goog.net.streams.NodeReadableStream} this object
         */
        once(eventType: string, callback: (_0: Object) => void): goog.net.streams.NodeReadableStream;
    }
}
