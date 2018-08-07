/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.ui.ButtonSide' {
    import alias = goog.ui.ButtonSide;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Constants for button sides, see {@link goog.ui.Button.prototype.setCollapsed}
     * for details.
     * @enum {number}
     */
    enum ButtonSide { NONE, START, END, BOTH }
}
