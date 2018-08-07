/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../dom/tagname.d.ts"/>
/// <reference path="../../events/event.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>
/// <reference path="../range.d.ts"/>

declare module 'goog:goog.editor.plugins.EnterHandler' {
    import alias = goog.editor.plugins.EnterHandler;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle enter keys. This does all the crazy to normalize (as much as
     * is reasonable) what happens when you hit enter. This also handles the
     * special casing of hitting enter in a blockquote.
     *
     * In IE, Webkit, and Opera, the resulting HTML uses one DIV tag per line. In
     * Firefox, the resulting HTML uses BR tags at the end of each line.
     *
     * @extends {goog.editor.Plugin}
     */
    class EnterHandler extends __EnterHandler {}
    abstract class __EnterHandler extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * The type of block level tag to add on enter, for browsers that support
         * specifying the default block-level tag. Can be overriden by subclasses; must
         * be either DIV or P.
         * @type {!goog.dom.TagName}
         * @protected
         */
        protected tag: goog.dom.TagName<any>;

        /**
         * Gets HTML with no contents that won't collapse, for browsers that
         * collapse the empty string.
         * @return {string} Blank html.
         * @protected
         */
        protected getNonCollapsingBlankHtml(): string;

        /**
         * Internal backspace handler.
         * @param {goog.events.Event} e The keypress event.
         * @param {goog.dom.AbstractRange} range The closure range object.
         * @protected
         */
        protected handleBackspaceInternal(e: goog.events.Event, range: goog.dom.AbstractRange): void;

        /**
         * Fix paragraphs to be the correct type of node.
         * @param {goog.events.Event} e The `<enter>` key event.
         * @param {boolean} split Whether we already split up a blockquote by
         *     manually inserting elements.
         * @protected
         */
        protected processParagraphTagsInternal(e: goog.events.Event, split: boolean): void;

        /**
         * Internal delete key handler.
         * @param {goog.events.Event} e The keypress event.
         * @protected
         */
        protected handleDeleteGecko(e: goog.events.Event): void;

        /**
         * Deletes the element at the cursor if it is a BR node, and if it does, calls
         * e.preventDefault to stop the browser from deleting. Only necessary in Gecko
         * as a workaround for mozilla bug 205350 where deleting a BR that is followed
         * by a block element doesn't work (the BR gets immediately replaced). We also
         * need to account for an ill-formed cursor which occurs from us trying to
         * stop the browser from deleting.
         *
         * @param {goog.events.Event} e The DELETE keypress event.
         * @protected
         */
        protected deleteBrGecko(e: goog.events.Event): void;

        /**
         * Internal handler for keyup events.
         * @param {goog.events.Event} e The key event.
         * @protected
         */
        protected handleKeyUpInternal(e: goog.events.Event): void;

        /**
         * Handles an enter keypress event on fields in Gecko.
         * @param {goog.events.BrowserEvent} e The key event.
         * @private
         */
        private handleEnterGecko_(e: goog.events.BrowserEvent): void;

        /**
         * Handle an enter key press in WebKit.
         * @param {goog.events.BrowserEvent} e The key press event.
         * @protected
         */
        protected handleEnterWebkitInternal(e: goog.events.BrowserEvent): void;

        /**
         * Handle an enter key press on collapsed selection.  handleEnterGecko_ ensures
         * the selection is collapsed by deleting its contents if it is not.  The
         * default implementation does nothing.
         * @param {goog.events.BrowserEvent} e The key press event.
         * @param {boolean} wasCollapsed Whether the selection was collapsed before
         *     the key press.  If it was not, code before this function has already
         *     cleared the contents of the selection.
         * @param {goog.dom.AbstractRange} range Object representing the selection.
         * @protected
         */
        protected handleEnterAtCursorGeckoInternal(
            e: goog.events.BrowserEvent, wasCollapsed: boolean, range: goog.dom.AbstractRange
        ): void;

        /**
         * Ensures all text in IE and Opera to be in the given tag in order to control
         * Enter spacing. Call this when Enter is pressed if desired.
         *
         * We want to make sure the user is always inside of a block (or other nodes
         * listed in goog.editor.plugins.EnterHandler.IGNORE_ENSURE_BLOCK_NODES_).  We
         * listen to keypress to force nodes that the user is leaving to turn into
         * blocks, but we also need to listen to keyup to force nodes that the user is
         * entering to turn into blocks.
         * Example:  html is: `<h2>foo[cursor]</h2>`, and the user hits enter.  We
         * don't want to format the h2, but we do want to format the P that is
         * created on enter.  The P node is not available until keyup.
         * @param {!goog.dom.TagName} tag The tag name to convert to.
         * @param {boolean=} opt_keyUp Whether the function is being called on key up.
         *     When called on key up, the cursor is in the newly created node, so the
         *     semantics for when to change it to a block are different.  Specifically,
         *     if the resulting node contains only a BR, it is converted to `<tag>`.
         * @protected
         */
        protected ensureBlockIeOpera(tag: goog.dom.TagName<any>, opt_keyUp?: boolean): void;

        /**
         * Deletes the content at the current cursor position.
         * @return {!Node|!Object} Something representing the current cursor position.
         *    See deleteCursorSelectionIE_ and deleteCursorSelectionW3C_ for details.
         *    Should be passed to releasePositionObject_ when no longer in use.
         * @private
         */
        private deleteCursorSelection_(): Node|Object;

        /**
         * Releases the object returned by deleteCursorSelection_.
         * @param {Node|Object} position The object returned by deleteCursorSelection_.
         * @private
         */
        private releasePositionObject_(position: Node|Object): void;

        /**
         * Delete the selection at the current cursor position, then returns a temporary
         * node at the current position.
         * @return {!Node} A temporary node marking the current cursor position. This
         *     node should eventually be removed from the DOM.
         * @private
         */
        private deleteCursorSelectionIE_(): Node;

        /**
         * Delete the selection at the current cursor position, then returns the node
         * at the current position.
         * @return {!goog.editor.range.Point} The current cursor position. Note that
         *    unlike simulateEnterIE_, this should not be removed from the DOM.
         * @private
         */
        private deleteCursorSelectionW3C_(): goog.editor.range.Point;
    }
}

declare namespace goog.editor.plugins.EnterHandler {
    /**
     * Determines whether the lowest containing block node is a blockquote.
     * @param {Node} n The node.
     * @return {boolean} Whether the deepest block ancestor of n is a blockquote.
     */
    function isDirectlyInBlockquote(n: Node): boolean;
}
