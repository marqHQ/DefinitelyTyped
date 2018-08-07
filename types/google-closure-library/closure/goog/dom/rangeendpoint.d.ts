/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.RangeEndpoint' {
    import alias = goog.dom.RangeEndpoint;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Constants for selection endpoints.
     * @enum {number}
     */
    enum RangeEndpoint { START, END }
}
