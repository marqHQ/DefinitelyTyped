/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./paletterenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="./selectionmodel.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.Palette' {
    import alias = goog.ui.Palette;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A palette is a grid of DOM nodes that the user can highlight or select via
     * the keyboard or the mouse.  The selection state of the palette is controlled
     * an ACTION event.  Event listeners may retrieve the selected item using the
     * {@link #getSelectedItem} or {@link #getSelectedIndex} method.
     *
     * Use this class as the base for components like color palettes or emoticon
     * pickers.  Use {@link #setContent} to set/change the items in the palette
     * after construction.  See palette.html demo for example usage.
     *
     * @extends {goog.ui.Control}
     */
    class Palette extends __Palette {}
    abstract class __Palette extends goog.ui.__Control {
        /**
         * @param {Array<Node>} items Array of DOM nodes to be displayed as items
         *     in the palette grid (limited to one per cell).
         * @param {goog.ui.PaletteRenderer=} opt_renderer Renderer used to render or
         *     decorate the palette; defaults to {@link goog.ui.PaletteRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(items: Node[], opt_renderer?: goog.ui.PaletteRenderer, opt_domHelper?: goog.dom.DomHelper);

        /**
         * A fake component for dispatching events on palette cell changes.
         * @type {!goog.ui.Palette.CurrentCell_}
         * @private
         */
        private currentCellControl_: any;

        /**
         * @private {number} The last highlighted index, or -1 if it never had one.
         */
        private lastHighlightedIndex_: any /*missing*/;

        /**
         * Palette dimensions (columns x rows).  If the number of rows is undefined,
         * it is calculated on first use.
         * @type {goog.math.Size}
         * @private
         */
        private size_: goog.math.Size;

        /**
         * Index of the currently highlighted item (-1 if none).
         * @type {number}
         * @private
         */
        private highlightedIndex_: number;

        /**
         * Selection model controlling the palette's selection state.
         * @type {goog.ui.SelectionModel}
         * @private
         */
        private selectionModel_: goog.ui.SelectionModel;

        /**
         * Determines whether to select the highlighted item while handling an internal
         * action. The highlighted item should not be selected if the action is a mouse
         * event occurring outside the palette or in an "empty" cell.
         * @param {!goog.events.Event} e Mouseup or key event being handled.
         * @return {boolean} True if the highlighted item should be selected.
         * @private
         */
        private shouldSelectHighlightedItem_(e: goog.events.Event): boolean;

        /**
         * Handles selection change events dispatched by the selection model.
         * @param {goog.events.Event} e Selection event to handle.
         */
        handleSelectionChange(e: goog.events.Event): void;

        /**
         * Returns the size of the palette grid.
         * @return {goog.math.Size} Palette size (columns x rows).
         */
        getSize(): goog.math.Size;

        /**
         * Sets the size of the palette grid to the given size.  Callers can either
         * pass a single {@link goog.math.Size} or a pair of numbers (first the number
         * of columns, then the number of rows) to this method.  In both cases, the
         * number of rows is optional and will be calculated automatically if needed.
         * It is an error to attempt to change the size of the palette after it has
         * been rendered.
         * @param {goog.math.Size|number} size Either a size object or the number of
         *     columns.
         * @param {number=} opt_rows The number of rows (optional).
         */
        setSize(size: goog.math.Size|number, opt_rows?: number): void;

        /**
         * Returns the 0-based index of the currently highlighted palette item, or -1
         * if no item is highlighted.
         * @return {number} Index of the highlighted item (-1 if none).
         */
        getHighlightedIndex(): number;

        /**
         * Returns the currently highlighted palette item, or null if no item is
         * highlighted.
         * @return {Node} The highlighted item (undefined if none).
         */
        getHighlightedItem(): Node;

        /**
         * @return {Element} The highlighted cell.
         * @private
         */
        private getHighlightedCellElement_(): Element;

        /**
         * Highlights the item at the given 0-based index, or removes the highlight
         * if the argument is -1 or out of range.  Any previously-highlighted item
         * will be un-highlighted.
         * @param {number} index 0-based index of the item to highlight.
         */
        setHighlightedIndex(index: number): void;

        /**
         * Highlights the given item, or removes the highlight if the argument is null
         * or invalid.  Any previously-highlighted item will be un-highlighted.
         * @param {Node|undefined} item Item to highlight.
         */
        setHighlightedItem(item: Node|undefined): void;

        /**
         * Returns the 0-based index of the currently selected palette item, or -1
         * if no item is selected.
         * @return {number} Index of the selected item (-1 if none).
         */
        getSelectedIndex(): number;

        /**
         * Returns the currently selected palette item, or null if no item is selected.
         * @return {Node} The selected item (null if none).
         */
        getSelectedItem(): Node;

        /**
         * Selects the item at the given 0-based index, or clears the selection
         * if the argument is -1 or out of range.  Any previously-selected item
         * will be deselected.
         * @param {number} index 0-based index of the item to select.
         */
        setSelectedIndex(index: number): void;

        /**
         * Selects the given item, or clears the selection if the argument is null or
         * invalid.  Any previously-selected item will be deselected.
         * @param {Node} item Item to select.
         */
        setSelectedItem(item: Node): void;

        /**
         * Private helper; highlights or un-highlights the item at the given index
         * based on the value of the Boolean argument.  This implementation simply
         * applies highlight styling to the cell containing the item to be highighted.
         * Does nothing if the palette hasn't been rendered yet.
         * @param {number} index 0-based index of item to highlight or un-highlight.
         * @param {boolean} highlight If true, the item is highlighted; otherwise it
         *     is un-highlighted.
         * @private
         */
        private highlightIndex_(index: number, highlight: boolean): void;

        /**
         * Private helper; selects or deselects the given item based on the value of
         * the Boolean argument.  This implementation simply applies selection styling
         * to the cell containing the item to be selected.  Does nothing if the palette
         * hasn't been rendered yet.
         * @param {Node} item Item to select or deselect.
         * @param {boolean} select If true, the item is selected; otherwise it is
         *     deselected.
         * @private
         */
        private selectItem_(item: Node, select: boolean): void;

        /**
         * Calculates and updates the size of the palette based on any preset values
         * and the number of palette items.  If there is no preset size, sets the
         * palette size to the smallest square big enough to contain all items.  If
         * there is a preset number of columns, increases the number of rows to hold
         * all items if needed.  (If there are too many rows, does nothing.)
         * @private
         */
        private adjustSize_(): void;
    }
}

declare namespace goog.ui.Palette {
    /**
     * A component to represent the currently highlighted cell.
     * @extends {goog.ui.Control}
     * @private
     */
    class CurrentCell_ extends __CurrentCell_ {}
    abstract class __CurrentCell_ extends goog.ui.__Control {
        /**
         */
        constructor();

        /**
         * @param {boolean} highlight Whether to highlight or unhighlight the component.
         * @return {boolean} Whether it was successful.
         */
        tryHighlight(highlight: boolean): boolean;
    }

    /**
     * Events fired by the palette object
     * @enum {string}
     */
    enum EventType { AFTER_HIGHLIGHT }
}
