/// <reference path="../../../globals.d.ts"/>
/// <reference path="./node.d.ts"/>

declare module 'goog:goog.structs.Heap' {
    import alias = goog.structs.Heap;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Class for a Heap datastructure.
     *
     * @template K, V
     */
    class Heap<K, V> extends __Heap<K, V> {}
    abstract class __Heap<K, V> {
        /**
         * @param {goog.structs.Heap|Object=} opt_heap Optional goog.structs.Heap or
         *     Object to initialize heap with.
         */
        constructor(opt_heap?: goog.structs.Heap<any, any>|Object);

        /**
         * The nodes of the heap.
         * @private
         * @type {Array<goog.structs.Node>}
         */
        private nodes_: goog.structs.Node<any, any>[];

        /**
         * Insert the given value into the heap with the given key.
         * @param {K} key The key.
         * @param {V} value The value.
         */
        insert(key: K, value: V): void;

        /**
         * Adds multiple key-value pairs from another goog.structs.Heap or Object
         * @param {goog.structs.Heap|Object} heap Object containing the data to add.
         */
        insertAll(heap: goog.structs.Heap<any, any>|Object): void;

        /**
         * Retrieves and removes the root value of this heap.
         * @return {V} The value removed from the root of the heap.  Returns
         *     undefined if the heap is empty.
         */
        remove(): V;

        /**
         * Retrieves but does not remove the root value of this heap.
         * @return {V} The value at the root of the heap. Returns
         *     undefined if the heap is empty.
         */
        peek(): V;

        /**
         * Retrieves but does not remove the key of the root node of this heap.
         * @return {K} The key at the root of the heap. Returns undefined if the
         *     heap is empty.
         */
        peekKey(): K;

        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} index The index of the node to move down.
         * @private
         */
        private moveDown_(index: number): void;

        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        private moveUp_(index: number): void;

        /**
         * Gets the index of the left child of the node at the given index.
         * @param {number} index The index of the node to get the left child for.
         * @return {number} The index of the left child.
         * @private
         */
        private getLeftChildIndex_(index: number): number;

        /**
         * Gets the index of the right child of the node at the given index.
         * @param {number} index The index of the node to get the right child for.
         * @return {number} The index of the right child.
         * @private
         */
        private getRightChildIndex_(index: number): number;

        /**
         * Gets the index of the parent of the node at the given index.
         * @param {number} index The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        private getParentIndex_(index: number): number;

        /**
         * Gets the values of the heap.
         * @return {!Array<V>} The values in the heap.
         */
        getValues(): V[];

        /**
         * Gets the keys of the heap.
         * @return {!Array<K>} The keys in the heap.
         */
        getKeys(): K[];

        /**
         * Whether the heap contains the given value.
         * @param {V} val The value to check for.
         * @return {boolean} Whether the heap contains the value.
         */
        containsValue(val: V): boolean;

        /**
         * Whether the heap contains the given key.
         * @param {K} key The key to check for.
         * @return {boolean} Whether the heap contains the key.
         */
        containsKey(key: K): boolean;

        /**
         * Clones a heap and returns a new heap
         * @return {!goog.structs.Heap} A new goog.structs.Heap with the same key-value
         *     pairs.
         */
        clone(): goog.structs.Heap<any, any>;

        /**
         * The number of key-value pairs in the map
         * @return {number} The number of pairs.
         */
        getCount(): number;

        /**
         * Returns true if this heap contains no elements.
         * @return {boolean} Whether this heap contains no elements.
         */
        isEmpty(): boolean;

        /**
         * Removes all elements from the heap.
         */
        clear(): void;
    }
}
