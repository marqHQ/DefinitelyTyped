/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menuheaderrenderer.d.ts"/>

declare module 'goog:goog.ui.MenuHeader' {
    import alias = goog.ui.MenuHeader;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a menu header.
     * @extends {goog.ui.Control}
     */
    class MenuHeader extends __MenuHeader {}
    abstract class __MenuHeader extends goog.ui.__Control {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         * @param {goog.ui.MenuHeaderRenderer=} opt_renderer Optional renderer.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuHeaderRenderer
        );
    }
}
