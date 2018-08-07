/// <reference path="../../../globals.d.ts"/>
/// <reference path="./collection.d.ts"/>

declare module 'goog:goog.structs.AvlTree' {
    import alias = goog.structs.AvlTree;
    export default alias;
}

declare module 'goog:goog.structs.AvlTree.Node' {
    import alias = goog.structs.AvlTree.Node;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Constructs an AVL-Tree, which uses the specified comparator to order its
     * values. The values can be accessed efficiently in their sorted order since
     * the tree enforces a O(logn) maximum height.
     *
     * @implements {goog.structs.Collection<T>}
     * @final
     * @template T
     */
    class AvlTree<T> extends __AvlTree<T> {}
    abstract class __AvlTree<T> implements goog.structs.Collection<T> {
        /**
         * @param {Function=} opt_comparator Function used to order the tree's nodes.
         */
        constructor(opt_comparator?: Function);

        /**
         * Pointer to the root node of the tree.
         *
         * @private {goog.structs.AvlTree.Node<T>}
         */
        private root_: any /*missing*/;

        /**
         * Comparison function used to compare values in the tree. This function should
         * take two values, a and b, and return x where:
         * <pre>
         *  x < 0 if a < b,
         *  x > 0 if a > b,
         *  x = 0 otherwise
         * </pre>
         *
         * @type {Function}
         * @private
         */
        private comparator_: Function;

        /**
         * Pointer to the node with the smallest value in the tree.
         *
         * @type {goog.structs.AvlTree.Node<T>}
         * @private
         */
        private minNode_: goog.structs.AvlTree.Node<T>;

        /**
         * Pointer to the node with the largest value in the tree.
         *
         * @type {goog.structs.AvlTree.Node<T>}
         * @private
         */
        private maxNode_: goog.structs.AvlTree.Node<T>;

        /**
         * Removes all nodes from the tree.
         */
        clear(): void;

        /**
         * Returns the index (in an in-order traversal) of the node in the tree with
         * the specified value. For example, the minimum value in the tree will
         * return an index of 0 and the maximum will return an index of n - 1 (where
         * n is the number of nodes in the tree).  If the value is not found then -1
         * is returned.
         *
         * @param {T} value Value in the tree whose in-order index is returned.
         * @return {number} The in-order index of the given value in the
         *     tree or -1 if the value is not found.
         */
        indexOf(value: T): number;

        /**
         * Returns a k-th smallest value, based on the comparator, where 0 <= k <
         * this.getCount().
         * @param {number} k The number k.
         * @return {T} The k-th smallest value.
         */
        getKthValue(k: number): T;

        /**
         * Returns the value u, such that u is contained in the tree and u < v, for all
         * values v in the tree where v != u.
         *
         * @return {T} The minimum value contained in the tree.
         */
        getMinimum(): T;

        /**
         * Returns the value u, such that u is contained in the tree and u > v, for all
         * values v in the tree where v != u.
         *
         * @return {T} The maximum value contained in the tree.
         */
        getMaximum(): T;

        /**
         * Returns the height of the tree (the maximum depth). This height should
         * always be <= 1.4405*(Math.log(n+2)/Math.log(2))-1.3277, where n is the
         * number of nodes in the tree.
         *
         * @return {number} The height of the tree.
         */
        getHeight(): number;

        /**
         * Inserts the values stored in the tree into a new Array and returns the Array.
         *
         * @return {!Array<T>} An array containing all of the trees values in sorted
         *     order.
         */
        getValues(): T[];

        /**
         * Performs an in-order traversal of the tree and calls `func` with each
         * traversed node, optionally starting from the smallest node with a value >= to
         * the specified start value. The traversal ends after traversing the tree's
         * maximum node or when `func` returns a value that evaluates to true.
         *
         * @param {Function} func Function to call on each traversed node.
         * @param {T=} opt_startValue If specified, traversal will begin on the node
         *     with the smallest value >= opt_startValue.
         */
        inOrderTraverse(func: Function, opt_startValue?: T): void;

        /**
         * Performs a reverse-order traversal of the tree and calls `func` with
         * each traversed node, optionally starting from the largest node with a value
         * <= to the specified start value. The traversal ends after traversing the
         * tree's minimum node or when func returns a value that evaluates to true.
         *
         * @param {function(T):?} func Function to call on each traversed node.
         * @param {T=} opt_startValue If specified, traversal will begin on the node
         *     with the largest value <= opt_startValue.
         */
        reverseOrderTraverse(func: (_0: T) => any, opt_startValue?: T): void;

        /**
         * Performs a traversal defined by the supplied `traversalFunc`. The first
         * call to `traversalFunc` is passed the root or the optionally specified
         * startNode. After that, calls `traversalFunc` with the node returned
         * by the previous call to `traversalFunc` until `traversalFunc`
         * returns null or the optionally specified endNode. The first call to
         * traversalFunc is passed the root or the optionally specified startNode.
         *
         * @param {function(
         *     this:goog.structs.AvlTree<T>,
         *     !goog.structs.AvlTree.Node):?goog.structs.AvlTree.Node} traversalFunc
         * Function used to traverse the tree.
         * @param {goog.structs.AvlTree.Node<T>=} opt_startNode The node at which the
         *     traversal begins.
         * @param {goog.structs.AvlTree.Node<T>=} opt_endNode The node at which the
         *     traversal ends.
         * @private
         */
        private traverse_(traversalFunc: (this: goog.structs.AvlTree<T>, _0: goog.structs.AvlTree.Node<any>) => goog.structs.AvlTree.Node<any>|null, opt_startNode?: goog.structs.AvlTree.Node<T>, opt_endNode?: goog.structs.AvlTree.Node<T>): void;

        /**
         * Ensures that the specified node and all its ancestors are balanced. If they
         * are not, performs left and right tree rotations to achieve a balanced
         * tree. This method assumes that at most 2 rotations are necessary to balance
         * the tree (which is true for AVL-trees that are balanced after each node is
         * added or removed).
         *
         * @param {goog.structs.AvlTree.Node<T>} node Node to begin balance from.
         * @private
         */
        private balance_(node: goog.structs.AvlTree.Node<T>): void;

        /**
         * Performs a left tree rotation on the specified node.
         *
         * @param {goog.structs.AvlTree.Node<T>} node Pivot node to rotate from.
         * @private
         */
        private leftRotate_(node: goog.structs.AvlTree.Node<T>): void;

        /**
         * Performs a right tree rotation on the specified node.
         *
         * @param {goog.structs.AvlTree.Node<T>} node Pivot node to rotate from.
         * @private
         */
        private rightRotate_(node: goog.structs.AvlTree.Node<T>): void;

        /**
         * Removes the specified node from the tree and ensures the tree still
         * maintains the AVL-tree balance.
         *
         * @param {goog.structs.AvlTree.Node<T>} node The node to be removed.
         * @private
         */
        private removeNode_(node: goog.structs.AvlTree.Node<T>): void;

        /**
         * Returns the node in the tree that has k nodes before it in an in-order
         * traversal, optionally rooted at `opt_rootNode`.
         *
         * @param {number} k The number of nodes before the node to be returned in an
         *     in-order traversal, where 0 <= k < root.count.
         * @param {goog.structs.AvlTree.Node<T>=} opt_rootNode Optional root node.
         * @return {goog.structs.AvlTree.Node<T>} The node at the specified index.
         * @private
         */
        private getKthNode_(k: number, opt_rootNode?: goog.structs.AvlTree.Node<T>): goog.structs.AvlTree.Node<T>;

        /**
         * Returns the node with the smallest value in tree, optionally rooted at
         * `opt_rootNode`.
         *
         * @param {goog.structs.AvlTree.Node<T>=} opt_rootNode Optional root node.
         * @return {goog.structs.AvlTree.Node<T>} The node with the smallest value in
         *     the tree.
         * @private
         */
        private getMinNode_(opt_rootNode?: goog.structs.AvlTree.Node<T>): goog.structs.AvlTree.Node<T>;

        /**
         * Returns the node with the largest value in tree, optionally rooted at
         * opt_rootNode.
         *
         * @param {goog.structs.AvlTree.Node<T>=} opt_rootNode Optional root node.
         * @return {goog.structs.AvlTree.Node<T>} The node with the largest value in
         *     the tree.
         * @private
         */
        private getMaxNode_(opt_rootNode?: goog.structs.AvlTree.Node<T>): goog.structs.AvlTree.Node<T>;

        /**
         * @param {T} value Value to add to the collection.
         */
        add(value: T): void;

        /**
         * @param {T} value Value to remove from the collection.
         */
        remove(value: T): void;

        /**
         * @param {T} value Value to find in the collection.
         * @return {boolean} Whether the collection contains the specified value.
         */
        contains(value: T): boolean;

        /**
         * @return {number} The number of values stored in the collection.
         */
        getCount(): number;
    }
}

declare namespace goog.structs.AvlTree {
    /**
     * Constructs an AVL-Tree node with the specified value. If no parent is
     * specified, the node's parent is assumed to be null. The node's height
     * defaults to 1 and its children default to null.
     *
     * @final
     * @template T
     */
    class Node<T> extends __Node<T> {}
    abstract class __Node<T> {
        /**
         * @param {T} value Value to store in the node.
         * @param {goog.structs.AvlTree.Node<T>=} opt_parent Optional parent node.
         */
        constructor(value: T, opt_parent?: goog.structs.AvlTree.Node<T>);

        /**
         * The value stored by the node.
         *
         * @type {T}
         */
        value: T;

        /**
         * The node's parent. Null if the node is the root.
         *
         * @type {goog.structs.AvlTree.Node<T>}
         */
        parent: goog.structs.AvlTree.Node<T>;

        /**
         * The number of nodes in the subtree rooted at this node.
         *
         * @type {number}
         */
        count: number;

        /**
         * The node's left child. Null if the node does not have a left child.
         *
         * @type {?goog.structs.AvlTree.Node<T>}
         */
        left: goog.structs.AvlTree.Node<T>|null;

        /**
         * The node's right child. Null if the node does not have a right child.
         *
         * @type {?goog.structs.AvlTree.Node<T>}
         */
        right: goog.structs.AvlTree.Node<T>|null;

        /**
         * The height of the tree rooted at this node.
         *
         * @type {number}
         */
        height: number;

        /**
         * Returns true iff the specified node has a parent and is the right child of
         * its parent.
         *
         * @return {boolean} Whether the specified node has a parent and is the right
         *    child of its parent.
         */
        isRightChild(): boolean;

        /**
         * Returns true iff the specified node has a parent and is the left child of
         * its parent.
         *
         * @return {boolean} Whether the specified node has a parent and is the left
         *    child of its parent.
         */
        isLeftChild(): boolean;
    }
}
