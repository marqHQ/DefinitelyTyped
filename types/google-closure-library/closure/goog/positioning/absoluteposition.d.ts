/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractposition.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.positioning.AbsolutePosition' {
    import alias = goog.positioning.AbsolutePosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup absolutely positioned by
     * setting the left/top style elements directly to the specified values.
     * The position is generally relative to the element's offsetParent. Normally,
     * this is the document body, but can be another element if the popup element
     * is scoped by an element with relative position.
     *
     * @extends {goog.positioning.AbstractPosition}
     */
    class AbsolutePosition extends __AbsolutePosition {}
    abstract class __AbsolutePosition extends goog.positioning.__AbstractPosition {
        /**
         * @param {number|!goog.math.Coordinate} arg1 Left position or coordinate.
         * @param {number=} opt_arg2 Top position.
         */
        constructor(arg1: number|goog.math.Coordinate, opt_arg2?: number);

        /**
         * Coordinate to position popup at.
         * @type {goog.math.Coordinate}
         */
        coordinate: goog.math.Coordinate;
    }
}
