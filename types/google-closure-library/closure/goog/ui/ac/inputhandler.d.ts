/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../disposable/disposable.d.ts"/>
/// <reference path="../../timer/timer.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../events/keyhandler.d.ts"/>
/// <reference path="./autocomplete.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.ui.ac.InputHandler' {
    import alias = goog.ui.ac.InputHandler;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * Class for managing the interaction between an auto-complete object and a
     * text-input or textarea.
     *
     * @extends {goog.Disposable}
     */
    class InputHandler extends __InputHandler {}
    abstract class __InputHandler extends goog.__Disposable {
        /**
         * @param {?string=} opt_separators Separators to split multiple entries.
         *     If none passed, uses ',' and ';'.
         * @param {?string=} opt_literals Characters used to delimit text literals.
         * @param {?boolean=} opt_multi Whether to allow multiple entries
         *     (Default: true).
         * @param {?number=} opt_throttleTime Number of milliseconds to throttle
         *     keyevents with (Default: 150). Use -1 to disable updates on typing. Note
         *     that typing the separator will update autocomplete suggestions.
         */
        constructor(
            opt_separators?: string|null,
            opt_literals?: string|null,
            opt_multi?: boolean|null,
            opt_throttleTime?: number|null
        );

        /**
         * Whether this input accepts multiple values
         * @type {boolean}
         * @private
         */
        private multi_: boolean;

        /**
         * Characters that are used to delimit literal text. Separarator characters
         * found within literal text are not processed as separators
         * @type {string}
         * @private
         */
        private literals_: string;

        /**
         * Whether to prevent highlighted item selection when tab is pressed.
         * @type {boolean}
         * @private
         */
        private preventSelectionOnTab_: boolean;

        /**
         * Whether to prevent the default behavior (moving focus to another element)
         * when tab is pressed.  This occurs by default only for multi-value mode.
         * @type {boolean}
         * @private
         */
        private preventDefaultOnTab_: boolean;

        /**
         * A timer object used to monitor for changes when an element is active.
         *
         * TODO(user): Consider tuning the throttle time, so that it takes into
         * account the length of the token.  When the token is short it is likely to
         * match lots of rows, therefore we want to check less frequently.  Even
         * something as simple as <3-chars = 150ms, then 100ms otherwise.
         *
         * @type {goog.Timer}
         * @private
         */
        private timer_: goog.Timer;

        /**
         * Event handler used by the input handler to manage events.
         * @type {goog.events.EventHandler<!goog.ui.ac.InputHandler>}
         * @private
         */
        private eh_: goog.events.EventHandler<goog.ui.ac.InputHandler>;

        /**
         * Event handler to help us find an input element that already has the focus.
         * @type {goog.events.EventHandler<!goog.ui.ac.InputHandler>}
         * @private
         */
        private activateHandler_: goog.events.EventHandler<goog.ui.ac.InputHandler>;

        /**
         * The keyhandler used for listening on most key events.  This takes care of
         * abstracting away some of the browser differences.
         * @type {goog.events.KeyHandler}
         * @private
         */
        private keyHandler_: goog.events.KeyHandler;

        /**
         * The last key down key code.
         * @type {number}
         * @private
         */
        private lastKeyCode_: number;

        /**
         * The AutoComplete instance this inputhandler is associated with.
         * @type {goog.ui.ac.AutoComplete}
         */
        ac_: goog.ui.ac.AutoComplete;

        /**
         * Characters that can be used to split multiple entries in an input string
         * @type {string}
         * @private
         */
        private separators_: string;

        /**
         * The separator we use to reconstruct the string
         * @type {string}
         * @private
         */
        private defaultSeparator_: string;

        /**
         * Regular expression used from trimming tokens or null for no trimming.
         * @type {RegExp}
         * @private
         */
        private trimmer_: RegExp;

        /**
         * Regular expression to test whether a separator exists
         * @type {RegExp}
         * @private
         */
        private separatorCheck_: RegExp;

        /**
         * Should auto-completed tokens be wrapped in whitespace?  Used in selectRow.
         * @type {boolean}
         * @private
         */
        private whitespaceWrapEntries_: boolean;

        /**
         * Should the occurrence of a literal indicate a token boundary?
         * @type {boolean}
         * @private
         */
        private generateNewTokenOnLiteral_: boolean;

        /**
         * Whether to flip the orientation of up & down for hiliting next
         * and previous autocomplete entries.
         * @type {boolean}
         * @private
         */
        private upsideDown_: boolean;

        /**
         * If we're in 'multi' mode, does typing a separator force the updating of
         * suggestions?
         * For example, if somebody finishes typing "obama, hillary,", should the last
         * comma trigger updating suggestions in a guaranteed manner? Especially useful
         * when the suggestions depend on complete keywords. Note that "obama, hill"
         * (a leading sub-string of "obama, hillary" will lead to different and possibly
         * irrelevant suggestions.
         * @type {boolean}
         * @private
         */
        private separatorUpdates_: boolean;

        /**
         * If we're in 'multi' mode, does typing a separator force the current term to
         * autocomplete?
         * For example, if 'tomato' is a suggested completion and the user has typed
         * 'to,', do we autocomplete to turn that into 'tomato,'?
         * @type {boolean}
         * @private
         */
        private separatorSelects_: boolean;

        /**
         * The id of the currently active timeout, so it can be cleared if required.
         * @type {?number}
         * @private
         */
        private activeTimeoutId_: number|null;

        /**
         * The element that is currently active.
         * @type {Element}
         * @private
         */
        private activeElement_: Element;

        /**
         * The previous value of the active element.
         * @type {string}
         * @private
         */
        private lastValue_: string;

        /**
         * Flag used to indicate that the IME key has been seen and we need to wait for
         * the up event.
         * @type {boolean}
         * @private
         */
        private waitingForIme_: boolean;

        /**
         * Flag used to indicate that the user just selected a row and we should
         * therefore ignore the change of the input value.
         * @type {boolean}
         * @private
         */
        private rowJustSelected_: boolean;

        /**
         * Flag indicating whether the result list should be updated continuously
         * during typing or only after a short pause.
         * @type {boolean}
         * @private
         */
        private updateDuringTyping_: boolean;

        /**
         * Attach an instance of an AutoComplete
         * @param {goog.ui.ac.AutoComplete} ac Autocomplete object.
         */
        attachAutoComplete(ac: goog.ui.ac.AutoComplete): void;

        /**
         * Returns the associated autocomplete instance.
         * @return {goog.ui.ac.AutoComplete} The associated autocomplete instance.
         */
        getAutoComplete(): goog.ui.ac.AutoComplete;

        /**
         * Returns the current active element.
         * @return {Element} The currently active element.
         */
        getActiveElement(): Element;

        /**
         * Returns the value of the current active element.
         * @return {string} The value of the current active element.
         */
        getValue(): string;

        /**
         * Sets the value of the current active element.
         * @param {string} value The new value.
         */
        setValue(value: string): void;

        /**
         * Returns the current cursor position.
         * @return {number} The index of the cursor position.
         */
        getCursorPosition(): number;

        /**
         * Sets the cursor at the given position.
         * @param {number} pos The index of the cursor position.
         */
        setCursorPosition(pos: number): void;

        /**
         * Attaches the input handler to a target element. The target element
         * should be a textarea, input box, or other focusable element with the
         * same interface.
         * @param {Element|goog.events.EventTarget} target An element to attach the
         *     input handler to.
         */
        attachInput(target: Element|goog.events.EventTarget): void;

        /**
         * Detaches the input handler from the provided element.
         * @param {Element|goog.events.EventTarget} target An element to detach the
         *     input handler from.
         */
        detachInput(target: Element|goog.events.EventTarget): void;

        /**
         * Attaches the input handler to multiple elements.
         * @param {...Element} var_args Elements to attach the input handler too.
         */
        attachInputs(...var_args: Element[]): void;

        /**
         * Detaches the input handler from multuple elements.
         * @param {...Element} var_args Variable arguments for elements to unbind from.
         */
        detachInputs(...var_args: Element[]): void;

        /**
         * Selects the given row.  Implements the SelectionHandler interface.
         * @param {Object} row The row to select.
         * @param {boolean=} opt_multi Should this be treated as a single or multi-token
         *     auto-complete?  Overrides previous setting of opt_multi on constructor.
         * @return {boolean} Whether to suppress the update event.
         */
        selectRow(row: Object, opt_multi?: boolean): boolean;

        /**
         * Sets the text of the current token without updating the autocomplete
         * choices.
         * @param {string} tokenText The text for the current token.
         * @param {boolean=} opt_multi Should this be treated as a single or multi-token
         *     auto-complete?  Overrides previous setting of opt_multi on constructor.
         * @protected
         */
        protected setTokenText(tokenText: string, opt_multi?: boolean): void;

        /**
         * Sets the entry separator characters.
         *
         * @param {string} separators The separator characters to set.
         * @param {string=} opt_defaultSeparators The defaultSeparator character to set.
         */
        setSeparators(separators: string, opt_defaultSeparators?: string): void;

        /**
         * Sets whether to flip the orientation of up & down for hiliting next
         * and previous autocomplete entries.
         * @param {boolean} upsideDown Whether the orientation is upside down.
         */
        setUpsideDown(upsideDown: boolean): void;

        /**
         * Sets whether auto-completed tokens should be wrapped with whitespace.
         * @param {boolean} newValue boolean value indicating whether or not
         *     auto-completed tokens should be wrapped with whitespace.
         */
        setWhitespaceWrapEntries(newValue: boolean): void;

        /**
         * Sets whether new tokens should be generated from literals.  That is, should
         * hello'world be two tokens, assuming ' is a literal?
         * @param {boolean} newValue boolean value indicating whether or not
         * new tokens should be generated from literals.
         */
        setGenerateNewTokenOnLiteral(newValue: boolean): void;

        /**
         * Sets the regular expression used to trim the tokens before passing them to
         * the matcher:  every substring that matches the given regular expression will
         * be removed.  This can also be set to null to disable trimming.
         * @param {RegExp} trimmer Regexp to use for trimming or null to disable it.
         */
        setTrimmingRegExp(trimmer: RegExp): void;

        /**
         * Sets whether we will prevent the default input behavior (moving focus to the
         * next focusable  element) on TAB.
         * @param {boolean} newValue Whether to preventDefault on TAB.
         */
        setPreventDefaultOnTab(newValue: boolean): void;

        /**
         * Sets whether we will prevent highlighted item selection on TAB.
         * @param {boolean} newValue Whether to prevent selection on TAB.
         */
        setPreventSelectionOnTab(newValue: boolean): void;

        /**
         * Sets whether separators perform autocomplete.
         * @param {boolean} newValue Whether to autocomplete on separators.
         */
        setSeparatorCompletes(newValue: boolean): void;

        /**
         * Sets whether separators perform autocomplete.
         * @param {boolean} newValue Whether to autocomplete on separators.
         */
        setSeparatorSelects(newValue: boolean): void;

        /**
         * Gets the time to wait before updating the results. If the update during
         * typing flag is switched on, this delay counts from the last update,
         * otherwise from the last keypress.
         * @return {number} Throttle time in milliseconds.
         */
        getThrottleTime(): number;

        /**
         * Sets whether a row has just been selected.
         * @param {boolean} justSelected Whether or not the row has just been selected.
         */
        setRowJustSelected(justSelected: boolean): void;

        /**
         * Sets the time to wait before updating the results.
         * @param {number} time New throttle time in milliseconds.
         */
        setThrottleTime(time: number): void;

        /**
         * Gets whether the result list is updated during typing.
         * @return {boolean} Value of the flag.
         */
        getUpdateDuringTyping(): boolean;

        /**
         * Sets whether the result list should be updated during typing.
         * @param {boolean} value New value of the flag.
         */
        setUpdateDuringTyping(value: boolean): void;

        /**
         * Handles a key event.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @return {boolean} True if the key event was handled.
         * @protected
         */
        protected handleKeyEvent(e: goog.events.BrowserEvent): boolean;

        /**
         * Handles a key event for a separator key.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @return {boolean} True if the key event was handled.
         * @private
         */
        private handleSeparator_(e: goog.events.BrowserEvent): boolean;

        /**
         * @return {boolean} Whether this inputhandler need to listen on key-up.
         * @protected
         */
        protected needKeyUpListener(): boolean;

        /**
         * Handles the key up event. Registered only if needKeyUpListener returns true.
         * @param {goog.events.Event} e The keyup event.
         * @return {boolean} Whether an action was taken or not.
         * @protected
         */
        protected handleKeyUp(e: goog.events.Event): boolean;

        /**
         * Adds the necessary input event handlers.
         * @private
         */
        private addEventHandlers_(): void;

        /**
         * Removes the necessary input event handlers.
         * @private
         */
        private removeEventHandlers_(): void;

        /**
         * Handles an element getting focus.
         * @param {goog.events.Event} e Browser event object.
         * @protected
         */
        protected handleFocus(e: goog.events.Event): void;

        /**
         * Registers handlers for the active element when it receives focus.
         * @param {Element} target The element to focus.
         * @protected
         */
        protected processFocus(target: Element): void;

        /**
         * Handles an element blurring.
         * @param {goog.events.Event=} opt_e Browser event object.
         * @protected
         */
        protected handleBlur(opt_e?: goog.events.Event): void;

        /**
         * Helper function that does the logic to handle an element blurring.
         * @protected
         */
        protected processBlur(): void;

        /**
         * Handles the timer's tick event.  Calculates the current token, and reports
         * any update to the autocomplete.
         * @param {goog.events.Event} e Browser event object.
         * @private
         */
        private onTick_(e: goog.events.Event): void;

        /**
         * Handles typing in an inactive input element. Activate it.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onKeyDownOnInactiveElement_(e: goog.events.BrowserEvent): void;

        /**
         * Handles typing in the active input element.  Checks if the key is a special
         * key and does the relevant action as appropriate.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onKey_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a KEYPRESS event generated by typing in the active input element.
         * Checks if IME input is ended.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onKeyPress_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the key-up event.  This is only ever used by Mac FF or when we are in
         * an IME entry scenario.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onKeyUp_(e: goog.events.BrowserEvent): void;

        /**
         * Handles mouse-down event.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onMouseDown_(e: goog.events.BrowserEvent): void;

        /**
         * For subclasses to override to handle the mouse-down event.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @protected
         */
        protected handleMouseDown(e: goog.events.BrowserEvent): void;

        /**
         * Starts waiting for IME.
         * @private
         */
        private startWaitingForIme_(): void;

        /**
         * Stops waiting for IME.
         * @private
         */
        private stopWaitingForIme_(): void;

        /**
         * Handles the key-press event for IE, checking to see if the user typed a
         * separator character.
         * @param {goog.events.BrowserEvent} e Browser event object.
         * @private
         */
        private onIeKeyPress_(e: goog.events.BrowserEvent): void;

        /**
         * Checks if an update has occurred and notified the autocomplete of the new
         * token.
         * @param {boolean=} opt_force If true the menu will be forced to update.
         */
        update(opt_force?: boolean): void;

        /**
         * Parses a text area or input box for the currently highlighted token.
         * @return {string} Token to complete.
         * @protected
         */
        protected parseToken(): string;

        /**
         * Moves hilite up.  May hilite next or previous depending on orientation.
         * @return {boolean} True if successful.
         * @private
         */
        private moveUp_(): boolean;

        /**
         * Moves hilite down.  May hilite next or previous depending on orientation.
         * @return {boolean} True if successful.
         * @private
         */
        private moveDown_(): boolean;

        /**
         * Parses a text area or input box for the currently highlighted token.
         * @return {string} Token to complete.
         * @private
         */
        private parseToken_(): string;

        /**
         * Trims a token of characters that we want to ignore
         * @param {string} text string to trim.
         * @return {string} Trimmed string.
         * @private
         */
        private trim_(text: string): string;

        /**
         * Gets the index of the currently highlighted token
         * @param {string} text string to parse.
         * @param {number} caret Position of cursor in string.
         * @return {number} Index of token.
         * @private
         */
        private getTokenIndex_(text: string, caret: number): number;

        /**
         * Splits an input string of text at the occurrence of a character in
         * {@link goog.ui.ac.InputHandler.prototype.separators_} and creates
         * an array of tokens.  Each token may contain additional whitespace and
         * formatting marks.  If necessary use
         * {@link goog.ui.ac.InputHandler.prototype.trim_} to clean up the
         * entries.
         *
         * @param {string} text Input text.
         * @return {!Array<string>} Parsed array.
         * @private
         */
        private splitInput_(text: string): string[];
    }
}

declare namespace goog.ui.ac.InputHandler {
    /**
     * Standard list separators.
     * @type {string}
     * @const
     */
    const STANDARD_LIST_SEPARATORS: string;

    /**
     * Literals for quotes.
     * @type {string}
     * @const
     */
    const QUOTE_LITERALS: string;
}
