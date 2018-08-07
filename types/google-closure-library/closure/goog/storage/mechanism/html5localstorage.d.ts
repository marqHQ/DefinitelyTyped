/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./html5webstorage.d.ts"/>

declare module 'goog:goog.storage.mechanism.HTML5LocalStorage' {
    import alias = goog.storage.mechanism.HTML5LocalStorage;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Provides a storage mechanism that uses HTML5 local storage.
     *
     * @struct
     * @extends {goog.storage.mechanism.HTML5WebStorage}
     */
    class HTML5LocalStorage extends __HTML5LocalStorage {}
    abstract class __HTML5LocalStorage extends goog.storage.mechanism.__HTML5WebStorage {
        /**
         */
        constructor();
    }
}
