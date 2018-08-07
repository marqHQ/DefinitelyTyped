/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./eventhandler.d.ts"/>
/// <reference path="./browserevent.d.ts"/>
/// <reference path="./event.d.ts"/>

declare module 'goog:goog.events.ImeHandler' {
    import alias = goog.events.ImeHandler;
    export default alias;
}

declare module 'goog:goog.events.ImeHandler.EventType' {
    import alias = goog.events.ImeHandler.EventType;
    export default alias;
}

declare module 'goog:goog.events.ImeHandler.Event' {
    import alias = goog.events.ImeHandler.Event;
    export default alias;
}

declare namespace goog.events {
    /**
     * Dispatches high-level events for IMEs.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class ImeHandler extends __ImeHandler {}
    abstract class __ImeHandler extends goog.events.__EventTarget {
        /**
         * @param {Element} el The element to listen on.
         */
        constructor(el: Element);

        /**
         * The element to listen on.
         * @type {Element}
         * @private
         */
        private el_: Element;

        /**
         * Tracks the keyup event only, because it has a different life-cycle from
         * other events.
         * @type {goog.events.EventHandler<!goog.events.ImeHandler>}
         * @private
         */
        private keyUpHandler_: goog.events.EventHandler<goog.events.ImeHandler>;

        /**
         * Tracks all the browser events.
         * @type {goog.events.EventHandler<!goog.events.ImeHandler>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.events.ImeHandler>;

        /**
         * Stores whether IME mode is active.
         * @type {boolean}
         * @private
         */
        private imeMode_: boolean;

        /**
         * The keyCode value of the last keyDown event. This value is used for
         * identiying whether or not a textInput event is sent by an IME.
         * @type {number}
         * @private
         */
        private lastKeyCode_: number;

        /**
         * @return {boolean} Whether an IME is active.
         */
        isImeMode(): boolean;

        /**
         * Handles the compositionstart event.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleCompositionStart_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the compositionend event.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleCompositionEnd_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the compositionupdate and text events.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleTextModifyingInput_(e: goog.events.BrowserEvent): void;

        /**
         * Handles IME activation.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleImeActivate_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the IME compose changes.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private processImeComposition_(e: goog.events.BrowserEvent): void;

        /**
         * Handles IME deactivation.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleImeDeactivate_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a key down event.
         * @param {!goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a textInput event.
         * @param {!goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleTextInput_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the key up event for any IME activity. This handler is just used to
         * prevent activating IME unnecessary in Safari at this time.
         * @param {!goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleKeyUpSafari4_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.events.ImeHandler {
    /**
     * An event fired by ImeHandler.
     * @extends {goog.events.Event}
     * @final
     */
    class Event extends __Event {}
    abstract class __Event extends goog.events.__Event {
        /**
         * @param {goog.events.ImeHandler.EventType} type The type.
         * @param {goog.events.BrowserEvent} reason The trigger for this event.
         */
        constructor(type: goog.events.ImeHandler.EventType, reason: goog.events.BrowserEvent);

        /**
         * The event that triggered this.
         * @type {goog.events.BrowserEvent}
         */
        reason: goog.events.BrowserEvent;
    }

    /**
     * Event types fired by ImeHandler. These events do not make any guarantees
     * about whether they were fired before or after the event in question.
     * @enum {string}
     */
    enum EventType { START, UPDATE, END }

    /**
     * Whether to use the composition events.
     * @type {boolean}
     */
    let USES_COMPOSITION_EVENTS: boolean;
}
