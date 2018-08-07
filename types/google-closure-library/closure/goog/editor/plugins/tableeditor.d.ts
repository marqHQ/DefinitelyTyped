/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>
/// <reference path="../table.d.ts"/>

declare module 'goog:goog.editor.plugins.TableEditor' {
    import alias = goog.editor.plugins.TableEditor;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin that adds support for table creation and editing commands.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class TableEditor extends __TableEditor {}
    abstract class __TableEditor extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * The array of functions that decide whether a table element could be
         * editable by the user or not.
         * @type {Array<function(Element):boolean>}
         * @private
         */
        private isTableEditableFunctions_: (_0: Element) => boolean[];

        /**
         * The pre-bound function that decides whether a table element could be
         * editable by the user or not overall.
         * @type {function(Node):boolean}
         * @private
         */
        private isUserEditableTableBound_: (_0: Node) => boolean;

        /**
         * Returns the currently selected table.
         * @return {Element?} The table in which the current selection is
         *     contained, or null if there isn't such a table.
         * @private
         */
        private getCurrentTable_(): Element|null;

        /**
         * Finds the first user-editable table element in the input node's ancestors.
         * @param {Node?} node The node to start with.
         * @return {Element?} The table element that is closest ancestor of the node.
         * @private
         */
        private getAncestorTable_(node: Node|null): Element|null;

        /**
         * Checks whether the element is a table editable by the user.
         * @param {Node} element The element in question.
         * @return {boolean} Whether the element is a table editable by the user.
         * @private
         */
        private isUserEditableTable_(element: Node): boolean;

        /**
         * Adds a function to filter out non-user-editable tables.
         * @param {function(Element):boolean} func A function to decide whether the
         *   table element could be editable by the user or not.
         */
        addIsTableEditableFunction(func: (_0: Element) => boolean): void;
    }
}

declare namespace goog.editor.plugins.TableEditor {
    /**
     * Class representing the selected cell objects within a single  table.
     * @private
     */
    class CellSelection_ extends __CellSelection_ {}
    abstract class __CellSelection_ {
        /**
         * @param {goog.dom.AbstractRange} range Selected range from which to calculate
         *     selected cells.
         * @param {function(Element):Element?} getParentTableFunction A function that
         *     finds the user-editable table from a given element.
         */
        constructor(range: goog.dom.AbstractRange, getParentTableFunction: (_0: Element) => Element | null);

        /**
         * Returns the EditableTable object of which this selection's cells are a
         * subset.
         * @return {!goog.editor.Table} the table.
         */
        getTable(): goog.editor.Table;

        /**
         * Returns the row index of the uppermost cell in this selection.
         * @return {number} The row index.
         */
        getFirstRowIndex(): number;

        /**
         * Returns the row index of the lowermost cell in this selection.
         * @return {number} The row index.
         */
        getLastRowIndex(): number;

        /**
         * Returns the column index of the farthest left cell in this selection.
         * @return {number} The column index.
         */
        getFirstColumnIndex(): number;

        /**
         * Returns the column index of the farthest right cell in this selection.
         * @return {number} The column index.
         */
        getLastColumnIndex(): number;

        /**
         * Returns the cells in this selection.
         * @return {!Array<Element>} Cells in this selection.
         */
        getCells(): Element[];

        /**
         * Returns a boolean value indicating whether or not the cells in this
         * selection form a rectangle.
         * @return {boolean} Whether the selection forms a rectangle.
         */
        isRectangle(): boolean;

        /**
         * Returns a boolean value indicating whether or not there is exactly
         * one cell in this selection. Note that this may not be the same as checking
         * whether getCells().length == 1; if there is a single cell with
         * rowSpan/colSpan set it will appear multiple times.
         * @return {boolean} Whether there is exatly one cell in this selection.
         */
        containsSingleCell(): boolean;
    }

    /**
     * Commands supported by goog.editor.plugins.TableEditor.
     * @enum {string}
     */
    enum COMMAND {
        TABLE,
        INSERT_ROW_AFTER,
        INSERT_ROW_BEFORE,
        INSERT_COLUMN_AFTER,
        INSERT_COLUMN_BEFORE,
        REMOVE_ROWS,
        REMOVE_COLUMNS,
        SPLIT_CELL,
        MERGE_CELLS,
        REMOVE_TABLE
    }
}
