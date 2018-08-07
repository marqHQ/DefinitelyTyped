/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.structs.Pool' {
    import alias = goog.structs.Pool;
    export default alias;
}

declare namespace goog.structs {
    /**
     * A generic pool class. If min is greater than max, an error is thrown.
     * @extends {goog.Disposable}
     * @template T
     */
    class Pool<T> extends __Pool<T> {}
    abstract class __Pool<T> extends goog.__Disposable {
        /**
         * @param {number=} opt_minCount Min. number of objects (Default: 0).
         * @param {number=} opt_maxCount Max. number of objects (Default: 10).
         */
        constructor(opt_minCount?: number, opt_maxCount?: number);

        /**
         * Minimum number of objects allowed
         * @private {number}
         */
        private minCount_: any /*missing*/;

        /**
         * Maximum number of objects allowed
         * @private {number}
         */
        private maxCount_: any /*missing*/;

        /**
         * Set used to store objects that are currently in the pool and available
         * to be used.
         * @private {goog.structs.Queue<T>}
         */
        private freeQueue_: any /*missing*/;

        /**
         * Set used to store objects that are currently in the pool and in use.
         * @private {goog.structs.Set<T>}
         */
        private inUseSet_: any /*missing*/;

        /**
         * The minimum delay between objects being made available, in milliseconds. If
         * this is 0, no minimum delay is enforced.
         * @protected {number}
         */
        protected delay: any /*missing*/;

        /**
         * The time of the last object being made available, in milliseconds since the
         * epoch (i.e., the result of Date#toTime). If this is null, no access has
         * occurred yet.
         * @protected {number?}
         */
        protected lastAccess: any /*missing*/;

        /**
         * Sets the minimum count of the pool.
         * If min is greater than the max count of the pool, an error is thrown.
         * @param {number} min The minimum count of the pool.
         */
        setMinimumCount(min: number): void;

        /**
         * Sets the maximum count of the pool.
         * If max is less than the min count of the pool, an error is thrown.
         * @param {number} max The maximum count of the pool.
         */
        setMaximumCount(max: number): void;

        /**
         * Sets the minimum delay between objects being returned by getObject, in
         * milliseconds. This defaults to zero, meaning that no minimum delay is
         * enforced and objects may be used as soon as they're available.
         * @param {number} delay The minimum delay, in milliseconds.
         */
        setDelay(delay: number): void;

        /**
         * @return {T|undefined} A new object from the pool if there is one available,
         *     otherwise undefined.
         */
        getObject(): T|undefined;

        /**
         * Returns an object to the pool of available objects so that it can be reused.
         * @param {T} obj The object to return to the pool of free objects.
         * @return {boolean} Whether the object was found in the Pool's set of in-use
         *     objects (in other words, whether any action was taken).
         */
        releaseObject(obj: T): boolean;

        /**
         * Removes a free object from the collection of objects that are free so that it
         * can be used.
         *
         * NOTE: This method does not mark the returned object as in use.
         *
         * @return {T|undefined} The object removed from the free collection, if there
         *     is one available. Otherwise, undefined.
         * @private
         */
        private removeFreeObject_(): T|undefined;

        /**
         * Adds an object to the collection of objects that are free. If the object can
         * not be added, then it is disposed.
         *
         * @param {T} obj The object to add to collection of free objects.
         */
        addFreeObject(obj: T): void;

        /**
         * Adjusts the objects held in the pool to be within the min/max constraints.
         *
         * NOTE: It is possible that the number of objects in the pool will still be
         * greater than the maximum count of objects allowed. This will be the case
         * if no more free objects can be disposed of to get below the minimum count
         * (i.e., all objects are in use).
         */
        adjustForMinMax(): void;

        /**
         * Should be overridden by sub-classes to return an instance of the object type
         * that is expected in the pool.
         * @return {T} The created object.
         */
        createObject(): T;

        /**
         * Should be overridden to dispose of an object. Default implementation is to
         * remove all its members, which should render it useless. Calls the object's
         * `dispose()` method, if available.
         * @param {T} obj The object to dispose.
         */
        disposeObject(obj: T): void;

        /**
         * Should be overridden to determine whether an object has become unusable and
         * should not be returned by getObject(). Calls the object's
         * `canBeReused()`  method, if available.
         * @param {T} obj The object to test.
         * @return {boolean} Whether the object can be reused.
         */
        objectCanBeReused(obj: T): boolean;

        /**
         * Returns true if the given object is in the pool.
         * @param {T} obj The object to check the pool for.
         * @return {boolean} Whether the pool contains the object.
         */
        contains(obj: T): boolean;

        /**
         * Returns the number of objects currently in the pool.
         * @return {number} Number of objects currently in the pool.
         */
        getCount(): number;

        /**
         * Returns the number of objects currently in use in the pool.
         * @return {number} Number of objects currently in use in the pool.
         */
        getInUseCount(): number;

        /**
         * Returns the number of objects currently free in the pool.
         * @return {number} Number of objects currently free in the pool.
         */
        getFreeCount(): number;

        /**
         * Determines if the pool contains no objects.
         * @return {boolean} Whether the pool contains no objects.
         */
        isEmpty(): boolean;
    }
}

declare namespace goog.structs.Pool {
}
