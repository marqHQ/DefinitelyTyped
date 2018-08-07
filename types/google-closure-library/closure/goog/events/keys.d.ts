/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.events.Keys' {
    import alias = goog.events.Keys;
    export default alias;
}

declare namespace goog.events {
    /**
     * Key values for common characters.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
     * @enum {string}
     */
    enum Keys { CTRL, SHIFT, ALT, ALTGRAPH }
}
