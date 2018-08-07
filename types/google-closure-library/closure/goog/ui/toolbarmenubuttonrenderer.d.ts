/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.ToolbarMenuButtonRenderer' {
    import alias = goog.ui.ToolbarMenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Toolbar-specific renderer for {@link goog.ui.MenuButton}s, based on {@link
     * goog.ui.MenuButtonRenderer}.
     * @extends {goog.ui.MenuButtonRenderer}
     */
    class ToolbarMenuButtonRenderer extends __ToolbarMenuButtonRenderer {}
    abstract class __ToolbarMenuButtonRenderer extends goog.ui.__MenuButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ToolbarMenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of menu buttons rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
