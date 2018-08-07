/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.storage.mechanism.ErrorCode' {
    import alias = goog.storage.mechanism.ErrorCode;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Errors thrown by storage mechanisms.
     * @enum {string}
     */
    enum ErrorCode { INVALID_VALUE, QUOTA_EXCEEDED, STORAGE_DISABLED }
}
