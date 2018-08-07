/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.structs.InversionMap' {
    import alias = goog.structs.InversionMap;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Maps ranges to values.
     * @template T
     */
    class InversionMap<T> extends __InversionMap<T> {}
    abstract class __InversionMap<T> {
        /**
         * @param {Array<number>} rangeArray An array of monotonically
         *     increasing integer values, with at least one instance.
         * @param {Array<T>} valueArray An array of corresponding values.
         *     Length must be the same as rangeArray.
         * @param {boolean=} opt_delta If true, saves only delta from previous value.
         */
        constructor(rangeArray: number[], valueArray: T[], opt_delta?: boolean);

        /**
         * @protected {Array<number>}
         */
        protected rangeArray: any /*missing*/;

        /** @protected {Array<T>} */
        protected values: any /*missing*/;

        /**
         * Stores the integers as ranges (half-open).
         * If delta is true, the integers are delta from the previous value and
         * will be restored to the absolute value.
         * When used as a set, even indices are IN, and odd are OUT.
         * @param {Array<number>} rangeArray An array of monotonically
         *     increasing integer values, with at least one instance.
         * @param {boolean=} opt_delta If true, saves only delta from previous value.
         * @private
         */
        private storeInversion_(rangeArray: number[], opt_delta?: boolean): void;

        /**
         * Splices a range -> value map into this inversion map.
         * @param {Array<number>} rangeArray An array of monotonically
         *     increasing integer values, with at least one instance.
         * @param {Array<T>} valueArray An array of corresponding values.
         *     Length must be the same as rangeArray.
         * @param {boolean=} opt_delta If true, saves only delta from previous value.
         */
        spliceInversion(rangeArray: number[], valueArray: T[], opt_delta?: boolean): void;

        /**
         * Gets the value corresponding to a number from the inversion map.
         * @param {number} intKey The number for which value needs to be retrieved
         *     from inversion map.
         * @return {T|null} Value retrieved from inversion map; null if not found.
         */
        at(intKey: number): T|null;

        /**
         * Gets the largest index such that rangeArray[index] <= intKey from the
         * inversion map.
         * @param {number} intKey The probe for which rangeArray is searched.
         * @return {number} Largest index such that rangeArray[index] <= intKey.
         * @protected
         */
        protected getLeast(intKey: number): number;
    }
}
