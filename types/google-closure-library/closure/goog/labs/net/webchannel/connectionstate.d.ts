/// <reference path="../../../../../globals.d.ts"/>

declare module 'goog:goog.labs.net.webChannel.ConnectionState' {
    import alias = goog.labs.net.webChannel.ConnectionState;
    export default alias;
}

declare namespace goog.labs.net.webChannel {
    /**
     * The connectivity state of the channel.
     *
     * @struct
     */
    class ConnectionState extends __ConnectionState {}
    abstract class __ConnectionState {
        /**
         */
        constructor();

        /**
         * Handshake result.
         * @type {Array<string>}
         */
        handshakeResult: string[];

        /**
         * The result of checking if there is a buffering proxy in the network.
         * True means the connection is buffered, False means unbuffered,
         * null means that the result is not available.
         * @type {?boolean}
         */
        bufferingProxyResult: boolean|null;
    }
}
