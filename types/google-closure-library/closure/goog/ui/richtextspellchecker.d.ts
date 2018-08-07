/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractspellchecker.d.ts"/>
/// <reference path="../spell/spellcheck.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../string/stringbuffer.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.RichTextSpellChecker' {
    import alias = goog.ui.RichTextSpellChecker;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Rich text spell checker implementation.
     *
     * @extends {goog.ui.AbstractSpellChecker}
     */
    class RichTextSpellChecker extends __RichTextSpellChecker {}
    abstract class __RichTextSpellChecker extends goog.ui.__AbstractSpellChecker {
        /**
         * @param {goog.spell.SpellCheck} handler Instance of the SpellCheckHandler
         *     support object to use. A single instance can be shared by multiple editor
         *     components.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(handler: goog.spell.SpellCheck, opt_domHelper?: goog.dom.DomHelper);

        /**
         * String buffer for use in reassembly of the original text.
         * @type {goog.string.StringBuffer}
         * @private
         */
        private workBuffer_: goog.string.StringBuffer;

        /**
         * Bound async function (to avoid rebinding it on every call).
         * @type {Function}
         * @private
         */
        private boundContinueAsyncFn_: Function;

        /**
         * Event handler for listening to events without leaking.
         * @private {!goog.events.EventHandler}
         */
        private eventHandler_: any /*missing*/;

        /**
         * The object handling keyboard events.
         * @private {!goog.events.KeyHandler}
         */
        private keyHandler_: any /*missing*/;

        /**
         * Root node for rich editor.
         * @type {Node}
         * @private
         */
        private rootNode_: Node;

        /**
         * Indicates whether the root node for the rich editor is an iframe.
         * @private {boolean}
         */
        private rootNodeIframe_: any /*missing*/;

        /**
         * Current node where spell checker has interrupted to go to the next stack
         * frame.
         * @type {Node}
         * @private
         */
        private currentNode_: Node;

        /**
         * Counter of inserted elements. Used in processing loop to attempt to preserve
         * existing nodes if they contain no misspellings.
         * @type {number}
         * @private
         */
        private elementsInserted_: number;

        /**
         * Number of words to scan to precharge the dictionary.
         * @type {number}
         * @private
         */
        private dictionaryPreScanSize_: number;

        /**
         * Class name for word spans.
         * @type {string}
         */
        wordClassName: string;

        /**
         * DomHelper to be used for interacting with the editable document/element.
         *
         * @type {goog.dom.DomHelper|undefined}
         * @private
         */
        private editorDom_: goog.dom.DomHelper|undefined;

        /**
         * Tag name portion of the marker for the text that does not need to be checked
         * for spelling.
         *
         * @type {Array<string|undefined>}
         */
        excludeTags: string|undefined[];

        /**
         * CSS Style text for invalid words. As it's set inside the rich edit iframe
         * classes defined in the parent document are not available, thus the style is
         * set inline.
         * @type {string}
         */
        invalidWordCssText: string;

        /**
         * Processes nodes recursively.
         *
         * @param {Node} node Node to start with.
         * @param {number} words Max number of words to process.
         * @private
         */
        private preChargeDictionary_(node: Node, words: number): void;

        /**
         * Starts actual processing after the dictionary is charged.
         * @param {goog.events.Event} e goog.spell.SpellCheck.EventType.READY event.
         * @private
         */
        private onDictionaryCharged_(e: goog.events.Event): void;

        /**
         * Continues asynchrnonous spell checking.
         * @private
         */
        private continueAsync_(): void;

        /**
         * Finalizes spelling check.
         * @private
         */
        private finishCheck_(): void;

        /**
         * Finds next node in our enumeration of the tree.
         *
         * @param {Node} node The node to which we're computing the next node for.
         * @return {Node} The next node or null if none was found.
         * @private
         */
        private nextNode_(node: Node): Node;

        /**
         * Determines if the node is text node without any children.
         *
         * @param {Node} node The node to check.
         * @return {boolean} Whether the node is a text leaf node.
         * @private
         */
        private isTextLeaf_(node: Node): boolean;

        /**
         * Determines if the node is excluded from checking.
         *
         * @param {Node} node The node to check.
         * @return {boolean} Whether the node is excluded.
         * @private
         */
        private isExcluded_(node: Node): boolean;

        /**
         * Processes nodes recursively.
         *
         * @param {Node} node Node where to start.
         * @return {goog.ui.AbstractSpellChecker.AsyncResult|undefined} Result code.
         * @private
         */
        private processNode_(node: Node): goog.ui.AbstractSpellChecker.AsyncResult|undefined;

        /**
         * Processes nodes recursively, removes all spell checker markup, and
         * consolidates text nodes.
         *
         * @param {Node} node node on which to recurse.
         * @private
         */
        private restoreNode_(node: Node): void;

        /**
         * Handler for click events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @private
         */
        private onWordClick_(event: goog.events.BrowserEvent): void;

        /**
         * Returns whether the editor node is an iframe.
         *
         * @return {boolean} true the editor node is an iframe, otherwise false.
         * @protected
         */
        protected isEditorIframe(): boolean;

        /**
         * Handles keyboard events inside the editor to allow keyboard navigation
         * between misspelled words and activation of the suggestion menu.
         *
         * @param {goog.events.BrowserEvent} e the key event.
         * @return {boolean} The handled value.
         * @protected
         */
        protected handleRootNodeKeyEvent(e: goog.events.BrowserEvent): boolean;

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
