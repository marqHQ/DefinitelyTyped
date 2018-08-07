/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hsvpalette.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/rect.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.HsvaPalette' {
    import alias = goog.ui.HsvaPalette;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates an HSVA palette. Allows a user to select the hue, saturation,
     * value/brightness and alpha/opacity.
     * @extends {goog.ui.HsvPalette}
     * @final
     */
    class HsvaPalette extends __HsvaPalette {}
    abstract class __HsvaPalette extends goog.ui.__HsvPalette {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {string=} opt_color Optional initial color, without alpha (default is
         *     red).
         * @param {number=} opt_alpha Optional initial alpha (default is 1).
         * @param {string=} opt_class Optional base for creating classnames (default is
         *     'goog-hsva-palette').
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_color?: string, opt_alpha?: number, opt_class?: string);

        /**
         * Alpha transparency of the currently selected color, in [0, 1]. When
         * undefined, the palette will behave as a non-transparent HSV palette,
         * assuming full opacity.
         * @type {number}
         * @private
         */
        private alpha_: number;

        /**
         * DOM element representing the alpha background image.
         * @type {HTMLElement}
         * @private
         */
        private aImageEl_: HTMLElement;

        /**
         * DOM element representing the alpha handle.
         * @type {HTMLElement}
         * @private
         */
        private aHandleEl_: HTMLElement;

        /**
         * DOM element representing the swatch backdrop image.
         * @type {Element}
         * @private
         */
        private swatchBackdropEl_: Element;

        /**
         * Sets which color is selected and update the UI. The passed color should be
         * in #rrggbb format. The alpha value will be set to 1.
         * @param {number} alpha The selected alpha value, in [0, 1].
         */
        setAlpha(alpha: number): void;

        /**
         * Gets the color that is currently selected in this color picker, in #rrggbbaa
         * format.
         * @return {string} The string of the selected color with alpha.
         */
        getColorRgbaHex(): string;

        /**
         * Sets which color is selected and update the UI. The passed color should be
         * in #rrggbbaa format. The alpha value will be set to 1.
         * @param {string} color The selected color with alpha.
         */
        setColorRgbaHex(color: string): void;

        /**
         * Sets which color and alpha value are selected and update the UI. The passed
         * color should be in #rrggbb format.
         * @param {string} color The selected color in #rrggbb format.
         * @param {number} alpha The selected alpha value, in [0, 1].
         * @private
         */
        private setColorAlphaHelper_(color: string, alpha: number): void;

        /**
         * Handles mousemove events on the document once a drag operation on the alpha
         * slider has started.
         * @param {goog.math.Rect} b Boundaries of the value slider object at the start
         *     of the drag operation.
         * @param {goog.events.Event} e Event object.
         * @private
         */
        private handleMouseMoveA_(b: goog.math.Rect, e: goog.events.Event): void;
    }
}

declare namespace goog.ui.HsvaPalette {
}
