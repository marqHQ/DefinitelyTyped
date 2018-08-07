/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../structs/map.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.debug.ErrorReporter' {
    import alias = goog.debug.ErrorReporter;
    export default alias;
}

declare module 'goog:goog.debug.ErrorReporter.ExceptionEvent' {
    import alias = goog.debug.ErrorReporter.ExceptionEvent;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Constructs an error reporter. Internal Use Only. To install an error
     * reporter see the {@see #install} method below.
     *
     * @extends {goog.events.EventTarget}
     */
    class ErrorReporter extends __ErrorReporter {}
    abstract class __ErrorReporter extends goog.events.__EventTarget {
        /**
         * @param {string} handlerUrl The URL to which all errors will be reported.
         * @param {function(!Error, !Object<string, string>)=}
         *     opt_contextProvider When a report is to be sent to the server,
         *     this method will be called, and given an opportunity to modify the
         *     context object before submission to the server.
         * @param {boolean=} opt_noAutoProtect Whether to automatically add handlers for
         *     onerror and to protect entry points.  If apps have other error reporting
         *     facilities, it may make sense for them to set these up themselves and use
         *     the ErrorReporter just for transmission of reports.
         */
        constructor(
            handlerUrl: string,
            opt_contextProvider?: (_0: Error, _1: {[key: string]: string}) => void,
            opt_noAutoProtect?: boolean
        );

        /**
         * Context provider, if one was provided.
         * @type {?function(!Error, !Object<string, string>)}
         * @private
         */
        private contextProvider_: ((_0: Error, _1: {[key: string]: string}) => void)|null;

        /**
         * The string prefix of any optional context parameters logged with the error.
         * @private {string}
         */
        private contextPrefix_: any /*missing*/;

        /**
         * The number of bytes after which the ErrorReporter truncates the POST body.
         * If null, the ErrorReporter won't truncate the body.
         * @private {?number}
         */
        private truncationLimit_: any /*missing*/;

        /**
         * Additional arguments to append to URL before sending XHR.
         * @private {!Object<string,string>}
         */
        private additionalArguments_: any /*missing*/;

        /**
         * XHR sender.
         * @type {function(string, string, string, (Object|goog.structs.Map)=)}
         * @private
         */
        private xhrSender_: (_0: string, _1: string, _2: string, _3: Object|goog.structs.Map<any, any>) => void;

        /**
         * The URL at which all errors caught by this handler will be logged.
         *
         * @type {string}
         * @private
         */
        private handlerUrl_: string;

        /**
         * The internal error handler used to catch all errors.
         *
         * @private {goog.debug.ErrorHandler}
         */
        private errorHandler_: any /*missing*/;

        /**
         * Extra headers for the error-reporting XHR.
         * @type {Object|goog.structs.Map|undefined}
         * @private
         */
        private extraHeaders_: Object|goog.structs.Map<any, any>|undefined;

        /**
         * Installs exception protection for an entry point function in addition
         * to those that are protected by default.
         * Has no effect in IE because window.onerror is used for reporting
         * exceptions in that case.
         *
         * @this {goog.debug.ErrorReporter}
         * @param {Function} fn An entry point function to be protected.
         * @return {Function} A protected wrapper function that calls the entry point
         *     function or null if the entry point could not be protected.
         */
        protectAdditionalEntryPoint(fn: Function): Function;

        /**
         * Sets up the error reporter.
         *
         * @private
         */
        private setup_(): void;

        /**
         * Add headers to the logging url.
         * @param {Object|goog.structs.Map} loggingHeaders Extra headers to send
         *     to the logging URL.
         */
        setLoggingHeaders(loggingHeaders: Object|goog.structs.Map<any, any>): void;

        /**
         * Set the function used to send error reports to the server.
         * @param {function(string, string, string, (Object|goog.structs.Map)=)}
         *     xhrSender If provided, this will be used to send a report to the
         *     server instead of the default method. The function will be given the URI,
         *     HTTP method request content, and (optionally) request headers to be
         *     added.
         */
        setXhrSender(xhrSender: (_0: string, _1: string, _2: string, _3: Object|goog.structs.Map<any, any>) => void):
            void;

        /**
         * Handler for caught exceptions. Sends report to the LoggingServlet and
         * notifies any listeners.
         *
         * @param {Object} e The exception.
         * @param {!Object<string, string>=} opt_context Context values to optionally
         *     include in the error report.
         * @suppress {strictMissingProperties} error is not defined on Object
         */
        handleException(e: Object, opt_context?: {[key: string]: string}): void;

        /**
         * Sends an error report to the logging URL.  This will not consult the context
         * provider, the report will be sent exactly as specified.
         *
         * @param {string} message Error description.
         * @param {string} fileName URL of the JavaScript file with the error.
         * @param {number} line Line number of the error.
         * @param {string=} opt_trace Call stack trace of the error.
         * @param {!Object<string, string>=} opt_context Context information to include
         *     in the request.
         */
        sendErrorReport(
            message: string, fileName: string, line: number, opt_trace?: string, opt_context?: {[key: string]: string}
        ): void;

        /**
         * @param {string} prefix The prefix to appear prepended to all context
         *     variables in the error report body.
         */
        setContextPrefix(prefix: string): void;

        /**
         * @param {?number} limit Size in bytes to begin truncating POST body.  Set to
         *     null to prevent truncation.  The limit must be >= 0.
         */
        setTruncationLimit(limit: number|null): void;

        /**
         * @param {!Object<string,string>} urlArgs Set of key-value pairs to append
         *     to handlerUrl_ before sending XHR.
         */
        setAdditionalArguments(urlArgs: {[key: string]: string}): void;
    }
}

declare namespace goog.debug.ErrorReporter {
    /**
     * Event broadcast when an exception is logged.
     * @extends {goog.events.Event}
     * @final
     */
    class ExceptionEvent extends __ExceptionEvent {}
    abstract class __ExceptionEvent extends goog.events.__Event {
        /**
         * @param {Error} error The exception that was was reported.
         * @param {!Object<string, string>} context The context values sent to the
         *     server alongside this error.
         */
        constructor(error: Error, context: {[key: string]: string});

        /**
         * The error that was reported.
         * @type {Error}
         */
        error: Error;

        /**
         * Context values sent to the server alongside this report.
         * @type {!Object<string, string>}
         */
        context: {[key: string]: string};
    }

    /**
     * Installs an error reporter to catch all JavaScript errors raised.
     *
     * @param {string} loggingUrl The URL to which the errors caught will be
     *     reported.
     * @param {function(!Error, !Object<string, string>)=}
     *     opt_contextProvider When a report is to be sent to the server,
     *     this method will be called, and given an opportunity to modify the
     *     context object before submission to the server.
     * @param {boolean=} opt_noAutoProtect Whether to automatically add handlers for
     *     onerror and to protect entry points.  If apps have other error reporting
     *     facilities, it may make sense for them to set these up themselves and use
     *     the ErrorReporter just for transmission of reports.
     * @return {!goog.debug.ErrorReporter} The error reporter.
     */
    function install(
        loggingUrl: string,
        opt_contextProvider?: (_0: Error, _1: {[key: string]: string}) => void,
        opt_noAutoProtect?: boolean
    ): goog.debug.ErrorReporter;

    /**
     * Default implementation of XHR sender interface.
     *
     * @param {string} uri URI to make request to.
     * @param {string} method Send method.
     * @param {string} content Post data.
     * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
     *     request.
     */
    function
        defaultXhrSender(uri: string, method: string, content: string, opt_headers?: Object|goog.structs.Map<any, any>):
            void;
}

declare namespace goog.debug.ErrorReporter.ExceptionEvent {
    /**
     * Event type for notifying of a logged exception.
     * @type {string}
     */
    let TYPE: string;
}
