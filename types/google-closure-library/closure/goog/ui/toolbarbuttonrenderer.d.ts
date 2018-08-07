/// <reference path="../../../globals.d.ts"/>
/// <reference path="./custombuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.ToolbarButtonRenderer' {
    import alias = goog.ui.ToolbarButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Toolbar-specific renderer for {@link goog.ui.Button}s, based on {@link
     * goog.ui.CustomButtonRenderer}.
     * @extends {goog.ui.CustomButtonRenderer}
     */
    class ToolbarButtonRenderer extends __ToolbarButtonRenderer {}
    abstract class __ToolbarButtonRenderer extends goog.ui.__CustomButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ToolbarButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of buttons rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
