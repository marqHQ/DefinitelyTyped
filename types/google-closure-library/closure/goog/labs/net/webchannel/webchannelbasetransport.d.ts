/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="../webchanneltransport.d.ts"/>
/// <reference path="../webchannel.d.ts"/>

declare module 'goog:goog.labs.net.webChannel.WebChannelBaseTransport' {
    import alias = goog.labs.net.webChannel.WebChannelBaseTransport;
    export default alias;
}

declare namespace goog.labs.net.webChannel {
    /**
     * Implementation of {@link goog.net.WebChannelTransport} with
     * {@link goog.labs.net.webChannel.WebChannelBase} as the underlying channel
     * implementation.
     *
     * @struct
     * @implements {goog.net.WebChannelTransport}
     * @final
     */
    class WebChannelBaseTransport extends __WebChannelBaseTransport {}
    abstract class __WebChannelBaseTransport implements goog.net.WebChannelTransport {
        /**
         */
        constructor();

        /**
         * The underlying channel object.
         *
         * @private {!WebChannelBase}
         */
        private channel_: any /*missing*/;

        /**
         * @private {string} The URL of the target server end-point.
         */
        private url_: any /*missing*/;

        /**
         * The test URL of the target server end-point. This value defaults to
         * this.url_ + '/test'.
         *
         * @private {string}
         */
        private testUrl_: any /*missing*/;

        /**
         * @private {goog.log.Logger} The logger for this class.
         */
        private logger_: any /*missing*/;

        /**
         * @private {Object<string, string>} Extra URL parameters
         * to be added to each HTTP request.
         */
        private messageUrlParams_: any /*missing*/;

        /**
         * @private {boolean} Whether to enable CORS.
         */
        private supportsCrossDomainXhr_: any /*missing*/;

        /**
         * @private {boolean} Whether to send raw Json and bypass v8 wire format.
         */
        private sendRawJson_: any /*missing*/;

        /**
         * The channel handler.
         *
         * @private {!WebChannelBaseTransport.Channel.Handler_}
         */
        private channelHandler_: any /*missing*/;

        /**
         * High-level status code.
         */
        status: any /*missing*/;

        /**
         * @const {WebChannelBase.Error} Internal error code, for debugging use only.
         */
        readonly errorCode: any /*missing*/;

        /**
         * Create a new WebChannel instance.
         *
         * The new WebChannel is to be opened against the server-side resource
         * as specified by the given URL. See {@link goog.net.WebChannel} for detailed
         * semantics.
         *
         * @param {string} url The URL path for the new WebChannel instance.
         * @param {!goog.net.WebChannel.Options=} opt_options Configuration for the
         *     new WebChannel instance. The configuration object is reusable after
         *     the new channel instance is created.
         * @return {!goog.net.WebChannel} the newly created WebChannel instance.
         */
        createWebChannel(url: string, opt_options?: goog.net.WebChannel.Options): goog.net.WebChannel;
    }
}
