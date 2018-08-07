/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./transport.d.ts"/>
/// <reference path="./crosspagechannel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.IframePollingTransport' {
    import alias = goog.net.xpc.IframePollingTransport;
    export default alias;
}

declare module 'goog:goog.net.xpc.IframePollingTransport.Sender' {
    import alias = goog.net.xpc.IframePollingTransport.Sender;
    export default alias;
}

declare module 'goog:goog.net.xpc.IframePollingTransport.Receiver' {
    import alias = goog.net.xpc.IframePollingTransport.Receiver;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * Iframe polling transport. Uses hidden iframes to transfer data
     * in the fragment identifier of the URL. The peer polls the iframe's location
     * for changes.
     * Unfortunately, in Safari this screws up the history, because Safari doesn't
     * allow to call location.replace() on a window containing a document from a
     * different domain (last version tested: 2.0.4).
     *
     * @extends {goog.net.xpc.Transport}
     * @final
     */
    class IframePollingTransport extends __IframePollingTransport {}
    abstract class __IframePollingTransport extends goog.net.xpc.__Transport {
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
         * The URI used to send messages.
         * @type {string}
         * @private
         */
        private sendUri_: string;

        /**
         * The URI which is polled for incoming messages.
         * @type {string}
         * @private
         */
        private rcvUri_: string;

        /**
         * The queue to hold messages which can't be sent immediately.
         * @type {Array<string>}
         * @private
         */
        private sendQueue_: string[];

        /**
         * The number of times the inner frame will check for evidence of the outer
         * frame before it tries its reconnection sequence.  These occur at 100ms
         * intervals, making this an effective max waiting period of 500ms.
         * @type {number}
         * @private
         */
        private pollsBeforeReconnect_: number;

        /**
         * Sequence counter.
         * @type {number}
         * @private
         */
        private sequence_: number;

        /**
         * Flag indicating whether we are waiting for an acknoledgement.
         * @type {boolean}
         * @private
         */
        private waitForAck_: boolean;

        /**
         * Flag indicating if channel has been initialized.
         * @type {boolean}
         * @private
         */
        private initialized_: boolean;

        /**
         * Reconnection iframe created by inner peer.
         * @type {Element}
         * @private
         */
        private reconnectFrame_: Element;

        /** @private {goog.net.xpc.IframePollingTransport.Receiver} */
        private ackReceiver_: any /*missing*/;

        /** @private {goog.net.xpc.IframePollingTransport.Sender} */
        private ackSender_: any /*missing*/;

        /** @private */
        private ackIframeElm_: any /*missing*/;

        /** @private */
        private ackWinObj_: any /*missing*/;

        /** @private {!Function|undefined} */
        private checkLocalFramesPresentCb_: any /*missing*/;

        /** @private */
        private deliveryQueue_: any /*missing*/;

        /** @private */
        private msgIframeElm_: any /*missing*/;

        /** @private */
        private msgReceiver_: any /*missing*/;

        /** @private */
        private msgSender_: any /*missing*/;

        /** @private */
        private msgWinObj_: any /*missing*/;

        /** @private */
        private rcvdConnectionSetupAck_: any /*missing*/;

        /** @private */
        private sentConnectionSetupAck_: any /*missing*/;

        /** @private */
        private parts_: any /*missing*/;

        /**
         * Returns the name/ID of the message frame.
         * @return {string} Name of message frame.
         * @private
         */
        private getMsgFrameName_(): string;

        /**
         * Returns the name/ID of the ack frame.
         * @return {string} Name of ack frame.
         * @private
         */
        private getAckFrameName_(): string;

        /**
         * Determines whether the channel is still available. The channel is
         * unavailable if the transport was disposed or the peer is no longer
         * available.
         * @return {boolean} Whether the channel is available.
         */
        isChannelAvailable(): boolean;

        /**
         * Safely retrieves the frames from the peer window. If an error is thrown
         * (e.g. the window is closing) an empty frame object is returned.
         * @return {!Object<string|number, !Window>} The frames from the peer window.
         * @private
         */
        private getPeerFrames_(): {[key: number]: Window}|{[key: string]: Window};

        /**
         * Safely retrieves the peer frame with the specified name.
         * @param {string} frameName The name of the peer frame to retrieve.
         * @return {!Window} The peer frame with the specified name.
         * @private
         */
        private getPeerFrame_(frameName: string): Window;

        /**
         * Creates the iframes which are used to send messages (and acknowledgements)
         * to the peer. Sender iframes contain a document from a different origin and
         * therefore their content can't be accessed.
         * @private
         */
        private constructSenderFrames_(): void;

        /**
         * Constructs a sending frame the the given id.
         * @param {string} id The id.
         * @return {!Element} The constructed frame.
         * @private
         */
        private constructSenderFrame_(id: string): Element;

        /**
         * The protocol for reconnecting is for the inner frame to change channel
         * names, and then communicate the new channel name to the outer peer.
         * The outer peer looks in a predefined location for the channel name
         * upate. It is important to use a completely new channel name, as this
         * will ensure that all messaging iframes are not in the bfcache.
         * Otherwise, Safari may pollute the history when modifying the location
         * of bfcached iframes.
         * @private
         */
        private maybeInnerPeerReconnect_(): void;

        /**
         * Scans inner peer for a reconnect message, which will be used to update
         * the outer peer's channel name. If a reconnect message is found, the
         * sender frames will be cleaned up to make way for the new sender frames.
         * Only called by the outer peer.
         * @private
         */
        private outerPeerReconnect_(): void;

        /**
         * Cleans up the existing sender frames owned by this peer. Only called by
         * the outer peer.
         * @private
         */
        private deconstructSenderFrames_(): void;

        /**
         * Checks if the frames in the peer's page are ready. These contain a
         * document from the own domain and are the ones messages are received through.
         * @private
         */
        private checkForeignFramesReady_(): void;

        /**
         * Checks if the receiving frame is ready.
         * @param {string} frameName Which receiving frame to check.
         * @return {boolean} Whether the receiving frame is ready.
         * @private
         */
        private isRcvFrameReady_(frameName: string): boolean;

        /**
         * Checks if the iframes created in the own document are ready.
         * @private
         */
        private checkLocalFramesPresent_(): void;

        /**
         * Check if connection is ready.
         * @private
         */
        private checkIfConnected_(): void;

        /**
         * Processes an incoming message.
         * @param {string} raw The complete received string.
         */
        processIncomingMsg(raw: string): void;

        /**
         * Process an incoming acknowdedgement.
         * @param {string} msgStr The incoming ack string to process.
         */
        processIncomingAck(msgStr: string): void;

        /**
         * Sends a frame (message part).
         * @private
         */
        private sendNextFrame_(): void;

        /**
         * Delivers a message.
         * @param {string} s The complete message string ("<service_name>:<payload>").
         * @private
         */
        private deliverPayload_(s: string): void;

        /**
         * Maximal frame length.
         * @type {number}
         * @private
         */
        private MAX_FRAME_LENGTH_: number;
    }
}

declare namespace goog.net.xpc.IframePollingTransport {
    /**
     * goog.net.xpc.IframePollingTransport.Sender
     *
     * Utility class to send message-parts to a document from a different origin.
     *
     * @final
     */
    class Sender extends __Sender {}
    abstract class __Sender {
        /**
         * @param {string} url The url the other document will use for polling. Must
         *     be an http:// or https:// URL.
         * @param {Object} windowObj The frame used for sending information to.
         */
        constructor(url: string, windowObj: Object);

        /**
         * The URI used to sending messages.
         * @type {string}
         * @private
         */
        private sanitizedSendUri_: string;

        /**
         * The window object of the iframe used to send messages.
         * The script instantiating the Sender won't have access to
         * the content of sendFrame_.
         * @type {Window}
         * @private
         */
        private sendFrame_: Window;

        /**
         * Cycle counter (used to make sure that sending two identical messages sent
         * in direct succession can be recognized as such by the receiver).
         * @type {number}
         * @private
         */
        private cycle_: number;

        /**
         * Sends a message-part (frame) to the peer.
         * The message-part is encoded and put in the fragment identifier
         * of the URL used for sending (and belongs to the origin/domain of the peer).
         * @param {string} payload The message to send.
         */
        send(payload: string): void;
    }

    /**
     * goog.net.xpc.IframePollingTransport.Receiver
     *
     * @final
     */
    class Receiver extends __Receiver {}
    abstract class __Receiver {
        /**
         * @param {goog.net.xpc.IframePollingTransport} transport The transport to
         *     receive from.
         * @param {Object} windowObj The window-object to poll for location-changes.
         * @param {Function} callback The callback-function to be called when
         *     location has changed.
         */
        constructor(transport: goog.net.xpc.IframePollingTransport, windowObj: Object, callback: Function);

        /**
         * The transport to receive from.
         * @type {goog.net.xpc.IframePollingTransport}
         * @private
         */
        private transport_: goog.net.xpc.IframePollingTransport;

        /**
         * Polls the location of the receiver-frame for changes.
         * @return {boolean} Whether a change has been detected.
         */
        receive(): boolean;
    }

    /**
     * The string used to prefix all iframe names and IDs.
     * @type {string}
     */
    let IFRAME_PREFIX: string;
}
