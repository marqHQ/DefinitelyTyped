/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.history.EventType' {
    import alias = goog.history.EventType;
    export default alias;
}

declare namespace goog.history {
    /**
     * Event types for goog.history.
     * @enum {string}
     */
    enum EventType { NAVIGATE }
}
