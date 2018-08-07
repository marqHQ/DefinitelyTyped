/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./enterhandler.d.ts"/>
/// <reference path="../../dom/tagname.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>

declare module 'goog:goog.editor.plugins.TagOnEnterHandler' {
    import alias = goog.editor.plugins.TagOnEnterHandler;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle enter keys. This subclass normalizes all browsers to use
     * the given block tag on enter.
     * @extends {goog.editor.plugins.EnterHandler}
     */
    class TagOnEnterHandler extends __TagOnEnterHandler {}
    abstract class __TagOnEnterHandler extends goog.editor.plugins.__EnterHandler {
        /**
         * @param {!goog.dom.TagName} tag The type of tag to add on enter.
         */
        constructor(tag: goog.dom.TagName<any>);

        /**
         * Ensures the current node is wrapped in the tag.
         * @param {Node} node The node to ensure gets wrapped.
         * @param {Element} container Element containing the selection.
         * @return {Element} Element containing the selection, after the wrapping.
         * @private
         */
        private ensureNodeIsWrappedW3c_(node: Node, container: Element): Element;

        /**
         * If The cursor is in an empty LI then break out of the list like in IE
         * @param {Node} li LI to break out of.
         * @return {!Element} Element to put the cursor after.
         * @private
         */
        private breakOutOfEmptyListItemGecko_(li: Node): Element;

        /**
         * When we delete an element, FF inserts a BR. We want to strip that
         * BR after the fact, but in the case where your cursor is at a character
         * right before a BR and you delete that character, we don't want to
         * strip it. So we detect this case on keydown and mark the BR as not needing
         * removal.
         * @param {goog.dom.AbstractRange} range The closure range object.
         * @param {boolean} isBackspace Whether this is handling the backspace key.
         * @private
         */
        private markBrToNotBeRemoved_(range: goog.dom.AbstractRange, isBackspace: boolean): void;

        /**
         * If we hit delete/backspace to merge elements, FF inserts a BR.
         * We want to strip that BR. In markBrToNotBeRemoved, we detect if
         * there was already a BR there before the delete/backspace so that
         * we don't accidentally remove a user-inserted BR.
         * @param {boolean} isBackSpace Whether this is handling the backspace key.
         * @private
         */
        private removeBrIfNecessary_(isBackSpace: boolean): void;

        /**
         * Called in response to a normal enter keystroke. It has the action of
         * splitting elements.
         * @return {Element} The node that the cursor should be before.
         * @private
         */
        private handleRegularEnterGecko_(): Element;

        /**
         * Scroll the cursor into view, resulting from splitting the paragraph/adding
         * a br. It behaves differently than scrollIntoView
         * @param {Element} element The element immediately following the cursor. Will
         *     be used to determine how to scroll in order to make the cursor visible.
         *     CANNOT be a BR, as they do not have offsetHeight/offsetTop.
         * @private
         */
        private scrollCursorIntoViewGecko_(element: Element): void;
    }
}

declare namespace goog.editor.plugins.TagOnEnterHandler {
}
