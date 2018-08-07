/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.dom.NodeOffset' {
    import alias = goog.dom.NodeOffset;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Object to store the offset from one node to another in a way that works on
     * any similar DOM structure regardless of whether it is the same actual nodes.
     * @extends {goog.Disposable}
     * @final
     */
    class NodeOffset extends __NodeOffset {}
    abstract class __NodeOffset extends goog.__Disposable {
        /**
         * @param {Node} node The node to get the offset for.
         * @param {Node} baseNode The node to calculate the offset from.
         */
        constructor(node: Node, baseNode: Node);

        /**
         * A stack of childNode offsets.
         * @type {Array<number>}
         * @private
         */
        private offsetStack_: number[];

        /**
         * A stack of childNode names.
         * @type {Array<string>}
         * @private
         */
        private nameStack_: string[];

        /**
         * Walk the dom and find the node relative to baseNode.  Returns null on
         * failure.
         * @param {Node} baseNode The node to start walking from.  Should be equivalent
         *     to the node passed in to the constructor, in that it should have the
         *     same contents.
         * @return {Node} The node relative to baseNode, or null on failure.
         */
        findTargetNode(baseNode: Node): Node;
    }
}
