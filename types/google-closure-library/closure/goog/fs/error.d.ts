/// <reference path="../../../globals.d.ts"/>
/// <reference path="../debug/error.d.ts"/>

declare module 'goog:goog.fs.Error' {
    import alias = goog.fs.Error;
    export default alias;
}

declare module 'goog:goog.fs.Error.ErrorCode' {
    import alias = goog.fs.Error.ErrorCode;
    export default alias;
}

declare module 'goog:goog.fs.DOMErrorLike' {
    import alias = goog.fs.DOMErrorLike;
    export default alias;
}

declare namespace goog.fs {
    /**
     * A filesystem error. Since the filesystem API is asynchronous, stack traces
     * are less useful for identifying where errors come from, so this includes a
     * large amount of metadata in the message.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class Error extends __Error {}
    abstract class __Error extends goog.debug.__Error {
        /**
         * @param {!DOMError|!goog.fs.DOMErrorLike} error
         * @param {string} action The action being undertaken when the error was raised.
         */
        constructor(error: DOMError|goog.fs.DOMErrorLike, action: string);

        /** @type {string} */
        name: string;

        /** @suppress {deprecated} */
        code: any /*missing*/;
    }

    /** @record */
    interface DOMErrorLike {}
}

declare namespace goog.fs.Error {
    /**
     * Names of errors that may be thrown by the File API, the File System API, or
     * the File Writer API.
     *
     * @see http://dev.w3.org/2006/webapi/FileAPI/#ErrorAndException
     * @see http://www.w3.org/TR/file-system-api/#definitions
     * @see http://dev.w3.org/2009/dap/file-system/file-writer.html#definitions
     * @enum {string}
     */
    enum ErrorName {
        ABORT,
        ENCODING,
        INVALID_MODIFICATION,
        INVALID_STATE,
        NOT_FOUND,
        NOT_READABLE,
        NO_MODIFICATION_ALLOWED,
        PATH_EXISTS,
        QUOTA_EXCEEDED,
        SECURITY,
        SYNTAX,
        TYPE_MISMATCH
    }

    /**
     * Error codes for file errors.
     * @see http://www.w3.org/TR/file-system-api/#idl-def-FileException
     *
     * @enum {number}
     * @deprecated Use the 'name' or 'message' attribute instead.
     */
    enum ErrorCode {
        NOT_FOUND,
        SECURITY,
        ABORT,
        NOT_READABLE,
        ENCODING,
        NO_MODIFICATION_ALLOWED,
        INVALID_STATE,
        SYNTAX,
        INVALID_MODIFICATION,
        QUOTA_EXCEEDED,
        TYPE_MISMATCH,
        PATH_EXISTS
    }
}
