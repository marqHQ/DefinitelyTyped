/// <reference path="../../../globals.d.ts"/>
/// <reference path="./tooltip.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/box.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.ui.AdvancedTooltip' {
    import alias = goog.ui.AdvancedTooltip;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Advanced tooltip widget with cursor tracking abilities. Works like a regular
     * tooltip but can track the cursor position and direction to determine if the
     * tooltip should be dismissed or remain open.
     *
     * @extends {goog.ui.Tooltip}
     */
    class AdvancedTooltip extends __AdvancedTooltip {}
    abstract class __AdvancedTooltip extends goog.ui.__Tooltip {
        /**
         * @param {Element|string=} opt_el Element to display tooltip for, either
         *     element reference or string id.
         * @param {?string=} opt_str Text message to display in tooltip.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_el?: Element|string, opt_str?: string|null, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Whether to track the cursor and thereby close the tooltip if it moves away
         * from the tooltip and keep it open if it moves towards it.
         *
         * @type {boolean}
         * @private
         */
        private cursorTracking_: boolean;

        /**
         * Delay in milliseconds before tooltips are hidden if cursor tracking is
         * enabled and the cursor is moving away from the tooltip.
         *
         * @type {number}
         * @private
         */
        private cursorTrackingHideDelayMs_: number;

        /**
         * Box object representing a margin around the tooltip where the cursor is
         * allowed without dismissing the tooltip.
         *
         * @type {goog.math.Box}
         * @private
         */
        private hotSpotPadding_: goog.math.Box;

        /**
         * Bounding box.
         *
         * @type {goog.math.Box}
         * @private
         */
        private boundingBox_: goog.math.Box;

        /**
         * Anchor bounding box.
         *
         * @type {goog.math.Box}
         * @private
         */
        private anchorBox_: goog.math.Box;

        /**
         * Whether the cursor tracking is active.
         *
         * @type {boolean}
         * @private
         */
        private tracking_: boolean;

        /**
         * Sets margin around the tooltip where the cursor is allowed without dismissing
         * the tooltip.
         *
         * @param {goog.math.Box=} opt_box The margin around the tooltip.
         */
        setHotSpotPadding(opt_box?: goog.math.Box): void;

        /**
         * @return {goog.math.Box} box The margin around the tooltip where the cursor is
         *     allowed without dismissing the tooltip.
         */
        getHotSpotPadding(): goog.math.Box;

        /**
         * Sets whether to track the cursor and thereby close the tooltip if it moves
         * away from the tooltip and keep it open if it moves towards it.
         *
         * @param {boolean} b Whether to track the cursor.
         */
        setCursorTracking(b: boolean): void;

        /**
         * @return {boolean} Whether to track the cursor and thereby close the tooltip
         *     if it moves away from the tooltip and keep it open if it moves towards
         *     it.
         */
        getCursorTracking(): boolean;

        /**
         * Sets delay in milliseconds before tooltips are hidden if cursor tracking is
         * enabled and the cursor is moving away from the tooltip.
         *
         * @param {number} delay The delay in milliseconds.
         */
        setCursorTrackingHideDelayMs(delay: number): void;

        /**
         * @return {number} The delay in milliseconds before tooltips are hidden if
         *     cursor tracking is enabled and the cursor is moving away from the
         *     tooltip.
         */
        getCursorTrackingHideDelayMs(): number;

        /**
         * Returns true if the mouse is in the tooltip.
         * @return {boolean} True if the mouse is in the tooltip.
         */
        isMouseInTooltip(): boolean;

        /**
         * Checks if supplied coordinate is in the tooltip, its triggering anchor, or
         * a tooltip that has been triggered by a child of this tooltip.
         * Called from handleMouseMove to determine if hide timer should be started,
         * and from maybeHide to determine if tooltip should be hidden.
         * @param {goog.math.Coordinate} coord Coordinate being tested.
         * @return {boolean} Whether coordinate is in the anchor, the tooltip, or any
         *     tooltip whose anchor is a child of this tooltip.
         * @private
         */
        private isCoordinateActive_(coord: goog.math.Coordinate): boolean;

        /**
         * Forces the recalculation of the hotspot on the next mouse over event.
         * @deprecated Not ever necessary to call this function. Hot spot is calculated
         *     as necessary.
         */
        resetHotSpot: any /*missing*/;
    }
}
