/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./events.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.KeyHandler' {
    import alias = goog.events.KeyHandler;
    export default alias;
}

declare module 'goog:goog.events.KeyHandler.EventType' {
    import alias = goog.events.KeyHandler.EventType;
    export default alias;
}

declare module 'goog:goog.events.KeyEvent' {
    import alias = goog.events.KeyEvent;
    export default alias;
}

declare namespace goog.events {
    /**
     * A wrapper around an element that you want to listen to keyboard events on.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class KeyHandler extends __KeyHandler {}
    abstract class __KeyHandler extends goog.events.__EventTarget {
        /**
         * @param {Element|Document=} opt_element The element or document to listen on.
         * @param {boolean=} opt_capture Whether to listen for browser events in
         *     capture phase (defaults to false).
         */
        constructor(opt_element?: Element|Document, opt_capture?: boolean);

        /**
         * This is the element that we will listen to the real keyboard events on.
         * @type {Element|Document|null}
         * @private
         */
        private element_: Element|Document|null;

        /**
         * The key for the key press listener.
         * @type {goog.events.Key}
         * @private
         */
        private keyPressKey_: goog.events.Key;

        /**
         * The key for the key down listener.
         * @type {goog.events.Key}
         * @private
         */
        private keyDownKey_: goog.events.Key;

        /**
         * The key for the key up listener.
         * @type {goog.events.Key}
         * @private
         */
        private keyUpKey_: goog.events.Key;

        /**
         * Used to detect keyboard repeat events.
         * @private
         * @type {number}
         */
        private lastKey_: number;

        /**
         * Keycode recorded for key down events. As most browsers don't report the
         * keycode in the key press event we need to record it in the key down phase.
         * @private
         * @type {number}
         */
        private keyCode_: number;

        /**
         * Alt key recorded for key down events. FF on Mac does not report the alt key
         * flag in the key press event, we need to record it in the key down phase.
         * @type {boolean}
         * @private
         */
        private altKey_: boolean;

        /**
         * Records the keycode for browsers that only returns the keycode for key up/
         * down events. For browser/key combinations that doesn't trigger a key pressed
         * event it also fires the patched key event.
         * @param {goog.events.BrowserEvent} e The key down event.
         * @private
         */
        private handleKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Resets the stored previous values. Needed to be called for webkit which will
         * not generate a key up for meta key operations. This should only be called
         * when having finished with repeat key possibilities.
         */
        resetState(): void;

        /**
         * Clears the stored previous key value, resetting the key repeat status. Uses
         * -1 because the Safari 3 Windows beta reports 0 for certain keys (like Home
         * and End.)
         * @param {goog.events.BrowserEvent} e The keyup event.
         * @private
         */
        private handleKeyup_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the events on the element.
         * @param {goog.events.BrowserEvent} e  The keyboard event sent from the
         *     browser.
         */
        handleEvent(e: goog.events.BrowserEvent): void;

        /**
         * Returns the element listened on for the real keyboard events.
         * @return {Element|Document|null} The element listened on for the real
         *     keyboard events.
         */
        getElement(): Element|Document|null;

        /**
         * Adds the proper key event listeners to the element.
         * @param {Element|Document} element The element to listen on.
         * @param {boolean=} opt_capture Whether to listen for browser events in
         *     capture phase (defaults to false).
         */
        attach(element: Element|Document, opt_capture?: boolean): void;

        /**
         * Removes the listeners that may exist.
         */
        detach(): void;
    }

    /**
     * This class is used for the goog.events.KeyHandler.EventType.KEY event and
     * it overrides the key code with the fixed key code.
     * @extends {goog.events.BrowserEvent}
     * @final
     */
    class KeyEvent extends __KeyEvent {}
    abstract class __KeyEvent extends goog.events.__BrowserEvent {
        /**
         * @param {number} keyCode The adjusted key code.
         * @param {number} charCode The unicode character code.
         * @param {boolean} repeat Whether this event was generated by keyboard repeat.
         * @param {Event} browserEvent Browser event object.
         */
        constructor(keyCode: number, charCode: number, repeat: boolean, browserEvent: Event);

        /**
         * Keycode of key press.
         * @type {number}
         */
        keyCode: number;

        /**
         * Unicode character code.
         * @type {number}
         */
        charCode: number;

        /**
         * True if this event was generated by keyboard auto-repeat (i.e., the user is
         * holding the key down.)
         * @type {boolean}
         */
        repeat: boolean;
    }
}

declare namespace goog.events.KeyHandler {
    /**
     * Enum type for the events fired by the key handler
     * @enum {string}
     */
    enum EventType { KEY }
}
