/// <reference path="../../../globals.d.ts"/>
/// <reference path="./richstorage.d.ts"/>
/// <reference path="./mechanism/mechanism.d.ts"/>

declare module 'goog:goog.storage.ExpiringStorage' {
    import alias = goog.storage.ExpiringStorage;
    export default alias;
}

declare namespace goog.storage {
    /**
     * Provides a storage with expiring keys.
     *
     * @struct
     * @extends {goog.storage.RichStorage}
     */
    class ExpiringStorage extends __ExpiringStorage {}
    abstract class __ExpiringStorage extends goog.storage.__RichStorage {
        /**
         * @param {!goog.storage.mechanism.Mechanism} mechanism The underlying
         *     storage mechanism.
         */
        constructor(mechanism: goog.storage.mechanism.Mechanism);
    }
}

declare namespace goog.storage.ExpiringStorage {
    /**
     * Returns the wrapper creation time.
     *
     * @param {!Object} wrapper The wrapper.
     * @return {number|undefined} Wrapper creation time.
     */
    function getCreationTime(wrapper: Object): number|undefined;

    /**
     * Returns the wrapper expiration time.
     *
     * @param {!Object} wrapper The wrapper.
     * @return {number|undefined} Wrapper expiration time.
     */
    function getExpirationTime(wrapper: Object): number|undefined;

    /**
     * Checks if the data item has expired.
     *
     * @param {!Object} wrapper The wrapper.
     * @return {boolean} True if the item has expired.
     */
    function isExpired(wrapper: Object): boolean;
}
