/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../debug/errorhandler.d.ts"/>

declare module 'goog:goog.net.WebSocket' {
    import alias = goog.net.WebSocket;
    export default alias;
}

declare module 'goog:goog.net.WebSocket.MessageEvent' {
    import alias = goog.net.WebSocket.MessageEvent;
    export default alias;
}

declare module 'goog:goog.net.WebSocket.EventType' {
    import alias = goog.net.WebSocket.EventType;
    export default alias;
}

declare module 'goog:goog.net.WebSocket.ErrorEvent' {
    import alias = goog.net.WebSocket.ErrorEvent;
    export default alias;
}

declare namespace goog.net {
    /**
     * Class encapsulating the logic for using a WebSocket.
     *
     *     @see goog.net.WebSocket.Options.getNextReconnect. This parameter is
     *     ignored if Options is passed for the first argument.
     * @extends {goog.events.EventTarget}
     */
    class WebSocket extends __WebSocket {}
    abstract class __WebSocket extends goog.events.__EventTarget {
        /**
         * @param {boolean|!goog.net.WebSocket.Options=} opt_params
         *     Parameters describing behavior of the WebSocket. The boolean 'true' is
         *     equivalent to setting Options.autoReconnect to be true.
         * @param {function(number): number=} opt_getNextReconnect
         */
        constructor(opt_params?: boolean|Object, opt_getNextReconnect?: (_0: number) => number);

        /** @private {boolean} @see goog.net.WebSocket.Options.autoReconnect */
        private autoReconnect_: any /*missing*/;

        /**
         * @private {function(number): number}
         * @see goog.net.WebSocket.Options.getNextReconnect
         */
        private getNextReconnect_: any /*missing*/;

        /**
         * @private {goog.net.WebSocket.BinaryType}
         * @see goog.net.WebSocket.Options.binaryType
         */
        private binaryType_: any /*missing*/;

        /**
         * The time, in milliseconds, that must elapse before the next attempt to
         * reconnect.
         * @type {number}
         * @private
         */
        private nextReconnect_: number;

        /**
         * True if the web socket should automatically reconnect or not.  This is
         * true by default.
         * @type {boolean|undefined}
         */
        autoReconnect: boolean|undefined;

        /**
         * A function for obtaining the time until the next reconnect attempt. Given
         * the reconnect attempt count (which is a positive integer), the function
         * should return a positive integer representing the milliseconds to the
         * next reconnect attempt.  The default function used is an exponential
         * back-off. Note that this function is never called if auto reconnect is
         * disabled.
         * @type {(function(number): number)|undefined}
         */
        getNextReconnect: (((_0: number) => number))|undefined;

        /**
         * Specifies the type of incoming binary messages, either Blob or
         * ArrayBuffer.
         * @type {!goog.net.WebSocket.BinaryType|undefined}
         */
        binaryType: goog.net.WebSocket.BinaryType|undefined;

        /**
         * The actual web socket that will be used to send/receive messages.
         * @type {?WebSocket}
         * @private
         */
        private webSocket_: WebSocket|null;

        /**
         * The URL to which the web socket will connect.
         * @type {?string}
         * @private
         */
        private url_: string|null;

        /**
         * The subprotocol name used when establishing the web socket connection.
         * @type {string|undefined}
         * @private
         */
        private protocol_: string|undefined;

        /**
         * True if a call to the close callback is expected or not.
         * @type {boolean}
         * @private
         */
        private closeExpected_: boolean;

        /**
         * Keeps track of the number of reconnect attempts made since the last
         * successful connection.
         * @type {number}
         * @private
         */
        private reconnectAttempt_: number;

        /** @private {?number} */
        private reconnectTimer_: any /*missing*/;

        /**
         * The logger for this class.
         * @type {?goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger|null;

        /**
         * Creates and opens the actual WebSocket.  Only call this after attaching the
         * appropriate listeners to this object.  If listeners aren't registered, then
         * the `goog.net.WebSocket.EventType.OPENED` event might be missed.
         *
         * @param {string} url The URL to which to connect.
         * @param {string=} opt_protocol The subprotocol to use.  The connection will
         *     only be established if the server reports that it has selected this
         *     subprotocol. The subprotocol name must all be a non-empty ASCII string
         *     with no control characters and no spaces in them (i.e. only characters
         *     in the range U+0021 to U+007E).
         */
        open(url: string, opt_protocol?: string): void;

        /**
         * Closes the web socket connection.
         */
        close(): void;

        /**
         * Sends the message over the web socket.
         *
         * @param {string|!ArrayBuffer|!ArrayBufferView} message The message to send.
         */
        send(message: string|ArrayBuffer|ArrayBufferView): void;

        /**
         * Checks to see if the web socket is open or not.
         *
         * @return {boolean} True if the web socket is open, false otherwise.
         */
        isOpen(): boolean;

        /**
         * Gets the number of bytes of data that have been queued using calls to send()
         * but not yet transmitted to the network.
         *
         * @return {number} Number of bytes of data that have been queued.
         */
        getBufferedAmount(): number;

        /**
         * Called when the web socket has connected.
         *
         * @private
         */
        private onOpen_(): void;

        /**
         * Called when the web socket has closed.
         *
         * @param {!Event} event The close event.
         * @private
         */
        private onClose_(event: Event): void;

        /**
         * Called when a new message arrives from the server.
         *
         * @param {MessageEvent<string>} event The web socket message event.
         * @private
         */
        private onMessage_(event: MessageEvent): void;

        /**
         * Called when there is any error in communication.
         *
         * @param {Event} event The error event containing the error data.
         * @private
         */
        private onError_(event: Event): void;

        /**
         * Clears the reconnect timer.
         *
         * @private
         */
        private clearReconnectTimer_(): void;
    }
}

declare namespace goog.net.WebSocket {
    /**
     * Object representing a new incoming message event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class MessageEvent extends __MessageEvent {}
    abstract class __MessageEvent extends goog.events.__Event {
        /**
         * @param {string} message The raw message coming from the web socket.
         */
        constructor(message: string);

        /**
         * The new message from the web socket.
         * @type {string}
         */
        message: string;
    }

    /**
     * Object representing an error event. This is fired whenever an error occurs
     * on the web socket.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class ErrorEvent extends __ErrorEvent {}
    abstract class __ErrorEvent extends goog.events.__Event {
        /**
         * @param {string} data The error data.
         */
        constructor(data: string);

        /**
         * The error data coming from the web socket.
         * @type {string}
         */
        data: string;
    }

    /** @enum {string} */
    enum BinaryType { ARRAY_BUFFER, BLOB }

    /** @record */
    function Options(): void;

    /**
     * The events fired by the web socket.
     * @enum {string} The event types for the web socket.
     */
    enum EventType { CLOSED, ERROR, MESSAGE, OPENED }

    /**
     * Installs exception protection for all entry points introduced by
     * goog.net.WebSocket instances which are not protected by
     * {@link goog.debug.ErrorHandler#protectWindowSetTimeout},
     * {@link goog.debug.ErrorHandler#protectWindowSetInterval}, or
     * {@link goog.events.protectBrowserEventEntryPoint}.
     *
     * @param {!goog.debug.ErrorHandler} errorHandler Error handler with which to
     *     protect the entry points.
     */
    function protectEntryPoints(errorHandler: goog.debug.ErrorHandler): void;
}
