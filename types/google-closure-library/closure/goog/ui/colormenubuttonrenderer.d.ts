/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubuttonrenderer.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ColorMenuButtonRenderer' {
    import alias = goog.ui.ColorMenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for {@link goog.ui.ColorMenuButton}s.
     * @extends {goog.ui.MenuButtonRenderer}
     */
    class ColorMenuButtonRenderer extends __ColorMenuButtonRenderer {}
    abstract class __ColorMenuButtonRenderer extends goog.ui.__MenuButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ColorMenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * Wrap a caption in a div with the color-menu-button-indicator CSS class.
     * @param {goog.ui.ControlContent} content Text caption or DOM structure.
     * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
     * @return {!Element} Caption element.
     */
    function wrapCaption(content: goog.ui.ControlContent, dom: goog.dom.DomHelper): Element;

    /**
     * Takes a control's content element and a value object (which is assumed
     * to be a color), and updates its DOM to reflect the new color.
     * @param {Element} caption A content element of a control.
     * @param {*} value New value; assumed to be a color spec string.
     */
    function setCaptionValue(caption: Element, value: any): void;
}
