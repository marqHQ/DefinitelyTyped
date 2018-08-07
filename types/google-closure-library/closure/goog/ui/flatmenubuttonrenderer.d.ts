/// <reference path="../../../globals.d.ts"/>
/// <reference path="./flatbuttonrenderer.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.FlatMenuButtonRenderer' {
    import alias = goog.ui.FlatMenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Flat Menu Button renderer. Creates a simpler version of
     * {@link goog.ui.MenuButton} that doesn't look like a button and
     * doesn't have rounded corners. Uses just a `<div>` and looks more like
     * a traditional `<select>` element.
     * @extends {goog.ui.FlatButtonRenderer}
     */
    class FlatMenuButtonRenderer extends __FlatMenuButtonRenderer {}
    abstract class __FlatMenuButtonRenderer extends goog.ui.__FlatButtonRenderer {
        /**
         */
        constructor();

        /**
         * Takes a text caption or existing DOM structure, and returns it wrapped in
         * an appropriately-styled DIV.  Creates the following DOM structure:
         *
         *    <div class="goog-inline-block goog-flat-menu-button-caption">
         *      Contents...
         *    </div>
         *
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to wrap
         *     in a box.
         * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
         * @return {Element} Caption element.
         */
        createCaption(content: goog.ui.ControlContent, dom: goog.dom.DomHelper): Element;

        /**
         * Returns an appropriately-styled DIV containing a dropdown arrow element.
         * Creates the following DOM structure:
         *
         *    <div class="goog-inline-block goog-flat-menu-button-dropdown">
         *      &nbsp;
         *    </div>
         *
         * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
         * @return {!Element} Dropdown element.
         */
        createDropdown(dom: goog.dom.DomHelper): Element;
    }
}

declare namespace goog.ui.FlatMenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
