/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.FrameElementMethodTransport' {
    import alias = goog.net.xpc.FrameElementMethodTransport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * Frame-element method transport.
     *
     * Firefox allows a document within an iframe to call methods on the
     * iframe-element added by the containing document.
     * NOTE(user): Tested in all FF versions starting from 1.0
     *
     * @extends {goog.net.xpc.Transport}
     * @final
     */
    class FrameElementMethodTransport extends __FrameElementMethodTransport {}
    abstract class __FrameElementMethodTransport extends goog.net.xpc.__Transport {
        /**
         * @param {goog.net.xpc.CrossPageChannel} channel The channel this transport
         *     belongs to.
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
         * Array for queued messages.
         * @type {Array<{serviceName: string, payload: string}>}
         * @private
         */
        private queue_: {serviceName: string; payload: string}[];

        /**
         * Callback function which wraps deliverQueued_.
         * @type {Function}
         * @private
         */
        private deliverQueuedCb_: Function;

        /** @private {!Function|undefined} */
        private attemptSetupCb_: any /*missing*/;

        /** @private */
        private outgoing_: any /*missing*/;

        /** @private */
        private iframeElm_: any /*missing*/;

        /**
         * Flag used to enforce asynchronous messaging semantics.
         * @type {boolean}
         * @private
         */
        private recursive_: boolean;

        /**
         * Only used from within an iframe. Attempts to attach the method
         * to be used for sending messages by the containing document. Has to
         * wait until the containing document has finished. Therefore calls
         * itself in a timeout if not successful.
         * @private
         */
        private attemptSetup_(): void;

        /**
         * Process incoming message.
         * @param {string} serviceName The name of the service the message is to be
         * delivered to.
         * @param {string} payload The message to process.
         * @private
         */
        private incoming_(serviceName: string, payload: string): void;

        /**
         * Delivers queued messages.
         * @private
         */
        private deliverQueued_(): void;
    }
}

declare namespace goog.net.xpc.FrameElementMethodTransport {
}
