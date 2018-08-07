/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuseparatorrenderer.d.ts"/>

declare module 'goog:goog.ui.ToolbarSeparatorRenderer' {
    import alias = goog.ui.ToolbarSeparatorRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for toolbar separators.
     * @extends {goog.ui.MenuSeparatorRenderer}
     */
    class ToolbarSeparatorRenderer extends __ToolbarSeparatorRenderer {}
    abstract class __ToolbarSeparatorRenderer extends goog.ui.__MenuSeparatorRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ToolbarSeparatorRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
