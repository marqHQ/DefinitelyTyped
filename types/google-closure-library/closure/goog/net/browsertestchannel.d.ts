/// <reference path="../../../globals.d.ts"/>
/// <reference path="./browserchannel.d.ts"/>
/// <reference path="./channeldebug.d.ts"/>
/// <reference path="../string/parser.d.ts"/>
/// <reference path="./xhrio.d.ts"/>
/// <reference path="./channelrequest.d.ts"/>

declare module 'goog:goog.net.BrowserTestChannel' {
    import alias = goog.net.BrowserTestChannel;
    export default alias;
}

declare namespace goog.net {
    /**
     * Encapsulates the logic for a single BrowserTestChannel.
     *
     * @final
     */
    class BrowserTestChannel extends __BrowserTestChannel {}
    abstract class __BrowserTestChannel {
        /**
         * @param {goog.net.BrowserChannel} channel  The BrowserChannel that owns this
         *     test channel.
         * @param {goog.net.ChannelDebug} channelDebug A ChannelDebug to use for
         *     logging.
         */
        constructor(channel: goog.net.BrowserChannel, channelDebug: goog.net.ChannelDebug);

        /**
         * The BrowserChannel that owns this test channel
         * @type {goog.net.BrowserChannel}
         * @private
         */
        private channel_: goog.net.BrowserChannel;

        /**
         * The channel debug to use for logging
         * @type {goog.net.ChannelDebug}
         * @private
         */
        private channelDebug_: goog.net.ChannelDebug;

        /**
         * Parser for a response payload. The parser should return an array.
         * @type {goog.string.Parser}
         * @private
         */
        private parser_: goog.string.Parser;

        /**
         * Extra HTTP headers to add to all the requests sent to the server.
         * @type {Object}
         * @private
         */
        private extraHeaders_: Object;

        /** @private @suppress {missingRequire} Circular dep. */
        private request_: any /*missing*/;

        /**
         * Whether we have received the first result as an intermediate result. This
         * helps us determine whether we're behind a buffering proxy.
         * @type {boolean}
         * @private
         */
        private receivedIntermediateResult_: boolean;

        /**
         * The time when the test request was started. We use timing in IE as
         * a heuristic for whether we're behind a buffering proxy.
         * @type {?number}
         * @private
         */
        private startTime_: number|null;

        /**
         * The time for of the first result part. We use timing in IE as a
         * heuristic for whether we're behind a buffering proxy.
         * @type {?number}
         * @private
         */
        private firstTime_: number|null;

        /**
         * The time for of the last result part. We use timing in IE as a
         * heuristic for whether we're behind a buffering proxy.
         * @type {?number}
         * @private
         */
        private lastTime_: number|null;

        /**
         * The relative path for test requests.
         * @type {?string}
         * @private
         */
        private path_: string|null;

        /**
         * The state of the state machine for this object.
         *
         * @type {?number}
         * @private
         */
        private state_: number|null;

        /**
         * The last status code received.
         * @type {number}
         * @private
         */
        private lastStatusCode_: number;

        /**
         * A subdomain prefix for using a subdomain in IE for the backchannel
         * requests.
         * @type {?string}
         * @private
         */
        private hostPrefix_: string|null;

        /**
         * A subdomain prefix for testing whether the channel was disabled by
         * a network administrator;
         * @type {?string}
         * @private
         */
        private blockedPrefix_: string|null;

        /**
         * Sets extra HTTP headers to add to all the requests sent to the server.
         *
         * @param {Object} extraHeaders The HTTP headers.
         */
        setExtraHeaders(extraHeaders: Object): void;

        /**
         * Sets a new parser for the response payload.
         * @param {!goog.string.Parser} parser Parser.
         */
        setParser(parser: goog.string.Parser): void;

        /**
         * Starts the test channel. This initiates connections to the server.
         *
         * @param {string} path The relative uri for the test connection.
         */
        connect(path: string): void;

        /**
         * Checks to see whether the channel is blocked. This is for implementing the
         * feature that allows network administrators to block Gmail Chat. The
         * strategy to determine if we're blocked is to try to load an image off a
         * special subdomain that network administrators will block access to if they
         * are trying to block chat. For Gmail Chat, the subdomain is
         * chatenabled.mail.google.com.
         * @private
         */
        private checkBlocked_(): void;

        /**
         * Callback for testLoadImageWithRetries to check if browser channel is
         * blocked.
         * @param {boolean} succeeded Whether the request succeeded.
         * @private
         */
        private checkBlockedCallback_(succeeded: boolean): void;

        /**
         * Begins the second stage of the test channel where we test to see if we're
         * behind a buffering proxy. The server sends back a multi-chunked response
         * with the first chunk containing the content '1' and then two seconds later
         * sending the second chunk containing the content '2'. Depending on how we
         * receive the content, we can tell if we're behind a buffering proxy.
         * @private
         * @suppress {missingRequire} goog.net.BrowserChannel
         */
        private connectStage2_(): void;

        /**
         * Factory method for XhrIo objects.
         * @param {?string} hostPrefix The host prefix, if we need an XhrIo object
         *     capable of calling a secondary domain.
         * @return {!goog.net.XhrIo} New XhrIo object.
         */
        createXhrIo(hostPrefix: string|null): goog.net.XhrIo;

        /**
         * Aborts the test channel.
         */
        abort(): void;

        /**
         * Returns whether the test channel is closed. The ChannelRequest object expects
         * this method to be implemented on its handler.
         *
         * @return {boolean} Whether the channel is closed.
         */
        isClosed(): boolean;

        /**
         * Callback from ChannelRequest for when new data is received
         *
         * @param {goog.net.ChannelRequest} req  The request object.
         * @param {string} responseText The text of the response.
         */
        onRequestData(req: goog.net.ChannelRequest, responseText: string): void;

        /**
         * Callback from ChannelRequest that indicates a request has completed.
         *
         * @param {goog.net.ChannelRequest} req  The request object.
         * @suppress {missingRequire} Cannot depend on goog.net.BrowserChannel because
         *     it creates a circular dependency.
         */
        onRequestComplete(req: goog.net.ChannelRequest): void;

        /**
         * Returns the last status code received for a request.
         * @return {number} The last status code received for a request.
         */
        getLastStatusCode(): number;

        /**
         * @return {boolean} Whether we should be using secondary domains when the
         *     server instructs us to do so.
         */
        shouldUseSecondaryDomains(): boolean;

        /**
         * Gets whether this channel is currently active. This is used to determine the
         * length of time to wait before retrying.
         *
         * @param {goog.net.BrowserChannel} browserChannel The browser channel.
         * @return {boolean} Whether the channel is currently active.
         */
        isActive(browserChannel: goog.net.BrowserChannel): boolean;

        /**
         * @return {boolean} True if test stage 2 detected a non-buffered
         *     channel early and early no buffering detection is enabled.
         * @private
         */
        private checkForEarlyNonBuffered_(): boolean;

        /**
         * Notifies the channel of a fine grained network event.
         * @param {goog.net.BrowserChannel.ServerReachability} reachabilityType The
         *     reachability event type.
         */
        notifyServerReachabilityEvent(reachabilityType: goog.net.BrowserChannel.ServerReachability): void;
    }
}

declare namespace goog.net.BrowserTestChannel {
}
