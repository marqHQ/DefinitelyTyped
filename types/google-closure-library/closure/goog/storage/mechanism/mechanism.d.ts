/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.storage.mechanism.Mechanism' {
    import alias = goog.storage.mechanism.Mechanism;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Basic interface for all storage mechanisms.
     *
     * @struct
     */
    class Mechanism extends __Mechanism {}
    abstract class __Mechanism {
        /**
         */
        constructor();

        /**
         * Set a value for a key.
         *
         * @param {string} key The key to set.
         * @param {string} value The string to save.
         */
        set(key: string, value: string): void;

        /**
         * Get the value stored under a key.
         *
         * @param {string} key The key to get.
         * @return {?string} The corresponding value, null if not found.
         */
        get(key: string): string|null;

        /**
         * Remove a key and its value.
         *
         * @param {string} key The key to remove.
         */
        remove(key: string): void;
    }
}
