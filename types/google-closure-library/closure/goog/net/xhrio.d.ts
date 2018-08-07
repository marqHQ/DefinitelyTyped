/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./xmlhttpfactory.d.ts"/>
/// <reference path="../structs/map.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>
/// <reference path="./errorcode.d.ts"/>
/// <reference path="./xmlhttp.d.ts"/>
/// <reference path="../debug/errorhandler.d.ts"/>

declare module 'goog:goog.net.XhrIo' {
    import alias = goog.net.XhrIo;
    export default alias;
}

declare module 'goog:goog.net.XhrIo.ResponseType' {
    import alias = goog.net.XhrIo.ResponseType;
    export default alias;
}

declare namespace goog.net {
    /**
     * Basic class for handling XMLHttpRequests.
     * @extends {goog.events.EventTarget}
     */
    class XhrIo extends __XhrIo {}
    abstract class __XhrIo extends goog.events.__EventTarget {
        /**
         * @param {goog.net.XmlHttpFactory=} opt_xmlHttpFactory Factory to use when
         *     creating XMLHttpRequest objects.
         */
        constructor(opt_xmlHttpFactory?: goog.net.XmlHttpFactory);

        /**
         * Map of default headers to add to every request, use:
         * XhrIo.headers.set(name, value)
         * @type {!goog.structs.Map}
         */
        headers: goog.structs.Map<any, any>;

        /**
         * Optional XmlHttpFactory
         * @private {goog.net.XmlHttpFactory}
         */
        private xmlHttpFactory_: any /*missing*/;

        /**
         * Whether XMLHttpRequest is active.  A request is active from the time send()
         * is called until onReadyStateChange() is complete, or error() or abort()
         * is called.
         * @private {boolean}
         */
        private active_: any /*missing*/;

        /**
         * The XMLHttpRequest object that is being used for the transfer.
         * @private {?goog.net.XhrLike.OrNative}
         */
        private xhr_: any /*missing*/;

        /**
         * The options to use with the current XMLHttpRequest object.
         * @private {Object}
         */
        private xhrOptions_: any /*missing*/;

        /**
         * Last URL that was requested.
         * @private {string|goog.Uri}
         */
        private lastUri_: any /*missing*/;

        /**
         * Method for the last request.
         * @private {string}
         */
        private lastMethod_: any /*missing*/;

        /**
         * Last error code.
         * @private {!goog.net.ErrorCode}
         */
        private lastErrorCode_: any /*missing*/;

        /**
         * Last error message.
         * @private {Error|string}
         */
        private lastError_: any /*missing*/;

        /**
         * Used to ensure that we don't dispatch an multiple ERROR events. This can
         * happen in IE when it does a synchronous load and one error is handled in
         * the ready statte change and one is handled due to send() throwing an
         * exception.
         * @private {boolean}
         */
        private errorDispatched_: any /*missing*/;

        /**
         * Used to make sure we don't fire the complete event from inside a send call.
         * @private {boolean}
         */
        private inSend_: any /*missing*/;

        /**
         * Used in determining if a call to {@link #onReadyStateChange_} is from
         * within a call to this.xhr_.open.
         * @private {boolean}
         */
        private inOpen_: any /*missing*/;

        /**
         * Used in determining if a call to {@link #onReadyStateChange_} is from
         * within a call to this.xhr_.abort.
         * @private {boolean}
         */
        private inAbort_: any /*missing*/;

        /**
         * Number of milliseconds after which an incomplete request will be aborted
         * and a {@link goog.net.EventType.TIMEOUT} event raised; 0 means no timeout
         * is set.
         * @private {number}
         */
        private timeoutInterval_: any /*missing*/;

        /**
         * Timer to track request timeout.
         * @private {?number}
         */
        private timeoutId_: any /*missing*/;

        /**
         * The requested type for the response. The empty string means use the default
         * XHR behavior.
         * @private {goog.net.XhrIo.ResponseType}
         */
        private responseType_: any /*missing*/;

        /**
         * Whether a "credentialed" request is to be sent (one that is aware of
         * cookies and authentication). This is applicable only for cross-domain
         * requests and more recent browsers that support this part of the HTTP Access
         * Control standard.
         *
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute
         *
         * @private {boolean}
         */
        private withCredentials_: any /*missing*/;

        /**
         * Whether progress events are enabled for this request. This is
         * disabled by default because setting a progress event handler
         * causes pre-flight OPTIONS requests to be sent for CORS requests,
         * even in cases where a pre-flight request would not otherwise be
         * sent.
         *
         * @see http://xhr.spec.whatwg.org/#security-considerations
         *
         * Note that this can cause problems for Firefox 22 and below, as an
         * older "LSProgressEvent" will be dispatched by the browser. That
         * progress event is no longer supported, and can lead to failures,
         * including throwing exceptions.
         *
         * @see http://bugzilla.mozilla.org/show_bug.cgi?id=845631
         * @see b/23469793
         *
         * @private {boolean}
         */
        private progressEventsEnabled_: any /*missing*/;

        /**
         * True if we can use XMLHttpRequest's timeout directly.
         * @private {boolean}
         */
        private useXhr2Timeout_: any /*missing*/;

        /**
         * A reference to the XhrIo logger
         * @private {?goog.log.Logger}
         * @const
         */
        private readonly logger_: any /*missing*/;

        /**
         * Disposes of the specified goog.net.XhrIo created by
         * {@link goog.net.XhrIo.send} and removes it from
         * {@link goog.net.XhrIo.pendingStaticSendInstances_}.
         * @private
         */
        private cleanupSend_(): void;

        /**
         * Returns the number of milliseconds after which an incomplete request will be
         * aborted, or 0 if no timeout is set.
         * @return {number} Timeout interval in milliseconds.
         */
        getTimeoutInterval(): number;

        /**
         * Sets the number of milliseconds after which an incomplete request will be
         * aborted and a {@link goog.net.EventType.TIMEOUT} event raised; 0 means no
         * timeout is set.
         * @param {number} ms Timeout interval in milliseconds; 0 means none.
         */
        setTimeoutInterval(ms: number): void;

        /**
         * Sets the desired type for the response. At time of writing, this is only
         * supported in very recent versions of WebKit (10.0.612.1 dev and later).
         *
         * If this is used, the response may only be accessed via {@link #getResponse}.
         *
         * @param {goog.net.XhrIo.ResponseType} type The desired type for the response.
         */
        setResponseType(type: goog.net.XhrIo.ResponseType): void;

        /**
         * Gets the desired type for the response.
         * @return {goog.net.XhrIo.ResponseType} The desired type for the response.
         */
        getResponseType(): goog.net.XhrIo.ResponseType;

        /**
         * Sets whether a "credentialed" request that is aware of cookie and
         * authentication information should be made. This option is only supported by
         * browsers that support HTTP Access Control. As of this writing, this option
         * is not supported in IE.
         *
         * @param {boolean} withCredentials Whether this should be a "credentialed"
         *     request.
         */
        setWithCredentials(withCredentials: boolean): void;

        /**
         * Gets whether a "credentialed" request is to be sent.
         * @return {boolean} The desired type for the response.
         */
        getWithCredentials(): boolean;

        /**
         * Sets whether progress events are enabled for this request. Note
         * that progress events require pre-flight OPTIONS request handling
         * for CORS requests, and may cause trouble with older browsers. See
         * progressEventsEnabled_ for details.
         * @param {boolean} enabled Whether progress events should be enabled.
         */
        setProgressEventsEnabled(enabled: boolean): void;

        /**
         * Gets whether progress events are enabled.
         * @return {boolean} Whether progress events are enabled for this request.
         */
        getProgressEventsEnabled(): boolean;

        /**
         * Instance send that actually uses XMLHttpRequest to make a server call.
         * @param {string|goog.Uri} url Uri to make request to.
         * @param {string=} opt_method Send method, default: GET.
         * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
         *     opt_content Body data.
         * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
         *     request.
         * @suppress {deprecated} Use deprecated goog.structs.forEach to allow different
         * types of parameters for opt_headers.
         */
        send(url: string|goog.Uri, opt_method?: string, opt_content?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string, opt_headers?: Object|goog.structs.Map<any, any>): void;

        /**
         * Creates a new XHR object.
         * @return {!goog.net.XhrLike.OrNative} The newly created XHR object.
         * @protected
         */
        protected createXhr(): goog.net.XhrLike.OrNative;

        /**
         * The request didn't complete after {@link goog.net.XhrIo#timeoutInterval_}
         * milliseconds; raises a {@link goog.net.EventType.TIMEOUT} event and aborts
         * the request.
         * @private
         */
        private timeout_(): void;

        /**
         * Something errorred, so inactivate, fire error callback and clean up
         * @param {goog.net.ErrorCode} errorCode The error code.
         * @param {Error} err The error object.
         * @private
         */
        private error_(errorCode: goog.net.ErrorCode, err: Error): void;

        /**
         * Dispatches COMPLETE and ERROR in case of an error. This ensures that we do
         * not dispatch multiple error events.
         * @private
         */
        private dispatchErrors_(): void;

        /**
         * Abort the current XMLHttpRequest
         * @param {goog.net.ErrorCode=} opt_failureCode Optional error code to use -
         *     defaults to ABORT.
         */
        abort(opt_failureCode?: goog.net.ErrorCode): void;

        /**
         * Internal handler for the XHR object's readystatechange event.  This method
         * checks the status and the readystate and fires the correct callbacks.
         * If the request has ended, the handlers are cleaned up and the XHR object is
         * nullified.
         * @private
         */
        private onReadyStateChange_(): void;

        /**
         * Used to protect the onreadystatechange handler entry point.  Necessary
         * as {#onReadyStateChange_} maybe called from within send or abort, this
         * method is only called when {#onReadyStateChange_} is called as an
         * entry point.
         * {@see #protectEntryPoints}
         * @private
         */
        private onReadyStateChangeEntryPoint_(): void;

        /**
         * Helper for {@link #onReadyStateChange_}.  This is used so that
         * entry point calls to {@link #onReadyStateChange_} can be routed through
         * {@link #onReadyStateChangeEntryPoint_}.
         * @private
         */
        private onReadyStateChangeHelper_(): void;

        /**
         * Internal handler for the XHR object's onprogress event. Fires both a generic
         * PROGRESS event and either a DOWNLOAD_PROGRESS or UPLOAD_PROGRESS event to
         * allow specific binding for each XHR progress event.
         * @param {!ProgressEvent} e XHR progress event.
         * @param {boolean=} opt_isDownload Whether the current progress event is from a
         *     download. Used to determine whether DOWNLOAD_PROGRESS or UPLOAD_PROGRESS
         *     event should be dispatched.
         * @private
         */
        private onProgressHandler_(e: ProgressEvent, opt_isDownload?: boolean): void;

        /**
         * Remove the listener to protect against leaks, and nullify the XMLHttpRequest
         * object.
         * @param {boolean=} opt_fromDispose If this is from the dispose (don't want to
         *     fire any events).
         * @private
         */
        private cleanUpXhr_(opt_fromDispose?: boolean): void;

        /**
         * Make sure the timeout timer isn't running.
         * @private
         */
        private cleanUpTimeoutTimer_(): void;

        /**
         * @return {boolean} Whether there is an active request.
         */
        isActive(): boolean;

        /**
         * @return {boolean} Whether the request has completed.
         */
        isComplete(): boolean;

        /**
         * @return {boolean} Whether the request completed with a success.
         */
        isSuccess(): boolean;

        /**
         * @return {boolean} whether the effective scheme of the last URI that was
         *     fetched was 'http' or 'https'.
         * @private
         */
        private isLastUriEffectiveSchemeHttp_(): boolean;

        /**
         * Get the readystate from the Xhr object
         * Will only return correct result when called from the context of a callback
         * @return {goog.net.XmlHttp.ReadyState} goog.net.XmlHttp.ReadyState.*.
         */
        getReadyState(): goog.net.XmlHttp.ReadyState;

        /**
         * Get the status from the Xhr object
         * Will only return correct result when called from the context of a callback
         * @return {number} Http status.
         */
        getStatus(): number;

        /**
         * Get the status text from the Xhr object
         * Will only return correct result when called from the context of a callback
         * @return {string} Status text.
         */
        getStatusText(): string;

        /**
         * Get the last Uri that was requested
         * @return {string} Last Uri.
         */
        getLastUri(): string;

        /**
         * Get the response text from the Xhr object
         * Will only return correct result when called from the context of a callback.
         * @return {string} Result from the server, or '' if no result available.
         */
        getResponseText(): string;

        /**
         * Get the response body from the Xhr object. This property is only available
         * in IE since version 7 according to MSDN:
         * http://msdn.microsoft.com/en-us/library/ie/ms534368(v=vs.85).aspx
         * Will only return correct result when called from the context of a callback.
         *
         * One option is to construct a VBArray from the returned object and convert
         * it to a JavaScript array using the toArray method:
         * {@code (new window['VBArray'](xhrIo.getResponseBody())).toArray()}
         * This will result in an array of numbers in the range of [0..255]
         *
         * Another option is to use the VBScript CStr method to convert it into a
         * string as outlined in http://stackoverflow.com/questions/1919972
         *
         * @return {Object} Binary result from the server or null if not available.
         */
        getResponseBody(): Object;

        /**
         * Get the response XML from the Xhr object
         * Will only return correct result when called from the context of a callback.
         * @return {Document} The DOM Document representing the XML file, or null
         * if no result available.
         */
        getResponseXml(): Document;

        /**
         * Get the response and evaluates it as JSON from the Xhr object
         * Will only return correct result when called from the context of a callback
         * @param {string=} opt_xssiPrefix Optional XSSI prefix string to use for
         *     stripping of the response before parsing. This needs to be set only if
         *     your backend server prepends the same prefix string to the JSON response.
         * @throws Error if the response text is invalid JSON.
         * @return {Object|undefined} JavaScript object.
         */
        getResponseJson(opt_xssiPrefix?: string): Object|undefined;

        /**
         * Get the response as the type specificed by {@link #setResponseType}. At time
         * of writing, this is only directly supported in very recent versions of WebKit
         * (10.0.612.1 dev and later). If the field is not supported directly, we will
         * try to emulate it.
         *
         * Emulating the response means following the rules laid out at
         * http://www.w3.org/TR/XMLHttpRequest/#the-response-attribute
         *
         * On browsers with no support for this (Chrome < 10, Firefox < 4, etc), only
         * response types of DEFAULT or TEXT may be used, and the response returned will
         * be the text response.
         *
         * On browsers with Mozilla's draft support for array buffers (Firefox 4, 5),
         * only response types of DEFAULT, TEXT, and ARRAY_BUFFER may be used, and the
         * response returned will be either the text response or the Mozilla
         * implementation of the array buffer response.
         *
         * On browsers will full support, any valid response type supported by the
         * browser may be used, and the response provided by the browser will be
         * returned.
         *
         * @return {*} The response.
         */
        getResponse(): any;

        /**
         * Get the value of the response-header with the given name from the Xhr object
         * Will only return correct result when called from the context of a callback
         * and the request has completed
         * @param {string} key The name of the response-header to retrieve.
         * @return {string|undefined} The value of the response-header named key.
         */
        getResponseHeader(key: string): string|undefined;

        /**
         * Gets the text of all the headers in the response.
         * Will only return correct result when called from the context of a callback
         * and the request has completed.
         * @return {string} The value of the response headers or empty string.
         */
        getAllResponseHeaders(): string;

        /**
         * Returns all response headers as a key-value map.
         * Multiple values for the same header key can be combined into one,
         * separated by a comma and a space.
         * Note that the native getResponseHeader method for retrieving a single header
         * does a case insensitive match on the header name. This method does not
         * include any case normalization logic, it will just return a key-value
         * representation of the headers.
         * See: http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
         * @return {!Object<string, string>} An object with the header keys as keys
         *     and header values as values.
         */
        getResponseHeaders(): {[key: string]: string};

        /**
         * Get the value of the response-header with the given name from the Xhr object.
         * As opposed to {@link #getResponseHeader}, this method does not require that
         * the request has completed.
         * @param {string} key The name of the response-header to retrieve.
         * @return {?string} The value of the response-header, or null if it is
         *     unavailable.
         */
        getStreamingResponseHeader(key: string): string|null;

        /**
         * Gets the text of all the headers in the response. As opposed to
         * {@link #getAllResponseHeaders}, this method does not require that the request
         * has completed.
         * @return {string} The value of the response headers or empty string.
         */
        getAllStreamingResponseHeaders(): string;

        /**
         * Get the last error message
         * @return {!goog.net.ErrorCode} Last error code.
         */
        getLastErrorCode(): goog.net.ErrorCode;

        /**
         * Get the last error message
         * @return {string} Last error message.
         */
        getLastError(): string;

        /**
         * Adds the last method, status and URI to the message.  This is used to add
         * this information to the logging calls.
         * @param {string} msg The message text that we want to add the extra text to.
         * @return {string} The message with the extra text appended.
         * @private
         */
        private formatMsg_(msg: string): string;
    }
}

declare namespace goog.net.XhrIo {
    /**
     * Response types that may be requested for XMLHttpRequests.
     * @enum {string}
     * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetype-attribute
     */
    enum ResponseType { DEFAULT, TEXT, DOCUMENT, BLOB, ARRAY_BUFFER }

    /**
     * The Content-Type HTTP header name
     * @type {string}
     */
    let CONTENT_TYPE_HEADER: string;

    /**
     * The Content-Transfer-Encoding HTTP header name
     * @type {string}
     */
    let CONTENT_TRANSFER_ENCODING: string;

    /**
     * The pattern matching the 'http' and 'https' URI schemes
     * @type {!RegExp}
     */
    let HTTP_SCHEME_PATTERN: RegExp;

    /**
     * The methods that typically come along with form data.  We set different
     * headers depending on whether the HTTP action is one of these.
     * @type {!Array<string>}
     */
    let METHODS_WITH_FORM_DATA: string[];

    /**
     * The Content-Type HTTP header value for a url-encoded form
     * @type {string}
     */
    let FORM_CONTENT_TYPE: string;

    /**
     * Static send that creates a short lived instance of XhrIo to send the
     * request.
     * @see goog.net.XhrIo.cleanup
     * @param {string|goog.Uri} url Uri to make request to.
     * @param {?function(this:goog.net.XhrIo, ?)=} opt_callback Callback function
     *     for when request is complete.
     * @param {string=} opt_method Send method, default: GET.
     * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
     *     opt_content Body data.
     * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
     *     request.
     * @param {number=} opt_timeoutInterval Number of milliseconds after which an
     *     incomplete request will be aborted; 0 means no timeout is set.
     * @param {boolean=} opt_withCredentials Whether to send credentials with the
     *     request. Default to false. See {@link goog.net.XhrIo#setWithCredentials}.
     * @return {!goog.net.XhrIo} The sent XhrIo.
     */
    function send(
        url: string|goog.Uri,
        opt_callback?: ((this: goog.net.XhrIo, _0: any) => void)|null,
        opt_method?: string,
        opt_content?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string,
        opt_headers?: Object|goog.structs.Map<any, any>,
        opt_timeoutInterval?: number,
        opt_withCredentials?: boolean
    ): goog.net.XhrIo;

    /**
     * Disposes all non-disposed instances of goog.net.XhrIo created by
     * {@link goog.net.XhrIo.send}.
     * {@link goog.net.XhrIo.send} cleans up the goog.net.XhrIo instance
     * it creates when the request completes or fails.  However, if
     * the request never completes, then the goog.net.XhrIo is not disposed.
     * This can occur if the window is unloaded before the request completes.
     * We could have {@link goog.net.XhrIo.send} return the goog.net.XhrIo
     * it creates and make the client of {@link goog.net.XhrIo.send} be
     * responsible for disposing it in this case.  However, this makes things
     * significantly more complicated for the client, and the whole point
     * of {@link goog.net.XhrIo.send} is that it's simple and easy to use.
     * Clients of {@link goog.net.XhrIo.send} should call
     * {@link goog.net.XhrIo.cleanup} when doing final
     * cleanup on window unload.
     */
    function cleanup(): void;

    /**
     * Installs exception protection for all entry point introduced by
     * goog.net.XhrIo instances which are not protected by
     * {@link goog.debug.ErrorHandler#protectWindowSetTimeout},
     * {@link goog.debug.ErrorHandler#protectWindowSetInterval}, or
     * {@link goog.events.protectBrowserEventEntryPoint}.
     *
     * @param {goog.debug.ErrorHandler} errorHandler Error handler with which to
     *     protect the entry point(s).
     */
    function protectEntryPoints(errorHandler: goog.debug.ErrorHandler): void;
}
