/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.Css3MenuButtonRenderer' {
    import alias = goog.ui.Css3MenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Custom renderer for {@link goog.ui.MenuButton}s. Css3 buttons can contain
     * almost arbitrary HTML content, will flow like inline elements, but can be
     * styled like block-level elements.
     *
     * @extends {goog.ui.MenuButtonRenderer}
     * @final
     */
    class Css3MenuButtonRenderer extends __Css3MenuButtonRenderer {}
    abstract class __Css3MenuButtonRenderer extends goog.ui.__MenuButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.Css3MenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
