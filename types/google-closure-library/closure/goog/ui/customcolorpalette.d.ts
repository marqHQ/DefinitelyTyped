/// <reference path="../../../globals.d.ts"/>
/// <reference path="./colorpalette.d.ts"/>
/// <reference path="./paletterenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.CustomColorPalette' {
    import alias = goog.ui.CustomColorPalette;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A custom color palette is a grid of color swatches and a button that allows
     * the user to add additional colors to the palette
     *
     * @extends {goog.ui.ColorPalette}
     * @final
     */
    class CustomColorPalette extends __CustomColorPalette {}
    abstract class __CustomColorPalette extends goog.ui.__ColorPalette {
        /**
         * @param {Array<string>} initColors Array of initial colors to populate the
         *     palette with.
         * @param {goog.ui.PaletteRenderer=} opt_renderer Renderer used to render or
         *     decorate the palette; defaults to {@link goog.ui.PaletteRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(initColors: string[], opt_renderer?: goog.ui.PaletteRenderer, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Prompts the user to enter a custom color.  Currently uses a window.prompt
         * but could be updated to use a dialog box with a WheelColorPalette.
         */
        promptForCustomColor(): void;
    }
}
