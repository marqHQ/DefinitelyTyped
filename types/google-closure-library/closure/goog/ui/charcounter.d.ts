/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/inputhandler.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.CharCounter' {
    import alias = goog.ui.CharCounter;
    export default alias;
}

declare module 'goog:goog.ui.CharCounter.Display' {
    import alias = goog.ui.CharCounter.Display;
    export default alias;
}

declare namespace goog.ui {
    /**
     * CharCounter widget. Counts the number of characters in a input field or a
     * text box and displays the number of additional characters that may be
     * entered before the maximum length is reached.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class CharCounter extends __CharCounter {}
    abstract class __CharCounter extends goog.events.__EventTarget {
        /**
         * @param {HTMLInputElement|HTMLTextAreaElement} elInput Input or text area
         *     element to count the number of characters in.
         * @param {Element} elCount HTML element to display the remaining number of
         *     characters in. You can pass in null for this if you don't want to expose
         *     the number of chars remaining.
         * @param {number} maxLength The maximum length.
         * @param {goog.ui.CharCounter.Display=} opt_displayMode Display mode for this
         *     char counter. Defaults to {@link goog.ui.CharCounter.Display.REMAINING}.
         */
        constructor(
            elInput: HTMLInputElement|HTMLTextAreaElement,
            elCount: Element,
            maxLength: number,
            opt_displayMode?: goog.ui.CharCounter.Display
        );

        /**
         * Input or text area element to count the number of characters in.
         * @type {HTMLInputElement|HTMLTextAreaElement}
         * @private
         */
        private elInput_: HTMLInputElement|HTMLTextAreaElement;

        /**
         * HTML element to display the remaining number of characters in.
         * @type {Element}
         * @private
         */
        private elCount_: Element;

        /**
         * The maximum length.
         * @type {number}
         * @private
         */
        private maxLength_: number;

        /**
         * The display mode for this char counter.
         * @type {!goog.ui.CharCounter.Display}
         * @private
         */
        private display_: goog.ui.CharCounter.Display;

        /**
         * The input handler that provides the input event.
         * @type {goog.events.InputHandler}
         * @private
         */
        private inputHandler_: goog.events.InputHandler;

        /**
         * Sets the maximum length.
         *
         * @param {number} maxLength The maximum length.
         */
        setMaxLength(maxLength: number): void;

        /**
         * Returns the maximum length.
         *
         * @return {number} The maximum length.
         */
        getMaxLength(): number;

        /**
         * Sets the display mode.
         *
         * @param {!goog.ui.CharCounter.Display} displayMode The display mode.
         */
        setDisplayMode(displayMode: goog.ui.CharCounter.Display): void;

        /**
         * Returns the display mode.
         *
         * @return {!goog.ui.CharCounter.Display} The display mode.
         */
        getDisplayMode(): goog.ui.CharCounter.Display;

        /**
         * Change event handler for input field.
         *
         * @param {goog.events.BrowserEvent} event Change event.
         * @private
         */
        private onChange_(event: goog.events.BrowserEvent): void;

        /**
         * Checks length of text in input field and updates the counter. Truncates text
         * if the maximum lengths is exceeded.
         */
        checkLength(): void;
    }
}

declare namespace goog.ui.CharCounter {
    /**
     * Display mode for the char counter.
     * @enum {number}
     */
    enum Display { REMAINING, INCREMENTAL }
}
