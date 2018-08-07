/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./indexeddb.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="./objectstore.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.db.Transaction' {
    import alias = goog.db.Transaction;
    export default alias;
}

declare module 'goog:goog.db.Transaction.TransactionMode' {
    import alias = goog.db.Transaction.TransactionMode;
    export default alias;
}

declare namespace goog.db {
    /**
     * Creates a new transaction. Transactions contain methods for accessing object
     * stores and are created from the database object. Should not be created
     * directly, open a database and call createTransaction on it.
     * @see goog.db.IndexedDb#createTransaction
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class Transaction extends __Transaction {}
    abstract class __Transaction extends goog.events.__EventTarget {
        /**
         * @param {!IDBTransaction} tx IndexedDB transaction to back this wrapper.
         * @param {!goog.db.IndexedDb} db The database that this transaction modifies.
         */
        constructor(tx: IDBTransaction, db: goog.db.IndexedDb);

        /**
         * Underlying IndexedDB transaction object.
         *
         * @type {!IDBTransaction}
         * @private
         */
        private tx_: IDBTransaction;

        /**
         * The database that this transaction modifies.
         *
         * @type {!goog.db.IndexedDb}
         * @private
         */
        private db_: goog.db.IndexedDb;

        /**
         * Event handler for this transaction.
         *
         * @type {!goog.events.EventHandler<!goog.db.Transaction>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.db.Transaction>;

        /**
         * Dispatches an error event based on the given event, wrapping the error
         * if necessary.
         *
         * @param {Event} ev The error event given to the underlying IDBTransaction.
         * @private
         */
        private dispatchError_(ev: Event): void;

        /**
         * @return {goog.db.Transaction.TransactionMode} The transaction's mode.
         */
        getMode(): goog.db.Transaction.TransactionMode;

        /**
         * @return {!goog.db.IndexedDb} The database that this transaction modifies.
         */
        getDatabase(): goog.db.IndexedDb;

        /**
         * Opens an object store to do operations on in this transaction. The requested
         * object store must be one that is in this transaction's scope.
         * @see goog.db.IndexedDb#createTransaction
         *
         * @param {string} name The name of the requested object store.
         * @return {!goog.db.ObjectStore} The wrapped object store.
         * @throws {goog.db.Error} In case of error getting the object store.
         */
        objectStore(name: string): goog.db.ObjectStore;

        /**
         * @return {!goog.async.Deferred} A deferred that will fire once the
         *     transaction is complete. It fires the errback chain if an error occurs
         *     in the transaction, or if it is aborted.
         */
        wait(): goog.async.Deferred<any>;

        /**
         * Aborts this transaction. No pending operations will be applied to the
         * database. Dispatches an ABORT event.
         */
        abort(): void;
    }
}

declare namespace goog.db.Transaction {
    /**
     * Event types the Transaction can dispatch. COMPLETE events are dispatched
     * when the transaction is committed. If a transaction is aborted it dispatches
     * both an ABORT event and an ERROR event with the ABORT_ERR code. Error events
     * are dispatched on any error.
     *
     * @enum {string}
     */
    enum EventTypes { COMPLETE, ABORT, ERROR }

    /**
     * The three possible transaction modes.
     * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBTransaction
     *
     * @enum {string}
     */
    enum TransactionMode { READ_ONLY, READ_WRITE, VERSION_CHANGE }
}
