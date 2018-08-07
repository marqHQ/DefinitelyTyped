/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractspellchecker.d.ts"/>
/// <reference path="../spell/spellcheck.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.PlainTextSpellChecker' {
    import alias = goog.ui.PlainTextSpellChecker;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Plain text spell checker implementation.
     *
     * @extends {goog.ui.AbstractSpellChecker}
     * @final
     */
    class PlainTextSpellChecker extends __PlainTextSpellChecker {}
    abstract class __PlainTextSpellChecker extends goog.ui.__AbstractSpellChecker {
        /**
         * @param {goog.spell.SpellCheck} handler Instance of the SpellCheckHandler
         *     support object to use. A single instance can be shared by multiple
         *     editor components.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(handler: goog.spell.SpellCheck, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Correction UI container.
         * @private {!HTMLDivElement}
         */
        private overlay_: any /*missing*/;

        /**
         * Bound async function (to avoid rebinding it on every call).
         * @type {Function}
         * @private
         */
        private boundContinueAsyncFn_: Function;

        /**
         * Regular expression for matching line breaks.
         * @type {RegExp}
         * @private
         */
        private endOfLineMatcher_: RegExp;

        /**
         * Class name for invalid words.
         * @type {string}
         */
        invalidWordClassName: string;

        /**
         * Class name for corrected words.
         * @type {string}
         */
        correctedWordClassName: string;

        /**
         * Class name for correction pane.
         * @type {string}
         */
        correctionPaneClassName: string;

        /**
         * Number of words to scan to precharge the dictionary.
         * @type {number}
         * @private
         */
        private dictionaryPreScanSize_: number;

        /**
         * Size of window. Used to check if a resize operation actually changed the size
         * of the window.
         * @type {goog.math.Size|undefined}
         * @private
         */
        private winSize_: goog.math.Size|undefined;

        /**
         * Event handler for listening to events without leaking.
         * @type {goog.events.EventHandler|undefined}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<any>|undefined;

        /**
         * The object handling keyboard events.
         * @type {goog.events.KeyHandler|undefined}
         * @private
         */
        private keyHandler_: goog.events.KeyHandler|undefined;

        /** @private {number} */
        private textArrayIndex_: any /*missing*/;

        /** @private {!Array<string>} */
        private textArray_: any /*missing*/;

        /** @private {!Array<boolean>} */
        private textArrayProcess_: any /*missing*/;

        /**
         * Final stage of spell checking - displays the correction UI.
         * @private
         */
        private finishCheck_(): void;

        /**
         * Start the scan after the dictionary was loaded.
         *
         * @param {string} text text to process.
         * @private
         */
        private preChargeDictionary_(text: string): void;

        /**
         * Loads few initial dictionary words into the cache.
         *
         * @param {goog.events.Event} e goog.spell.SpellCheck.EventType.READY event.
         * @private
         */
        private onDictionaryCharged_(e: goog.events.Event): void;

        /**
         * Processes the included and skips the excluded text ranges.
         * @return {goog.ui.AbstractSpellChecker.AsyncResult} Whether the spell
         *     checking is pending or done.
         * @private
         */
        private spellCheckLoop_(): goog.ui.AbstractSpellChecker.AsyncResult;

        /**
         * Breaks text into included and excluded ranges using the marker RegExp
         * supplied by the caller.
         *
         * @param {string} text text to process.
         * @private
         */
        private initTextArray_(text: string): void;

        /**
         * Starts asynchrnonous spell checking.
         *
         * @param {string} text text to process.
         * @private
         */
        private checkAsync_(text: string): void;

        /**
         * Continues asynchrnonous spell checking.
         * @private
         */
        private continueAsync_(): void;

        /**
         * Handles the click events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @private
         */
        private onWordClick_(event: goog.events.BrowserEvent): void;

        /**
         * Handles window resize events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @private
         */
        private onWindowResize_(event: goog.events.BrowserEvent): void;

        /**
         * Resizes overlay to match the size of the bound element then displays the
         * overlay. Helper for {@link #onWindowResize_}.
         *
         * @private
         */
        private resizeOverlay_(): void;

        /**
         * Updates the position and size of the overlay to match the original element.
         *
         * @private
         */
        private positionOverlay_(): void;

        /**
         * Specify ARIA roles and states as appropriate.
         * @private
         */
        private initAccessibility_(): void;

        /**
         * Handles key down for overlay.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @return {boolean} The handled value.
         */
        handleOverlayKeyEvent(e: goog.events.BrowserEvent): boolean;

        /**
         * Restores focus when the suggestion menu is hidden.
         *
         * @param {goog.events.BrowserEvent} event Blur event.
         * @private
         */
        private onCorrectionHide_(event: goog.events.BrowserEvent): void;

        /**
         * Sets the focus back on the previously focused word element.
         * @private
         */
        private reFocus_(): void;
    }
}
