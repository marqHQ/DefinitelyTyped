/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../structs/set.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.spell.SpellCheck' {
    import alias = goog.spell.SpellCheck;
    export default alias;
}

declare module 'goog:goog.spell.SpellCheck.WordChangedEvent' {
    import alias = goog.spell.SpellCheck.WordChangedEvent;
    export default alias;
}

declare namespace goog.spell {
    /**
     * Support class for spell checker components. Provides basic functionality
     * such as word lookup and caching.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class SpellCheck extends __SpellCheck {}
    abstract class __SpellCheck extends goog.events.__EventTarget {
        /**
         * @param {function(!Array<string>, !goog.spell.SpellCheck, !Function)=}
         *     opt_lookupFunction Function to use for word lookup. Must
         *     accept an array of words, an object reference and a callback function as
         *     parameters. It must also call the callback function (as a method on the
         *     object), once ready, with an array containing the original words, their
         *     spelling status and optionally an array of suggestions.
         * @param {string=} opt_language Content language.
         */
        constructor(
            opt_lookupFunction?: (_0: string[], _1: goog.spell.SpellCheck, _2: Function) => void, opt_language?: string
        );

        /**
         * Function used to lookup spelling of words.
         * @private {?function(!Array<string>, !goog.spell.SpellCheck, !Function)}
         */
        private lookupFunction_: any /*missing*/;

        /**
         * Cache for words not yet checked with lookup function.
         * @type {goog.structs.Set}
         * @private
         */
        private unknownWords_: goog.structs.Set<any>;

        /**
         * Content Language.
         * @type {string}
         * @private
         */
        private language_: string;

        /**
         * Cache for set language. Reference to the element corresponding to the set
         * language in the static goog.spell.SpellCheck.cache_.
         *
         * @type {Object|undefined}
         * @private
         */
        private cache_: Object|undefined;

        /**
         * Id for timer processing the pending queue.
         *
         * @type {number}
         * @private
         */
        private queueTimer_: number;

        /**
         * Whether a lookup operation is in progress.
         *
         * @type {boolean}
         * @private
         */
        private lookupInProgress_: boolean;

        /**
         * Sets the lookup function.
         *
         * @param {Function} f Function to use for word lookup. Must accept an array of
         *     words, an object reference and a callback function as parameters.
         *     It must also call the callback function (as a method on the object),
         *     once ready, with an array containing the original words, their
         *     spelling status and optionally an array of suggestions.
         */
        setLookupFunction(f: Function): void;

        /**
         * Sets language.
         *
         * @param {string=} opt_language Content language.
         */
        setLanguage(opt_language?: string): void;

        /**
         * Returns language.
         *
         * @return {string} Content language.
         */
        getLanguage(): string;

        /**
         * Checks spelling for a block of text.
         *
         * @param {string} text Block of text to spell check.
         */
        checkBlock(text: string): void;

        /**
         * Checks spelling for a single word. Returns the status of the supplied word,
         * or UNKNOWN if it's not cached. If it's not cached the word is added to a
         * queue and checked with the verification implementation with a short delay.
         *
         * @param {string} word Word to check spelling of.
         * @return {goog.spell.SpellCheck.WordStatus} The status of the supplied word,
         *     or UNKNOWN if it's not cached.
         */
        checkWord(word: string): goog.spell.SpellCheck.WordStatus;

        /**
         * Checks spelling for a single word. Returns the status of the supplied word,
         * or UNKNOWN if it's not cached.
         *
         * @param {string} word Word to check spelling of.
         * @return {goog.spell.SpellCheck.WordStatus} The status of the supplied word,
         *     or UNKNOWN if it's not cached.
         * @private
         */
        private checkWord_(word: string): goog.spell.SpellCheck.WordStatus;

        /**
         * Processes pending words unless a lookup operation has already been queued or
         * is in progress.
         *
         * @throws {Error}
         */
        processPending(): void;

        /**
         * Processes pending words using the verification callback.
         *
         * @throws {Error}
         * @private
         */
        private processPending_(): void;

        /**
         * Callback for lookup function.
         *
         * @param {Array<Array<?>>} data Data array. Each word is represented by an
         *     array containing the word, the status and optionally an array of
         *     suggestions. Passing null indicates that the operation failed.
         * @private
         *
         * Example:
         * obj.lookupCallback_([
         *   ['word', VALID],
         *   ['wrod', INVALID, ['word', 'wood', 'rod']]
         * ]);
         */
        private lookupCallback_(data: any[][]): void;

        /**
         * Sets a words spelling status.
         *
         * @param {string} word Word to set status for.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         * @param {Array<string>=} opt_suggestions Suggestions.
         *
         * Example:
         * obj.setWordStatus('word', VALID);
         * obj.setWordStatus('wrod', INVALID, ['word', 'wood', 'rod']);.
         */
        setWordStatus(word: string, status: goog.spell.SpellCheck.WordStatus, opt_suggestions?: string[]): void;

        /**
         * Sets a words spelling status.
         *
         * @param {string} word Word to set status for.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         * @param {Array<string>=} opt_suggestions Suggestions.
         * @private
         */
        private setWordStatus_(word: string, status: goog.spell.SpellCheck.WordStatus, opt_suggestions?: string[]):
            void;

        /**
         * Returns suggestions for the given word.
         *
         * @param {string} word Word to get suggestions for.
         * @return {Array<string>} An array of suggestions for the given word.
         */
        getSuggestions(word: string): string[];
    }
}

declare namespace goog.spell.SpellCheck {
    /**
     * Object representing a word changed event. Fired when the status of a word
     * changes.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class WordChangedEvent extends __WordChangedEvent {}
    abstract class __WordChangedEvent extends goog.events.__Event {
        /**
         * @param {goog.spell.SpellCheck} target Spellcheck object initiating event.
         * @param {string} word Word to set status for.
         * @param {goog.spell.SpellCheck.WordStatus} status Status of word.
         */
        constructor(target: goog.spell.SpellCheck, word: string, status: goog.spell.SpellCheck.WordStatus);

        /**
         * Word the status has changed for.
         * @type {string}
         */
        word: string;

        /**
         * New status
         * @type {goog.spell.SpellCheck.WordStatus}
         */
        status: goog.spell.SpellCheck.WordStatus;
    }

    /**
     * Constants for event names
     *
     * @enum {string}
     */
    enum EventType { READY, ERROR, WORD_CHANGED }

    /**
     * Codes representing the status of an individual word.
     *
     * @enum {number}
     */
    enum WordStatus { UNKNOWN, VALID, INVALID, IGNORED, CORRECTED }

    /**
     * Fields for word array in cache.
     *
     * @enum {number}
     */
    enum CacheIndex { STATUS, SUGGESTIONS }

    /**
     * Regular expression for identifying word boundaries.
     *
     * @type {string}
     */
    let WORD_BOUNDARY_CHARS: string;

    /**
     * Regular expression for identifying word boundaries.
     *
     * @type {RegExp}
     */
    let WORD_BOUNDARY_REGEX: RegExp;

    /**
     * Regular expression for splitting a string into individual words and blocks of
     * separators. Matches zero or one word followed by zero or more separators.
     *
     * @type {RegExp}
     */
    let SPLIT_REGEX: RegExp;
}
