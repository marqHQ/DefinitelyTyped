/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractposition.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.positioning.ViewportPosition' {
    import alias = goog.positioning.ViewportPosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup is positioned according to
     * coordinates relative to the  element's viewport (page). This calculates the
     * correct position to use even if the element is relatively positioned to some
     * other element.
     *
     * @extends {goog.positioning.AbstractPosition}
     */
    class ViewportPosition extends __ViewportPosition {}
    abstract class __ViewportPosition extends goog.positioning.__AbstractPosition {
        /**
         * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.
         * @param {number=} opt_arg2 Top position.
         */
        constructor(arg1: number|goog.math.Coordinate, opt_arg2?: number);
    }
}
