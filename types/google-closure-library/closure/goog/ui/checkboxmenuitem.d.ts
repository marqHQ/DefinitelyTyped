/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.CheckBoxMenuItem' {
    import alias = goog.ui.CheckBoxMenuItem;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a checkbox menu item.  This is just a convenience class
     * that extends {@link goog.ui.MenuItem} by making it checkable.
     *
     * @extends {goog.ui.MenuItem}
     */
    class CheckBoxMenuItem extends __CheckBoxMenuItem {}
    abstract class __CheckBoxMenuItem extends goog.ui.__MenuItem {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {*=} opt_model Data/model associated with the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         */
        constructor(content: goog.ui.ControlContent, opt_model?: any, opt_domHelper?: goog.dom.DomHelper);
    }
}
