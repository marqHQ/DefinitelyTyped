/// <reference path="../../../globals.d.ts"/>
/// <reference path="./coordinate.d.ts"/>

declare module 'goog:goog.math.Line' {
    import alias = goog.math.Line;
    export default alias;
}

declare namespace goog.math {
    /**
     * Object representing a line.
     * @struct
     * @final
     */
    class Line extends __Line {}
    abstract class __Line {
        /**
         * @param {number} x0 X coordinate of the start point.
         * @param {number} y0 Y coordinate of the start point.
         * @param {number} x1 X coordinate of the end point.
         * @param {number} y1 Y coordinate of the end point.
         */
        constructor(x0: number, y0: number, x1: number, y1: number);

        /**
         * X coordinate of the first point.
         * @type {number}
         */
        x0: number;

        /**
         * Y coordinate of the first point.
         * @type {number}
         */
        y0: number;

        /**
         * X coordinate of the first control point.
         * @type {number}
         */
        x1: number;

        /**
         * Y coordinate of the first control point.
         * @type {number}
         */
        y1: number;

        /**
         * @return {!goog.math.Line} A copy of this line.
         */
        clone(): goog.math.Line;

        /**
         * Tests whether the given line is exactly the same as this one.
         * @param {goog.math.Line} other The other line.
         * @return {boolean} Whether the given line is the same as this one.
         */
        equals(other: goog.math.Line): boolean;

        /**
         * @return {number} The squared length of the line segment used to define the
         *     line.
         */
        getSegmentLengthSquared(): number;

        /**
         * @return {number} The length of the line segment used to define the line.
         */
        getSegmentLength(): number;

        /**
         * Computes the interpolation parameter for the point on the line closest to
         * a given point.
         * @param {number|goog.math.Coordinate} x The x coordinate of the point, or
         *     a coordinate object.
         * @param {number=} opt_y The y coordinate of the point - required if x is a
         *     number, ignored if x is a goog.math.Coordinate.
         * @return {number} The interpolation parameter of the point on the line
         *     closest to the given point.
         * @private
         */
        private getClosestLinearInterpolation_(x: number|goog.math.Coordinate, opt_y?: number): number;

        /**
         * Returns the point on the line segment proportional to t, where for t = 0 we
         * return the starting point and for t = 1 we return the end point.  For t < 0
         * or t > 1 we extrapolate along the line defined by the line segment.
         * @param {number} t The interpolation parameter along the line segment.
         * @return {!goog.math.Coordinate} The point on the line segment at t.
         */
        getInterpolatedPoint(t: number): goog.math.Coordinate;

        /**
         * Computes the point on the line closest to a given point.  Note that a line
         * in this case is defined as the infinite line going through the start and end
         * points.  To find the closest point on the line segment itself see
         * {@see #getClosestSegmentPoint}.
         * @param {number|goog.math.Coordinate} x The x coordinate of the point, or
         *     a coordinate object.
         * @param {number=} opt_y The y coordinate of the point - required if x is a
         *     number, ignored if x is a goog.math.Coordinate.
         * @return {!goog.math.Coordinate} The point on the line closest to the given
         *     point.
         */
        getClosestPoint(x: number|goog.math.Coordinate, opt_y?: number): goog.math.Coordinate;

        /**
         * Computes the point on the line segment closest to a given point.
         * @param {number|goog.math.Coordinate} x The x coordinate of the point, or
         *     a coordinate object.
         * @param {number=} opt_y The y coordinate of the point - required if x is a
         *     number, ignored if x is a goog.math.Coordinate.
         * @return {!goog.math.Coordinate} The point on the line segment closest to the
         *     given point.
         */
        getClosestSegmentPoint(x: number|goog.math.Coordinate, opt_y?: number): goog.math.Coordinate;
    }
}
