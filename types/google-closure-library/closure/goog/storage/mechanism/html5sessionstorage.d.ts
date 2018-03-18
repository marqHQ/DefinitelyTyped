/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./html5webstorage.d.ts"/>

declare namespace goog.storage.mechanism {
    /**
     * Provides a storage mechanism that uses HTML5 session storage.
     *
     * @struct
     * @extends {goog.storage.mechanism.HTML5WebStorage}
     */
    class HTML5SessionStorage extends __HTML5SessionStorage {}
    abstract class __HTML5SessionStorage extends goog.storage.mechanism.__HTML5WebStorage {
        /**
         */
        constructor();
    }
}
