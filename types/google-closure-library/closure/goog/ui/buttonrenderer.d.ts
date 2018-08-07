/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="./button.d.ts"/>

declare module 'goog:goog.ui.ButtonRenderer' {
    import alias = goog.ui.ButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.Button}s.  Extends the superclass with
     * the following button-specific API methods:
     * <ul>
     *   <li>`getValue` - returns the button element's value
     *   <li>`setValue` - updates the button element to reflect its new value
     *   <li>`getTooltip` - returns the button element's tooltip text
     *   <li>`setTooltip` - updates the button element's tooltip text
     *   <li>`setCollapsed` - removes one or both of the button element's
     *       borders
     * </ul>
     * For alternate renderers, see {@link goog.ui.NativeButtonRenderer},
     * {@link goog.ui.CustomButtonRenderer}, and {@link goog.ui.FlatButtonRenderer}.
     * @extends {goog.ui.ControlRenderer}
     */
    class ButtonRenderer extends __ButtonRenderer {}
    abstract class __ButtonRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /**
         * Takes a button's root element, and returns the value associated with it.
         * No-op in the base class.
         * @param {Element} element The button's root element.
         * @return {string|undefined} The button's value (undefined if none).
         */
        getValue(element: Element): string|undefined;

        /**
         * Takes a button's root element and a value, and updates the element to reflect
         * the new value.  No-op in the base class.
         * @param {Element} element The button's root element.
         * @param {string} value New value.
         */
        setValue(element: Element, value: string): void;

        /**
         * Takes a button's root element, and returns its tooltip text.
         * @param {Element} element The button's root element.
         * @return {string|undefined} The tooltip text.
         */
        getTooltip(element: Element): string|undefined;

        /**
         * Takes a button's root element and a tooltip string, and updates the element
         * with the new tooltip.
         * @param {Element} element The button's root element.
         * @param {string} tooltip New tooltip text.
         * @protected
         */
        protected setTooltip(element: Element, tooltip: string): void;

        /**
         * Collapses the border on one or both sides of the button, allowing it to be
         * combined with the adjacent button(s), forming a single UI componenet with
         * multiple targets.
         * @param {goog.ui.Button} button Button to update.
         * @param {number} sides Bitmap of one or more {@link goog.ui.ButtonSide}s for
         *     which borders should be collapsed.
         * @protected
         */
        protected setCollapsed(button: goog.ui.Button, sides: number): void;
    }
}

declare namespace goog.ui.ButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
