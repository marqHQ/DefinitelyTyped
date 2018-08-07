/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>

declare module 'goog:goog.ui.FilterObservingMenuItem' {
    import alias = goog.ui.FilterObservingMenuItem;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a filter observing menu item.
     *
     * @extends {goog.ui.MenuItem}
     */
    class FilterObservingMenuItem extends __FilterObservingMenuItem {}
    abstract class __FilterObservingMenuItem extends goog.ui.__MenuItem {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {*=} opt_model Data/model associated with the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_model?: any,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuItemRenderer
        );

        /**
         * Function called when the filter text changes.
         * @type {Function} function(goog.ui.FilterObservingMenuItem, string)
         * @private
         */
        private observer_: Function;

        /**
         * Sets the observer functions.
         * @param {Function} f function(goog.ui.FilterObservingMenuItem, string).
         */
        setObserver(f: Function): void;

        /**
         * Calls the observer function if one has been specified.
         * @param {?string=} opt_str Filter string.
         */
        callObserver(opt_str?: string|null): void;
    }
}
