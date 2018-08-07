/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.structs.Node' {
    import alias = goog.structs.Node;
    export default alias;
}

declare namespace goog.structs {
    /**
     * A generic immutable node. This can be used in various collections that
     * require a node object for its item (such as a heap).
     * @template K, V
     */
    class Node<K, V> extends __Node<K, V> {}
    abstract class __Node<K, V> {
        /**
         * @param {K} key Key.
         * @param {V} value Value.
         */
        constructor(key: K, value: V);

        /**
         * The key.
         * @private {K}
         */
        private key_: K;

        /**
         * The value.
         * @private {V}
         */
        private value_: V;

        /**
         * Gets the key.
         * @return {K} The key.
         */
        getKey(): K;

        /**
         * Gets the value.
         * @return {V} The value.
         */
        getValue(): V;

        /**
         * Clones a node and returns a new node.
         * @return {!goog.structs.Node<K, V>} A new goog.structs.Node with the same
         *     key value pair.
         */
        clone(): goog.structs.Node<K, V>;
    }
}
