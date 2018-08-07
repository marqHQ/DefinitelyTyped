/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.vec.Float64Array' {
    import alias = goog.vec.Float64Array;
    export default alias;
}

declare namespace goog.vec {
    /**
     * Constructs a new Float64Array. The new array is initialized to all zeros.
     *
     * @implements {IArrayLike<number>}
     * @final
     */
    class Float64Array extends __Float64Array {}
    abstract class __Float64Array {
        /**
         * @param {goog.vec.Float64Array|Array|ArrayBuffer|number} p0
         *     The length of the array, or an array to initialize the contents of the
         *     new Float64Array.
         */
        constructor(p0: goog.vec.Float64Array|any[]|ArrayBuffer|number);

        /** @type {number} */
        length: number;

        /**
         * The number of bytes in an element (as defined by the Typed Array
         * specification).
         *
         * @type {number}
         */
        BYTES_PER_ELEMENT: number;

        /**
         * Sets elements of the array.
         * @param {Array<number>|Float64Array} values The array of values.
         * @param {number=} opt_offset The offset in this array to start.
         */
        set(values: number[]|Float64Array, opt_offset?: number): void;
    }
}

declare namespace goog.vec.Float64Array {
    /**
     * The number of bytes in an element (as defined by the Typed Array
     * specification).
     *
     * @type {number}
     */
    var BYTES_PER_ELEMENT: number;
}
