/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./events.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.MouseWheelHandler' {
    import alias = goog.events.MouseWheelHandler;
    export default alias;
}

declare module 'goog:goog.events.MouseWheelHandler.EventType' {
    import alias = goog.events.MouseWheelHandler.EventType;
    export default alias;
}

declare module 'goog:goog.events.MouseWheelEvent' {
    import alias = goog.events.MouseWheelEvent;
    export default alias;
}

declare namespace goog.events {
    /**
     * This event handler allows you to catch mouse wheel events in a consistent
     * manner.
     * @extends {goog.events.EventTarget}
     */
    class MouseWheelHandler extends __MouseWheelHandler {}
    abstract class __MouseWheelHandler extends goog.events.__EventTarget {
        /**
         * @param {Element|Document} element The element to listen to the mouse wheel
         *     event on.
         * @param {boolean=} opt_capture Whether to handle the mouse wheel event in
         *     capture phase.
         */
        constructor(element: Element|Document, opt_capture?: boolean);

        /**
         * This is the element that we will listen to the real mouse wheel events on.
         * @type {Element|Document}
         * @private
         */
        private element_: Element|Document;

        /**
         * True if the element exists and is RTL, false otherwise.
         * @type {boolean}
         * @private
         */
        private isRtl_: boolean;

        /**
         * The key returned from the goog.events.listen.
         * @type {goog.events.Key}
         * @private
         */
        private listenKey_: goog.events.Key;

        /**
         * Optional maximum magnitude for x delta on each mousewheel event.
         * @type {number|undefined}
         * @private
         */
        private maxDeltaX_: number|undefined;

        /**
         * Optional maximum magnitude for y delta on each mousewheel event.
         * @type {number|undefined}
         * @private
         */
        private maxDeltaY_: number|undefined;

        /**
         * @param {number} maxDeltaX Maximum magnitude for x delta on each mousewheel
         *     event. Should be non-negative.
         */
        setMaxDeltaX(maxDeltaX: number): void;

        /**
         * @param {number} maxDeltaY Maximum magnitude for y delta on each mousewheel
         *     event. Should be non-negative.
         */
        setMaxDeltaY(maxDeltaY: number): void;

        /**
         * Handles the events on the element.
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         */
        handleEvent(e: goog.events.BrowserEvent): void;
    }

    /**
     * A base class for mouse wheel events. This is used with the
     * MouseWheelHandler.
     *
     * @extends {goog.events.BrowserEvent}
     * @final
     */
    class MouseWheelEvent extends __MouseWheelEvent {}
    abstract class __MouseWheelEvent extends goog.events.__BrowserEvent {
        /**
         * @param {number} detail The number of rows the user scrolled.
         * @param {Event} browserEvent Browser event object.
         * @param {number} deltaX The number of rows the user scrolled in the X
         *     direction.
         * @param {number} deltaY The number of rows the user scrolled in the Y
         *     direction.
         */
        constructor(detail: number, browserEvent: Event, deltaX: number, deltaY: number);

        /**
         * The number of lines the user scrolled
         * @type {number}
         * NOTE: Informally deprecated. Use deltaX and deltaY instead, they provide
         * more information.
         */
        detail: number;

        /**
         * The number of "lines" scrolled in the X direction.
         *
         * Note that not all browsers provide enough information to distinguish
         * horizontal and vertical scroll events, so for these unsupported browsers,
         * we will always have a deltaX of 0, even if the user scrolled their mouse
         * wheel or trackpad sideways.
         *
         * Currently supported browsers are Webkit and Firefox 3.1 or later.
         *
         * @type {number}
         */
        deltaX: number;

        /**
         * The number of lines scrolled in the Y direction.
         * @type {number}
         */
        deltaY: number;
    }
}

declare namespace goog.events.MouseWheelHandler {
    /**
     * Enum type for the events fired by the mouse wheel handler.
     * @enum {string}
     */
    enum EventType { MOUSEWHEEL }
}
