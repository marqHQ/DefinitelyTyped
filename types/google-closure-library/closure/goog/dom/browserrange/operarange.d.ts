/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./w3crange.d.ts"/>

declare module 'goog:goog.dom.browserrange.OperaRange' {
    import alias = goog.dom.browserrange.OperaRange;
    export default alias;
}

declare namespace goog.dom.browserrange {
    /**
     * The constructor for Opera specific browser ranges.
     * @extends {goog.dom.browserrange.W3cRange}
     * @final
     */
    class OperaRange extends __OperaRange {}
    abstract class __OperaRange extends goog.dom.browserrange.__W3cRange {
        /**
         * @param {Range} range The range object.
         */
        constructor(range: Range);
    }
}

declare namespace goog.dom.browserrange.OperaRange {
    /**
     * Creates a range object that selects the given node's text.
     * @param {Node} node The node to select.
     * @return {!goog.dom.browserrange.OperaRange} A Opera range wrapper object.
     */
    function createFromNodeContents(node: Node): goog.dom.browserrange.OperaRange;

    /**
     * Creates a range object that selects between the given nodes.
     * @param {Node} startNode The node to start with.
     * @param {number} startOffset The offset within the node to start.
     * @param {Node} endNode The node to end with.
     * @param {number} endOffset The offset within the node to end.
     * @return {!goog.dom.browserrange.OperaRange} A wrapper object.
     */
    function createFromNodes(startNode: Node, startOffset: number, endNode: Node, endOffset: number):
        goog.dom.browserrange.OperaRange;
}
