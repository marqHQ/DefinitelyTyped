/// <reference path="../../../globals.d.ts"/>
/// <reference path="../iter/iter.d.ts"/>

declare module 'goog:goog.dom.iter.SiblingIterator' {
    import alias = goog.dom.iter.SiblingIterator;
    export default alias;
}

declare module 'goog:goog.dom.iter.ChildIterator' {
    import alias = goog.dom.iter.ChildIterator;
    export default alias;
}

declare module 'goog:goog.dom.iter.AncestorIterator' {
    import alias = goog.dom.iter.AncestorIterator;
    export default alias;
}

declare namespace goog.dom.iter {
    /**
     * Iterator over a Node's siblings.
     * @extends {goog.iter.Iterator}
     */
    class SiblingIterator extends __SiblingIterator {}
    abstract class __SiblingIterator extends goog.iter.__Iterator<any> {
        /**
         * @param {Node} node The node to start with.
         * @param {boolean=} opt_includeNode Whether to return the given node as the
         *     first return value from next.
         * @param {boolean=} opt_reverse Whether to traverse siblings in reverse
         *     document order.
         */
        constructor(node: Node, opt_includeNode?: boolean, opt_reverse?: boolean);

        /**
         * The current node, or null if iteration is finished.
         * @type {Node}
         * @private
         */
        private node_: Node;

        /**
         * Whether to iterate in reverse.
         * @type {boolean}
         * @private
         */
        private reverse_: boolean;
    }

    /**
     * Iterator over an Element's children.
     * @extends {goog.dom.iter.SiblingIterator}
     * @final
     */
    class ChildIterator extends __ChildIterator {}
    abstract class __ChildIterator extends goog.dom.iter.__SiblingIterator {
        /**
         * @param {Element} element The element to iterate over.
         * @param {boolean=} opt_reverse Optionally traverse children from last to
         *     first.
         * @param {number=} opt_startIndex Optional starting index.
         */
        constructor(element: Element, opt_reverse?: boolean, opt_startIndex?: number);
    }

    /**
     * Iterator over a Node's ancestors, stopping after the document body.
     * @extends {goog.iter.Iterator}
     * @final
     */
    class AncestorIterator extends __AncestorIterator {}
    abstract class __AncestorIterator extends goog.iter.__Iterator<any> {
        /**
         * @param {Node} node The node to start with.
         * @param {boolean=} opt_includeNode Whether to return the given node as the
         *     first return value from next.
         */
        constructor(node: Node, opt_includeNode?: boolean);

        /**
         * The current node, or null if iteration is finished.
         * @type {Node}
         * @private
         */
        private node_: Node;
    }
}
