/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.IframeRelayTransport' {
    import alias = goog.net.xpc.IframeRelayTransport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * Iframe relay transport. Creates hidden iframes containing a document
     * from the peer's origin. Data is transferred in the fragment identifier.
     * Therefore the document loaded in the iframes can be served from the
     * browser's cache.
     *
     * @extends {goog.net.xpc.Transport}
     * @final
     */
    class IframeRelayTransport extends __IframeRelayTransport {}
    abstract class __IframeRelayTransport extends goog.net.xpc.__Transport {
        /**
         * @param {goog.net.xpc.CrossPageChannel} channel The channel this
         *     transport belongs to.
         * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for finding
         *     the correct window.
         */
        constructor(channel: goog.net.xpc.CrossPageChannel, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The channel this transport belongs to.
         * @type {goog.net.xpc.CrossPageChannel}
         * @private
         */
        private channel_: goog.net.xpc.CrossPageChannel;

        /**
         * The URI used to relay data to the peer.
         * @type {string}
         * @private
         */
        private peerRelayUri_: string;

        /**
         * The id of the iframe the peer page lives in.
         * @type {string}
         * @private
         */
        private peerIframeId_: string;

        /**
         * Sends an encoded message or message fragment.
         * @param {string} service Name of service this the message has to be delivered.
         * @param {string} encodedPayload The message content, URI encoded.
         * @param {string=} opt_fragmentIdStr If sending a fragment, a string that
         *     identifies the fragment.
         * @private
         */
        private send_(service: string, encodedPayload: string, opt_fragmentIdStr?: string): void;
    }
}

declare namespace goog.net.xpc.IframeRelayTransport {
    /**
     * @typedef {{fragments: !Array<string>, received: number, expected: number}}
     */
    interface FragmentInfo {
        fragments: string[];
        received: number;
        expected: number;
    }
}
