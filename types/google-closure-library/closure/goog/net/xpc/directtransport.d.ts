/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.DirectTransport' {
    import alias = goog.net.xpc.DirectTransport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * A direct window to window method transport.
     *
     * If the windows are in the same security context, this transport calls
     * directly into the other window without using any additional mechanism. This
     * is mainly used in scenarios where you want to optionally use a cross domain
     * transport in cross security context situations, or optionally use a direct
     * transport in same security context situations.
     *
     * Note: Global properties are exported by using this transport. One to
     * communicate with the other window by, currently crosswindowmessaging.channel,
     * and by using goog.getUid on window, currently closure_uid_[0-9]+.
     *
     * @extends {Transport}
     */
    class DirectTransport extends __DirectTransport {}
    abstract class __DirectTransport extends __Transport {
        /**
         * @param {!goog.net.xpc.CrossPageChannel} channel The channel this
         *     transport belongs to.
         * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for
         *     finding the correct window/document. If omitted, uses the current
         *     document.
         */
        constructor(channel: goog.net.xpc.CrossPageChannel, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The channel this transport belongs to.
         * @private {!goog.net.xpc.CrossPageChannel}
         */
        private channel_: any /*missing*/;

        /** @private {!EventHandler<!goog.net.xpc.DirectTransport>} */
        private eventHandler_: any /*missing*/;

        /**
         * Timer for connection reattempts.
         * @private {!Timer}
         */
        private maybeAttemptToConnectTimer_: any /*missing*/;

        /**
         * Fires once we've received our SETUP_ACK message.
         * @private {!Deferred}
         */
        private setupAckReceived_: any /*missing*/;

        /**
         * Fires once we've sent our SETUP_ACK message.
         * @private {!Deferred}
         */
        private setupAckSent_: any /*missing*/;

        /**
         * Fires once we're marked connected.
         * @private {!Deferred}
         */
        private connected_: any /*missing*/;

        /**
         * The unique ID of this side of the connection. Used to determine when a peer
         * is reloaded.
         * @private {string}
         */
        private endpointId_: any /*missing*/;

        /**
         * The unique ID of the peer. If we get a message from a peer with an ID we
         * don't expect, we reset the connection.
         * @private {?string}
         */
        private peerEndpointId_: any /*missing*/;

        /**
         * The map of sending messages.
         * @private {Object}
         */
        private asyncSendsMap_: any /*missing*/;

        /**
         * The original channel name.
         * @private {string}
         */
        private originalChannelName_: any /*missing*/;

        /**
         * Flag indicating if this instance of the transport has been initialized.
         * @private {boolean}
         */
        private initialized_: any /*missing*/;

        /**
         * The name of the channel.
         * @type {string}
         */
        channelName: string;

        /**
         * The service on the channel.
         * @type {string}
         */
        service: string;

        /**
         * The payload.
         * @type {string}
         */
        payload: string;
    }
}
