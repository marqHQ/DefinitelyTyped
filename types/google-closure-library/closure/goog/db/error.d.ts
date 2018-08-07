/// <reference path="../../../globals.d.ts"/>
/// <reference path="../debug/error.d.ts"/>
/// <reference path="./db.d.ts"/>

declare module 'goog:goog.db.Error' {
    import alias = goog.db.Error;
    export default alias;
}

declare module 'goog:goog.db.Error.VersionChangeBlockedError' {
    import alias = goog.db.Error.VersionChangeBlockedError;
    export default alias;
}

declare module 'goog:goog.db.Error.ErrorName' {
    import alias = goog.db.Error.ErrorName;
    export default alias;
}

declare module 'goog:goog.db.Error.ErrorCode' {
    import alias = goog.db.Error.ErrorCode;
    export default alias;
}

declare namespace goog.db {
    /**
     * A database error. Since the stack trace can be unhelpful in an asynchronous
     * context, the error provides a message about where it was produced.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class Error extends __Error {}
    abstract class __Error extends goog.debug.__Error {
        /**
         * @param {number|!DOMError|!goog.db.DOMErrorLike} error The DOMError instance
         *     returned by the browser for Chrome22+, or an error code for previous
         *     versions.
         * @param {string} context A description of where the error occurred.
         * @param {string=} opt_message Additional message.
         */
        constructor(error: number|DOMError, context: string, opt_message?: string);

        /**
         * The code for this error.
         *
         * @type {number}
         */
        code: number;

        /**
         * The DOMException as returned by the browser.
         *
         * @type {!goog.db.DOMErrorLike}
         * @private
         */
        private error_: any;

        /**
         * @return {string} The name of the error.
         */
        getName(): string;
    }

    /** @record */
    function DOMErrorLike(): void;
}

declare namespace goog.db.Error {
    /**
     * A specific kind of database error. If a Version Change is unable to proceed
     * due to other open database connections, it will block and this error will be
     * thrown.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class VersionChangeBlockedError extends __VersionChangeBlockedError {}
    abstract class __VersionChangeBlockedError extends goog.debug.__Error {
        /**
         */
        constructor();
    }

    /**
     * Error codes for database errors.
     * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBDatabaseException
     *
     * @enum {number}
     * @suppress {missingProperties} Obsolete IndexDb exception objects
     */
    enum ErrorCode {
        UNKNOWN_ERR,
        NON_TRANSIENT_ERR,
        NOT_FOUND_ERR,
        CONSTRAINT_ERR,
        DATA_ERR,
        NOT_ALLOWED_ERR,
        TRANSACTION_INACTIVE_ERR,
        ABORT_ERR,
        READ_ONLY_ERR,
        TIMEOUT_ERR,
        QUOTA_ERR,
        INVALID_ACCESS_ERR,
        INVALID_STATE_ERR
    }

    /**
     * Translates an error code into a more useful message.
     *
     * @param {number} code Error code.
     * @return {string} A debug message.
     */
    function getMessage(code: number): string;

    /**
     * Names of all possible errors as returned from the browser.
     * @see http://www.w3.org/TR/IndexedDB/#exceptions
     * @enum {string}
     */
    enum ErrorName {
        ABORT_ERR,
        CONSTRAINT_ERR,
        DATA_CLONE_ERR,
        DATA_ERR,
        INVALID_ACCESS_ERR,
        INVALID_STATE_ERR,
        NOT_FOUND_ERR,
        QUOTA_EXCEEDED_ERR,
        READ_ONLY_ERR,
        SYNTAX_ERROR,
        TIMEOUT_ERR,
        TRANSACTION_INACTIVE_ERR,
        UNKNOWN_ERR,
        VERSION_ERR
    }

    /**
     * Translates an error name to an error code. This is purely kept for backwards
     * compatibility with Chrome21.
     *
     * @param {string|undefined} name The name of the erorr.
     * @return {number} The error code corresponding to the error.
     */
    function getCode(name: string|undefined): number;

    /**
     * Converts an error code used by the old spec, to an error name used by the
     * latest spec.
     * @see http://www.w3.org/TR/IndexedDB/#exceptions
     *
     * @param {!goog.db.Error.ErrorCode|number} code The error code to convert.
     * @return {!goog.db.Error.ErrorName} The corresponding name of the error.
     */
    function getName(code: goog.db.Error.ErrorCode|number): goog.db.Error.ErrorName;

    /**
     * Constructs an goog.db.Error instance from an IDBRequest. This abstraction is
     * necessary to provide backwards compatibility with Chrome21.
     *
     * @param {!IDBRequest} request The request that failed.
     * @param {string} message The error message to add to err if it's wrapped.
     * @return {!goog.db.Error} The error that caused the failure.
     */
    function fromRequest(request: IDBRequest, message: string): goog.db.Error;

    /**
     * Constructs an goog.db.Error instance from an DOMException. This abstraction
     * is necessary to provide backwards compatibility with Chrome21.
     *
     * @param {!DOMError|!DOMException} ex The exception that was thrown.
     * @param {string} message The error message to add to err if it's wrapped.
     * @return {!goog.db.Error} The error that caused the failure.
     */
    function fromException(ex: DOMError|DOMException, message: string): goog.db.Error;
}
