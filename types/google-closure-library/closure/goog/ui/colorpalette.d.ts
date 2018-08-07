/// <reference path="../../../globals.d.ts"/>
/// <reference path="./palette.d.ts"/>
/// <reference path="./paletterenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ColorPalette' {
    import alias = goog.ui.ColorPalette;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A color palette is a grid of color swatches that the user can highlight or
     * select via the keyboard or the mouse.  The selection state of the palette is
     * controlled by a selection model.  When the user makes a selection, the
     * component fires an ACTION event.  Event listeners may retrieve the selected
     * color using the {@link #getSelectedColor} method.
     *
     * @extends {goog.ui.Palette}
     */
    class ColorPalette extends __ColorPalette {}
    abstract class __ColorPalette extends goog.ui.__Palette {
        /**
         * @param {Array<string>=} opt_colors Array of colors in any valid CSS color
         *     format.
         * @param {goog.ui.PaletteRenderer=} opt_renderer Renderer used to render or
         *     decorate the palette; defaults to {@link goog.ui.PaletteRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(opt_colors?: string[], opt_renderer?: goog.ui.PaletteRenderer, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Array of colors to show in the palette.
         * @type {Array<string>}
         * @private
         */
        private colors_: string[];

        /**
         * Array of normalized colors. Initialized lazily as often never needed.
         * @type {?Array<string>}
         * @private
         */
        private normalizedColors_: string[]|null;

        /**
         * Array of labels for the colors. Will be used for the tooltips and
         * accessibility.
         * @type {?Array<string>}
         * @private
         */
        private labels_: string[]|null;

        /**
         * Returns the array of colors represented in the color palette.
         * @return {Array<string>} Array of colors.
         */
        getColors(): string[];

        /**
         * Sets the colors that are contained in the palette.
         * @param {Array<string>} colors Array of colors in any valid CSS color format.
         * @param {Array<string>=} opt_labels The array of labels to be used as
         *        tooltips. When not provided, the color value will be used.
         */
        setColors(colors: string[], opt_labels?: string[]): void;

        /**
         * @return {?string} The current selected color in hex, or null.
         */
        getSelectedColor(): string|null;

        /**
         * Sets the selected color.  Clears the selection if the argument is null or
         * can't be parsed as a color.
         * @param {?string} color The color to set as selected; null clears the
         *     selection.
         */
        setSelectedColor(color: string|null): void;

        /**
         * @return {!Array<!Node>} An array of DOM nodes for each color.
         * @protected
         */
        protected createColorNodes(): Node[];
    }
}

declare namespace goog.ui.ColorPalette {
}
