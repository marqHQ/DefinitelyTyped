/// <reference path="../../../globals.d.ts"/>
/// <reference path="./anchoredposition.d.ts"/>
/// <reference path="./positioning.d.ts"/>
/// <reference path="../math/box.d.ts"/>

declare module 'goog:goog.positioning.AnchoredViewportPosition' {
    import alias = goog.positioning.AnchoredViewportPosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup is anchored at a corner of
     * an element. The corners are swapped if dictated by the viewport. For instance
     * if a popup is anchored with its top left corner to the bottom left corner of
     * the anchor the popup is either displayed below the anchor (as specified) or
     * above it if there's not enough room to display it below.
     *
     * When using this positioning object it's recommended that the movable element
     * be absolutely positioned.
     *
     * @extends {goog.positioning.AnchoredPosition}
     */
    class AnchoredViewportPosition extends __AnchoredViewportPosition {}
    abstract class __AnchoredViewportPosition extends goog.positioning.__AnchoredPosition {
        /**
         * @param {Element} anchorElement Element the movable element should be
         *     anchored against.
         * @param {goog.positioning.Corner} corner Corner of anchored element the
         *     movable element should be positioned at.
         * @param {boolean=} opt_adjust Whether the positioning should be adjusted until
         *     the element fits inside the viewport even if that means that the anchored
         *     corners are ignored.
         * @param {goog.math.Box=} opt_overflowConstraint Box object describing the
         *     dimensions in which the movable element could be shown.
         */
        constructor(
            anchorElement: Element,
            corner: goog.positioning.Corner,
            opt_adjust?: boolean,
            opt_overflowConstraint?: goog.math.Box
        );

        /**
         * The last resort algorithm to use if the algorithm can't fit inside
         * the viewport.
         *
         * IGNORE = do nothing, just display at the preferred position.
         *
         * ADJUST_X | ADJUST_Y = Adjust until the element fits, even if that means
         * that the anchored corners are ignored.
         *
         * @type {number}
         * @private
         */
        private lastResortOverflow_: number;

        /**
         * The dimensions in which the movable element could be shown.
         * @type {goog.math.Box|undefined}
         * @private
         */
        private overflowConstraint_: goog.math.Box|undefined;

        /**
         * @return {goog.math.Box|undefined} The box object describing the
         *     dimensions in which the movable element will be shown.
         */
        getOverflowConstraint(): goog.math.Box|undefined;

        /**
         * @param {goog.math.Box|undefined} overflowConstraint Box object describing the
         *     dimensions in which the movable element could be shown.
         */
        setOverflowConstraint(overflowConstraint: goog.math.Box|undefined): void;

        /**
         * @return {number} A bitmask for the "last resort" overflow.
         */
        getLastResortOverflow(): number;

        /**
         * @param {number} lastResortOverflow A bitmask for the "last resort" overflow,
         *     if we fail to fit the element on-screen.
         */
        setLastResortOverflow(lastResortOverflow: number): void;

        /**
         * Adjusts the corner if X or Y positioning failed.
         * @param {number} status The status of the last positionAtAnchor call.
         * @param {goog.positioning.Corner} corner The corner to adjust.
         * @return {goog.positioning.Corner} The adjusted corner.
         * @protected
         */
        protected adjustCorner(status: number, corner: goog.positioning.Corner): goog.positioning.Corner;
    }
}
