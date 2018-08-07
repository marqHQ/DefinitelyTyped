/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.db.KeyRange' {
    import alias = goog.db.KeyRange;
    export default alias;
}

declare namespace goog.db {
    /**
     * Creates a new IDBKeyRange wrapper object. Should not be created directly,
     * instead use one of the static factory methods. For example:
     * @see goog.db.KeyRange.bound
     * @see goog.db.KeyRange.lowerBound
     *
     * @final
     */
    class KeyRange extends __KeyRange {}
    abstract class __KeyRange {
        /**
         * @param {!IDBKeyRange} range Underlying IDBKeyRange object.
         */
        constructor(range: IDBKeyRange);

        /**
         * Underlying IDBKeyRange object.
         *
         * @type {!IDBKeyRange}
         * @private
         */
        private range_: IDBKeyRange;

        /**
         * Returns underlying key range object. This is used in ObjectStore's openCursor
         * and count methods.
         * @return {!IDBKeyRange}
         */
        range(): IDBKeyRange;
    }
}

declare namespace goog.db.KeyRange {
    /**
     * Creates a new key range for a single value.
     *
     * @param {IDBKeyType} key The single value in the range.
     * @return {!goog.db.KeyRange} The key range.
     */
    function only(key: IDBKeyType): goog.db.KeyRange;

    /**
     * Creates a key range with upper and lower bounds.
     *
     * @param {IDBKeyType} lower The value of the lower bound.
     * @param {IDBKeyType} upper The value of the upper bound.
     * @param {boolean=} opt_lowerOpen If true, the range excludes the lower bound
     *     value.
     * @param {boolean=} opt_upperOpen If true, the range excludes the upper bound
     *     value.
     * @return {!goog.db.KeyRange} The key range.
     */
    function bound(lower: IDBKeyType, upper: IDBKeyType, opt_lowerOpen?: boolean, opt_upperOpen?: boolean):
        goog.db.KeyRange;

    /**
     * Creates a key range with a lower bound only, finishes at the last record.
     *
     * @param {IDBKeyType} lower The value of the lower bound.
     * @param {boolean=} opt_lowerOpen If true, the range excludes the lower bound
     *     value.
     * @return {!goog.db.KeyRange} The key range.
     */
    function lowerBound(lower: IDBKeyType, opt_lowerOpen?: boolean): goog.db.KeyRange;

    /**
     * Creates a key range with a upper bound only, starts at the first record.
     *
     * @param {IDBKeyType} upper The value of the upper bound.
     * @param {boolean=} opt_upperOpen If true, the range excludes the upper bound
     *     value.
     * @return {!goog.db.KeyRange} The key range.
     */
    function upperBound(upper: IDBKeyType, opt_upperOpen?: boolean): goog.db.KeyRange;
}
