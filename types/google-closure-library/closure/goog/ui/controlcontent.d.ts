/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.ui.ControlContent' {
    import alias = goog.ui.ControlContent;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Type declaration for text caption or DOM structure to be used as the content
     * of {@link goog.ui.Control}s.
     * @typedef {string|Node|Array<!Node>|NodeList}
     */
    type ControlContent = string|Node|Node[]|NodeList;
}
