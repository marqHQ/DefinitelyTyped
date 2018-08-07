/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="./objectstore.d.ts"/>
/// <reference path="./transaction.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.db.IndexedDb' {
    import alias = goog.db.IndexedDb;
    export default alias;
}

declare namespace goog.db {
    /**
     * Creates an IDBDatabase wrapper object. The database object has methods for
     * setting the version to change the structure of the database and for creating
     * transactions to get or modify the stored records. Should not be created
     * directly, call {@link goog.db.openDatabase} to set up the connection.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class IndexedDb extends __IndexedDb {}
    abstract class __IndexedDb extends goog.events.__EventTarget {
        /**
         * @param {!IDBDatabase} db Underlying IndexedDB database object.
         */
        constructor(db: IDBDatabase);

        /**
         * Underlying IndexedDB database object.
         *
         * @type {!IDBDatabase}
         * @private
         */
        private db_: IDBDatabase;

        /**
         * Internal event handler that listens to IDBDatabase events.
         * @type {!goog.events.EventHandler<!goog.db.IndexedDb>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.db.IndexedDb>;

        /**
         * True iff the database connection is open.
         *
         * @type {boolean}
         * @private
         */
        private open_: boolean;

        /**
         * Dispatches a wrapped error event based on the given event.
         *
         * @param {Event} ev The error event given to the underlying IDBDatabase.
         * @private
         */
        private dispatchError_(ev: Event): void;

        /**
         * Dispatches a wrapped version change event based on the given event.
         *
         * @param {Event} ev The version change event given to the underlying
         *     IDBDatabase.
         * @private
         */
        private dispatchVersionChange_(ev: Event): void;

        /**
         * Closes the database connection. Metadata queries can still be made after this
         * method is called, but otherwise this wrapper should not be used further.
         */
        close(): void;

        /**
         * @return {boolean} Whether a connection is open and the database can be used.
         */
        isOpen(): boolean;

        /**
         * @return {string} The name of this database.
         */
        getName(): string;

        /**
         * @return {number} The current database version.
         */
        getVersion(): number;

        /**
         * @return {DOMStringList} List of object stores in this database.
         */
        getObjectStoreNames(): DOMStringList;

        /**
         * Creates an object store in this database. Can only be called inside a
         * {@link goog.db.UpgradeNeededCallback}.
         *
         * @param {string} name Name for the new object store.
         * @param {!IDBObjectStoreParameters=} opt_params Options object.
         *     The available options are:
         *     keyPath, which is a string and determines what object attribute
         *     to use as the key when storing objects in this object store; and
         *     autoIncrement, which is a boolean, which defaults to false and determines
         *     whether the object store should automatically generate keys for stored
         *     objects. If keyPath is not provided and autoIncrement is false, then all
         *     insert operations must provide a key as a parameter.
         * @return {!goog.db.ObjectStore} The newly created object store.
         * @throws {goog.db.Error} If there's a problem creating the object store.
         */
        createObjectStore(name: string, opt_params?: IDBObjectStoreParameters): goog.db.ObjectStore;

        /**
         * Deletes an object store. Can only be called inside a
         * {@link goog.db.UpgradeNeededCallback}.
         *
         * @param {string} name Name of the object store to delete.
         * @throws {goog.db.Error} If there's a problem deleting the object store.
         */
        deleteObjectStore(name: string): void;

        /**
         * Creates a new transaction.
         *
         * @param {!Array<string>} storeNames A list of strings that contains the
         *     transaction's scope, the object stores that this transaction can operate
         *     on.
         * @param {goog.db.Transaction.TransactionMode=} opt_mode The mode of the
         *     transaction. If not present, the default is READ_ONLY.
         * @return {!goog.db.Transaction} The wrapper for the newly created transaction.
         * @throws {goog.db.Error} If there's a problem creating the transaction.
         */
        createTransaction(storeNames: string[], opt_mode?: goog.db.Transaction.TransactionMode): goog.db.Transaction;
    }
}

declare namespace goog.db.IndexedDb {
    /**
     * Event representing a (possibly attempted) change in the database structure.
     *
     * At time of writing, no Chrome versions support oldVersion or newVersion. See
     * http://crbug.com/153122.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class VersionChangeEvent extends __VersionChangeEvent {}
    abstract class __VersionChangeEvent extends goog.events.__Event {
        /**
         * @param {number} oldVersion The previous version of the database.
         * @param {number} newVersion The version the database is being or has been
         *     updated to.
         */
        constructor(oldVersion: number, newVersion: number);

        /**
         * The previous version of the database.
         * @type {number}
         */
        oldVersion: number;

        /**
         * The version the database is being or has been updated to.
         * @type {number}
         */
        newVersion: number;
    }

    /**
     * Event types fired by a database.
     *
     * @enum {string} The event types for the web socket.
     */
    enum EventType { ABORT, CLOSE, ERROR, VERSION_CHANGE }
}
