/// <reference path="../../../globals.d.ts"/>
/// <reference path="./popupbase.d.ts"/>
/// <reference path="../positioning/abstractposition.d.ts"/>
/// <reference path="../positioning/positioning.d.ts"/>
/// <reference path="../math/box.d.ts"/>

declare module 'goog:goog.ui.Popup' {
    import alias = goog.ui.Popup;
    export default alias;
}

declare namespace goog.ui {
    /**
     * The Popup class provides functionality for displaying an absolutely
     * positioned element at a particular location in the window. It's designed to
     * be used as the foundation for building controls like a menu or tooltip. The
     * Popup class includes functionality for displaying a Popup near adjacent to
     * an anchor element.
     *
     * This works cross browser and thus does not use IE's createPopup feature
     * which supports extending outside the edge of the brower window.
     *
     * @extends {goog.ui.PopupBase}
     */
    class Popup extends __Popup {}
    abstract class __Popup extends goog.ui.__PopupBase {
        /**
         * @param {Element=} opt_element A DOM element for the popup.
         * @param {goog.positioning.AbstractPosition=} opt_position A positioning helper
         *     object.
         */
        constructor(opt_element?: Element, opt_position?: goog.positioning.AbstractPosition);

        /**
         * Corner of the popup to used in the positioning algorithm.
         *
         * @type {goog.positioning.Corner}
         * @private
         */
        private popupCorner_: goog.positioning.Corner;

        /**
         * Positioning helper object.
         *
         * @private {goog.positioning.AbstractPosition|undefined}
         */
        private position_: any /*missing*/;

        /**
         * Margin for the popup used in positioning algorithms.
         *
         * @type {goog.math.Box|undefined}
         * @private
         */
        private margin_: goog.math.Box|undefined;

        /**
         * Returns the corner of the popup to used in the positioning algorithm.
         *
         * @return {goog.positioning.Corner} The popup corner used for positioning.
         */
        getPinnedCorner(): goog.positioning.Corner;

        /**
         * Sets the corner of the popup to used in the positioning algorithm.
         *
         * @param {goog.positioning.Corner} corner The popup corner used for
         *     positioning.
         */
        setPinnedCorner(corner: goog.positioning.Corner): void;

        /**
         * @return {goog.positioning.AbstractPosition} The position helper object
         *     associated with the popup.
         */
        getPosition(): goog.positioning.AbstractPosition;

        /**
         * Sets the position helper object associated with the popup.
         *
         * @param {goog.positioning.AbstractPosition} position A position helper object.
         */
        setPosition(position: goog.positioning.AbstractPosition): void;

        /**
         * Returns the margin to place around the popup.
         *
         * @return {goog.math.Box?} The margin.
         */
        getMargin(): goog.math.Box|null;

        /**
         * Sets the margin to place around the popup.
         *
         * @param {goog.math.Box|number|null} arg1 Top value or Box.
         * @param {number=} opt_arg2 Right value.
         * @param {number=} opt_arg3 Bottom value.
         * @param {number=} opt_arg4 Left value.
         */
        setMargin(arg1: goog.math.Box|number|null, opt_arg2?: number, opt_arg3?: number, opt_arg4?: number): void;
    }
}
