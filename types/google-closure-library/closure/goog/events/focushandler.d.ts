/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./events.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.FocusHandler' {
    import alias = goog.events.FocusHandler;
    export default alias;
}

declare module 'goog:goog.events.FocusHandler.EventType' {
    import alias = goog.events.FocusHandler.EventType;
    export default alias;
}

declare namespace goog.events {
    /**
     * This event handler allows you to catch focus events when descendants gain or
     * loses focus.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class FocusHandler extends __FocusHandler {}
    abstract class __FocusHandler extends goog.events.__EventTarget {
        /**
         * @param {Element|Document} element  The node to listen on.
         */
        constructor(element: Element|Document);

        /**
         * This is the element that we will listen to the real focus events on.
         * @type {Element|Document}
         * @private
         */
        private element_: Element|Document;

        /**
         * Store the listen key so it easier to unlisten in dispose.
         * @private
         * @type {goog.events.Key}
         */
        private listenKeyIn_: goog.events.Key;

        /**
         * Store the listen key so it easier to unlisten in dispose.
         * @private
         * @type {goog.events.Key}
         */
        private listenKeyOut_: goog.events.Key;

        /**
         * This handles the underlying events and dispatches a new event.
         * @param {goog.events.BrowserEvent} e  The underlying browser event.
         */
        handleEvent(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.events.FocusHandler {
    /**
     * Enum type for the events fired by the focus handler
     * @enum {string}
     */
    enum EventType { FOCUSIN, FOCUSOUT }
}
