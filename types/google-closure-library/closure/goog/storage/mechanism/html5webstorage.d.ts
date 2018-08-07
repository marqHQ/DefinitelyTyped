/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./iterablemechanism.d.ts"/>

declare module 'goog:goog.storage.mechanism.HTML5WebStorage' {
    import alias = goog.storage.mechanism.HTML5WebStorage;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Provides a storage mechanism that uses HTML5 Web storage.
     *
     * @struct
     * @extends {goog.storage.mechanism.IterableMechanism}
     */
    class HTML5WebStorage extends __HTML5WebStorage {}
    abstract class __HTML5WebStorage extends goog.storage.mechanism.__IterableMechanism {
        /**
         * @param {Storage} storage The Web storage object.
         */
        constructor(storage: Storage);

        /**
         * The web storage object (window.localStorage or window.sessionStorage).
         * @private {Storage}
         */
        private storage_: any /*missing*/;

        /**
         * Determines whether or not the mechanism is available.
         * It works only if the provided web storage object exists and is enabled.
         *
         * @return {boolean} True if the mechanism is available.
         */
        isAvailable(): boolean;

        /**
         * Gets the key for a given key index. If an index outside of
         * [0..this.getCount()) is specified, this function returns null.
         * @param {number} index A key index.
         * @return {?string} A storage key, or null if the specified index is out of
         *     range.
         */
        key(index: number): string|null;
    }
}

declare namespace goog.storage.mechanism.HTML5WebStorage {
}
