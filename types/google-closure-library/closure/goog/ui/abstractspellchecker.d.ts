/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../spell/spellcheck.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./popupmenu.d.ts"/>
/// <reference path="./menuseparator.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="../structs/set.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.AbstractSpellChecker' {
    import alias = goog.ui.AbstractSpellChecker;
    export default alias;
}

declare module 'goog:goog.ui.AbstractSpellChecker.AsyncResult' {
    import alias = goog.ui.AbstractSpellChecker.AsyncResult;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Abstract base class for spell checker editor implementations. Provides basic
     * functionality such as word lookup and caching.
     *
     * @extends {goog.ui.Component}
     */
    class AbstractSpellChecker extends __AbstractSpellChecker {}
    abstract class __AbstractSpellChecker extends goog.ui.__Component {
        /**
         * @param {goog.spell.SpellCheck} spellCheck Instance of the SpellCheck
         *     support object to use. A single instance can be shared by multiple editor
         *     components.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(spellCheck: goog.spell.SpellCheck, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Handler to use for caching and lookups.
         * @type {goog.spell.SpellCheck}
         * @protected
         */
        protected spellCheck: goog.spell.SpellCheck;

        /**
         * Word to element references. Used by replace/ignore.
         * @type {Object}
         * @private
         */
        private wordElements_: Object;

        /**
         * List of all 'edit word' input elements.
         * @type {Array<Element>}
         * @private
         */
        private inputElements_: Element[];

        /**
         * Global regular expression for splitting a string into individual words and
         * blocks of separators. Matches zero or one word followed by zero or more
         * separators.
         * @type {RegExp}
         * @private
         */
        private splitRegex_: RegExp;

        /**
         * Suggestions menu.
         *
         * @type {goog.ui.PopupMenu|undefined}
         * @private
         */
        private menu_: goog.ui.PopupMenu|undefined;

        /**
         * Separator between suggestions and ignore in suggestions menu.
         *
         * @type {goog.ui.MenuSeparator|undefined}
         * @private
         */
        private menuSeparator_: goog.ui.MenuSeparator|undefined;

        /**
         * Menu item for ignore option.
         *
         * @type {goog.ui.MenuItem|undefined}
         * @private
         */
        private menuIgnore_: goog.ui.MenuItem|undefined;

        /**
         * Menu item for edit word option.
         *
         * @type {goog.ui.MenuItem|undefined}
         * @private
         */
        private menuEdit_: goog.ui.MenuItem|undefined;

        /**
         * Whether the correction UI is visible.
         *
         * @type {boolean}
         * @private
         */
        private isVisible_: boolean;

        /**
         * Cache for corrected words. All corrected words are reverted to their original
         * status on resume. Therefore that status is never written to the cache and is
         * instead indicated by this set.
         *
         * @type {goog.structs.Set|undefined}
         * @private
         */
        private correctedWords_: goog.structs.Set<any>|undefined;

        /**
         * Class name for suggestions menu.
         *
         * @type {string}
         */
        suggestionsMenuClassName: string;

        /**
         * Whether corrected words should be highlighted.
         *
         * @type {boolean}
         */
        markCorrected: boolean;

        /**
         * Word the correction menu is displayed for.
         *
         * @type {string|undefined}
         * @private
         */
        private activeWord_: string|undefined;

        /**
         * Element the correction menu is displayed for.
         *
         * @type {Element|undefined}
         * @private
         */
        private activeElement_: Element|undefined;

        /**
         * Indicator that the spell checker is running in the asynchronous mode.
         *
         * @type {boolean}
         * @private
         */
        private asyncMode_: boolean;

        /**
         * Maximum number of words to process on a single stack in asynchronous mode.
         *
         * @type {number}
         * @private
         */
        private asyncWordsPerBatch_: number;

        /**
         * Current text to process when running in the asynchronous mode.
         *
         * @type {string|undefined}
         * @private
         */
        private asyncText_: string|undefined;

        /**
         * Current start index of the range that spell-checked correctly.
         *
         * @type {number|undefined}
         * @private
         */
        private asyncRangeStart_: number|undefined;

        /**
         * Current node with which the asynchronous text is associated.
         *
         * @type {Node|undefined}
         * @private
         */
        private asyncNode_: Node|undefined;

        /**
         * Number of elements processed in the asyncronous mode since last yield.
         *
         * @type {number}
         * @private
         */
        private processedElementsCount_: number;

        /**
         * Markers for the text that does not need to be included in the processing.
         *
         * For rich text editor this is a list of strings formatted as
         * tagName.className or className. If both are specified, the element will be
         * excluded if BOTH are matched. If only a className is specified, then we will
         * exclude regions with the className. If only one marker is needed, it may be
         * passed as a string.
         * For plain text editor this is a RegExp that matches the excluded text.
         *
         * Used exclusively by the derived classes
         *
         * @type {Array<string>|string|RegExp|undefined}
         * @protected
         */
        protected excludeMarker: string[]|string|RegExp|undefined;

        /**
         * Numeric Id of the element that has focus. 0 when not set.
         *
         * @private {number}
         */
        private focusedElementIndex_: any /*missing*/;

        /**
         * Index for the most recently added misspelled word.
         *
         * @private {number}
         */
        private lastIndex_: any /*missing*/;

        /**
         * @return {goog.spell.SpellCheck} The handler used for caching and lookups.
         */
        getSpellCheck(): goog.spell.SpellCheck;

        /**
         * Sets the spell checker used for caching and lookups.
         * @param {goog.spell.SpellCheck} spellCheck The handler used for caching and
         *     lookups.
         */
        setSpellCheck(spellCheck: goog.spell.SpellCheck): void;

        /**
         * Sets the handler used for caching and lookups.
         * @param {goog.spell.SpellCheck} handler The handler used for caching and
         *     lookups.
         * @deprecated Use #setSpellCheck instead.
         */
        setHandler(handler: goog.spell.SpellCheck): void;

        /**
         * @return {goog.ui.PopupMenu|undefined} The suggestions menu.
         * @protected
         */
        protected getMenu(): goog.ui.PopupMenu|undefined;

        /**
         * @return {goog.ui.MenuItem|undefined} The menu item for edit word option.
         * @protected
         */
        protected getMenuEdit(): goog.ui.MenuItem|undefined;

        /**
         * @return {number} The index of the latest misspelled word to be added.
         * @protected
         */
        protected getLastIndex(): number;

        /**
         * @return {number} Increments and returns the index for the next misspelled
         *     word to be added.
         * @protected
         */
        protected getNextIndex(): number;

        /**
         * Sets the marker for the excluded text.
         *
         * {@see goog.ui.AbstractSpellChecker.prototype.excludeMarker}
         *
         * @param {Array<string>|string|RegExp|null} marker A RegExp for plain text
         *        or class names for the rich text spell checker for the elements to
         *        exclude from checking.
         */
        setExcludeMarker(marker: string[]|string|RegExp|null): void;

        /**
         * Checks spelling for all text.
         * Should be overridden by implementation.
         */
        check(): void;

        /**
         * Hides correction UI.
         * Should be overridden by implementation.
         */
        resume(): void;

        /**
         * @return {boolean} Whether the correction ui is visible.
         */
        isVisible(): boolean;

        /**
         * Clears the word to element references map used by replace/ignore.
         * @protected
         */
        protected clearWordElements(): void;

        /**
         * Ignores spelling of word.
         *
         * @param {string} word Word to add.
         */
        ignoreWord(word: string): void;

        /**
         * Edits a word.
         *
         * @param {Element} el An element wrapping the word that should be edited.
         * @param {string} old Word to edit.
         * @private
         */
        private editWord_(el: Element, old: string): void;

        /**
         * Replaces word.
         *
         * @param {Element} el An element wrapping the word that should be replaced.
         * @param {string} old Word that was replaced.
         * @param {string} word Word to replace with.
         */
        replaceWord(el: Element, old: string, word: string): void;

        /**
         * Retrieves the array of suggested spelling choices.
         *
         * @return {Array<string>} Suggested spelling choices.
         * @private
         */
        private getSuggestions_(): string[];

        /**
         * Displays suggestions menu.
         *
         * @param {Element} el Element to display menu for.
         * @param {goog.events.BrowserEvent|goog.math.Coordinate=} opt_pos Position to
         *     display menu at relative to the viewport (in client coordinates), or a
         *     mouse event.
         */
        showSuggestionsMenu(el: Element, opt_pos?: goog.events.BrowserEvent|goog.math.Coordinate): void;

        /**
         * Initializes suggestions menu. Populates menu with separator and ignore option
         * that are always valid. Suggestions are later added above the separator.
         *
         * @protected
         */
        protected initSuggestionsMenu(): void;

        /**
         * Handles correction menu actions.
         *
         * @param {goog.events.Event} event Action event.
         * @protected
         */
        protected onCorrectionAction(event: goog.events.Event): void;

        /**
         * Removes spell-checker markup and restore the node to text.
         *
         * @param {Element} el Word element. MUST have a text node child.
         * @protected
         */
        protected removeMarkup(el: Element): void;

        /**
         * Updates element based on word status. Either converts it to a text node, or
         * merges it with the previous or next text node if the status of the world is
         * VALID, in which case the element itself is eliminated.
         *
         * @param {Element} el Word element.
         * @param {string} word Word to update status for.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         * @protected
         */
        protected updateElement(el: Element, word: string, status: goog.spell.SpellCheck.WordStatus): void;

        /**
         * Generates unique Ids for spell checker elements.
         * @param {number=} opt_id Id to suffix with.
         * @return {string} Unique element id.
         * @protected
         */
        protected makeElementId(opt_id?: number): string;

        /**
         * Returns the span element that matches the given number index.
         * @param {number} index Number index that is used in the element id.
         * @return {Element} The matching span element or null if no span matches.
         * @protected
         */
        protected getElementByIndex(index: number): Element;

        /**
         * Creates an element for a specified word and stores a reference to it.
         *
         * @param {string} word Word to create element for.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         * @return {!HTMLSpanElement} The created element.
         * @protected
         */
        protected createWordElement(word: string, status: goog.spell.SpellCheck.WordStatus): HTMLSpanElement;

        /**
         * Stores a reference to word element.
         *
         * @param {string} word The word to store.
         * @param {HTMLSpanElement} el The element associated with it.
         * @protected
         */
        protected registerWordElement(word: string, el: HTMLSpanElement): void;

        /**
         * Returns desired element properties for the specified status.
         * Should be overridden by implementation.
         *
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         * @return {Object} Properties to apply to the element.
         * @protected
         */
        protected getElementProperties(status: goog.spell.SpellCheck.WordStatus): Object;

        /**
         * Handles word change events and updates the word elements accordingly.
         *
         * @param {goog.spell.SpellCheck.WordChangedEvent} event The event object.
         * @private
         */
        private onWordChanged_(event: goog.spell.SpellCheck.WordChangedEvent): void;

        /**
         * Precharges local dictionary cache. This is optional, but greatly reduces
         * amount of subsequent churn in the DOM tree because most of the words become
         * known from the very beginning.
         *
         * @param {string} text Text to process.
         * @param {number} words Max number of words to scan.
         * @return {number} number of words actually scanned.
         * @protected
         */
        protected populateDictionary(text: string, words: number): number;

        /**
         * Processes word.
         * Should be overridden by implementation.
         *
         * @param {Node} node Node containing word.
         * @param {string} text Word to process.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of the word.
         * @protected
         */
        protected processWord(node: Node, text: string, status: goog.spell.SpellCheck.WordStatus): void;

        /**
         * Processes range of text that checks out (contains no unrecognized words).
         * Should be overridden by implementation. May contain words and separators.
         *
         * @param {Node} node Node containing text range.
         * @param {string} text text to process.
         * @protected
         */
        protected processRange(node: Node, text: string): void;

        /**
         * Starts asynchronous processing mode.
         *
         * @protected
         */
        protected initializeAsyncMode(): void;

        /**
         * Finalizes asynchronous processing mode. Should be called after there is no
         * more text to process and processTextAsync and/or continueAsyncProcessing
         * returned FINISHED.
         *
         * @protected
         */
        protected finishAsyncProcessing(): void;

        /**
         * Blocks processing of spell checker READY events. This is used in dictionary
         * recharge and async mode so that completion is not signaled prematurely.
         *
         * @protected
         */
        protected blockReadyEvents(): void;

        /**
         * Unblocks processing of spell checker READY events. This is used in
         * dictionary recharge and async mode so that completion is not signaled
         * prematurely.
         *
         * @protected
         */
        protected unblockReadyEvents(): void;

        /**
         * Splits text into individual words and blocks of separators. Calls virtual
         * processWord_ and processRange_ methods.
         *
         * @param {Node} node Node containing text.
         * @param {string} text Text to process.
         * @return {goog.ui.AbstractSpellChecker.AsyncResult} operation result.
         * @protected
         */
        protected processTextAsync(node: Node, text: string): goog.ui.AbstractSpellChecker.AsyncResult;

        /**
         * Continues processing started by processTextAsync. Calls virtual
         * processWord_ and processRange_ methods.
         *
         * @return {goog.ui.AbstractSpellChecker.AsyncResult} operation result.
         * @protected
         */
        protected continueAsyncProcessing(): goog.ui.AbstractSpellChecker.AsyncResult;

        /**
         * Navigate keyboard focus in the given direction.
         *
         * @param {goog.ui.AbstractSpellChecker.Direction} direction The direction to
         *     navigate in.
         * @return {boolean} Whether the action is handled here.  If not handled
         *     here, the initiating event may be propagated.
         * @protected
         */
        protected navigate(direction: goog.ui.AbstractSpellChecker.Direction): boolean;

        /**
         * Returns the index of the currently focussed invalid word element. This index
         * starts at one instead of zero.
         *
         * @return {number} the index of the currently focussed element
         * @protected
         */
        protected getFocusedElementIndex(): number;

        /**
         * Sets the index of the currently focussed invalid word element. This index
         * should start at one instead of zero.
         *
         * @param {number} focusElementIndex the index of the currently focussed element
         * @protected
         */
        protected setFocusedElementIndex(focusElementIndex: number): void;

        /**
         * Sets the focus on the provided word element.
         *
         * @param {Element} element The word element that should receive focus.
         * @protected
         */
        protected focusOnElement(element: Element): void;
    }
}

declare namespace goog.ui.AbstractSpellChecker {
    /**
     * Constants for representing the direction while navigating.
     *
     * @enum {number}
     */
    enum Direction { PREVIOUS, NEXT }

    /**
     * Constants for the result of asynchronous processing.
     * @enum {number}
     */
    enum AsyncResult { PENDING, DONE }
}
