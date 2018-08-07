/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../storage/collectablestorage.d.ts"/>
/// <reference path="../../storage/mechanism/iterablemechanism.d.ts"/>

declare module 'goog:goog.labs.storage.BoundedCollectableStorage' {
    import alias = goog.labs.storage.BoundedCollectableStorage;
    export default alias;
}

declare namespace goog.labs.storage {
    /**
     * Provides a storage with bounded number of elements, expiring keys and
     * a collection method.
     *
     * @struct
     * @extends {goog.storage.CollectableStorage}
     * @final
     */
    class BoundedCollectableStorage extends __BoundedCollectableStorage {}
    abstract class __BoundedCollectableStorage extends goog.storage.__CollectableStorage {
        /**
         * @param {!goog.storage.mechanism.IterableMechanism} mechanism The underlying
         *     storage mechanism.
         * @param {number} maxItems Maximum number of items in storage.
         */
        constructor(mechanism: goog.storage.mechanism.IterableMechanism, maxItems: number);

        /**
         * A maximum number of items that should be stored.
         * @private {number}
         */
        private maxItems_: any /*missing*/;

        /**
         * Recreates a list of keys in order of creation.
         *
         * @return {!Array<string>} a list of unexpired keys.
         * @private
         */
        private rebuildIndex_(): string[];

        /**
         * Gets key list from a local storage. If an item does not exist,
         * may recreate it.
         *
         * @param {boolean} rebuild Whether to rebuild a index if no index item exists.
         * @return {!Array<string>} a list of keys if index exist, otherwise undefined.
         * @private
         */
        private getKeys_(rebuild: boolean): string[];

        /**
         * Saves a list of keys in a local storage.
         *
         * @param {Array<string>} keys a list of keys to save.
         * @private
         */
        private setKeys_(keys: string[]): void;

        /**
         * Keeps the number of items in storage under maxItems. Removes elements in the
         * order of creation.
         *
         * @param {!Array<string>} keys a list of keys in order of creation.
         * @param {number} maxSize a number of items to keep.
         * @return {!Array<string>} keys left after removing oversize data.
         * @private
         */
        private collectOversize_(keys: string[], maxSize: number): string[];

        /**
         * Ensures that we keep only maxItems number of items in a local storage.
         * @param {boolean=} opt_skipExpired skip removing expired items first.
         * @param {boolean=} opt_strict Also remove invalid keys.
         */
        collectOversize(opt_skipExpired?: boolean, opt_strict?: boolean): void;
    }
}

declare namespace goog.labs.storage.BoundedCollectableStorage {
}
