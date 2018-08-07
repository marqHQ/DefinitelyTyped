/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="../../controlcontent.d.ts"/>
/// <reference path="../../../dom/dom.d.ts"/>

declare module 'goog:goog.ui.style.app.MenuButtonRenderer' {
    import alias = goog.ui.style.app.MenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui.style.app {
    /**
     * Renderer for {@link goog.ui.style.app.MenuButton}s.  This implementation
     * overrides {@link goog.ui.style.app.ButtonRenderer#createButton} to insert a
     * dropdown element into the content element after the specified content.
     * @extends {goog.ui.style.app.ButtonRenderer}
     * @final
     */
    class MenuButtonRenderer extends __MenuButtonRenderer {}
    abstract class __MenuButtonRenderer extends goog.ui.style.app.__ButtonRenderer {
        /**
         */
        constructor();

        /**
         * Inserts dropdown element as last child of existing content.
         * @param {goog.ui.ControlContent} content Text caption or DOM structure.
         * @param {goog.dom.DomHelper} dom DOM helper, used for document ineraction.
         * @return {Array<Node>} DOM structure to be set as the button's content.
         */
        createContentWithDropdown(content: goog.ui.ControlContent, dom: goog.dom.DomHelper): Node[];

        /**
         * Returns an appropriately-styled DIV containing a dropdown arrow.
         * Creates the following DOM structure:
         *
         *    <div class="goog-menu-button-dropdown"> </div>
         *
         * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
         * @return {Element} Dropdown element.
         */
        createDropdown(dom: goog.dom.DomHelper): Element;
    }
}

declare namespace goog.ui.style.app.MenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * Array of arrays of CSS classes that we want composite classes added and
     * removed for in IE6 and lower as a workaround for lack of multi-class CSS
     * selector support.
     * @type {Array<Array<string>>}
     */
    let IE6_CLASS_COMBINATIONS: string[][];
}
