/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./w3crange.d.ts"/>

declare module 'goog:goog.dom.browserrange.WebKitRange' {
    import alias = goog.dom.browserrange.WebKitRange;
    export default alias;
}

declare namespace goog.dom.browserrange {
    /**
     * The constructor for WebKit specific browser ranges.
     * @extends {goog.dom.browserrange.W3cRange}
     * @final
     */
    class WebKitRange extends __WebKitRange {}
    abstract class __WebKitRange extends goog.dom.browserrange.__W3cRange {
        /**
         * @param {Range} range The range object.
         */
        constructor(range: Range);
    }
}

declare namespace goog.dom.browserrange.WebKitRange {
    /**
     * Creates a range object that selects the given node's text.
     * @param {Node} node The node to select.
     * @return {!goog.dom.browserrange.WebKitRange} A WebKit range wrapper object.
     */
    function createFromNodeContents(node: Node): goog.dom.browserrange.WebKitRange;

    /**
     * Creates a range object that selects between the given nodes.
     * @param {Node} startNode The node to start with.
     * @param {number} startOffset The offset within the start node.
     * @param {Node} endNode The node to end with.
     * @param {number} endOffset The offset within the end node.
     * @return {!goog.dom.browserrange.WebKitRange} A wrapper object.
     */
    function createFromNodes(startNode: Node, startOffset: number, endNode: Node, endOffset: number):
        goog.dom.browserrange.WebKitRange;
}
