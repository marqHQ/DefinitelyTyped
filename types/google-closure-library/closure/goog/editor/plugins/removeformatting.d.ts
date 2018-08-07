/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>
/// <reference path="../../dom/savedcaretrange.d.ts"/>

declare module 'goog:goog.editor.plugins.RemoveFormatting' {
    import alias = goog.editor.plugins.RemoveFormatting;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * A plugin to handle removing formatting from selected text.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class RemoveFormatting extends __RemoveFormatting {}
    abstract class __RemoveFormatting extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * Optional function to perform remove formatting in place of the
         * provided removeFormattingWorker_.
         * @type {?function(string): string}
         * @private
         */
        private optRemoveFormattingFunc_: ((_0: string) => string)|null;

        /**
         * The key that this plugin triggers on when pressed with the platform
         * modifier key. Can be set by calling {@link #setKeyboardShortcutKey}.
         * @type {string}
         * @private
         */
        private keyboardShortcutKey_: string;

        /**
         * @param {string} key
         */
        setKeyboardShortcutKey(key: string): void;

        /**
         * Removes formatting from the current selection.  Removes basic formatting
         * (B/I/U) using the browser's execCommand.  Then extracts the html from the
         * selection to convert, calls either a client's specified removeFormattingFunc
         * callback or trogedit's general built-in removeFormattingWorker_,
         * and then replaces the current selection with the converted text.
         * @private
         */
        private removeFormatting_(): void;

        /**
         * Finds the nearest ancestor of the node that is a table.
         * @param {Node} nodeToCheck Node to search from.
         * @return {Node} The table, or null if one was not found.
         * @private
         */
        private getTableAncestor_(nodeToCheck: Node): Node;

        /**
         * Replaces the contents of the selection with html. Does its best to maintain
         * the original selection. Also does its best to result in a valid DOM.
         *
         * TODO(user): See if there's any way to make this work on Ranges, and then
         * move it into goog.editor.range. The Firefox implementation uses execCommand
         * on the document, so must work on the actual selection.
         *
         * @param {string} html The html string to insert into the range.
         * @private
         */
        private pasteHtml_(html: string): void;

        /**
         * Gets the html inside the selection to send off for further processing.
         *
         * TODO(user): Make this general so that it can be moved into
         * goog.editor.range.  The main reason it can't be moved is because we need to
         * get the range before we do the execCommand and continue to operate on that
         * same range (reasons are documented above).
         *
         * @param {goog.dom.AbstractRange} range The selection.
         * @return {string} The html string to format.
         * @private
         */
        private getHtmlText_(range: goog.dom.AbstractRange): string;

        /**
         * Move the range so that it doesn't include any partially selected tables.
         * @param {goog.dom.AbstractRange} range The range to adjust.
         * @param {Node} startInTable Table node that the range starts in.
         * @param {Node} endInTable Table node that the range ends in.
         * @return {!goog.dom.SavedCaretRange} Range to use to restore the
         *     selection after we run our custom remove formatting.
         * @private
         */
        private adjustRangeForTables_(range: goog.dom.AbstractRange, startInTable: Node, endInTable: Node):
            goog.dom.SavedCaretRange;

        /**
         * Remove a caret from the dom and hide it in a safe place, so it can
         * be restored later via restoreCaretsFromCave.
         * @param {goog.dom.SavedCaretRange} caretRange The caret range to
         *     get the carets from.
         * @param {boolean} isStart Whether this is the start or end caret.
         * @private
         */
        private putCaretInCave_(caretRange: goog.dom.SavedCaretRange, isStart: boolean): void;

        /**
         * Restore carets that were hidden away by adding them back into the dom.
         * Note: this does not restore to the original dom location, as that
         * will likely have been modified with remove formatting.  The only
         * guarantees here are that start will still be before end, and that
         * they will be in the editable region.  This should only be used when
         * you don't actually intend to USE the caret again.
         * @private
         */
        private restoreCaretsFromCave_(): void;

        /**
         * Gets the html inside the current selection, passes it through the given
         * conversion function, and puts it back into the selection.
         *
         * @param {function(string): string} convertFunc A conversion function that
         *    transforms an html string to new html string.
         * @private
         */
        private convertSelectedHtmlText_(convertFunc: (_0: string) => string): void;

        /**
         * Does a best-effort attempt at clobbering all formatting that the
         * browser's execCommand couldn't clobber without being totally inefficient.
         * Attempts to convert visual line breaks to BRs. Leaves anchors that contain an
         * href and images.
         * Adapted from Gmail's MessageUtil's htmlToPlainText. http://go/messageutil.js
         * @param {string} html The original html of the message.
         * @return {string} The unformatted html, which is just text, br's, anchors and
         *     images.
         * @private
         */
        private removeFormattingWorker_(html: string): string;

        /**
         * Handle per node special processing if necessary. If this function returns
         * null then standard cleanup is applied. Otherwise this node and all children
         * are assumed to be cleaned.
         * NOTE(user): If an alternate RemoveFormatting processor is provided
         * (setRemoveFormattingFunc()), this will no longer work.
         * @param {Element} node The node to clean.
         * @return {?string} The HTML strig representation of the cleaned data.
         */
        getValueForNode(node: Element): string|null;

        /**
         * Sets a function to be used for remove formatting.
         * @param {function(string): string} removeFormattingFunc - A function that
         *     takes  a string of html and returns a string of html that does any other
         *     formatting changes desired.  Use this only if trogedit's behavior doesn't
         *     meet your needs.
         */
        setRemoveFormattingFunc(removeFormattingFunc: (_0: string) => string): void;
    }
}

declare namespace goog.editor.plugins.RemoveFormatting {
    /**
     * The editor command this plugin in handling.
     * @type {string}
     */
    let REMOVE_FORMATTING_COMMAND: string;
}
