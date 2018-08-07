/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.WheelHandler' {
    import alias = goog.events.WheelHandler;
    export default alias;
}

declare namespace goog.events {
    /**
     * This event handler allows you to catch wheel events in a consistent manner.
     * @extends {goog.events.EventTarget}
     */
    class WheelHandler extends __WheelHandler {}
    abstract class __WheelHandler extends goog.events.__EventTarget {
        /**
         * @param {!Element|!Document} element The element to listen to the wheel event
         *     on.
         * @param {boolean=} opt_capture Whether to handle the wheel event in capture
         *     phase.
         */
        constructor(element: Element|Document, opt_capture?: boolean);

        /**
         * This is the element that we will listen to the real wheel events on.
         * @private {!Element|!Document}
         */
        private element_: any /*missing*/;

        /**
         * True if the element exists and is RTL, false otherwise.
         * @private {boolean}
         */
        private isRtl_: any /*missing*/;

        /**
         * The key returned from the goog.events.listen.
         * @private {goog.events.Key}
         */
        private listenKey_: any /*missing*/;

        /**
         * Handles the events on the element.
         * @param {!goog.events.BrowserEvent} e The underlying browser event.
         */
        handleEvent(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.events.WheelHandler {
    /**
     * Returns the dom event type.
     * @return {string} The dom event type.
     */
    function getDomEventType(): string;
}
