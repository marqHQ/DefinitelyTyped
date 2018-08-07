/// <reference path="../../../globals.d.ts"/>
/// <reference path="./tabrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./tabbar.d.ts"/>

declare module 'goog:goog.ui.RoundedTabRenderer' {
    import alias = goog.ui.RoundedTabRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Rounded corner tab renderer for {@link goog.ui.Tab}s.
     * @extends {goog.ui.TabRenderer}
     * @final
     */
    class RoundedTabRenderer extends __RoundedTabRenderer {}
    abstract class __RoundedTabRenderer extends goog.ui.__TabRenderer {
        /**
         */
        constructor();

        /**
         * Creates a table implementing a rounded corner tab.
         * @param {goog.dom.DomHelper} dom DOM helper to use for element construction.
         * @param {goog.ui.ControlContent} caption Text caption or DOM structure
         *     to display as the tab's caption.
         * @param {goog.ui.TabBar.Location} location Tab bar location relative to the
         *     tab contents.
         * @return {!Element} Table implementing a rounded corner tab.
         * @protected
         */
        protected createTab(
            dom: goog.dom.DomHelper, caption: goog.ui.ControlContent, location: goog.ui.TabBar.Location
        ): Element;

        /**
         * Creates a table row implementing the tab caption.
         * @param {goog.dom.DomHelper} dom DOM helper to use for element construction.
         * @param {goog.ui.ControlContent} caption Text caption or DOM structure
         *     to display as the tab's caption.
         * @return {!Element} Tab caption table row.
         * @protected
         */
        protected createCaption(dom: goog.dom.DomHelper, caption: goog.ui.ControlContent): Element;

        /**
         * Creates a table row implementing a rounded tab edge.
         * @param {goog.dom.DomHelper} dom DOM helper to use for element construction.
         * @param {boolean} isTopEdge Whether to create a top or bottom edge.
         * @return {!Element} Rounded tab edge table row.
         * @protected
         */
        protected createEdge(dom: goog.dom.DomHelper, isTopEdge: boolean): Element;
    }
}

declare namespace goog.ui.RoundedTabRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
