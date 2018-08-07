/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>

declare module 'goog:goog.dom.browserrange.W3cRange' {
    import alias = goog.dom.browserrange.W3cRange;
    export default alias;
}

declare namespace goog.dom.browserrange {
    /**
     * The constructor for W3C specific browser ranges.
     * @extends {goog.dom.browserrange.AbstractRange}
     */
    class W3cRange extends __W3cRange {}
    abstract class __W3cRange extends goog.dom.browserrange.__AbstractRange {
        /**
         * @param {Range} range The range object.
         */
        constructor(range: Range);

        /**
         * Select this range.
         * @param {Selection} selection Browser selection object.
         * @param {*} reverse Whether to select this range in reverse.
         * @protected
         */
        protected selectInternal(selection: Selection, reverse: any): void;
    }
}

declare namespace goog.dom.browserrange.W3cRange {
    /**
     * Creates a range object that selects the given node's text.
     * @param {Node} node The node to select.
     * @return {!goog.dom.browserrange.W3cRange} A Gecko range wrapper object.
     */
    function createFromNodeContents(node: Node): goog.dom.browserrange.W3cRange;

    /**
     * Creates a range object that selects between the given nodes.
     * @param {Node} startNode The node to start with.
     * @param {number} startOffset The offset within the start node.
     * @param {Node} endNode The node to end with.
     * @param {number} endOffset The offset within the end node.
     * @return {!goog.dom.browserrange.W3cRange} A wrapper object.
     */
    function createFromNodes(startNode: Node, startOffset: number, endNode: Node, endOffset: number):
        goog.dom.browserrange.W3cRange;
}
