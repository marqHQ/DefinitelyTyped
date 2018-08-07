/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>
/// <reference path="./basenode.d.ts"/>

declare module 'goog:goog.ui.tree.TypeAhead' {
    import alias = goog.ui.tree.TypeAhead;
    export default alias;
}

declare module 'goog:goog.ui.tree.TypeAhead.Offset' {
    import alias = goog.ui.tree.TypeAhead.Offset;
    export default alias;
}

declare namespace goog.ui.tree {
    /**
     * Constructs a TypeAhead object.
     * @final
     */
    class TypeAhead extends __TypeAhead {}
    abstract class __TypeAhead {
        /**
         */
        constructor();

        /**
         * Map of tree nodes to allow for quick access by characters in the label
         * text.
         * @private {goog.structs.Trie<Array<goog.ui.tree.BaseNode>>}
         */
        private nodeMap_: any /*missing*/;

        /**
         * Buffer for storing typeahead characters.
         * @private {string}
         */
        private buffer_: any /*missing*/;

        /**
         * Matching labels from the latest typeahead search.
         * @private {?Array<string>}
         */
        private matchingLabels_: any /*missing*/;

        /**
         * Matching nodes from the latest typeahead search. Used when more than
         * one node is present with the same label text.
         * @private {?Array<goog.ui.tree.BaseNode>}
         */
        private matchingNodes_: any /*missing*/;

        /**
         * Specifies the current index of the label from the latest typeahead search.
         * @private {number}
         */
        private matchingLabelIndex_: any /*missing*/;

        /**
         * Specifies the index into matching nodes when more than one node is found
         * with the same label.
         * @private {number}
         */
        private matchingNodeIndex_: any /*missing*/;

        /**
         * Handles navigation keys.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @return {boolean} The handled value.
         */
        handleNavigation(e: goog.events.BrowserEvent): boolean;

        /**
         * Handles the character presses.
         * @param {goog.events.BrowserEvent} e The browser event.
         *    Expected event type is goog.events.KeyHandler.EventType.KEY.
         * @return {boolean} The handled value.
         */
        handleTypeAheadChar(e: goog.events.BrowserEvent): boolean;

        /**
         * Adds or updates the given node in the nodemap. The label text is used as a
         * key and the node id is used as a value. In the case that the key already
         * exists, such as when more than one node exists with the same label, then this
         * function creates an array to hold the multiple nodes.
         * @param {goog.ui.tree.BaseNode} node Node to be added or updated.
         */
        setNodeInMap(node: goog.ui.tree.BaseNode): void;

        /**
         * Removes the given node from the nodemap.
         * @param {goog.ui.tree.BaseNode} node Node to be removed.
         */
        removeNodeFromMap(node: goog.ui.tree.BaseNode): void;

        /**
         * Select the first matching node for the given typeahead.
         * @param {string} typeAhead Typeahead characters to match.
         * @return {boolean} True iff a node is found.
         * @private
         */
        private jumpToLabel_(typeAhead: string): boolean;

        /**
         * Select the next or previous node based on the offset.
         * @param {goog.ui.tree.TypeAhead.Offset} offset DOWN or UP.
         * @return {boolean} Whether a node is found.
         * @private
         */
        private jumpTo_(offset: goog.ui.tree.TypeAhead.Offset): boolean;

        /**
         * Given a nodes array reveals and selects the node while using node index.
         * @param {Array<goog.ui.tree.BaseNode>|undefined} nodes Nodes array to select
         *     the node from.
         * @return {boolean} Whether a matching node was found.
         * @private
         */
        private selectMatchingNode_(nodes: goog.ui.tree.BaseNode[]|undefined): boolean;

        /**
         * Clears the typeahead buffer.
         */
        clear(): void;
    }
}

declare namespace goog.ui.tree.TypeAhead {
    /**
     * Enum for offset values that are used for ctrl-key navigation among the
     * multiple matches of a given typeahead buffer.
     *
     * @enum {number}
     */
    enum Offset { DOWN, UP }
}
