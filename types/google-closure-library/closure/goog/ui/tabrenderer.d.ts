/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>

declare module 'goog:goog.ui.TabRenderer' {
    import alias = goog.ui.TabRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.Tab}s, based on the `TabPane` code.
     * @extends {goog.ui.ControlRenderer}
     */
    class TabRenderer extends __TabRenderer {}
    abstract class __TabRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /**
         * Takes a tab's root element, and returns its tooltip text, or the empty
         * string if the element has no tooltip.
         * @param {Element} element The tab's root element.
         * @return {string} The tooltip text (empty string if none).
         */
        getTooltip(element: Element): string;

        /**
         * Takes a tab's root element and a tooltip string, and updates the element
         * with the new tooltip.  If the new tooltip is null or undefined, sets the
         * element's title to the empty string.
         * @param {Element} element The tab's root element.
         * @param {string|null|undefined} tooltip New tooltip text (if any).
         */
        setTooltip(element: Element, tooltip: string|null|undefined): void;
    }
}

declare namespace goog.ui.TabRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
