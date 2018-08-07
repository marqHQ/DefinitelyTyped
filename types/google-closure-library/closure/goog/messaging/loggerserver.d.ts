/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>

declare module 'goog:goog.messaging.LoggerServer' {
    import alias = goog.messaging.LoggerServer;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * Creates a logger server that logs messages on behalf of the remote end of a
     * message channel. The remote end of the channel should use a
     * {goog.messaging.LoggerClient} with the same service name.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class LoggerServer extends __LoggerServer {}
    abstract class __LoggerServer extends goog.__Disposable {
        /**
         * @param {!goog.messaging.MessageChannel} channel The channel that is sending
         *     the log messages.
         * @param {string} serviceName The name of the logging service to listen for.
         * @param {string=} opt_channelName The name of this channel. Used to help
         *     distinguish this client's messages.
         */
        constructor(channel: goog.messaging.MessageChannel, serviceName: string, opt_channelName?: string);

        /**
         * The channel that is sending the log messages.
         * @type {!goog.messaging.MessageChannel}
         * @private
         */
        private channel_: goog.messaging.MessageChannel;

        /**
         * The name of the logging service to listen for.
         * @type {string}
         * @private
         */
        private serviceName_: string;

        /**
         * The name of the channel.
         * @type {string}
         * @private
         */
        private channelName_: string;

        /**
         * Handles logging messages from the client.
         * @param {!Object|string} message
         *     The logging information from the client.
         * @private
         */
        private log_(message: Object|string): void;
    }
}
