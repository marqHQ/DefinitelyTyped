/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>

declare module 'goog:goog.dom.TextRangeIterator' {
    import alias = goog.dom.TextRangeIterator;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Subclass of goog.dom.TagIterator that iterates over a DOM range.  It
     * adds functions to determine the portion of each text node that is selected.
     *
     * @extends {goog.dom.RangeIterator}
     * @final
     */
    class TextRangeIterator extends __TextRangeIterator {}
    abstract class __TextRangeIterator extends goog.dom.__RangeIterator {
        /**
         * @param {Node} startNode The starting node position.
         * @param {number} startOffset The offset in to startNode.  If startNode is
         *     an element, indicates an offset in to childNodes.  If startNode is a
         *     text node, indicates an offset in to nodeValue.
         * @param {Node} endNode The ending node position.
         * @param {number} endOffset The offset in to endNode.  If endNode is
         *     an element, indicates an offset in to childNodes.  If endNode is a
         *     text node, indicates an offset in to nodeValue.
         * @param {boolean=} opt_reverse Whether to traverse nodes in reverse.
         */
        constructor(startNode: Node, startOffset: number, endNode: Node, endOffset: number, opt_reverse?: boolean);

        /**
         * The first node in the selection.
         * @private {Node}
         */
        private startNode_: any /*missing*/;

        /**
         * The last node in the selection.
         * @private {Node}
         */
        private endNode_: any /*missing*/;

        /**
         * The offset within the first node in the selection.
         * @private {number}
         */
        private startOffset_: any /*missing*/;

        /**
         * The offset within the last node in the selection.
         * @private {number}
         */
        private endOffset_: any /*missing*/;

        /**
         * Whether the node iterator is moving in reverse.
         * @private {boolean}
         */
        private isReversed_: any /*missing*/;

        /**
         * Change the start node of the iterator.
         * @param {Node} node The new start node.
         */
        setStartNode(node: Node): void;

        /**
         * Change the end node of the iterator.
         * @param {Node} node The new end node.
         */
        setEndNode(node: Node): void;

        /**
         * Returns true if the iterator is on the last step before StopIteration is
         * thrown, otherwise false.
         * @return {boolean}
         * @private
         */
        private isLastTag_(): boolean;

        /**
         * Get the last node the iterator will hit.
         * @return {?Node} The last node the iterator will hit.
         * @private
         */
        private lastNode_(): Node|null;
    }
}
