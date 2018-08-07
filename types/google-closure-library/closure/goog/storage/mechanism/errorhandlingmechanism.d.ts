/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./mechanism.d.ts"/>

declare module 'goog:goog.storage.mechanism.ErrorHandlingMechanism' {
    import alias = goog.storage.mechanism.ErrorHandlingMechanism;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Wraps a storage mechanism with a custom error handler.
     *
     * @struct
     * @extends {goog.storage.mechanism.Mechanism}
     * @final
     */
    class ErrorHandlingMechanism extends __ErrorHandlingMechanism {}
    abstract class __ErrorHandlingMechanism extends goog.storage.mechanism.__Mechanism {
        /**
         * @param {!goog.storage.mechanism.Mechanism} mechanism Underlying storage
         *     mechanism.
         * @param {goog.storage.mechanism.ErrorHandlingMechanism.ErrorHandler}
         *     errorHandler An error handler.
         */
        constructor(
            mechanism: goog.storage.mechanism.Mechanism,
            errorHandler: goog.storage.mechanism.ErrorHandlingMechanism.ErrorHandler
        );

        /**
         * The mechanism to be wrapped.
         * @type {!goog.storage.mechanism.Mechanism}
         * @private
         */
        private mechanism_: goog.storage.mechanism.Mechanism;

        /**
         * The error handler.
         * @type {goog.storage.mechanism.ErrorHandlingMechanism.ErrorHandler}
         * @private
         */
        private errorHandler_: goog.storage.mechanism.ErrorHandlingMechanism.ErrorHandler;
    }
}

declare namespace goog.storage.mechanism.ErrorHandlingMechanism {
    /**
     * Valid storage mechanism operations.
     * @enum {string}
     */
    enum Operation { SET, GET, REMOVE }

    /**
     * A function that handles errors raised in goog.storage.  Since some places in
     * the goog.storage codebase throw strings instead of Error objects, we accept
     * these as a valid parameter type.  It supports the following arguments:
     *
     * 1) The raised error (either in Error or string form);
     * 2) The operation name which triggered the error, as defined per the
     *    ErrorHandlingMechanism.Operation enum;
     * 3) The key that is passed to a storage method;
     * 4) An optional value that is passed to a storage method (only used in set
     *    operations).
     *
     * @typedef {function(
     *   (!Error|string),
     *   goog.storage.mechanism.ErrorHandlingMechanism.Operation,
     *   string,
     *   *=)}
     */
    interface ErrorHandler {
        (_0: Error|string, _1: goog.storage.mechanism.ErrorHandlingMechanism.Operation, _2: string, _3: any):
            any; /*missing*/
    }
}
