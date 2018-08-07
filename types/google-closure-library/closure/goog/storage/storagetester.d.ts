/// <reference path="../../../globals.d.ts"/>
/// <reference path="./storage.d.ts"/>

declare module 'goog:goog.storage.storageTester' {
    import alias = goog.storage.storageTester;
    export default alias;
}

declare namespace goog.storage.storageTester {
    /**
     * @param {!goog.storage.Storage} storage
     */
    function runBasicTests(storage: goog.storage.Storage): void;
}
