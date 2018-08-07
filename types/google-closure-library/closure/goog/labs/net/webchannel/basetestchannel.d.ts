/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="./channel.d.ts"/>
/// <reference path="./webchanneldebug.d.ts"/>

declare module 'goog:goog.labs.net.webChannel.BaseTestChannel' {
    import alias = goog.labs.net.webChannel.BaseTestChannel;
    export default alias;
}

declare namespace goog.labs.net.webChannel {
    /**
     * A TestChannel is used during the first part of channel negotiation
     * with the server to create the channel. It helps us determine whether we're
     * behind a buffering proxy.
     *
     * @struct
     * @implements {goog.labs.net.webChannel.Channel}
     */
    class BaseTestChannel extends __BaseTestChannel {}
    abstract class __BaseTestChannel implements goog.labs.net.webChannel.Channel {
        /**
         * @param {!goog.labs.net.webChannel.Channel} channel The channel
         *     that owns this test channel.
         * @param {!goog.labs.net.webChannel.WebChannelDebug} channelDebug A
         *     WebChannelDebug instance to use for logging.
         */
        constructor(channel: goog.labs.net.webChannel.Channel, channelDebug: goog.labs.net.webChannel.WebChannelDebug);

        /**
         * The channel that owns this test channel
         * @private {!goog.labs.net.webChannel.Channel}
         */
        private channel_: any /*missing*/;

        /**
         * The channel debug to use for logging
         * @private {!goog.labs.net.webChannel.WebChannelDebug}
         */
        private channelDebug_: any /*missing*/;

        /**
         * Extra HTTP headers to add to all the requests sent to the server.
         * @private {Object}
         */
        private extraHeaders_: any /*missing*/;

        /**
         * The test request.
         * @private {goog.labs.net.webChannel.ChannelRequest}
         */
        private request_: any /*missing*/;

        /**
         * Whether we have received the first result as an intermediate result. This
         * helps us determine whether we're behind a buffering proxy.
         * @private {boolean}
         */
        private receivedIntermediateResult_: any /*missing*/;

        /**
         * The relative path for test requests.
         * @private {?string}
         */
        private path_: any /*missing*/;

        /**
         * The last status code received.
         * @private {number}
         */
        private lastStatusCode_: any /*missing*/;

        /**
         * A subdomain prefix for using a subdomain in IE for the backchannel
         * requests.
         * @private {?string}
         */
        private hostPrefix_: any /*missing*/;

        /**
         * The effective client protocol as indicated by the initial handshake
         * response via the x-client-wire-protocol header.
         *
         * @private {?string}
         */
        private clientProtocol_: any /*missing*/;
    }
}
