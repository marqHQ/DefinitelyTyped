/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.storage.ErrorCode' {
    import alias = goog.storage.ErrorCode;
    export default alias;
}

declare namespace goog.storage {
    /**
     * Errors thrown by the storage.
     * @enum {string}
     */
    enum ErrorCode { INVALID_VALUE, DECRYPTION_ERROR }
}
