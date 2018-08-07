/// <reference path="../../../globals.d.ts"/>
/// <reference path="./containerrenderer.d.ts"/>

declare module 'goog:goog.ui.ToolbarRenderer' {
    import alias = goog.ui.ToolbarRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.Toolbar}s, based on {@link
     * goog.ui.ContainerRenderer}.
     * @extends {goog.ui.ContainerRenderer}
     */
    class ToolbarRenderer extends __ToolbarRenderer {}
    abstract class __ToolbarRenderer extends goog.ui.__ContainerRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ToolbarRenderer {
    /**
     * Default CSS class to be applied to the root element of toolbars rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
