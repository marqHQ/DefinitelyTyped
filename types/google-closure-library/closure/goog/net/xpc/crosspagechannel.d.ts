/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../messaging/abstractchannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../async/delay.d.ts"/>
/// <reference path="../../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./xpc.d.ts"/>
/// <reference path="../../uri/uri.d.ts"/>

declare module 'goog:goog.net.xpc.CrossPageChannel' {
    import alias = goog.net.xpc.CrossPageChannel;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * A communication channel between two documents from different domains.
     * Provides asynchronous messaging.
     *
     * @extends {goog.messaging.AbstractChannel}
     */
    class CrossPageChannel extends __CrossPageChannel {}
    abstract class __CrossPageChannel extends goog.messaging.__AbstractChannel {
        /**
         * @param {Object} cfg Channel configuration object.
         * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper to
         *     use for looking up elements in the dom.
         */
        constructor(cfg: Object, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The configuration for this channel.
         * @type {Object}
         * @private
         */
        private cfg_: Object;

        /**
         * The name of the channel. Please use
         * <code>updateChannelNameAndCatalog</code> to change this from the transports
         * vs changing the property directly.
         * @type {string}
         */
        name: string;

        /**
         * The dom helper to use for accessing the dom.
         * @type {goog.dom.DomHelper}
         * @private
         */
        private domHelper_: goog.dom.DomHelper;

        /**
         * Collects deferred function calls which will be made once the connection
         * has been fully set up.
         * @type {!Array<function()>}
         * @private
         */
        private deferredDeliveries_: () => void[];

        /**
         * An event handler used to listen for load events on peer iframes.
         * @type {!goog.events.EventHandler<!goog.net.xpc.CrossPageChannel>}
         * @private
         */
        private peerLoadHandler_: goog.events.EventHandler<goog.net.xpc.CrossPageChannel>;

        /**
         * A delay between the transport reporting as connected and the calling of the
         * connection callback.  Sometimes used to paper over timing vulnerabilities.
         * @type {goog.async.Delay}
         * @private
         */
        private connectionDelay_: goog.async.Delay<any>;

        /**
         * A deferred which is set to non-null while a peer iframe is being created
         * but has not yet thrown its load event, and which fires when that load event
         * arrives.
         * @type {goog.async.Deferred}
         * @private
         */
        private peerWindowDeferred_: goog.async.Deferred<any>;

        /**
         * The transport.
         * @type {goog.net.xpc.Transport?}
         * @private
         */
        private transport_: goog.net.xpc.Transport|null;

        /**
         * The channel state.
         * @type {number}
         * @private
         */
        private state_: number;

        /**
         * Reference to the window-object of the peer page.
         * @type {Object}
         * @private
         */
        private peerWindowObject_: Object;

        /**
         * Reference to the iframe-element.
         * @type {?HTMLIFrameElement}
         * @private
         */
        private iframeElement_: HTMLIFrameElement|null;

        /**
         * Returns the configuration object for this channel.
         * Package private. Do not call from outside goog.net.xpc.
         *
         * @return {Object} The configuration object for this channel.
         */
        getConfig(): Object;

        /**
         * Returns a reference to the iframe-element.
         * Package private. Do not call from outside goog.net.xpc.
         *
         * @return {?HTMLIFrameElement} A reference to the iframe-element.
         */
        getIframeElement(): HTMLIFrameElement|null;

        /**
         * Sets the window object the foreign document resides in.
         *
         * @param {Object} peerWindowObject The window object of the peer.
         */
        setPeerWindowObject(peerWindowObject: Object): void;

        /**
         * Returns the window object the foreign document resides in.
         *
         * @return {Object} The window object of the peer.
         * @package
         */
        getPeerWindowObject(): Object;

        /**
         * Determines whether the peer window is available (e.g. not closed).
         *
         * @return {boolean} Whether the peer window is available.
         * @package
         */
        isPeerAvailable(): boolean;

        /**
         * Determine which transport type to use for this channel / useragent.
         * @return {goog.net.xpc.TransportTypes|undefined} The best transport type.
         * @private
         */
        private determineTransportType_(): goog.net.xpc.TransportTypes|undefined;

        /**
         * Creates the transport for this channel. Chooses from the available
         * transport based on the user agent and the configuration.
         * @private
         */
        private createTransport_(): void;

        /**
         * Returns the transport type in use for this channel.
         * @return {number} Transport-type identifier.
         */
        getTransportType(): number;

        /**
         * Returns the tranport name in use for this channel.
         * @return {string} The transport name.
         */
        getTransportName(): string;

        /**
         * @return {!Object} Configuration-object to be used by the peer to
         *     initialize the channel.
         */
        getPeerConfiguration(): Object;

        /**
         * Creates the iframe containing the peer page in a specified parent element.
         * This method does not connect the channel, connect() still has to be called
         * separately.
         *
         * @param {!Element} parentElm The container element the iframe is appended to.
         * @param {Function=} opt_configureIframeCb If present, this function gets
         *     called with the iframe element as parameter to allow setting properties
         *     on it before it gets added to the DOM. If absent, the iframe's width and
         *     height are set to '100%'.
         * @param {boolean=} opt_addCfgParam Whether to add the peer configuration as
         *     URL parameter (default: true).
         * @return {!HTMLIFrameElement} The iframe element.
         */
        createPeerIframe(parentElm: Element, opt_configureIframeCb?: Function, opt_addCfgParam?: boolean):
            HTMLIFrameElement;

        /**
         * Clean up after any incomplete attempt to establish and connect to a peer
         * iframe.
         * @private
         */
        private cleanUpIncompleteConnection_(): void;

        /**
         * Returns the peer URI, with an optional URL parameter for configuring the peer
         * window.
         *
         * @param {boolean=} opt_addCfgParam Whether to add the peer configuration as
         *     URL parameter (default: true).
         * @return {!goog.Uri} The peer URI.
         */
        getPeerUri(opt_addCfgParam?: boolean): goog.Uri;

        /**
         * Continues the connection process once we're as sure as we can be that the
         * peer iframe has been created.
         * @private
         */
        private continueConnection_(): void;

        /**
         * Closes the channel.
         */
        close(): void;

        /**
         * Package-private.
         * Called by the transport when the channel is connected.
         * @param {number=} opt_delay Delay this number of milliseconds before calling
         *     the connection callback. Usage is discouraged, but can be used to paper
         *     over timing vulnerabilities when there is no alternative.
         */
        notifyConnected(opt_delay?: number): void;

        /**
         * Called by the transport in case of an unrecoverable failure.
         * Package private. Do not call from outside goog.net.xpc.
         */
        notifyTransportError(): void;

        /**
         * Delivers messages to the appropriate service-handler. Named xpcDeliver to
         * avoid name conflict with `deliver` function in superclass
         * goog.messaging.AbstractChannel.
         *
         * @param {string} serviceName The name of the port.
         * @param {string} payload The payload.
         * @param {string=} opt_origin An optional origin for the message, where the
         *     underlying transport makes that available.  If this is specified, and
         *     the PEER_HOSTNAME parameter was provided, they must match or the message
         *     will be rejected.
         * @package
         */
        xpcDeliver(serviceName: string, payload: string, opt_origin?: string): void;

        /**
         * Escape the user-provided service name for sending across the channel. This
         * URL-encodes certain special characters so they don't conflict with delimiters
         * used by some of the transports, and adds a special prefix if the name
         * conflicts with the reserved transport service name.
         *
         * This is the opposite of {@link #unescapeServiceName_}.
         *
         * @param {string} name The name of the service to escape.
         * @return {string} The escaped service name.
         * @private
         */
        private escapeServiceName_(name: string): string;

        /**
         * Unescape the escaped service name that was sent across the channel. This is
         * the opposite of {@link #escapeServiceName_}.
         *
         * @param {string} name The name of the service to unescape.
         * @return {string} The unescaped service name.
         * @private
         */
        private unescapeServiceName_(name: string): string;

        /**
         * Returns the role of this channel (either inner or outer).
         * @return {number} The role of this channel.
         */
        getRole(): number;

        /**
         * Sets the channel name. Note, this doesn't establish a unique channel to
         * communicate on.
         * @param {string} name The new channel name.
         */
        updateChannelNameAndCatalog(name: string): void;

        /**
         * Returns whether an incoming message with the given origin is acceptable.
         * If an incoming request comes with a specified (non-empty) origin, and the
         * PEER_HOSTNAME config parameter has also been provided, the two must match,
         * or the message is unacceptable.
         * @param {string=} opt_origin The origin associated with the incoming message.
         * @return {boolean} Whether the message is acceptable.
         * @package
         */
        isMessageOriginAcceptable(opt_origin?: string): boolean;
    }
}

declare namespace goog.net.xpc.CrossPageChannel {
}
