/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="./channel.d.ts"/>
/// <reference path="../webchannel.d.ts"/>

declare module 'goog:goog.labs.net.webChannel.WebChannelBase' {
    import alias = goog.labs.net.webChannel.WebChannelBase;
    export default alias;
}

declare namespace goog.labs.net.webChannel {
    /**
     * This WebChannel implementation is branched off goog.net.BrowserChannel
     * for now. Ongoing changes to goog.net.BrowserChannel will be back
     * ported to this implementation as needed.
     *
     * @struct
     * @implements {goog.labs.net.webChannel.Channel}
     */
    class WebChannelBase extends __WebChannelBase {}
    abstract class __WebChannelBase implements goog.labs.net.webChannel.Channel {
        /**
         * @param {!goog.net.WebChannel.Options=} opt_options Configuration for the
         *        WebChannel instance.
         * @param {number=} opt_clientVersion An application-specific version number
         *        that is sent to the server when connected.
         * @param {!ConnectionState=} opt_conn Previously determined connection
         *        conditions.
         */
        constructor(opt_options?: goog.net.WebChannel.Options, opt_clientVersion?: number, opt_conn?: ConnectionState);

        /**
         * The client library version (capabilities).
         * @private {number}
         */
        private clientVersion_: any /*missing*/;

        /**
         * The server library version (capabilities).
         * @private {number}
         */
        private serverVersion_: any /*missing*/;

        /**
         * An array of queued maps that need to be sent to the server.
         * @private {!Array<Wire.QueuedMap>}
         */
        private outgoingMaps_: any /*missing*/;

        /**
         * The channel debug used for logging
         * @private {!WebChannelDebug}
         */
        private channelDebug_: any /*missing*/;

        /**
         * Previous connectivity test results.
         * @private {!ConnectionState}
         */
        private connState_: any /*missing*/;

        /**
         * Extra HTTP headers to add to all the requests sent to the server.
         * @private {Object}
         */
        private extraHeaders_: any /*missing*/;

        /**
         * Extra HTTP headers to add to the init request(s) sent to the server.
         * @private {Object}
         */
        private initHeaders_: any /*missing*/;

        /**
         * @private {?string} The URL param name to overwrite custom HTTP headers
         * to bypass CORS preflight.
         */
        private httpHeadersOverwriteParam_: any /*missing*/;

        /**
         * Extra parameters to add to all the requests sent to the server.
         * @private {Object}
         */
        private extraParams_: any /*missing*/;

        /**
         * Parameter name for the http session id.
         * @private {?string}
         */
        private httpSessionIdParam_: any /*missing*/;

        /**
         * The http session id, to be sent with httpSessionIdParam_ with each
         * request after the initial handshake.
         * @private {?string}
         */
        private httpSessionId_: any /*missing*/;

        /**
         * The ChannelRequest object for the backchannel.
         * @private {ChannelRequest}
         */
        private backChannelRequest_: any /*missing*/;

        /**
         * The relative path (in the context of the the page hosting the browser
         * channel) for making requests to the server.
         * @private {?string}
         */
        private path_: any /*missing*/;

        /**
         * The absolute URI for the forwardchannel request.
         * @private {goog.Uri}
         */
        private forwardChannelUri_: any /*missing*/;

        /**
         * The absolute URI for the backchannel request.
         * @private {goog.Uri}
         */
        private backChannelUri_: any /*missing*/;

        /**
         * A subdomain prefix for using a subdomain in IE for the backchannel
         * requests.
         * @private {?string}
         */
        private hostPrefix_: any /*missing*/;

        /**
         * Whether we allow the use of a subdomain in IE for the backchannel requests.
         * @private {boolean}
         */
        private allowHostPrefix_: any /*missing*/;

        /**
         * The next id to use for the RID (request identifier) parameter. This
         * identifier uniquely identifies the forward channel request.
         * @private {number}
         */
        private nextRid_: any /*missing*/;

        /**
         * The id to use for the next outgoing map. This identifier uniquely
         * identifies a sent map.
         * @private {number}
         */
        private nextMapId_: any /*missing*/;

        /**
         * Whether to fail forward-channel requests after one try or a few tries.
         * @private {boolean}
         */
        private failFast_: any /*missing*/;

        /**
         * The handler that receive callbacks for state changes and data.
         * @private {goog.labs.net.webChannel.WebChannelBase.Handler}
         */
        private handler_: any /*missing*/;

        /**
         * Timer identifier for asynchronously making a forward channel request.
         * @private {?number}
         */
        private forwardChannelTimerId_: any /*missing*/;

        /**
         * Timer identifier for asynchronously making a back channel request.
         * @private {?number}
         */
        private backChannelTimerId_: any /*missing*/;

        /**
         * Timer identifier for the timer that waits for us to retry the backchannel
         * in the case where it is dead and no longer receiving data.
         * @private {?number}
         */
        private deadBackChannelTimerId_: any /*missing*/;

        /**
         * The TestChannel object which encapsulates the logic for determining
         * interesting network conditions about the client.
         * @private {BaseTestChannel}
         */
        private connectionTest_: any /*missing*/;

        /**
         * Whether the client's network conditions can support chunked responses.
         * @private {?boolean}
         */
        private useChunked_: any /*missing*/;

        /**
         * Whether chunked mode is allowed. In certain debugging situations, it's
         * useful to disable this.
         * @private {boolean}
         */
        private allowChunkedMode_: any /*missing*/;

        /**
         * The array identifier of the last array received from the server for the
         * backchannel request.
         * @private {number}
         */
        private lastArrayId_: any /*missing*/;

        /**
         * The array id of the last array sent by the server that we know about.
         * @private {number}
         */
        private lastPostResponseArrayId_: any /*missing*/;

        /**
         * The last status code received.
         * @private {number}
         */
        private lastStatusCode_: any /*missing*/;

        /**
         * Number of times we have retried the current forward channel request.
         * @private {number}
         */
        private forwardChannelRetryCount_: any /*missing*/;

        /**
         * Number of times in a row that we have retried the current back channel
         * request and received no data.
         * @private {number}
         */
        private backChannelRetryCount_: any /*missing*/;

        /**
         * The attempt id for the current back channel request. Starts at 1 and
         * increments for each reconnect. The server uses this to log if our
         * connection is flaky or not.
         * @private {number}
         */
        private backChannelAttemptId_: any /*missing*/;

        /**
         * The base part of the time before firing next retry request. Default is 5
         * seconds. Note that a random delay is added (see {@link retryDelaySeedMs_})
         * for all retries, and linear backoff is applied to the sum for subsequent
         * retries.
         * @private {number}
         */
        private baseRetryDelayMs_: any /*missing*/;

        /**
         * A random time between 0 and this number of MS is added to the
         * {@link baseRetryDelayMs_}. Default is 10 seconds.
         * @private {number}
         */
        private retryDelaySeedMs_: any /*missing*/;

        /**
         * Maximum number of attempts to connect to the server for forward channel
         * requests. Defaults to 2.
         * @private {number}
         */
        private forwardChannelMaxRetries_: any /*missing*/;

        /**
         * The timeout in milliseconds for a forward channel request. Defaults to 20
         * seconds. Note that part of this timeout can be randomized.
         * @private {number}
         */
        private forwardChannelRequestTimeoutMs_: any /*missing*/;

        /**
         * The custom factory used to create XMLHttpRequest objects.
         * @private {!goog.net.XmlHttpFactory | undefined}
         */
        private xmlHttpFactory_: any /*missing*/;

        /**
         * The timeout in milliseconds for a back channel request. Defaults to using
         * the timeout configured in ChannelRequest (45s). If server-side
         * keepaliveInterval is known to the client, set the backchannel request
         * timeout to 1.5 * keepaliveInterval (ms).
         *
         * @private {number|undefined}
         */
        private backChannelRequestTimeoutMs_: any /*missing*/;

        /**
         * A throttle time in ms for readystatechange events for the backchannel.
         * Useful for throttling when ready state is INTERACTIVE (partial data).
         *
         * This throttle is useful if the server sends large data chunks down the
         * backchannel.  It prevents examining XHR partial data on every readystate
         * change event.  This is useful because large chunks can trigger hundreds
         * of readystatechange events, each of which takes ~5ms or so to handle,
         * in turn making the UI unresponsive for a significant period.
         *
         * If set to zero no throttle is used.
         * @private {number}
         */
        private readyStateChangeThrottleMs_: any /*missing*/;

        /**
         * Whether cross origin requests are supported for the channel.
         *
         * See {@link goog.net.XhrIo#setWithCredentials}.
         * @private {boolean}
         */
        private supportsCrossDomainXhrs_: any /*missing*/;

        /**
         * The current session id.
         * @private {string}
         */
        private sid_: any /*missing*/;

        /**
         * The current ChannelRequest pool for the forward channel.
         * @private {!ForwardChannelRequestPool}
         */
        private forwardChannelRequestPool_: any /*missing*/;

        /**
         * The V8 codec.
         * @private {!WireV8}
         */
        private wireCodec_: any /*missing*/;

        /**
         * Whether to run the channel test as a background process to not block
         * the OPEN event.
         *
         * @private {boolean}
         */
        private backgroundChannelTest_: any /*missing*/;

        /**
         * Whether to turn on the fast handshake behavior.
         *
         * @private {boolean}
         */
        private fastHandshake_: any /*missing*/;
    }
}
