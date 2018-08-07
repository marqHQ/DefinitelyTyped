/// <reference path="../../../globals.d.ts"/>
/// <reference path="./containerrenderer.d.ts"/>

declare module 'goog:goog.ui.MenuBarRenderer' {
    import alias = goog.ui.MenuBarRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.menuBar}s, based on {@link
     * goog.ui.ContainerRenderer}.
     * @extends {goog.ui.ContainerRenderer}
     * @final
     */
    class MenuBarRenderer extends __MenuBarRenderer {}
    abstract class __MenuBarRenderer extends goog.ui.__ContainerRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.MenuBarRenderer {
    /**
     * Default CSS class to be applied to the root element of elements rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
