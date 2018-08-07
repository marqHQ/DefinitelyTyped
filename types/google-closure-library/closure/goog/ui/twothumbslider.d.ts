/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sliderbase.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.TwoThumbSlider' {
    import alias = goog.ui.TwoThumbSlider;
    export default alias;
}

declare namespace goog.ui {
    /**
     * This creates a TwoThumbSlider object.
     * @extends {goog.ui.SliderBase}
     */
    class TwoThumbSlider extends __TwoThumbSlider {}
    abstract class __TwoThumbSlider extends goog.ui.__SliderBase {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * This creates a thumb element with the specified CSS class name.
         * @param {string} cs  CSS class name of the thumb to be created.
         * @return {!HTMLDivElement} The created thumb element.
         * @private
         */
        private createThumb_(cs: string): HTMLDivElement;
    }
}

declare namespace goog.ui.TwoThumbSlider {
    /**
     * The prefix we use for the CSS class names for the slider and its elements.
     * @type {string}
     */
    let CSS_CLASS_PREFIX: string;

    /**
     * CSS class name for the value thumb element.
     * @type {string}
     */
    let VALUE_THUMB_CSS_CLASS: string;

    /**
     * CSS class name for the extent thumb element.
     * @type {string}
     */
    let EXTENT_THUMB_CSS_CLASS: string;

    /**
     * CSS class name for the range highlight element.
     * @type {string}
     */
    let RANGE_HIGHLIGHT_CSS_CLASS: string;
}
