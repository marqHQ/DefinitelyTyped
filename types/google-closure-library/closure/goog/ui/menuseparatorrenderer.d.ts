/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>

declare module 'goog:goog.ui.MenuSeparatorRenderer' {
    import alias = goog.ui.MenuSeparatorRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for menu separators.
     * @extends {goog.ui.ControlRenderer}
     */
    class MenuSeparatorRenderer extends __MenuSeparatorRenderer {}
    abstract class __MenuSeparatorRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.MenuSeparatorRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
