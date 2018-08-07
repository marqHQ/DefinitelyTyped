/// <reference path="../../../globals.d.ts"/>
/// <reference path="./browserchannel.d.ts"/>
/// <reference path="./browsertestchannel.d.ts"/>
/// <reference path="./channeldebug.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="./xhrio.d.ts"/>
/// <reference path="../async/throttle.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.net.ChannelRequest' {
    import alias = goog.net.ChannelRequest;
    export default alias;
}

declare module 'goog:goog.net.ChannelRequest.Error' {
    import alias = goog.net.ChannelRequest.Error;
    export default alias;
}

declare namespace goog.net {
    /**
     * Creates a ChannelRequest object which encapsulates a request to the server.
     * A new ChannelRequest is created for each request to the server.
     *
     */
    class ChannelRequest extends __ChannelRequest {}
    abstract class __ChannelRequest {
        /**
         * @param {goog.net.BrowserChannel|goog.net.BrowserTestChannel} channel
         *     The BrowserChannel that owns this request.
         * @param {goog.net.ChannelDebug} channelDebug A ChannelDebug to use for
         *     logging.
         * @param {string=} opt_sessionId  The session id for the channel.
         * @param {string|number=} opt_requestId  The request id for this request.
         * @param {number=} opt_retryId  The retry id for this request.
         */
        constructor(
            channel: goog.net.BrowserChannel|goog.net.BrowserTestChannel,
            channelDebug: goog.net.ChannelDebug,
            opt_sessionId?: string,
            opt_requestId?: string|number,
            opt_retryId?: number
        );

        /**
         * The BrowserChannel object that owns the request.
         * @type {goog.net.BrowserChannel|goog.net.BrowserTestChannel}
         * @private
         */
        private channel_: goog.net.BrowserChannel|goog.net.BrowserTestChannel;

        /**
         * The channel debug to use for logging
         * @type {goog.net.ChannelDebug}
         * @private
         */
        private channelDebug_: goog.net.ChannelDebug;

        /**
         * The Session ID for the channel.
         * @type {string|undefined}
         * @private
         */
        private sid_: string|undefined;

        /**
         * The RID (request ID) for the request.
         * @type {string|number|undefined}
         * @private
         */
        private rid_: string|number|undefined;

        /**
         * The attempt number of the current request.
         * @type {number}
         * @private
         */
        private retryId_: number;

        /**
         * The timeout in ms before failing the request.
         * @type {number}
         * @private
         */
        private timeout_: number;

        /**
         * An object to keep track of the channel request event listeners.
         * @type {!goog.events.EventHandler<!goog.net.ChannelRequest>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.net.ChannelRequest>;

        /**
         * A timer for polling responseText in browsers that don't fire
         * onreadystatechange during incremental loading of responseText.
         * @type {goog.Timer}
         * @private
         */
        private pollingTimer_: goog.Timer;

        /**
         * Extra HTTP headers to add to all the requests sent to the server.
         * @type {Object}
         * @private
         */
        private extraHeaders_: Object;

        /**
         * Whether the request was successful. This is only set to true after the
         * request successfuly completes.
         * @type {boolean}
         * @private
         */
        private successful_: boolean;

        /** @private @suppress {missingRequire} Circular dep. */
        private watchDogTimerId_: any /*missing*/;

        /**
         * The time in the future when the request will timeout.
         * @type {?number}
         * @private
         */
        private watchDogTimeoutTime_: number|null;

        /**
         * The time the request started.
         * @type {?number}
         * @private
         */
        private requestStartTime_: number|null;

        /**
         * The type of request (XMLHTTP, IMG, Trident)
         * @type {?number}
         * @private
         */
        private type_: number|null;

        /**
         * The base Uri for the request. The includes all the parameters except the
         * one that indicates the retry number.
         * @type {goog.Uri?}
         * @private
         */
        private baseUri_: goog.Uri|null;

        /**
         * The request Uri that was actually used for the most recent request attempt.
         * @type {goog.Uri?}
         * @private
         */
        private requestUri_: goog.Uri|null;

        /**
         * The post data, if the request is a post.
         * @type {?string}
         * @private
         */
        private postData_: string|null;

        /**
         * The XhrLte request if the request is using XMLHTTP
         * @type {goog.net.XhrIo}
         * @private
         */
        private xmlHttp_: goog.net.XhrIo;

        /**
         * The position of where the next unprocessed chunk starts in the response
         * text.
         * @type {number}
         * @private
         */
        private xmlHttpChunkStart_: number;

        /**
         * The Trident instance if the request is using Trident.
         * @type {Object}
         * @private
         */
        private trident_: Object;

        /**
         * The verb (Get or Post) for the request.
         * @type {?string}
         * @private
         */
        private verb_: string|null;

        /**
         * The last error if the request failed.
         * @type {?goog.net.ChannelRequest.Error}
         * @private
         */
        private lastError_: goog.net.ChannelRequest.Error|null;

        /**
         * The last status code received.
         * @type {number}
         * @private
         */
        private lastStatusCode_: number;

        /**
         * Whether to send the Connection:close header as part of the request.
         * @type {boolean}
         * @private
         */
        private sendClose_: boolean;

        /**
         * Whether the request has been cancelled due to a call to cancel.
         * @type {boolean}
         * @private
         */
        private cancelled_: boolean;

        /**
         * A throttle time in ms for readystatechange events for the backchannel.
         * Useful for throttling when ready state is INTERACTIVE (partial data).
         * If set to zero no throttle is used.
         *
         * @see goog.net.BrowserChannel.prototype.readyStateChangeThrottleMs_
         *
         * @type {number}
         * @private
         */
        private readyStateChangeThrottleMs_: number;

        /**
         * The throttle for readystatechange events for the current request, or null
         * if there is none.
         * @type {goog.async.Throttle}
         * @private
         */
        private readyStateChangeThrottle_: goog.async.Throttle<any>;

        /**
         * Sets extra HTTP headers to add to all the requests sent to the server.
         *
         * @param {Object} extraHeaders The HTTP headers.
         */
        setExtraHeaders(extraHeaders: Object): void;

        /**
         * Sets the timeout for a request
         *
         * @param {number} timeout   The timeout in MS for when we fail the request.
         */
        setTimeout(timeout: number): void;

        /**
         * Sets the throttle for handling onreadystatechange events for the request.
         *
         * @param {number} throttle The throttle in ms.  A value of zero indicates
         *     no throttle.
         */
        setReadyStateChangeThrottle(throttle: number): void;

        /**
         * Uses XMLHTTP to send an HTTP POST to the server.
         *
         * @param {goog.Uri} uri  The uri of the request.
         * @param {string} postData  The data for the post body.
         * @param {boolean} decodeChunks  Whether to the result is expected to be
         *     encoded for chunking and thus requires decoding.
         */
        xmlHttpPost(uri: goog.Uri, postData: string, decodeChunks: boolean): void;

        /**
         * Uses XMLHTTP to send an HTTP GET to the server.
         *
         * @param {goog.Uri} uri  The uri of the request.
         * @param {boolean} decodeChunks  Whether to the result is expected to be
         *     encoded for chunking and thus requires decoding.
         * @param {?string} hostPrefix  The host prefix, if we might be using a
         *     secondary domain.  Note that it should also be in the URL, adding this
         *     won't cause it to be added to the URL.
         * @param {boolean=} opt_noClose   Whether to request that the tcp/ip connection
         *     should be closed.
         */
        xmlHttpGet(uri: goog.Uri, decodeChunks: boolean, hostPrefix: string|null, opt_noClose?: boolean): void;

        /**
         * Sends a request via XMLHTTP according to the current state of the
         * ChannelRequest object.
         *
         * @param {?string} hostPrefix The host prefix, if we might be using a secondary
         *     domain.
         * @private
         */
        private sendXmlHttp_(hostPrefix: string|null): void;

        /**
         * Handles a readystatechange event.
         * @param {goog.events.Event} evt The event.
         * @private
         */
        private readyStateChangeHandler_(evt: goog.events.Event): void;

        /**
         * XmlHttp handler
         * @param {goog.net.XhrIo} xmlhttp The XhrIo object for the current request.
         * @private
         */
        private xmlHttpHandler_(xmlhttp: goog.net.XhrIo): void;

        /**
         * Called by the readystate handler for XMLHTTP requests.
         *
         * @private
         */
        private onXmlHttpReadyStateChanged_(): void;

        /**
         * Decodes the next set of available chunks in the response.
         * @param {number} readyState The value of readyState.
         * @param {string} responseText The value of responseText.
         * @private
         */
        private decodeNextChunks_(readyState: number, responseText: string): void;

        /**
         * Polls the response for new data.
         * @private
         */
        private pollResponse_(): void;

        /**
         * Starts a polling interval for changes to responseText of the
         * XMLHttpRequest, for browsers that don't fire onreadystatechange
         * as data comes in incrementally.  This timer is disabled in
         * cleanup_().
         * @private
         */
        private startPolling_(): void;

        /**
         * Returns the next chunk of a chunk-encoded response. This is not standard
         * HTTP chunked encoding because browsers don't expose the chunk boundaries to
         * the application through XMLHTTP. So we have an additional chunk encoding at
         * the application level that lets us tell where the beginning and end of
         * individual responses are so that we can only try to eval a complete JS array.
         *
         * The encoding is the size of the chunk encoded as a decimal string followed
         * by a newline followed by the data.
         *
         * @param {string} responseText The response text from the XMLHTTP response.
         * @return {string|Object} The next chunk string or a sentinel object
         *                         indicating a special condition.
         * @private
         */
        private getNextChunk_(responseText: string): string|Object;

        /**
         * Uses the Trident htmlfile ActiveX control to send a GET request in IE. This
         * is the innovation discovered that lets us get intermediate results in
         * Internet Explorer.  Thanks to http://go/kev
         * @param {goog.Uri} uri The uri to request from.
         * @param {boolean} usingSecondaryDomain Whether to use a secondary domain.
         */
        tridentGet(uri: goog.Uri, usingSecondaryDomain: boolean): void;

        /**
         * Starts the Trident request.
         * @param {boolean} usingSecondaryDomain Whether to use a secondary domain.
         * @private
         */
        private tridentGet_(usingSecondaryDomain: boolean): void;

        /**
         * Callback from the Trident htmlfile ActiveX control for when a new message
         * is received.
         *
         * @param {string} msg The data payload.
         * @private
         */
        private onTridentRpcMessage_(msg: string): void;

        /**
         * Callback from the Trident htmlfile ActiveX control for when a new message
         * is received.
         *
         * @param {string} msg  The data payload.
         * @private
         */
        private onTridentRpcMessageAsync_(msg: string): void;

        /**
         * Callback from the Trident htmlfile ActiveX control for when the request
         * is complete
         *
         * @param {boolean} successful Whether the request successfully completed.
         * @private
         */
        private onTridentDone_(successful: boolean): void;

        /**
         * Callback from the Trident htmlfile ActiveX control for when the request
         * is complete
         *
         * @param {boolean} successful Whether the request successfully completed.
         * @private
         */
        private onTridentDoneAsync_(successful: boolean): void;

        /**
         * Uses an IMG tag to send an HTTP get to the server. This is only currently
         * used to terminate the connection, as an IMG tag is the most reliable way to
         * send something to the server while the page is getting torn down.
         * @param {goog.Uri} uri The uri to send a request to.
         */
        sendUsingImgTag(uri: goog.Uri): void;

        /**
         * Starts the IMG request.
         *
         * @private
         */
        private imgTagGet_(): void;

        /**
         * Cancels the request no matter what the underlying transport is.
         */
        cancel(): void;

        /**
         * Ensures that there is watchdog timeout which is used to ensure that
         * the connection completes in time.
         *
         * @private
         */
        private ensureWatchDogTimer_(): void;

        /**
         * Starts the watchdog timer which is used to ensure that the connection
         * completes in time.
         * @param {number} time The number of milliseconds to wait.
         * @private
         * @suppress {missingRequire} goog.net.BrowserChannel
         */
        private startWatchDogTimer_(time: number): void;

        /**
         * Cancels the watchdog timer if it has been started.
         *
         * @private
         */
        private cancelWatchDogTimer_(): void;

        /**
         * Called when the watchdog timer is triggered. It also handles a case where it
         * is called too early which we suspect may be happening sometimes
         * (not sure why)
         *
         * @private
         */
        private onWatchDogTimeout_(): void;

        /**
         * Called when the request has actually timed out. Will cleanup and notify the
         * channel of the failure.
         *
         * @private
         */
        private handleTimeout_(): void;

        /**
         * Notifies the channel that this request failed.
         * @private
         */
        private dispatchFailure_(): void;

        /**
         * Cleans up the objects used to make the request. This function is
         * idempotent.
         *
         * @private
         */
        private cleanup_(): void;

        /**
         * Indicates whether the request was successful. Only valid after the handler
         * is called to indicate completion of the request.
         *
         * @return {boolean} True if the request succeeded.
         */
        getSuccess(): boolean;

        /**
         * If the request was not successful, returns the reason.
         *
         * @return {?goog.net.ChannelRequest.Error}  The last error.
         */
        getLastError(): goog.net.ChannelRequest.Error|null;

        /**
         * Returns the status code of the last request.
         * @return {number} The status code of the last request.
         */
        getLastStatusCode(): number;

        /**
         * Returns the session id for this channel.
         *
         * @return {string|undefined} The session ID.
         */
        getSessionId(): string|undefined;

        /**
         * Returns the request id for this request. Each request has a unique request
         * id and the request IDs are a sequential increasing count.
         *
         * @return {string|number|undefined} The request ID.
         */
        getRequestId(): string|number|undefined;

        /**
         * Returns the data for a post, if this request is a post.
         *
         * @return {?string} The POST data provided by the request initiator.
         */
        getPostData(): string|null;

        /**
         * Returns the time that the request started, if it has started.
         *
         * @return {?number} The time the request started, as returned by goog.now().
         */
        getRequestStartTime(): number|null;

        /**
         * Helper to call the callback's onRequestData, which catches any
         * exception and cleans up the request.
         * @param {string} data The request data.
         * @private
         */
        private safeOnRequestData_(data: string): void;
    }
}

declare namespace goog.net.ChannelRequest {
    /**
     * Default timeout in MS for a request. The server must return data within this
     * time limit for the request to not timeout.
     * @type {number}
     */
    let TIMEOUT_MS: number;

    /**
     * How often to poll (in MS) for changes to responseText in browsers that don't
     * fire onreadystatechange during incremental loading of responseText.
     * @type {number}
     */
    let POLLING_INTERVAL_MS: number;

    /**
     * Enum type for identifying a ChannelRequest error.
     * @enum {number}
     */
    enum Error {
        STATUS,
        NO_DATA,
        TIMEOUT,
        UNKNOWN_SESSION_ID,
        BAD_DATA,
        HANDLER_EXCEPTION,
        BROWSER_OFFLINE,
        ACTIVE_X_BLOCKED
    }

    /**
     * Returns a useful error string for debugging based on the specified error
     * code.
     * @param {goog.net.ChannelRequest.Error} errorCode The error code.
     * @param {number} statusCode The HTTP status code.
     * @return {string} The error string for the given code combination.
     */
    function errorStringFromCode(errorCode: goog.net.ChannelRequest.Error, statusCode: number): string;

    /**
     * Returns whether XHR streaming is supported on this browser.
     *
     * If XHR streaming is not supported, we will try to use an ActiveXObject
     * to create a Forever IFrame.
     *
     * @return {boolean} Whether XHR streaming is supported.
     * @see http://code.google.com/p/closure-library/issues/detail?id=346
     */
    function supportsXhrStreaming(): boolean;
}
