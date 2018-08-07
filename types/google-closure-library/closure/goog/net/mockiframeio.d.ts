/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../testing/testqueue.d.ts"/>
/// <reference path="./errorcode.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="../structs/map.d.ts"/>

declare module 'goog:goog.net.MockIFrameIo' {
    import alias = goog.net.MockIFrameIo;
    export default alias;
}

declare namespace goog.net {
    /**
     * Mock implementation of goog.net.IframeIo. This doesn't provide a mock
     * implementation for all cases, but it's not too hard to add them as needed.
     * @extends {goog.events.EventTarget}
     * @final
     * @deprecated Use goog.testing.net.MockIFrameIo instead.
     */
    class MockIFrameIo extends __MockIFrameIo {}
    abstract class __MockIFrameIo extends goog.events.__EventTarget {
        /**
         * @param {goog.testing.TestQueue} testQueue Test queue for inserting test
         *     events.
         */
        constructor(testQueue: goog.testing.TestQueue);

        /**
         * Queue of events write to
         * @type {goog.testing.TestQueue}
         * @private
         */
        private testQueue_: goog.testing.TestQueue;

        /**
         * Whether MockIFrameIo is active.
         * @type {boolean}
         * @private
         */
        private active_: boolean;

        /**
         * Last content.
         * @type {string}
         * @private
         */
        private lastContent_: string;

        /**
         * Last error code.
         * @type {goog.net.ErrorCode}
         * @private
         */
        private lastErrorCode_: goog.net.ErrorCode;

        /**
         * Last error message.
         * @type {string}
         * @private
         */
        private lastError_: string;

        /**
         * Last custom error.
         * @type {Object}
         * @private
         */
        private lastCustomError_: Object;

        /**
         * Last URI.
         * @type {goog.Uri}
         * @private
         */
        private lastUri_: goog.Uri;

        /** @private {Function} */
        private errorChecker_: any /*missing*/;

        /** @private {boolean} */
        private success_: any /*missing*/;

        /** @private {boolean} */
        private complete_: any /*missing*/;

        /**
         * Simulates the iframe send.
         *
         * @param {goog.Uri|string} uri Uri of the request.
         * @param {string=} opt_method Default is GET, POST uses a form to submit the
         *     request.
         * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
         *     caching.
         * @param {Object|goog.structs.Map=} opt_data Map of key-value pairs.
         */
        send(uri: goog.Uri|string, opt_method?: string, opt_noCache?: boolean, opt_data?: Object|goog.structs.Map<any, any>):
            void;

        /**
         * Simulates the iframe send from a form.
         * @param {Element} form Form element used to send the request to the server.
         * @param {string=} opt_uri Uri to set for the destination of the request, by
         *     default the uri will come from the form.
         * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
         *     caching.
         */
        sendFromForm(form: Element, opt_uri?: string, opt_noCache?: boolean): void;

        /**
         * Simulates aborting the current Iframe request.
         * @param {goog.net.ErrorCode=} opt_failureCode Optional error code to use -
         *     defaults to ABORT.
         */
        abort(opt_failureCode?: goog.net.ErrorCode): void;

        /**
         * Simulates receive of incremental data.
         * @param {Object} data Data.
         */
        simulateIncrementalData(data: Object): void;

        /**
         * Simulates the iframe is done.
         * @param {goog.net.ErrorCode} errorCode The error code for any error that
         *     should be simulated.
         */
        simulateDone(errorCode: goog.net.ErrorCode): void;

        /**
         * Simulates the IFrame is ready for the next request.
         */
        simulateReady(): void;

        /**
         * @return {boolean} True if transfer is complete.
         */
        isComplete(): boolean;

        /**
         * @return {boolean} True if transfer was successful.
         */
        isSuccess(): boolean;

        /**
         * @return {boolean} True if a transfer is in progress.
         */
        isActive(): boolean;

        /**
         * Returns the last response text (i.e. the text content of the iframe).
         * Assumes plain text!
         * @return {string} Result from the server.
         */
        getResponseText(): string;

        /**
         * Parses the content as JSON. This is a safe parse and may throw an error
         * if the response is malformed.
         * @return {Object} The parsed content.
         */
        getResponseJson(): Object;

        /**
         * Get the uri of the last request.
         * @return {goog.Uri} Uri of last request.
         */
        getLastUri(): goog.Uri;

        /**
         * Gets the last error code.
         * @return {goog.net.ErrorCode} Last error code.
         */
        getLastErrorCode(): goog.net.ErrorCode;

        /**
         * Gets the last error message.
         * @return {string} Last error message.
         */
        getLastError(): string;

        /**
         * Gets the last custom error.
         * @return {Object} Last custom error.
         */
        getLastCustomError(): Object;

        /**
         * Sets the callback function used to check if a loaded IFrame is in an error
         * state.
         * @param {Function} fn Callback that expects a document object as it's single
         *     argument.
         */
        setErrorChecker(fn: Function): void;

        /**
         * Gets the callback function used to check if a loaded IFrame is in an error
         * state.
         * @return {Function} A callback that expects a document object as it's single
         *     argument.
         */
        getErrorChecker(): Function;
    }
}
