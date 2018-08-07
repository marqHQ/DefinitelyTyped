/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.debug.Error' {
    import alias = goog.debug.Error;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Base class for custom error objects.
     * @extends {Error}
     */
    class Error extends goog._debug.__Error {}

    abstract class __Error extends goog._debug.__Error {}
}

declare namespace goog._debug {
    abstract class __Error extends Error {
        /**
         * @param {*=} opt_msg The message associated with the error.
         */
        constructor(opt_msg?: any);

        /**
         * Whether to report this error to the server. Setting this to false will
         * cause the error reporter to not report the error back to the server,
         * which can be useful if the client knows that the error has already been
         * logged on the server.
         * @type {boolean}
         */
        reportErrorToServer: boolean;
    }
}
