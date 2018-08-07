/// <reference path="../../../globals.d.ts"/>
/// <reference path="./savedrange.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>
/// <reference path="./dom.d.ts"/>

declare module 'goog:goog.dom.SavedCaretRange' {
    import alias = goog.dom.SavedCaretRange;
    export default alias;
}

declare namespace goog.dom {
    /**
     * A struct for holding context about saved selections.
     * This can be used to preserve the selection and restore while the DOM is
     * manipulated, or through an asynchronous call. Use goog.dom.Range factory
     * methods to obtain an {@see goog.dom.AbstractRange} instance, and use
     * {@see goog.dom.AbstractRange#saveUsingCarets} to obtain a SavedCaretRange.
     * For editor ranges under content-editable elements or design-mode iframes,
     * prefer using {@see goog.editor.range.saveUsingNormalizedCarets}.
     * @extends {goog.dom.SavedRange}
     */
    class SavedCaretRange extends __SavedCaretRange {}
    abstract class __SavedCaretRange extends goog.dom.__SavedRange {
        /**
         * @param {goog.dom.AbstractRange} range The range being saved.
         */
        constructor(range: goog.dom.AbstractRange);

        /**
         * The DOM id of the caret at the start of the range.
         * @type {string}
         * @private
         */
        private startCaretId_: string;

        /**
         * The DOM id of the caret at the end of the range.
         * @type {string}
         * @private
         */
        private endCaretId_: string;

        /**
         * Whether the range is reversed (anchor at the end).
         * @private {boolean}
         */
        private reversed_: any /*missing*/;

        /**
         * A DOM helper for storing the current document context.
         * @type {goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * Gets the range that this SavedCaretRage represents, without selecting it
         * or removing the carets from the DOM.
         * @return {goog.dom.AbstractRange?} An abstract range.
         * @suppress {missingRequire} circular dependency
         */
        toAbstractRange(): goog.dom.AbstractRange|null;

        /**
         * Gets carets.
         * @param {boolean} start If true, returns the start caret. Otherwise, get the
         *     end caret.
         * @return {Element} The start or end caret in the given document.
         */
        getCaret(start: boolean): Element;

        /**
         * Removes the carets from the current restoration document.
         * @param {goog.dom.AbstractRange=} opt_range A range whose offsets have already
         *     been adjusted for caret removal; it will be adjusted if it is also
         *     affected by post-removal operations, such as text node normalization.
         * @return {goog.dom.AbstractRange|undefined} The adjusted range, if opt_range
         *     was provided.
         */
        removeCarets(opt_range?: goog.dom.AbstractRange): goog.dom.AbstractRange|undefined;

        /**
         * Sets the document where the range will be restored.
         * @param {!Document} doc An HTML document.
         */
        setRestorationDocument(doc: Document): void;

        /**
         * Creates a caret element.
         * @param {boolean} start If true, creates the start caret. Otherwise,
         *     creates the end caret.
         * @return {!Element} The new caret element.
         * @private
         */
        private createCaret_(start: boolean): Element;
    }
}

declare namespace goog.dom.SavedCaretRange {
    /**
     * A regex that will match all saved range carets in a string.
     * @type {RegExp}
     */
    let CARET_REGEX: RegExp;

    /**
     * Returns whether two strings of html are equal, ignoring any saved carets.
     * Thus two strings of html whose only difference is the id of their saved
     * carets will be considered equal, since they represent html with the
     * same selection.
     * @param {string} str1 The first string.
     * @param {string} str2 The second string.
     * @return {boolean} Whether two strings of html are equal, ignoring any
     *     saved carets.
     */
    function htmlEqual(str1: string, str2: string): boolean;
}
