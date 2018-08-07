/// <reference path="../../../globals.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>
/// <reference path="./keyrange.d.ts"/>
/// <reference path="./cursor.d.ts"/>

declare module 'goog:goog.db.Index' {
    import alias = goog.db.Index;
    export default alias;
}

declare namespace goog.db {
    /**
     * Creates an IDBIndex wrapper object. Indexes are associated with object
     * stores and provide methods for looking up objects based on their non-key
     * properties. Should not be created directly, access through the object store
     * it belongs to.
     * @see goog.db.ObjectStore#getIndex
     *
     * @final
     */
    class Index extends __Index {}
    abstract class __Index {
        /**
         * @param {!IDBIndex} index Underlying IDBIndex object.
         */
        constructor(index: IDBIndex);

        /**
         * Underlying IndexedDB index object.
         *
         * @type {!IDBIndex}
         * @private
         */
        private index_: IDBIndex;

        /**
         * @return {string} Name of the index.
         */
        getName(): string;

        /**
         * @return {*} Key path of the index.
         */
        getKeyPath(): any;

        /**
         * @return {boolean} True if the index enforces that there is only one object
         *     for each unique value it indexes on.
         */
        isUnique(): boolean;

        /**
         * Helper function for get and getKey.
         *
         * @param {string} fn Function name to call on the index to get the request.
         * @param {string} msg Message to give to the error.
         * @param {IDBKeyType} key The key to look up in the index.
         * @return {!goog.async.Deferred} The resulting deferred object.
         * @private
         */
        private get_(fn: string, msg: string, key: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Fetches a single object from the object store. Even if there are multiple
         * objects that match the given key, this method will get only one of them.
         *
         * @param {IDBKeyType} key Key to look up in the index.
         * @return {!goog.async.Deferred} The deferred object for the given record.
         */
        get(key: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Looks up a single object from the object store and gives back the key that
         * it's listed under in the object store. Even if there are multiple records
         * that match the given key, this method returns the first.
         *
         * @param {IDBKeyType} key Key to look up in the index.
         * @return {!goog.async.Deferred} The deferred key for the record that matches
         *     the key.
         */
        getKey(key: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Helper function for getAll and getAllKeys.
         *
         * @param {string} fn Function name to call on the index to get the request.
         * @param {string} msg Message to give to the error.
         * @param {IDBKeyType=} opt_key Key to look up in the index.
         * @return {!goog.async.Deferred} The resulting deferred array of objects.
         * @private
         */
        private getAll_(fn: string, msg: string, opt_key?: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Gets all indexed objects. If the key is provided, gets all indexed objects
         * that match the key instead.
         *
         * @param {IDBKeyType=} opt_key Key to look up in the index.
         * @return {!goog.async.Deferred} A deferred array of objects that match the
         *     key.
         */
        getAll(opt_key?: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Gets the keys to look up all the indexed objects. If the key is provided,
         * gets all records for objects that match the key instead.
         *
         * @param {IDBKeyType=} opt_key Key to look up in the index.
         * @return {!goog.async.Deferred} A deferred array of keys for objects that
         *     match the key.
         */
        getAllKeys(opt_key?: IDBKeyType): goog.async.Deferred<any>;

        /**
         * Opens a cursor over the specified key range. Returns a cursor object which is
         * able to iterate over the given range.
         *
         * Example usage:
         *
         * <code>
         *  var cursor = index.openCursor(goog.db.KeyRange.bound('a', 'c'));
         *
         *  var key = goog.events.listen(
         *      cursor, goog.db.Cursor.EventType.NEW_DATA,
         *      function() {
         *        // Do something with data.
         *        cursor.next();
         *      });
         *
         *  goog.events.listenOnce(
         *      cursor, goog.db.Cursor.EventType.COMPLETE,
         *      function() {
         *        // Clean up listener, and perform a finishing operation on the data.
         *        goog.events.unlistenByKey(key);
         *      });
         * </code>
         *
         * @param {!goog.db.KeyRange=} opt_range The key range. If undefined iterates
         *     over the whole object store.
         * @param {!goog.db.Cursor.Direction=} opt_direction The direction. If undefined
         *     moves in a forward direction with duplicates.
         * @return {!goog.db.Cursor} The cursor.
         * @throws {goog.db.Error} If there was a problem opening the cursor.
         */
        openCursor(opt_range?: goog.db.KeyRange, opt_direction?: goog.db.Cursor.Direction): goog.db.Cursor;
    }
}
