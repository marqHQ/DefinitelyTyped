/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>
/// <reference path="../rangeendpoint.d.ts"/>

declare module 'goog:goog.dom.browserrange.IeRange' {
    import alias = goog.dom.browserrange.IeRange;
    export default alias;
}

declare namespace goog.dom.browserrange {
    /**
     * The constructor for IE specific browser ranges.
     * @extends {goog.dom.browserrange.AbstractRange}
     * @final
     */
    class IeRange extends __IeRange {}
    abstract class __IeRange extends goog.dom.browserrange.__AbstractRange {
        /**
         * @param {TextRange} range The range object.
         * @param {Document} doc The document the range exists in.
         */
        constructor(range: TextRange, doc: Document);

        /**
         * Lazy cache of the node containing the entire selection.
         * @private {Node}
         */
        private parentNode_: any /*missing*/;

        /**
         * Lazy cache of the node containing the start of the selection.
         * @private {Node}
         */
        private startNode_: any /*missing*/;

        /**
         * Lazy cache of the node containing the end of the selection.
         * @private {Node}
         */
        private endNode_: any /*missing*/;

        /**
         * Lazy cache of the offset in startNode_ where this range starts.
         * @private {number}
         */
        private startOffset_: any /*missing*/;

        /**
         * Lazy cache of the offset in endNode_ where this range ends.
         * @private {number}
         */
        private endOffset_: any /*missing*/;

        /**
         * The browser range object this class wraps.
         * @private {TextRange}
         */
        private range_: any /*missing*/;

        /**
         * The document the range exists in.
         * @private {Document}
         */
        private doc_: any /*missing*/;

        /**
         * Clears the cached values for containers.
         * @private
         */
        private clearCachedValues_(): void;

        /**
         * Helper method to find the deepest parent for this range, starting
         * the search from `node`, which must contain the range.
         * @param {Node} node The node to start the search from.
         * @return {Node} The deepest parent for this range.
         * @private
         */
        private findDeepestContainer_(node: Node): Node;

        /**
         * Recurses to find the correct node for the given endpoint.
         * @param {goog.dom.RangeEndpoint} endpoint The endpoint to get the node for.
         * @param {Node=} opt_node Optional node to start the search from.
         * @return {Node} The deepest node containing the endpoint.
         * @private
         */
        private getEndpointNode_(endpoint: goog.dom.RangeEndpoint, opt_node?: Node): Node;

        /**
         * Compares one endpoint of this range with the endpoint of a node.
         * For internal methods, we should prefer this method to containsNode.
         * containsNode has a lot of false negatives when we're dealing with
         * {@code <br>} tags.
         *
         * @param {Node} node The node to compare against.
         * @param {goog.dom.RangeEndpoint} thisEndpoint The endpoint of this range
         *     to compare with.
         * @param {goog.dom.RangeEndpoint} otherEndpoint The endpoint of the node
         *     to compare with.
         * @return {number} 0 if the endpoints are equal, negative if this range
         *     endpoint comes before the other node endpoint, and positive otherwise.
         * @private
         */
        private compareNodeEndpoints_(
            node: Node, thisEndpoint: goog.dom.RangeEndpoint, otherEndpoint: goog.dom.RangeEndpoint
        ): number;

        /**
         * Returns the offset into the start/end container.
         * @param {goog.dom.RangeEndpoint} endpoint The endpoint to get the offset for.
         * @param {Node=} opt_container The container to get the offset relative to.
         *     Defaults to the value returned by getStartNode/getEndNode.
         * @return {number} The offset.
         * @private
         */
        private getOffset_(endpoint: goog.dom.RangeEndpoint, opt_container?: Node): number;

        /**
         * Tests whether this range is valid (i.e. whether its endpoints are still in
         * the document).  A range becomes invalid when, after this object was created,
         * either one or both of its endpoints are removed from the document.  Use of
         * an invalid range can lead to runtime errors, particularly in IE.
         * @return {boolean} Whether the range is valid.
         */
        isRangeInDocument(): boolean;
    }
}

declare namespace goog.dom.browserrange.IeRange {
    /**
     * Create a range object that selects the given node's text.
     * @param {Node} node The node to select.
     * @return {!goog.dom.browserrange.IeRange} An IE range wrapper object.
     */
    function createFromNodeContents(node: Node): goog.dom.browserrange.IeRange;

    /**
     * Static method that returns the proper type of browser range.
     * @param {Node} startNode The node to start with.
     * @param {number} startOffset The offset within the start node.
     * @param {Node} endNode The node to end with.
     * @param {number} endOffset The offset within the end node.
     * @return {!goog.dom.browserrange.AbstractRange} A wrapper object.
     */
    function createFromNodes(startNode: Node, startOffset: number, endNode: Node, endOffset: number):
        goog.dom.browserrange.AbstractRange;
}
