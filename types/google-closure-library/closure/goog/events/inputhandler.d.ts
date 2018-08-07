/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./eventhandler.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.InputHandler' {
    import alias = goog.events.InputHandler;
    export default alias;
}

declare module 'goog:goog.events.InputHandler.EventType' {
    import alias = goog.events.InputHandler.EventType;
    export default alias;
}

declare namespace goog.events {
    /**
     * This event handler will dispatch events when the user types into a text
     * input, password input or a textarea
     * @extends {goog.events.EventTarget}
     */
    class InputHandler extends __InputHandler {}
    abstract class __InputHandler extends goog.events.__EventTarget {
        /**
         * @param {Element} element  The element that you want to listen for input
         *     events on.
         */
        constructor(element: Element);

        /**
         * Id of a timer used to postpone firing input event in emulation mode.
         * @type {?number}
         * @private
         */
        private timer_: number|null;

        /**
         * The element that you want to listen for input events on.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * @type {goog.events.EventHandler<!goog.events.InputHandler>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.events.InputHandler>;

        /**
         * This handles the underlying events and dispatches a new event as needed.
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         */
        handleEvent(e: goog.events.BrowserEvent): void;

        /**
         * Cancels timer if it is set, does nothing otherwise.
         * @private
         */
        private cancelTimerIfSet_(): void;

        /**
         * Creates an input event from the browser event.
         * @param {goog.events.BrowserEvent} be A browser event.
         * @return {!goog.events.BrowserEvent} An input event.
         * @private
         */
        private createInputEvent_(be: goog.events.BrowserEvent): goog.events.BrowserEvent;
    }
}

declare namespace goog.events.InputHandler {
    /**
     * Enum type for the events fired by the input handler
     * @enum {string}
     */
    enum EventType { INPUT }
}
