/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractchannel.d.ts"/>
/// <reference path="../events/events.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>
/// <reference path="./deferredchannel.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>

declare module 'goog:goog.messaging.PortChannel' {
    import alias = goog.messaging.PortChannel;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * A wrapper for several types of HTML5 message-passing entities
     * ({@link MessagePort}s and {@link WebWorker}s). This class implements the
     * {@link goog.messaging.MessageChannel} interface.
     *
     * This class can be used in conjunction with other communication on the port.
     * It sets {@link goog.messaging.PortChannel.FLAG} to true on all messages it
     * sends.
     *
     * @extends {goog.messaging.AbstractChannel}
     * @final
     */
    class PortChannel extends __PortChannel {}
    abstract class __PortChannel extends goog.messaging.__AbstractChannel {
        /**
         * @param {!MessagePort|!WebWorker} underlyingPort The message-passing
         *     entity to wrap. If this is a {@link MessagePort}, it should be started.
         *     The remote end should also be wrapped in a PortChannel. This will be
         *     disposed along with the PortChannel; this means terminating it if it's a
         *     worker or removing it from the DOM if it's an iframe.
         */
        constructor(underlyingPort: MessagePort|Worker);

        /**
         * The wrapped message-passing entity.
         * @type {!MessagePort|!WebWorker}
         * @private
         */
        private port_: MessagePort|Worker;

        /**
         * The key for the event listener.
         * @type {goog.events.Key}
         * @private
         */
        private listenerKey_: goog.events.Key;

        /**
         * Delivers a message to the appropriate service handler. If this message isn't
         * a GearsWorkerChannel message, it's ignored and passed on to other handlers.
         *
         * @param {goog.events.Event} e The event.
         * @private
         */
        private deliver_(e: goog.events.Event): void;

        /**
         * Checks whether the message is invalid in some way.
         *
         * @param {Object} data The contents of the message.
         * @return {boolean} True if the message is valid, false otherwise.
         * @private
         */
        private validateMessage_(data: Object): boolean;

        /**
         * Extracts all MessagePort objects from a message to be sent into an array.
         *
         * The message ports are replaced by placeholder objects that will be replaced
         * with the ports again on the other side of the channel.
         *
         * @param {Array<MessagePort>} ports The array that will contain ports
         *     extracted from the message. Will be destructively modified. Should be
         *     empty initially.
         * @param {string|!Object} message The message from which ports will be
         *     extracted.
         * @return {string|!Object} The message with ports extracted.
         * @private
         */
        private extractPorts_(ports: MessagePort[], message: string|Object): string|Object;

        /**
         * Injects MessagePorts back into a message received from across the channel.
         *
         * @param {Array<MessagePort>} ports The array of ports to be injected into the
         *     message.
         * @param {string|!Object} message The message into which the ports will be
         *     injected.
         * @return {string|!Object} The message with ports injected.
         * @private
         */
        private injectPorts_(ports: MessagePort[], message: string|Object): string|Object;
    }
}

declare namespace goog.messaging.PortChannel {
    /**
     * Create a PortChannel that communicates with a window embedded in the current
     * page (e.g. an iframe contentWindow). The code within the window should call
     * {@link forGlobalWindow} to establish the connection.
     *
     * It's possible to use this channel in conjunction with other messages to the
     * embedded window. However, only one PortChannel should be used for a given
     * window at a time.
     *
     * @param {!Window} peerWindow The window object to communicate with.
     * @param {string} peerOrigin The expected origin of the window. See
     *     http://dev.w3.org/html5/postmsg/#dom-window-postmessage.
     * @param {goog.Timer=} opt_timer The timer that regulates how often the initial
     *     connection message is attempted. This will be automatically disposed once
     *     the connection is established, or when the connection is cancelled.
     * @return {!goog.messaging.DeferredChannel} The PortChannel. Although this is
     *     not actually an instance of the PortChannel class, it will behave like
     *     one in that MessagePorts may be sent across it. The DeferredChannel may
     *     be cancelled before a connection is established in order to abort the
     *     attempt to make a connection.
     */
    function forEmbeddedWindow(peerWindow: Window, peerOrigin: string, opt_timer?: goog.Timer):
        goog.messaging.DeferredChannel;

    /**
     * Create a PortChannel that communicates with the document in which this window
     * is embedded (e.g. within an iframe). The enclosing document should call
     * {@link forEmbeddedWindow} to establish the connection.
     *
     * It's possible to use this channel in conjunction with other messages posted
     * to the global window. However, only one PortChannel should be used for the
     * global window at a time.
     *
     * @param {string} peerOrigin The expected origin of the enclosing document. See
     *     http://dev.w3.org/html5/postmsg/#dom-window-postmessage.
     * @return {!goog.messaging.MessageChannel} The PortChannel. Although this may
     *     not actually be an instance of the PortChannel class, it will behave like
     *     one in that MessagePorts may be sent across it.
     */
    function forGlobalWindow(peerOrigin: string): goog.messaging.MessageChannel;

    /**
     * The flag added to messages that are sent by a PortChannel, and are meant to
     * be handled by one on the other side.
     * @type {string}
     */
    let FLAG: string;
}
