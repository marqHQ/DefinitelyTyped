/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./palette.d.ts"/>
/// <reference path="./palettemanager.d.ts"/>

declare namespace goog.ui.equation {
    class ComparisonPalette extends __ComparisonPalette {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __ComparisonPalette extends goog.ui.equation.__Palette {
        /**
         * Constructs a new comparison palette.
         * @param {goog.ui.equation.PaletteManager} paletteManager The
         *     manager of the palette.
         * @extends {goog.ui.equation.Palette}
         * @constructor
         * @final
         */
        constructor(paletteManager: goog.ui.equation.PaletteManager);
    }
}
