/// <reference path="../../../globals.d.ts"/>
/// <reference path="./separator.d.ts"/>
/// <reference path="./toolbarseparatorrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToolbarSeparator' {
    import alias = goog.ui.ToolbarSeparator;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A separator control for a toolbar.
     *
     * @extends {goog.ui.Separator}
     * @final
     */
    class ToolbarSeparator extends __ToolbarSeparator {}
    abstract class __ToolbarSeparator extends goog.ui.__Separator {
        /**
         * @param {goog.ui.ToolbarSeparatorRenderer=} opt_renderer Renderer to render or
         *    decorate the separator; defaults to
         *     {@link goog.ui.ToolbarSeparatorRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *    document interaction.
         */
        constructor(opt_renderer?: goog.ui.ToolbarSeparatorRenderer, opt_domHelper?: goog.dom.DomHelper);
    }
}
