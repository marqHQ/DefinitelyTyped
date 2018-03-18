/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./palette.d.ts"/>
/// <reference path="./palettemanager.d.ts"/>

declare namespace goog.ui.equation {
    class MenuPalette extends __MenuPalette {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __MenuPalette extends goog.ui.equation.__Palette {
        /**
         * Constructs a new menu palette.
         * @param {goog.ui.equation.PaletteManager} paletteManager The
         *     manager of the palette.
         * @extends {goog.ui.equation.Palette}
         * @constructor
         * @final
         */
        constructor(paletteManager: goog.ui.equation.PaletteManager);
    }

    class MenuPaletteRenderer extends __MenuPaletteRenderer {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __MenuPaletteRenderer extends goog.ui.equation.__PaletteRenderer {
        /**
         * The renderer for menu palette.
         * @extends {goog.ui.equation.PaletteRenderer}
         * @constructor
         * @final
         */
        constructor();
    }
}

declare namespace goog.ui.equation.MenuPalette {
    /**
     * The CSS class name for the palette.
     * @type {string}
     */
    let CSS_CLASS: string;
}
