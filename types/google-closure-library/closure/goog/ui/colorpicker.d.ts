/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./colorpalette.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ColorPicker' {
    import alias = goog.ui.ColorPicker;
    export default alias;
}

declare module 'goog:goog.ui.ColorPicker.EventType' {
    import alias = goog.ui.ColorPicker.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Create a new, empty color picker.
     *
     * @extends {goog.ui.Component}
     * @final
     */
    class ColorPicker extends __ColorPicker {}
    abstract class __ColorPicker extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {goog.ui.ColorPalette=} opt_colorPalette Optional color palette to
         *     use for this color picker.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_colorPalette?: goog.ui.ColorPalette);

        /**
         * The color palette used inside the color picker.
         * @type {goog.ui.ColorPalette?}
         * @private
         */
        private colorPalette_: goog.ui.ColorPalette|null;

        /**
         * Whether the component is focusable.
         * @type {boolean}
         * @private
         */
        private focusable_: boolean;

        /**
         * Gets the array of colors displayed by the color picker.
         * Modifying this array will lead to unexpected behavior.
         * @return {Array<string>?} The colors displayed by this widget.
         */
        getColors(): string[]|null;

        /**
         * Sets the array of colors to be displayed by the color picker.
         * @param {Array<string>} colors The array of colors to be added.
         */
        setColors(colors: string[]): void;

        /**
         * Sets the array of colors to be displayed by the color picker.
         * @param {Array<string>} colors The array of colors to be added.
         * @deprecated Use setColors.
         */
        addColors(colors: string[]): void;

        /**
         * Sets the size of the palette.  Will throw an error after the picker has been
         * rendered.
         * @param {goog.math.Size|number} size The size of the grid.
         */
        setSize(size: goog.math.Size|number): void;

        /**
         * Gets the number of columns displayed.
         * @return {goog.math.Size?} The size of the grid.
         */
        getSize(): goog.math.Size|null;

        /**
         * Sets the number of columns.  Will throw an error after the picker has been
         * rendered.
         * @param {number} n The number of columns.
         * @deprecated Use setSize.
         */
        setColumnCount(n: number): void;

        /**
         * @return {number} The index of the color selected.
         */
        getSelectedIndex(): number;

        /**
         * Sets which color is selected. A value that is out-of-range means that no
         * color is selected.
         * @param {number} ind The index in this.colors_ of the selected color.
         */
        setSelectedIndex(ind: number): void;

        /**
         * Gets the color that is currently selected in this color picker.
         * @return {?string} The hex string of the color selected, or null if no
         *     color is selected.
         */
        getSelectedColor(): string|null;

        /**
         * Sets which color is selected.  Noop if the color palette hasn't been created
         * yet.
         * @param {string} color The selected color.
         */
        setSelectedColor(color: string): void;

        /**
         * Returns true if the component is focusable, false otherwise.  The default
         * is true.  Focusable components always have a tab index and allocate a key
         * handler to handle keyboard events while focused.
         * @return {boolean} True iff the component is focusable.
         */
        isFocusable(): boolean;

        /**
         * Sets whether the component is focusable.  The default is true.
         * Focusable components always have a tab index and allocate a key handler to
         * handle keyboard events while focused.
         * @param {boolean} focusable True iff the component is focusable.
         */
        setFocusable(focusable: boolean): void;

        /**
         * Sets the focus to the color picker's palette.
         */
        focus(): void;

        /**
         * Handles actions from the color palette.
         *
         * @param {goog.events.Event} e The event.
         * @private
         */
        private onColorPaletteAction_(e: goog.events.Event): void;

        /**
         * Create a color palette for the color picker.
         * @param {Array<string>} colors Array of colors.
         * @private
         */
        private createColorPalette_(colors: string[]): void;
    }
}

declare namespace goog.ui.ColorPicker {
    /**
     * Default number of columns in the color palette. May be overridden by calling
     * setSize.
     *
     * @type {number}
     */
    let DEFAULT_NUM_COLS: number;

    /**
     * Constants for event names.
     * @enum {string}
     */
    enum EventType { CHANGE }

    /**
     * Returns an unrendered instance of the color picker.  The colors and layout
     * are a simple color grid, the same as the old Gmail color picker.
     * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
     * @return {!goog.ui.ColorPicker} The unrendered instance.
     */
    function createSimpleColorGrid(opt_domHelper?: goog.dom.DomHelper): goog.ui.ColorPicker;

    /**
     * Array of colors for a 7-cell wide simple-grid color picker.
     * @type {Array<string>}
     */
    let SIMPLE_GRID_COLORS: string[];
}
