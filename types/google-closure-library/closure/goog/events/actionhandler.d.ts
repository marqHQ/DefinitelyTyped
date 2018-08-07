/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.BeforeActionEvent' {
    import alias = goog.events.BeforeActionEvent;
    export default alias;
}

declare module 'goog:goog.events.ActionHandler' {
    import alias = goog.events.ActionHandler;
    export default alias;
}

declare module 'goog:goog.events.ActionHandler.EventType' {
    import alias = goog.events.ActionHandler.EventType;
    export default alias;
}

declare module 'goog:goog.events.ActionEvent' {
    import alias = goog.events.ActionEvent;
    export default alias;
}

declare namespace goog.events {
    /**
     * A wrapper around an element that you want to listen to ACTION events on.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class ActionHandler extends __ActionHandler {}
    abstract class __ActionHandler extends goog.events.__EventTarget {
        /**
         * @param {Element|Document} element The element or document to listen on.
         */
        constructor(element: Element|Document);

        /**
         * This is the element that we will listen to events on.
         * @type {Element|Document}
         * @private
         */
        private element_: Element|Document;

        /**
         * Handles key press events.
         * @param {!goog.events.BrowserEvent} e The key press event.
         * @private
         */
        private handleKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Handles mouse events.
         * @param {!goog.events.BrowserEvent} e The click event.
         * @private
         */
        private handleClick_(e: goog.events.BrowserEvent): void;

        /**
         * Dispatches BeforeAction and Action events to the element
         * @param {!goog.events.BrowserEvent} e The event causing dispatches.
         * @private
         */
        private dispatchEvents_(e: goog.events.BrowserEvent): void;
    }

    /**
     * This class is used for the goog.events.ActionHandler.EventType.ACTION event.
     * @extends {goog.events.BrowserEvent}
     * @final
     */
    class ActionEvent extends __ActionEvent {}
    abstract class __ActionEvent extends goog.events.__BrowserEvent {
        /**
         * @param {!goog.events.BrowserEvent} browserEvent Browser event object.
         */
        constructor(browserEvent: goog.events.BrowserEvent);
    }

    /**
     * This class is used for the goog.events.ActionHandler.EventType.BEFOREACTION
     * event. BEFOREACTION gives a chance to the application so the keyboard focus
     * can be restored back, if required.
     * @extends {goog.events.BrowserEvent}
     * @final
     */
    class BeforeActionEvent extends __BeforeActionEvent {}
    abstract class __BeforeActionEvent extends goog.events.__BrowserEvent {
        /**
         * @param {!goog.events.BrowserEvent} browserEvent Browser event object.
         */
        constructor(browserEvent: goog.events.BrowserEvent);
    }
}

declare namespace goog.events.ActionHandler {
    /**
     * Enum type for the events fired by the action handler
     * @enum {string}
     */
    enum EventType { ACTION, BEFOREACTION }
}
