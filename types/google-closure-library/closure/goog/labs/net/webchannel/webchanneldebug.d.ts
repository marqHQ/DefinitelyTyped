/// <reference path="../../../../../globals.d.ts"/>

declare module 'goog:goog.labs.net.webChannel.WebChannelDebug' {
    import alias = goog.labs.net.webChannel.WebChannelDebug;
    export default alias;
}

declare namespace goog.labs.net.webChannel {
    /**
     * Logs and keeps a buffer of debugging info for the Channel.
     *
     * @struct
     * @final
     */
    class WebChannelDebug extends __WebChannelDebug {}
    abstract class __WebChannelDebug {
        /**
         */
        constructor();

        /**
         * The logger instance.
         * @const
         * @private {?goog.log.Logger}
         */
        private readonly logger_: any /*missing*/;

        /**
         * Whether to enable redact. Defaults to true.
         * @private {boolean}
         */
        private redactEnabled_: any /*missing*/;
    }
}
