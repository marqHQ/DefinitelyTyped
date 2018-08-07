/// <reference path="../../../globals.d.ts"/>
/// <reference path="./expiringstorage.d.ts"/>
/// <reference path="./mechanism/iterablemechanism.d.ts"/>
/// <reference path="../iter/iter.d.ts"/>

declare module 'goog:goog.storage.CollectableStorage' {
    import alias = goog.storage.CollectableStorage;
    export default alias;
}

declare namespace goog.storage {
    /**
     * Provides a storage with expiring keys and a collection method.
     *
     * @struct
     * @extends {goog.storage.ExpiringStorage}
     */
    class CollectableStorage extends __CollectableStorage {}
    abstract class __CollectableStorage extends goog.storage.__ExpiringStorage {
        /**
         * @param {!goog.storage.mechanism.IterableMechanism} mechanism The underlying
         *     storage mechanism.
         */
        constructor(mechanism: goog.storage.mechanism.IterableMechanism);

        /**
         * Iterate over keys and returns those that expired.
         *
         * @param {goog.iter.Iterable} keys keys to iterate over.
         * @param {boolean=} opt_strict Also return invalid keys.
         * @return {!Array<string>} Keys of values that expired.
         * @private
         */
        private getExpiredKeys_(keys: goog.iter.Iterable, opt_strict?: boolean): string[];

        /**
         * Cleans up the storage by removing expired keys.
         *
         * @param {goog.iter.Iterable} keys List of all keys.
         * @param {boolean=} opt_strict Also remove invalid keys.
         * @return {!Array<string>} a list of expired keys.
         * @protected
         */
        protected collectInternal(keys: goog.iter.Iterable, opt_strict?: boolean): string[];

        /**
         * Cleans up the storage by removing expired keys.
         *
         * @param {boolean=} opt_strict Also remove invalid keys.
         */
        collect(opt_strict?: boolean): void;
    }
}
