/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractposition.d.ts"/>
/// <reference path="./positioning.d.ts"/>

declare module 'goog:goog.positioning.AnchoredPosition' {
    import alias = goog.positioning.AnchoredPosition;
    export default alias;
}

declare namespace goog.positioning {
    /**
     * Encapsulates a popup position where the popup is anchored at a corner of
     * an element.
     *
     * When using AnchoredPosition, it is recommended that the popup element
     * specified in the Popup constructor or Popup.setElement be absolutely
     * positioned.
     *
     * @extends {goog.positioning.AbstractPosition}
     */
    class AnchoredPosition extends __AnchoredPosition {}
    abstract class __AnchoredPosition extends goog.positioning.__AbstractPosition {
        /**
         * @param {Element} anchorElement Element the movable element should be
         *     anchored against.
         * @param {goog.positioning.Corner} corner Corner of anchored element the
         *     movable element should be positioned at.
         * @param {number=} opt_overflow Overflow handling mode. Defaults to IGNORE if
         *     not specified. Bitmap, {@see goog.positioning.Overflow}.
         */
        constructor(anchorElement: Element, corner: goog.positioning.Corner, opt_overflow?: number);

        /**
         * Element the movable element should be anchored against.
         * @type {Element}
         */
        element: Element;

        /**
         * Corner of anchored element the movable element should be positioned at.
         * @type {goog.positioning.Corner}
         */
        corner: goog.positioning.Corner;

        /**
         * Overflow handling mode. Defaults to IGNORE if not specified.
         * Bitmap, {@see goog.positioning.Overflow}.
         * @type {number|undefined}
         * @private
         */
        private overflow_: number|undefined;
    }
}
