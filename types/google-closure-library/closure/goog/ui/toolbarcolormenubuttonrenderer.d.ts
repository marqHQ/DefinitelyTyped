/// <reference path="../../../globals.d.ts"/>
/// <reference path="./toolbarmenubuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.ToolbarColorMenuButtonRenderer' {
    import alias = goog.ui.ToolbarColorMenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Toolbar-style renderer for {@link goog.ui.ColorMenuButton}s.
     * @extends {goog.ui.ToolbarMenuButtonRenderer}
     * @final
     */
    class ToolbarColorMenuButtonRenderer extends __ToolbarColorMenuButtonRenderer {}
    abstract class __ToolbarColorMenuButtonRenderer extends goog.ui.__ToolbarMenuButtonRenderer {
        /**
         */
        constructor();
    }
}
