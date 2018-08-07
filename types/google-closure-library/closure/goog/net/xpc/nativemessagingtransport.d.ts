/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../timer/timer.d.ts"/>
/// <reference path="../../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.net.xpc.NativeMessagingTransport' {
    import alias = goog.net.xpc.NativeMessagingTransport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * The native messaging transport
     *
     * Uses document.postMessage() to send messages to other documents.
     * Receiving is done by listening on 'message'-events on the document.
     *
     * @extends {goog.net.xpc.Transport}
     * @final
     */
    class NativeMessagingTransport extends __NativeMessagingTransport {}
    abstract class __NativeMessagingTransport extends goog.net.xpc.__Transport {
        /**
         * @param {goog.net.xpc.CrossPageChannel} channel The channel this
         *     transport belongs to.
         * @param {string} peerHostname The hostname (protocol, domain, and port) of the
         *     peer.
         * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for
         *     finding the correct window/document.
         * @param {boolean=} opt_oneSidedHandshake If this is true, only the outer
         *     transport sends a SETUP message and expects a SETUP_ACK.  The inner
         *     transport goes connected when it receives the SETUP.
         * @param {number=} opt_protocolVersion Which version of its setup protocol the
         *     transport should use.  The default is '2'.
         */
        constructor(
            channel: goog.net.xpc.CrossPageChannel,
            peerHostname: string,
            opt_domHelper?: goog.dom.DomHelper,
            opt_oneSidedHandshake?: boolean,
            opt_protocolVersion?: number
        );

        /**
         * The channel this transport belongs to.
         * @type {goog.net.xpc.CrossPageChannel}
         * @private
         */
        private channel_: goog.net.xpc.CrossPageChannel;

        /**
         * Which version of the transport's protocol should be used.
         * @type {number}
         * @private
         */
        private protocolVersion_: number;

        /**
         * The hostname of the peer. This parameterizes all calls to postMessage, and
         * should contain the precise protocol, domain, and port of the peer window.
         * @type {string}
         * @private
         */
        private peerHostname_: string;

        /**
         * The event handler.
         * @type {!goog.events.EventHandler<!goog.net.xpc.NativeMessagingTransport>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.net.xpc.NativeMessagingTransport>;

        /**
         * Timer for connection reattempts.
         * @type {!goog.Timer}
         * @private
         */
        private maybeAttemptToConnectTimer_: goog.Timer;

        /**
         * Whether one-sided handshakes are enabled.
         * @type {boolean}
         * @private
         */
        private oneSidedHandshake_: boolean;

        /**
         * Fires once we've received our SETUP_ACK message.
         * @type {!goog.async.Deferred}
         * @private
         */
        private setupAckReceived_: goog.async.Deferred<any>;

        /**
         * Fires once we've sent our SETUP_ACK message.
         * @type {!goog.async.Deferred}
         * @private
         */
        private setupAckSent_: goog.async.Deferred<any>;

        /**
         * Fires once we're marked connected.
         * @type {!goog.async.Deferred}
         * @private
         */
        private connected_: goog.async.Deferred<any>;

        /**
         * The unique ID of this side of the connection. Used to determine when a peer
         * is reloaded.
         * @type {string}
         * @private
         */
        private endpointId_: string;

        /**
         * The unique ID of the peer. If we get a message from a peer with an ID we
         * don't expect, we reset the connection.
         * @type {?string}
         * @private
         */
        private peerEndpointId_: string|null;

        /**
         * Current determination of peer's protocol version, or null for unknown.
         * @type {?number}
         * @private
         */
        private peerProtocolVersion_: number|null;

        /**
         * Flag indicating if this instance of the transport has been initialized.
         * @type {boolean}
         * @private
         */
        private initialized_: boolean;

        /**
         * Id of a timer user during postMessage sends.
         * @type {number}
         * @private
         */
        private sendTimerId_: number;

        /**
         * Checks whether the peer transport protocol version could be as indicated.
         * @param {number} version The version to check for.
         * @return {boolean} Whether the peer transport protocol version is as
         *     indicated, or null.
         * @private
         */
        private couldPeerVersionBe_(version: number): boolean;

        /**
         * Sends a SETUP transport service message of the correct protocol number for
         * our current situation.
         * @private
         */
        private sendSetupMessage_(): void;

        /**
         * Sends a SETUP_ACK transport service message of the correct protocol number
         * for our current situation.
         * @param {number} protocolVersion The protocol version of the SETUP message
         *     which gave rise to this ack message.
         * @private
         */
        private sendSetupAckMessage_(protocolVersion: number): void;

        /**
         * Attempts to set the peer protocol number.  Downgrades from 2 to 1 are not
         * permitted.
         * @param {number} version The new protocol number.
         * @private
         */
        private setPeerProtocolVersion_(version: number): void;

        /**
         * Connects to other peer. In the case of the outer peer, the setup messages are
         * likely sent before the inner peer is ready to receive them. Therefore, this
         * function will continue trying to send the SETUP message until the inner peer
         * responds. In the case of the inner peer, it will occasionally have its
         * channel name fall out of sync with the outer peer, particularly during
         * soft-reloads and history navigations.
         * @private
         */
        private maybeAttemptToConnect_(): void;

        /**
         * Notify the channel that this transport is connected.  If either transport is
         * protocol v1, a short delay is required to paper over timing vulnerabilities
         * in that protocol version.
         * @private
         */
        private notifyConnected_(): void;
    }
}

declare namespace goog.net.xpc.NativeMessagingTransport {
}
