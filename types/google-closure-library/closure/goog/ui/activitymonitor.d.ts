/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.ActivityMonitor' {
    import alias = goog.ui.ActivityMonitor;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Once initialized with a document, the activity monitor can be queried for
     * the current idle time.
     *
     * @extends {goog.events.EventTarget}
     */
    class ActivityMonitor extends __ActivityMonitor {}
    abstract class __ActivityMonitor extends goog.events.__EventTarget {
        /**
         * @param {goog.dom.DomHelper|Array<goog.dom.DomHelper>=} opt_domHelper
         *     DomHelper which contains the document(s) to listen to.  If null, the
         *     default document is usedinstead.
         * @param {boolean=} opt_useBubble Whether to use the bubble phase to listen for
         *     events. By default listens on the capture phase so that it won't miss
         *     events that get stopPropagation/cancelBubble'd. However, this can cause
         *     problems in IE8 if the page loads multiple scripts that include the
         *     closure event handling code.
         *
         */
        constructor(opt_domHelper?: goog.dom.DomHelper|goog.dom.DomHelper[], opt_useBubble?: boolean);

        /**
         * Array of documents that are being listened to.
         * @type {Array<Document>}
         * @private
         */
        private documents_: Document[];

        /**
         * Whether to use the bubble phase to listen for events.
         * @type {boolean}
         * @private
         */
        private useBubble_: boolean;

        /**
         * The event handler.
         * @type {goog.events.EventHandler<!goog.ui.ActivityMonitor>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.ActivityMonitor>;

        /**
         * Whether the current window is an iframe.
         * TODO(user): Move to goog.dom.
         * @type {boolean}
         * @private
         */
        private isIframe_: boolean;

        /**
         * The time (in milliseconds) of the last user event.
         * @type {number}
         * @private
         */
        private lastEventTime_: number;

        /**
         * The last event type that was detected.
         * @type {string}
         * @private
         */
        private lastEventType_: string;

        /**
         * The mouse x-position after the last user event.
         * @type {number}
         * @private
         */
        private lastMouseX_: number;

        /**
         * The mouse y-position after the last user event.
         * @type {number}
         * @private
         */
        private lastMouseY_: number;

        /**
         * The earliest time that another throttled ACTIVITY event will be dispatched
         * @type {number}
         * @private
         */
        private minEventTime_: number;

        /**
         * Adds a document to those being monitored by this class.
         *
         * @param {Document} doc Document to monitor.
         */
        addDocument(doc: Document): void;

        /**
         * Removes a document from those being monitored by this class.
         *
         * @param {Document} doc Document to monitor.
         */
        removeDocument(doc: Document): void;

        /**
         * Updates the last event time when a user action occurs.
         * @param {goog.events.BrowserEvent} e Event object.
         * @private
         */
        private handleEvent_(e: goog.events.BrowserEvent): void;

        /**
         * Updates the last event time to be the present time, useful for non-DOM
         * events that should update idle time.
         */
        resetTimer(): void;

        /**
         * Updates the idle time and fires an event if time has elapsed since
         * the last update.
         * @param {number} eventTime Time (in MS) of the event that cleared the idle
         *     timer.
         * @param {string} eventType Type of the event, used only for debugging.
         * @protected
         */
        protected updateIdleTime(eventTime: number, eventType: string): void;

        /**
         * Returns the amount of time the user has been idle.
         * @param {number=} opt_now The current time can optionally be passed in for the
         *     computation to avoid an extra Date allocation.
         * @return {number} The amount of time in ms that the user has been idle.
         */
        getIdleTime(opt_now?: number): number;

        /**
         * Returns the type of the last user event.
         * @return {string} event type.
         */
        getLastEventType(): string;

        /**
         * Returns the time of the last event
         * @return {number} last event time.
         */
        getLastEventTime(): number;
    }
}

declare namespace goog.ui.ActivityMonitor {
    /**
     * Minimum amount of time in ms between throttled ACTIVITY events
     * @type {number}
     */
    let MIN_EVENT_SPACING: number;

    /**
     * Event constants for the activity monitor.
     * @enum {string}
     */
    enum Event { ACTIVITY }
}
