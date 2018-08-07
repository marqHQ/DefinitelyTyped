/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.net.xpc.Transport' {
    import alias = goog.net.xpc.Transport;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * The base class for transports.
     * @extends {goog.Disposable};
     */
    class Transport extends __Transport {}
    abstract class __Transport {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper The dom helper to use for
         *     finding the window objects.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * The dom helper to use for finding the window objects to reference.
         * @type {goog.dom.DomHelper}
         * @private
         */
        private domHelper_: goog.dom.DomHelper;

        /**
         * The transport type.
         * @type {number}
         * @protected
         */
        protected transportType: number;

        /**
         * @return {number} The transport type identifier.
         */
        getType(): number;

        /**
         * Returns the window associated with this transport instance.
         * @return {!Window} The window to use.
         */
        getWindow(): Window;

        /**
         * Return the transport name.
         * @return {string} the transport name.
         */
        getName(): string;

        /**
         * Handles transport service messages (internal signalling).
         * @param {string} payload The message content.
         */
        transportServiceHandler(payload: string): void;

        /**
         * Connects this transport.
         * The transport implementation is expected to call
         * CrossPageChannel.prototype.notifyConnected when the channel is ready
         * to be used.
         */
        connect: any /*missing*/;

        /**
         * Sends a message.
         * @param {string} service The name off the service the message is to be
         * delivered to.
         * @param {string} payload The message content.
         */
        send(service: string, payload: string): void;
    }
}
