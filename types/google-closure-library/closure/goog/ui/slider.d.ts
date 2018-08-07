/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sliderbase.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.Slider' {
    import alias = goog.ui.Slider;
    export default alias;
}

declare module 'goog:goog.ui.Slider.Orientation' {
    import alias = goog.ui.Slider.Orientation;
    export default alias;
}

declare namespace goog.ui {
    /**
     * This creates a slider object.
     * @extends {goog.ui.SliderBase}
     */
    class Slider extends __Slider {}
    abstract class __Slider extends goog.ui.__SliderBase {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {(function(number):?string)=} opt_labelFn An optional function mapping
         *     slider values to a description of the value.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_labelFn?: ((_0: number) => string | null));

        /**
         * Returns CSS class applied to the slider's thumb element.
         * @return {string} The CSS class applied to the slider's thumb element.
         * @protected
         */
        protected getThumbCssClass(): string;

        /**
         * Creates the thumb element.
         * @return {!HTMLDivElement} The created thumb element.
         * @private
         */
        private createThumb_(): HTMLDivElement;
    }
}

declare namespace goog.ui.Slider {
    /**
     * Expose Enum of superclass (representing the orientation of the slider) within
     * Slider namespace.
     *
     * @enum {string}
     */
    enum Orientation { VERTICAL, HORIZONTAL }

    /**
     * The prefix we use for the CSS class names for the slider and its elements.
     * @type {string}
     */
    let CSS_CLASS_PREFIX: string;

    /**
     * CSS class name for the single thumb element.
     * @type {string}
     */
    let THUMB_CSS_CLASS: string;
}
