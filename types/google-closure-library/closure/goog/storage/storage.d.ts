/// <reference path="../../../globals.d.ts"/>
/// <reference path="./mechanism/mechanism.d.ts"/>

declare module 'goog:goog.storage.Storage' {
    import alias = goog.storage.Storage;
    export default alias;
}

declare namespace goog.storage {
    /**
     * The base implementation for all storage APIs.
     *
     * @struct
     */
    class Storage extends __Storage {}
    abstract class __Storage {
        /**
         * @param {!goog.storage.mechanism.Mechanism} mechanism The underlying
         *     storage mechanism.
         */
        constructor(mechanism: goog.storage.mechanism.Mechanism);

        /**
         * The mechanism used to persist key-value pairs.
         *
         * @protected {goog.storage.mechanism.Mechanism}
         */
        protected mechanism: any /*missing*/;

        /**
         * Sets an item in the data storage.
         *
         * @param {string} key The key to set.
         * @param {*} value The value to serialize to a string and save.
         */
        set(key: string, value: any): void;

        /**
         * Gets an item from the data storage.
         *
         * @param {string} key The key to get.
         * @return {*} Deserialized value or undefined if not found.
         */
        get(key: string): any;

        /**
         * Removes an item from the data storage.
         *
         * @param {string} key The key to remove.
         */
        remove(key: string): void;
    }
}
