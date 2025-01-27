/// <reference path="../../../globals.d.ts"/>
/// <reference path="./coordinate.d.ts"/>
/// <reference path="./math.d.ts"/>

declare module 'goog:goog.math.Vec2' {
    import alias = goog.math.Vec2;
    export default alias;
}

declare namespace goog.math {
    /**
     * Class for a two-dimensional vector object and assorted functions useful for
     * manipulating points.
     *
     * @struct
     * @extends {goog.math.Coordinate}
     */
    class Vec2 extends __Vec2 {}
    abstract class __Vec2 extends goog.math.__Coordinate {
        /**
         * @param {number} x The x coordinate for the vector.
         * @param {number} y The y coordinate for the vector.
         */
        constructor(x: number, y: number);

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
         * Returns the magnitude of the vector measured from the origin.
         * @return {number} The length of the vector.
         */
        magnitude(): number;

        /**
         * Returns the squared magnitude of the vector measured from the origin.
         * NOTE(brenneman): Leaving out the square root is not a significant
         * optimization in JavaScript.
         * @return {number} The length of the vector, squared.
         */
        squaredMagnitude(): number;

        /**
         * Reverses the sign of the vector. Equivalent to scaling the vector by -1.
         * @return {!goog.math.Vec2} The inverted vector.
         */
        invert(): goog.math.Vec2;

        /**
         * Normalizes the current vector to have a magnitude of 1.
         * @return {!goog.math.Vec2} The normalized vector.
         */
        normalize(): goog.math.Vec2;

        /**
         * Adds another vector to this vector in-place.
         * @param {!goog.math.Coordinate} b The vector to add.
         * @return {!goog.math.Vec2}  This vector with `b` added.
         */
        add(b: goog.math.Coordinate): goog.math.Vec2;

        /**
         * Subtracts another vector from this vector in-place.
         * @param {!goog.math.Coordinate} b The vector to subtract.
         * @return {!goog.math.Vec2} This vector with `b` subtracted.
         */
        subtract(b: goog.math.Coordinate): goog.math.Vec2;

        /**
         * Rotates this vector in-place by a given angle, specified in radians.
         * @param {number} angle The angle, in radians.
         * @return {!goog.math.Vec2} This vector rotated `angle` radians.
         */
        rotate(angle: number): goog.math.Vec2;
    }
}

declare namespace goog.math.Vec2 {
    /**
     * @return {!goog.math.Vec2} A random unit-length vector.
     */
    function randomUnit(): goog.math.Vec2;

    /**
     * @return {!goog.math.Vec2} A random vector inside the unit-disc.
     */
    function random(): goog.math.Vec2;

    /**
     * Returns a new Vec2 object from a given coordinate.
     * @param {!goog.math.Coordinate} a The coordinate.
     * @return {!goog.math.Vec2} A new vector object.
     */
    function fromCoordinate(a: goog.math.Coordinate): goog.math.Vec2;

    /**
     * Rotates a vector by a given angle, specified in radians, relative to a given
     * axis rotation point. The returned vector is a newly created instance - no
     * in-place changes are done.
     * @param {!goog.math.Vec2} v A vector.
     * @param {!goog.math.Vec2} axisPoint The rotation axis point.
     * @param {number} angle The angle, in radians.
     * @return {!goog.math.Vec2} The rotated vector in a newly created instance.
     */
    function rotateAroundPoint(v: goog.math.Vec2, axisPoint: goog.math.Vec2, angle: number): goog.math.Vec2;

    /**
     * Returns the distance between two vectors.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {number} The distance.
     */
    function distance(a: goog.math.Coordinate, b: goog.math.Coordinate): number;

    /**
     * Returns the squared distance between two vectors.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {number} The squared distance.
     */
    function squaredDistance(a: goog.math.Coordinate, b: goog.math.Coordinate): number;

    /**
     * Compares vectors for equality.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {boolean} Whether the vectors have the same x and y coordinates.
     */
    function equals(a: goog.math.Coordinate, b: goog.math.Coordinate): boolean;

    /**
     * Returns the sum of two vectors as a new Vec2.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {!goog.math.Vec2} The sum vector.
     */
    function sum(a: goog.math.Coordinate, b: goog.math.Coordinate): goog.math.Vec2;

    /**
     * Returns the difference between two vectors as a new Vec2.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {!goog.math.Vec2} The difference vector.
     */
    function difference(a: goog.math.Coordinate, b: goog.math.Coordinate): goog.math.Vec2;

    /**
     * Returns the dot-product of two vectors.
     * @param {!goog.math.Coordinate} a The first vector.
     * @param {!goog.math.Coordinate} b The second vector.
     * @return {number} The dot-product of the two vectors.
     */
    function dot(a: goog.math.Coordinate, b: goog.math.Coordinate): number;

    /**
     * Returns the determinant of two vectors.
     * @param {!goog.math.Vec2} a The first vector.
     * @param {!goog.math.Vec2} b The second vector.
     * @return {number} The determinant of the two vectors.
     */
    function determinant(a: goog.math.Vec2, b: goog.math.Vec2): number;

    /**
     * Returns a new Vec2 that is the linear interpolant between vectors a and b at
     * scale-value x.
     * @param {!goog.math.Coordinate} a Vector a.
     * @param {!goog.math.Coordinate} b Vector b.
     * @param {number} x The proportion between a and b.
     * @return {!goog.math.Vec2} The interpolated vector.
     */
    function lerp(a: goog.math.Coordinate, b: goog.math.Coordinate, x: number): goog.math.Vec2;

    /**
     * Returns a new Vec2 that is a copy of the vector a, but rescaled by a factors
     * sx and sy in the x and y directions. If only sx is specified, then y is
     * scaled by the same factor as x.
     * @param {!goog.math.Coordinate} a Vector a.
     * @param {number} sx X scale factor.
     * @param {number=} sy Y scale factor (optional).
     * @return {!goog.math.Vec2} A new rescaled vector.
     */
    function rescaled(a: goog.math.Coordinate, sx: number, undefined: any /* jsdoc error */): goog.math.Vec2;
}
