/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./menuseparatorrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.Separator' {
    import alias = goog.ui.Separator;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a separator.  Although it extends {@link goog.ui.Control},
     * the Separator class doesn't allocate any event handlers, nor does it change
     * its appearance on mouseover, etc.
     * @extends {goog.ui.Control}
     */
    class Separator extends __Separator {}
    abstract class __Separator extends goog.ui.__Control {
        /**
         * @param {goog.ui.MenuSeparatorRenderer=} opt_renderer Renderer to render or
         *    decorate the separator; defaults to {@link goog.ui.MenuSeparatorRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *    document interaction.
         */
        constructor(opt_renderer?: goog.ui.MenuSeparatorRenderer, opt_domHelper?: goog.dom.DomHelper);
    }
}
