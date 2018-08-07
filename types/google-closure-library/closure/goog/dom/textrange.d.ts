/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>
/// <reference path="./browserrange/abstractrange.d.ts"/>
/// <reference path="./savedrange.d.ts"/>

declare module 'goog:goog.dom.TextRange' {
    import alias = goog.dom.TextRange;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Create a new text selection with no properties.  Do not use this constructor:
     * use one of the goog.dom.Range.createFrom* methods instead.
     * @extends {goog.dom.AbstractRange}
     * @final
     */
    class TextRange extends __TextRange {}
    abstract class __TextRange extends goog.dom.__AbstractRange {
        /**
         */
        constructor();

        /**
         * The browser specific range wrapper.  This can be null if one of the other
         * representations of the range is specified.
         * @private {goog.dom.browserrange.AbstractRange?}
         */
        private browserRangeWrapper_: any /*missing*/;

        /**
         * The start node of the range.  This can be null if one of the other
         * representations of the range is specified.
         * @private {Node}
         */
        private startNode_: any /*missing*/;

        /**
         * The start offset of the range.  This can be null if one of the other
         * representations of the range is specified.
         * @private {?number}
         */
        private startOffset_: any /*missing*/;

        /**
         * The end node of the range.  This can be null if one of the other
         * representations of the range is specified.
         * @private {Node}
         */
        private endNode_: any /*missing*/;

        /**
         * The end offset of the range.  This can be null if one of the other
         * representations of the range is specified.
         * @private {?number}
         */
        private endOffset_: any /*missing*/;

        /**
         * Whether the focus node is before the anchor node.
         * @private {boolean}
         */
        private isReversed_: any /*missing*/;

        /**
         * Clear all cached values.
         * @private
         */
        private clearCachedValues_(): void;

        /**
         * @return {!goog.dom.browserrange.AbstractRange} The range wrapper object.
         * @private
         */
        private getBrowserRangeWrapper_(): goog.dom.browserrange.AbstractRange;

        /**
         * Moves a TextRange to the provided nodes and offsets.
         * @param {Node} startNode The node to start with.
         * @param {number} startOffset The offset within the node to start.
         * @param {Node} endNode The node to end with.
         * @param {number} endOffset The offset within the node to end.
         * @param {boolean} isReversed Whether the range is reversed.
         */
        moveToNodes(startNode: Node, startOffset: number, endNode: Node, endOffset: number, isReversed: boolean): void;

        /**
         * Surrounds the text range with the specified element (on Mozilla) or with a
         * clone of the specified element (on IE).  Returns a reference to the
         * surrounding element if the operation was successful; returns null if the
         * operation failed.
         * @param {Element} element The element with which the selection is to be
         *    surrounded.
         * @return {Element} The surrounding element (same as the argument on Mozilla,
         *    but not on IE), or null if unsuccessful.
         */
        surroundContents(element: Element): Element;
    }

    /**
     * A SavedRange implementation using DOM endpoints.
     * @extends {goog.dom.SavedRange}
     * @private
     */
    class DomSavedTextRange_ extends __DomSavedTextRange_ {}
    abstract class __DomSavedTextRange_ extends goog.dom.__SavedRange {
        /**
         * @param {goog.dom.AbstractRange} range The range to save.
         */
        constructor(range: goog.dom.AbstractRange);

        /**
         * The anchor node.
         * @type {Node}
         * @private
         */
        private anchorNode_: Node;

        /**
         * The anchor node offset.
         * @type {number}
         * @private
         */
        private anchorOffset_: number;

        /**
         * The focus node.
         * @type {Node}
         * @private
         */
        private focusNode_: Node;

        /**
         * The focus node offset.
         * @type {number}
         * @private
         */
        private focusOffset_: number;
    }
}

declare namespace goog.dom.TextRange {
    /**
     * Create a new range wrapper from the given browser range object.  Do not use
     * this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Range|TextRange} range The browser range object.
     * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
     *     node.
     * @return {!goog.dom.TextRange} A range wrapper object.
     */
    function createFromBrowserRange(range: Range|TextRange, opt_isReversed?: boolean): goog.dom.TextRange;

    /**
     * Create a new range wrapper that selects the given node's text.  Do not use
     * this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Node} node The node to select.
     * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
     *     node.
     * @return {!goog.dom.TextRange} A range wrapper object.
     */
    function createFromNodeContents(node: Node, opt_isReversed?: boolean): goog.dom.TextRange;

    /**
     * Create a new range wrapper that selects the area between the given nodes,
     * accounting for the given offsets.  Do not use this method directly - please
     * use goog.dom.Range.createFrom* instead.
     * @param {Node} anchorNode The node to start with.
     * @param {number} anchorOffset The offset within the node to start.
     * @param {Node} focusNode The node to end with.
     * @param {number} focusOffset The offset within the node to end.
     * @return {!goog.dom.TextRange} A range wrapper object.
     */
    function createFromNodes(anchorNode: Node, anchorOffset: number, focusNode: Node, focusOffset: number):
        goog.dom.TextRange;

    /**
     * Tests if the given node is in a document.
     * @param {Node} node The node to check.
     * @return {boolean} Whether the given node is in the given document.
     */
    function isAttachedNode(node: Node): boolean;
}
