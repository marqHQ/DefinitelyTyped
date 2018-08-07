/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="../debug/logrecord.d.ts"/>

declare module 'goog:goog.messaging.LoggerClient' {
    import alias = goog.messaging.LoggerClient;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * Creates a logger client that sends messages along a message channel for the
     * remote end to log. The remote end of the channel should use a
     * {goog.messaging.LoggerServer} with the same service name.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class LoggerClient extends __LoggerClient {}
    abstract class __LoggerClient extends goog.__Disposable {
        /**
         * @param {!goog.messaging.MessageChannel} channel The channel that on which to
         *     send the log messages.
         * @param {string} serviceName The name of the logging service to use.
         */
        constructor(channel: goog.messaging.MessageChannel, serviceName: string);

        /**
         * The channel on which to send the log messages.
         * @type {!goog.messaging.MessageChannel}
         * @private
         */
        private channel_: goog.messaging.MessageChannel;

        /**
         * The name of the logging service to use.
         * @type {string}
         * @private
         */
        private serviceName_: string;

        /**
         * The bound handler function for handling log messages. This is kept in a
         * variable so that it can be deregistered when the logger client is disposed.
         * @type {Function}
         * @private
         */
        private publishHandler_: Function;

        /**
         * Sends a log message through the channel.
         * @param {!goog.debug.LogRecord} logRecord The log message.
         * @private
         */
        private sendLog_(logRecord: goog.debug.LogRecord): void;
    }
}

declare namespace goog.messaging.LoggerClient {
}
