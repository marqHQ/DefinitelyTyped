/// <reference path="../../../globals.d.ts"/>
/// <reference path="./separator.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.MenuSeparator' {
    import alias = goog.ui.MenuSeparator;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a menu separator.  A menu separator extends {@link
     * goog.ui.Separator} by always setting its renderer to {@link
     * goog.ui.MenuSeparatorRenderer}.
     * @extends {goog.ui.Separator}
     */
    class MenuSeparator extends __MenuSeparator {}
    abstract class __MenuSeparator extends goog.ui.__Separator {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);
    }
}
