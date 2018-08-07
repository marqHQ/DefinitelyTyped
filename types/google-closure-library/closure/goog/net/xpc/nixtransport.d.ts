/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.NixTransport' {
    import alias = goog.net.xpc.NixTransport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * NIX method transport.
     *
     * NOTE(user): NIX method tested in all IE versions starting from 6.0.
     *
     * @extends {goog.net.xpc.Transport}
     * @final
     */
    class NixTransport extends __NixTransport {}
    abstract class __NixTransport extends goog.net.xpc.__Transport {
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
         * The authorization token, if any, used by this transport.
         * @type {?string}
         * @private
         */
        private authToken_: string|null;

        /**
         * The authorization token, if any, that must be sent by the other party
         * for setup to occur.
         * @type {?string}
         * @private
         */
        private remoteAuthToken_: string|null;

        /**
         * Keeps track of whether the local setup has completed (i.e.
         * the initial work towards setting the channel up has been
         * completed for this end).
         * @type {boolean}
         * @private
         */
        private localSetupCompleted_: boolean;

        /**
         * The NIX channel used to talk to the other page. This
         * object is in fact a reference to a VBScript class
         * (see above) and as such, is in fact a COM wrapper.
         * When using this object, make sure to not access methods
         * without calling them, otherwise a COM error will be thrown.
         * @type {Object}
         * @private
         */
        private nixChannel_: Object;

        /**
         * Attempts to setup the channel from the perspective
         * of the outer (read: container) page. This method
         * will attempt to create a NIX wrapper for this transport
         * and place it into the "opener" property of the inner
         * page's window object. If it fails, it will continue
         * to loop until it does so.
         *
         * @private
         */
        private attemptOuterSetup_(): void;

        /**
         * Attempts to setup the channel from the perspective
         * of the inner (read: iframe) page. This method
         * will attempt to *read* the opener object from the
         * page's opener property. If it succeeds, this object
         * is saved into nixChannel_ and the channel is confirmed
         * with the container by calling CreateChannel with an instance
         * of a wrapper for *this* page. Note that if this method
         * fails, it will continue to loop until it succeeds.
         *
         * @private
         */
        private attemptInnerSetup_(): void;

        /**
         * Internal method called by the inner page, via the
         * NIX wrapper, to complete the setup of the channel.
         *
         * @param {Object} channel The NIX wrapper of the
         *  inner page.
         * @private
         */
        private createChannel_(channel: Object): void;

        /**
         * Internal method called by the other page, via the NIX wrapper,
         * to deliver a message.
         * @param {string} serviceName The name of the service the message is to be
         *   delivered to.
         * @param {string} payload The message to process.
         * @private
         */
        private handleMessage_(serviceName: string, payload: string): void;
    }
}

declare namespace goog.net.xpc.NixTransport {
    /**
     * Global name of the Wrapper VBScript class.
     * Note that this class will be stored in the *global*
     * namespace (i.e. window in browsers).
     * @type {string}
     */
    let NIX_WRAPPER: string;

    /**
     * Global name of the GetWrapper VBScript function. This
     * constant is used by JavaScript to call this function.
     * Note that this function will be stored in the *global*
     * namespace (i.e. window in browsers).
     * @type {string}
     */
    let NIX_GET_WRAPPER: string;

    /**
     * The name of the handle message method used by the wrapper class
     * when calling the transport.
     * @type {string}
     */
    let NIX_HANDLE_MESSAGE: string;

    /**
     * The name of the create channel method used by the wrapper class
     * when calling the transport.
     * @type {string}
     */
    let NIX_CREATE_CHANNEL: string;

    /**
     * A "unique" identifier that is stored in the wrapper
     * class so that the wrapper can be distinguished from
     * other objects easily.
     * @type {string}
     */
    let NIX_ID_FIELD: string;

    /**
     * Determines if the installed version of IE supports accessing window.opener
     * after it has been set to a non-Window/null value. NIX relies on this being
     * possible.
     * @return {boolean} Whether window.opener behavior is compatible with NIX.
     */
    function isNixSupported(): boolean;
}
