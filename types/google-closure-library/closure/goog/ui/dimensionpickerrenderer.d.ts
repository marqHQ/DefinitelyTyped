/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="./dimensionpicker.d.ts"/>

declare module 'goog:goog.ui.DimensionPickerRenderer' {
    import alias = goog.ui.DimensionPickerRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.DimensionPicker}s.  Renders the
     * palette as two divs, one with the un-highlighted background, and one with the
     * highlighted background.
     *
     * @extends {goog.ui.ControlRenderer}
     */
    class DimensionPickerRenderer extends __DimensionPickerRenderer {}
    abstract class __DimensionPickerRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /** @private {goog.a11y.aria.Announcer} */
        private announcer_: any /*missing*/;

        /**
         * Return the underlying div for the given outer element.
         * @param {Element} element The root element.
         * @return {Element} The underlying div.
         * @private
         */
        private getUnderlyingDiv_(element: Element): Element;

        /**
         * Return the highlight div for the given outer element.
         * @param {Element} element The root element.
         * @return {Element} The highlight div.
         * @private
         */
        private getHighlightDiv_(element: Element): Element;

        /**
         * Return the status message div for the given outer element.
         * @param {Element} element The root element.
         * @return {Element} The status message div.
         * @private
         */
        private getStatusDiv_(element: Element): Element;

        /**
         * Return the invisible mouse catching div for the given outer element.
         * @param {Element} element The root element.
         * @return {Element} The invisible mouse catching div.
         * @private
         */
        private getMouseCatcher_(element: Element): Element;

        /**
         * Scales various elements in order to update the palette's size.
         * @param {goog.ui.DimensionPicker} palette The palette object.
         * @param {Element} element The element to set the style of.
         */
        updateSize(palette: goog.ui.DimensionPicker, element: Element): void;

        /**
         * Adds the appropriate content elements to the given outer DIV.
         * @param {goog.ui.DimensionPicker} palette The palette object.
         * @param {Element} element The element to decorate.
         * @private
         */
        private addElementContents_(palette: goog.ui.DimensionPicker, element: Element): void;

        /**
         * Get the element to listen for mouse move events on.
         * @param {goog.ui.DimensionPicker} palette The palette to listen on.
         * @return {Element} The element to listen for mouse move events on.
         */
        getMouseMoveElement(palette: goog.ui.DimensionPicker): Element;

        /**
         * Returns the x offset in to the grid for the given mouse x position.
         * @param {goog.ui.DimensionPicker} palette The table size palette.
         * @param {number} x The mouse event x position.
         * @return {number} The x offset in to the grid.
         */
        getGridOffsetX(palette: goog.ui.DimensionPicker, x: number): number;

        /**
         * Returns the y offset in to the grid for the given mouse y position.
         * @param {goog.ui.DimensionPicker} palette The table size palette.
         * @param {number} y The mouse event y position.
         * @return {number} The y offset in to the grid.
         */
        getGridOffsetY(palette: goog.ui.DimensionPicker, y: number): number;

        /**
         * Sets the highlighted size. Does nothing if the palette hasn't been rendered.
         * @param {goog.ui.DimensionPicker} palette The table size palette.
         * @param {number} columns The number of columns to highlight.
         * @param {number} rows The number of rows to highlight.
         */
        setHighlightedSize(palette: goog.ui.DimensionPicker, columns: number, rows: number): void;

        /**
         * Position the mouse catcher such that it receives mouse events past the
         * selectedsize up to the maximum size.  Takes care to not introduce scrollbars.
         * Should be called on enter document and when the window changes size.
         * @param {goog.ui.DimensionPicker} palette The table size palette.
         */
        positionMouseCatcher(palette: goog.ui.DimensionPicker): void;

        /**
         * This function adjusts the positioning from 'left' and 'top' to 'right' and
         * 'top' as appropriate for RTL control.  This is so when the dimensionpicker
         * grow in width, the containing element grow to the left instead of right.
         * This won't be necessary if goog.ui.SubMenu rendering code would position RTL
         * control with 'right' and 'top'.
         * @private
         *
         * @param {goog.ui.DimensionPicker} palette The palette object.
         * @param {Element} element The palette's element.
         */
        private adjustParentDirection_(palette: goog.ui.DimensionPicker, element: Element): void;
    }
}

declare namespace goog.ui.DimensionPickerRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
