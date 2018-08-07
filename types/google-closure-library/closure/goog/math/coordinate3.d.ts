/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.math.Coordinate3' {
    import alias = goog.math.Coordinate3;
    export default alias;
}

declare namespace goog.math {
    /**
     * Class for representing coordinates and positions in 3 dimensions.
     *
     * @struct
     */
    class Coordinate3 extends __Coordinate3 {}
    abstract class __Coordinate3 {
        /**
         * @param {number=} opt_x X coordinate, defaults to 0.
         * @param {number=} opt_y Y coordinate, defaults to 0.
         * @param {number=} opt_z Z coordinate, defaults to 0.
         */
        constructor(opt_x?: number, opt_y?: number, opt_z?: number);

        /**
         * X-value
         * @type {number}
         */
        x: number;

        /**
         * Y-value
         * @type {number}
         */
        y: number;

        /**
         * Z-value
         * @type {number}
         */
        z: number;

        /**
         * Returns a new copy of the coordinate.
         *
         * @return {!goog.math.Coordinate3} A clone of this coordinate.
         */
        clone(): goog.math.Coordinate3;

        /**
         * Returns the contents of this coordinate as a 3 value Array.
         *
         * @return {!Array<number>} A new array.
         */
        toArray(): number[];
    }
}

declare namespace goog.math.Coordinate3 {
    /**
     * Compares coordinates for equality.
     *
     * @param {goog.math.Coordinate3} a A Coordinate3.
     * @param {goog.math.Coordinate3} b A Coordinate3.
     * @return {boolean} True iff the coordinates are equal, or if both are null.
     */
    function equals(a: goog.math.Coordinate3, b: goog.math.Coordinate3): boolean;

    /**
     * Returns the distance between two coordinates.
     *
     * @param {goog.math.Coordinate3} a A Coordinate3.
     * @param {goog.math.Coordinate3} b A Coordinate3.
     * @return {number} The distance between `a` and `b`.
     */
    function distance(a: goog.math.Coordinate3, b: goog.math.Coordinate3): number;

    /**
     * Returns the squared distance between two coordinates. Squared distances can
     * be used for comparisons when the actual value is not required.
     *
     * Performance note: eliminating the square root is an optimization often used
     * in lower-level languages, but the speed difference is not nearly as
     * pronounced in JavaScript (only a few percent.)
     *
     * @param {goog.math.Coordinate3} a A Coordinate3.
     * @param {goog.math.Coordinate3} b A Coordinate3.
     * @return {number} The squared distance between `a` and `b`.
     */
    function squaredDistance(a: goog.math.Coordinate3, b: goog.math.Coordinate3): number;

    /**
     * Returns the difference between two coordinates as a new
     * goog.math.Coordinate3.
     *
     * @param {goog.math.Coordinate3} a A Coordinate3.
     * @param {goog.math.Coordinate3} b A Coordinate3.
     * @return {!goog.math.Coordinate3} A Coordinate3 representing the difference
     *     between `a` and `b`.
     */
    function difference(a: goog.math.Coordinate3, b: goog.math.Coordinate3): goog.math.Coordinate3;

    /**
     * Converts a three element array into a Coordinate3 object.  If the value
     * passed in is not an array, not array-like, or not of the right length, an
     * error is thrown.
     *
     * @param {Array<number>} a Array of numbers to become a coordinate.
     * @return {!goog.math.Coordinate3} A new coordinate from the array values.
     * @throws {Error} When the oject passed in is not valid.
     */
    function fromArray(a: number[]): goog.math.Coordinate3;
}
