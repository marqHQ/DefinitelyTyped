/// <reference path="../../../globals.d.ts"/>
/// <reference path="./container.d.ts"/>
/// <reference path="./toolbarrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.Toolbar' {
    import alias = goog.ui.Toolbar;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A toolbar class, implemented as a {@link goog.ui.Container} that defaults to
     * having a horizontal orientation and {@link goog.ui.ToolbarRenderer} as its
     * renderer.
     * @extends {goog.ui.Container}
     */
    class Toolbar extends __Toolbar {}
    abstract class __Toolbar extends goog.ui.__Container {
        /**
         * @param {goog.ui.ToolbarRenderer=} opt_renderer Renderer used to render or
         *     decorate the toolbar; defaults to {@link goog.ui.ToolbarRenderer}.
         * @param {?goog.ui.Container.Orientation=} opt_orientation Toolbar orientation;
         *     defaults to `HORIZONTAL`.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            opt_renderer?: goog.ui.ToolbarRenderer,
            opt_orientation?: goog.ui.Container.Orientation|null,
            opt_domHelper?: goog.dom.DomHelper
        );
    }
}
