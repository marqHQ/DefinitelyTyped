/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>

declare module 'goog:goog.ui.MenuHeaderRenderer' {
    import alias = goog.ui.MenuHeaderRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for menu headers.
     * @extends {goog.ui.ControlRenderer}
     */
    class MenuHeaderRenderer extends __MenuHeaderRenderer {}
    abstract class __MenuHeaderRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.MenuHeaderRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
