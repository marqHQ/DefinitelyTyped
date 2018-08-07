/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.net.streams.NodeReadableStream' {
    import alias = goog.net.streams.NodeReadableStream;
    export default alias;
}

declare namespace goog.net.streams {
    interface NodeReadableStream {
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

declare namespace goog.net.streams.NodeReadableStream {
    /**
     * Read events for the stream.
     * @enum {string}
     */
    enum EventType { READABLE, DATA, END, CLOSE, ERROR }
}
