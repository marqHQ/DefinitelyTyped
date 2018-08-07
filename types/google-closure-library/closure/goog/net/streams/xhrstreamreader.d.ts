/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../xhrio.d.ts"/>
/// <reference path="./streamparser.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.net.streams.XhrStreamReader' {
    import alias = goog.net.streams.XhrStreamReader;
    export default alias;
}

declare namespace goog.net.streams {
    /**
     * The XhrStreamReader class.
     *
     * The caller must check isStreamingSupported() first.
     *
     * @struct
     * @final
     * @package
     */
    class XhrStreamReader extends __XhrStreamReader {}
    abstract class __XhrStreamReader {
        /**
         * @param {!goog.net.XhrIo} xhr The XhrIo object with its response body to
         * be handled by NodeReadableStream.
         */
        constructor(xhr: goog.net.XhrIo);

        /**
         * @const
         * @private {?goog.log.Logger} the logger.
         */
        private readonly logger_: any /*missing*/;

        /**
         * The xhr object passed by the application.
         *
         * @private {?goog.net.XhrIo} the XHR object for the stream.
         */
        private xhr_: any /*missing*/;

        /**
         * To be initialized with the correct content-type.
         *
         * @private {?goog.net.streams.StreamParser} the parser for the stream.
         */
        private parser_: any /*missing*/;

        /**
         * The position of where the next unprocessed data starts in the XHR
         * response text.
         * @private {number}
         */
        private pos_: any /*missing*/;

        /**
         * The status (error detail) of the current stream.
         * @private {!goog.net.streams.XhrStreamReader.Status}
         */
        private status_: any /*missing*/;

        /**
         * The handler for any status change event.
         *
         * @private {?function()} The call back to handle the XHR status change.
         */
        private statusHandler_: any /*missing*/;

        /**
         * The handler for new response data.
         *
         * @private {?function(!Array<!Object>)} The call back to handle new
         * response data, parsed as an array of atomic messages.
         */
        private dataHandler_: any /*missing*/;

        /**
         * An object to keep track of event listeners.
         *
         * @private {!goog.events.EventHandler<!goog.net.streams.XhrStreamReader>}
         */
        private eventHandler_: any /*missing*/;

        /**
         * Returns a parser that supports the given content-type (mime) and
         * content-transfer-encoding.
         *
         * @return {?goog.net.streams.StreamParser} a parser or null if the content
         *    type or transfer encoding is unsupported.
         * @private
         */
        private getParserByResponseHeader_(): goog.net.streams.StreamParser|null;

        /**
         * Returns the XHR request object.
         *
         * @return {goog.net.XhrIo} The XHR object associated with this reader, or
         *    null if the reader has been cleared.
         */
        getXhr(): goog.net.XhrIo;

        /**
         * Gets the current stream status.
         *
         * @return {!goog.net.streams.XhrStreamReader.Status} The stream status.
         */
        getStatus(): goog.net.streams.XhrStreamReader.Status;

        /**
         * Sets the status handler.
         *
         * @param {function()} handler The handler for any status change.
         */
        setStatusHandler(handler: () => void): void;

        /**
         * Sets the data handler.
         *
         * @param {function(!Array<!Object>)} handler The handler for new data.
         */
        setDataHandler(handler: (_0: Object[]) => void): void;

        /**
         * Handles XHR readystatechange events.
         *
         * TODO(user): throttling may be needed.
         *
         * @param {!goog.events.Event} event The event.
         * @private
         */
        private readyStateChangeHandler_(event: goog.events.Event): void;

        /**
         * Called from readyStateChangeHandler_.
         *
         * @private
         */
        private onReadyStateChanged_(): void;

        /**
         * Update the status and may call the handler.
         *
         * @param {!goog.net.streams.XhrStreamReader.Status} status The new status
         * @private
         */
        private updateStatus_(status: goog.net.streams.XhrStreamReader.Status): void;

        /**
         * Clears after the XHR terminal state is reached.
         *
         * @private
         */
        private clear_(): void;
    }
}

declare namespace goog.net.streams.XhrStreamReader {
    /**
     * Enum type for current stream status.
     * @enum {number}
     */
    enum Status { INIT, ACTIVE, SUCCESS, XHR_ERROR, NO_DATA, BAD_DATA, HANDLER_EXCEPTION, TIMEOUT, CANCELLED }

    /**
     * Returns whether response streaming is supported on this browser.
     *
     * @return {boolean} false if response streaming is not supported.
     */
    function isStreamingSupported(): boolean;
}
