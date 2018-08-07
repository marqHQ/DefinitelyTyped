/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./control.d.ts"/>

declare module 'goog:goog.ui.MenuItemRenderer' {
    import alias = goog.ui.MenuItemRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.MenuItem}s.  Each item has the following
     * structure:
     *
     *    <div class="goog-menuitem">
     *      <div class="goog-menuitem-content">
     *        ...(menu item contents)...
     *      </div>
     *    </div>
     *
     * @extends {goog.ui.ControlRenderer}
     */
    class MenuItemRenderer extends __MenuItemRenderer {}
    abstract class __MenuItemRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /**
         * Commonly used CSS class names, cached here for convenience (and to avoid
         * unnecessary string concatenation).
         * @type {!Array<string>}
         * @private
         */
        private classNameCache_: string[];

        /**
         * Returns the composite CSS class by using the cached value or by constructing
         * the value from the base CSS class and the passed index.
         * @param {goog.ui.MenuItemRenderer.CompositeCssClassIndex_} index Index for the
         *     CSS class - could be highlight, checkbox or content in usual cases.
         * @return {string} The composite CSS class.
         * @private
         */
        private getCompositeCssClass_(index: any): string;

        /**
         * Returns true if the element appears to have a proper menu item structure by
         * checking whether its first child has the appropriate structural class name.
         * @param {Element} element Element to check.
         * @return {boolean} Whether the element appears to have a proper menu item DOM.
         * @protected
         */
        protected hasContentStructure(element: Element): boolean;

        /**
         * Wraps the given text caption or existing DOM node(s) in a structural element
         * containing the menu item's contents.
         * @param {goog.ui.ControlContent} content Menu item contents.
         * @param {goog.dom.DomHelper} dom DOM helper for document interaction.
         * @return {Element} Menu item content element.
         * @protected
         */
        protected createContent(content: goog.ui.ControlContent, dom: goog.dom.DomHelper): Element;

        /**
         * Enables/disables radio button semantics on the menu item.
         * @param {goog.ui.Control} item Menu item to update.
         * @param {Element} element Menu item element to update (may be null if the
         *     item hasn't been rendered yet).
         * @param {boolean} selectable Whether the item should be selectable.
         */
        setSelectable(item: goog.ui.Control, element: Element, selectable: boolean): void;

        /**
         * Enables/disables checkbox semantics on the menu item.
         * @param {goog.ui.Control} item Menu item to update.
         * @param {Element} element Menu item element to update (may be null if the
         *     item hasn't been rendered yet).
         * @param {boolean} checkable Whether the item should be checkable.
         */
        setCheckable(item: goog.ui.Control, element: Element, checkable: boolean): void;

        /**
         * Determines whether the item contains a checkbox element.
         * @param {Element} element Menu item root element.
         * @return {boolean} Whether the element contains a checkbox element.
         * @protected
         */
        protected hasCheckBoxStructure(element: Element): boolean;

        /**
         * Adds or removes extra markup and CSS styling to the menu item to make it
         * selectable or non-selectable, depending on the value of the
         * `selectable` argument.
         * @param {!goog.ui.Control} item Menu item to update.
         * @param {!Element} element Menu item element to update.
         * @param {boolean} enable Whether to add or remove the checkbox structure.
         * @protected
         */
        protected setEnableCheckBoxStructure(item: goog.ui.Control, element: Element, enable: boolean): void;
    }
}

declare namespace goog.ui.MenuItemRenderer {
    /**
     * CSS class name the renderer applies to menu item elements.
     * @type {string}
     */
    let CSS_CLASS: string;
}
