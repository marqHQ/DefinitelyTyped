/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./spline1.d.ts"/>

declare module 'goog:goog.math.interpolator.Pchip1' {
    import alias = goog.math.interpolator.Pchip1;
    export default alias;
}

declare namespace goog.math.interpolator {
    /**
     * A one dimensional monotone cubic spline interpolator.
     * @extends {goog.math.interpolator.Spline1}
     * @final
     */
    class Pchip1 extends __Pchip1 {}
    abstract class __Pchip1 extends goog.math.interpolator.__Spline1 {
        /**
         */
        constructor();

        /**
         * Computes the derivative of a data point at a boundary.
         * @param {number} dx0 The spacing of the 1st data point.
         * @param {number} dx1 The spacing of the 2nd data point.
         * @param {number} slope0 The slope of the 1st data point.
         * @param {number} slope1 The slope of the 2nd data point.
         * @return {number} The derivative at the 1st data point.
         * @private
         */
        private computeDerivativeAtBoundary_(dx0: number, dx1: number, slope0: number, slope1: number): number;
    }
}
