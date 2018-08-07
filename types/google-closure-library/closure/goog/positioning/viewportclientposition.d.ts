/// <reference path="../../../globals.d.ts"/>
/// <reference path="./clientposition.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.positioning.ViewportClientPosition' {
    import alias = goog.positioning.ViewportClientPosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup is positioned relative to the
     * window (client) coordinates, and made to stay within the viewport.
     *
     * @extends {goog.positioning.ClientPosition}
     */
    class ViewportClientPosition extends __ViewportClientPosition {}
    abstract class __ViewportClientPosition extends goog.positioning.__ClientPosition {
        /**
         * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.
         * @param {number=} opt_arg2 Top position if arg1 is a number representing the
         *     left position, ignored otherwise.
         */
        constructor(arg1: number|goog.math.Coordinate, opt_arg2?: number);

        /**
         * The last-resort overflow strategy, if the popup fails to fit.
         * @type {number}
         * @private
         */
        private lastResortOverflow_: number;

        /**
         * Set the last-resort overflow strategy, if the popup fails to fit.
         * @param {number} overflow A bitmask of goog.positioning.Overflow strategies.
         */
        setLastResortOverflow(overflow: number): void;
    }
}
