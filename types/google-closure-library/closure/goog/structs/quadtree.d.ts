/// <reference path="../../../globals.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>

declare module 'goog:goog.structs.QuadTree' {
    import alias = goog.structs.QuadTree;
    export default alias;
}

declare module 'goog:goog.structs.QuadTree.Point' {
    import alias = goog.structs.QuadTree.Point;
    export default alias;
}

declare module 'goog:goog.structs.QuadTree.Node' {
    import alias = goog.structs.QuadTree.Node;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Constructs a new quad tree.
     * @final
     */
    class QuadTree extends __QuadTree {}
    abstract class __QuadTree {
        /**
         * @param {number} minX Minimum x-value that can be held in tree.
         * @param {number} minY Minimum y-value that can be held in tree.
         * @param {number} maxX Maximum x-value that can be held in tree.
         * @param {number} maxY Maximum y-value that can be held in tree.
         */
        constructor(minX: number, minY: number, maxX: number, maxY: number);

        /**
         * Count of the number of items in the tree.
         * @private {number}
         */
        private count_: number;

        /**
         * The root node for the quad tree.
         * @private {goog.structs.QuadTree.Node}
         */
        private root_: goog.structs.QuadTree.Node;

        /**
         * Returns a reference to the tree's root node.  Callers shouldn't modify nodes,
         * directly.  This is a convenience for visualization and debugging purposes.
         * @return {goog.structs.QuadTree.Node} The root node.
         */
        getRootNode(): goog.structs.QuadTree.Node;

        /**
         * Sets the value of an (x, y) point within the quad-tree.
         * @param {number} x The x-coordinate.
         * @param {number} y The y-coordinate.
         * @param {*} value The value associated with the point.
         */
        set(x: number, y: number, value: any): void;

        /**
         * Gets the value of the point at (x, y) or null if the point is empty.
         * @param {number} x The x-coordinate.
         * @param {number} y The y-coordinate.
         * @param {*=} opt_default The default value to return if the node doesn't
         *     exist.
         * @return {*} The value of the node, the default value if the node
         *     doesn't exist, or undefined if the node doesn't exist and no default
         *     has been provided.
         */
        get(x: number, y: number, opt_default?: any): any;

        /**
         * Removes a point from (x, y) if it exists.
         * @param {number} x The x-coordinate.
         * @param {number} y The y-coordinate.
         * @return {*} The value of the node that was removed, or null if the
         *     node doesn't exist.
         */
        remove(x: number, y: number): any;

        /**
         * Returns true if the point at (x, y) exists in the tree.
         * @param {number} x The x-coordinate.
         * @param {number} y The y-coordinate.
         * @return {boolean} Whether the tree contains a point at (x, y).
         */
        contains(x: number, y: number): boolean;

        /**
         * @return {boolean} Whether the tree is empty.
         */
        isEmpty(): boolean;

        /**
         * @return {number} The number of items in the tree.
         */
        getCount(): number;

        /**
         * Removes all items from the tree.
         */
        clear(): void;

        /**
         * Returns an array containing the coordinates of each point stored in the tree.
         * @return {!Array<goog.math.Coordinate?>} Array of coordinates.
         */
        getKeys(): goog.math.Coordinate|null[];

        /**
         * Returns an array containing all values stored within the tree.
         * @return {!Array<Object>} The values stored within the tree.
         */
        getValues(): Object[];

        /**
         * Clones the quad-tree and returns the new instance.
         * @return {!goog.structs.QuadTree} A clone of the tree.
         */
        clone(): goog.structs.QuadTree;

        /**
         * Traverses the tree and calls a function on each node.
         * @param {function(?, goog.math.Coordinate, goog.structs.QuadTree)} fn
         *     The function to call for every value. This function takes 3 arguments
         *     (the value, the coordinate, and the tree itself) and the return value is
         *     irrelevant.
         * @param {Object=} opt_obj The object to be used as the value of 'this'
         *     within {@ code fn}.
         */
        forEach(fn: (_0: any, _1: goog.math.Coordinate, _2: goog.structs.QuadTree) => void, opt_obj?: Object): void;

        /**
         * Traverses the tree depth-first, with quadrants being traversed in clockwise
         * order (NE, SE, SW, NW).  The provided function will be called for each
         * leaf node that is encountered.
         * @param {goog.structs.QuadTree.Node} node The current node.
         * @param {function(this:goog.structs.QuadTree, goog.structs.QuadTree.Node)} fn
         *     The function to call for each leaf node. This function takes the node as
         *     an argument, and its return value is irrelevant.
         * @private
         */
        private traverse_(
            node: goog.structs.QuadTree.Node, fn: (this: goog.structs.QuadTree, _0: goog.structs.QuadTree.Node) => void
        ): void;

        /**
         * Finds a leaf node with the same (x, y) coordinates as the target point, or
         * null if no point exists.
         * @param {goog.structs.QuadTree.Node} node The node to search in.
         * @param {number} x The x-coordinate of the point to search for.
         * @param {number} y The y-coordinate of the point to search for.
         * @return {goog.structs.QuadTree.Node} The leaf node that matches the target,
         *     or null if it doesn't exist.
         * @private
         */
        private find_(node: goog.structs.QuadTree.Node, x: number, y: number): goog.structs.QuadTree.Node;

        /**
         * Inserts a point into the tree, updating the tree's structure if necessary.
         * @param {goog.structs.QuadTree.Node} parent The parent to insert the point
         *     into.
         * @param {goog.structs.QuadTree.Point} point The point to insert.
         * @return {boolean} True if a new node was added to the tree; False if a node
         *     already existed with the correpsonding coordinates and had its value
         *     reset.
         * @private
         */
        private insert_(parent: goog.structs.QuadTree.Node, point: goog.structs.QuadTree.Point): boolean;

        /**
         * Converts a leaf node to a pointer node and reinserts the node's point into
         * the correct child.
         * @param {goog.structs.QuadTree.Node} node The node to split.
         * @private
         */
        private split_(node: goog.structs.QuadTree.Node): void;

        /**
         * Attempts to balance a node. A node will need balancing if all its children
         * are empty or it contains just one leaf.
         * @param {goog.structs.QuadTree.Node} node The node to balance.
         * @private
         */
        private balance_(node: goog.structs.QuadTree.Node): void;

        /**
         * Returns the child quadrant within a node that contains the given (x, y)
         * coordinate.
         * @param {goog.structs.QuadTree.Node} parent The node.
         * @param {number} x The x-coordinate to look for.
         * @param {number} y The y-coordinate to look for.
         * @return {goog.structs.QuadTree.Node} The child quadrant that contains the
         *     point.
         * @private
         */
        private getQuadrantForPoint_(parent: goog.structs.QuadTree.Node, x: number, y: number):
            goog.structs.QuadTree.Node;

        /**
         * Sets the point for a node, as long as the node is a leaf or empty.
         * @param {goog.structs.QuadTree.Node} node The node to set the point for.
         * @param {goog.structs.QuadTree.Point} point The point to set.
         * @private
         */
        private setPointForNode_(node: goog.structs.QuadTree.Node, point: goog.structs.QuadTree.Point): void;
    }
}

declare namespace goog.structs.QuadTree {
    /**
     * Constructs a new quad tree node.
     * @final
     */
    class Node extends __Node {}
    abstract class __Node {
        /**
         * @param {number} x X-coordiate of node.
         * @param {number} y Y-coordinate of node.
         * @param {number} w Width of node.
         * @param {number} h Height of node.
         * @param {goog.structs.QuadTree.Node=} opt_parent Optional parent node.
         */
        constructor(x: number, y: number, w: number, h: number, opt_parent?: goog.structs.QuadTree.Node);

        /**
         * The x-coordinate of the node.
         * @type {number}
         */
        x: number;

        /**
         * The y-coordinate of the node.
         * @type {number}
         */
        y: number;

        /**
         * The width of the node.
         * @type {number}
         */
        w: number;

        /**
         * The height of the node.
         * @type {number}
         */
        h: number;

        /**
         * The parent node.
         * @type {goog.structs.QuadTree.Node?}
         */
        parent: goog.structs.QuadTree.Node|null;

        /**
         * The node's type.
         * @type {goog.structs.QuadTree.NodeType}
         */
        nodeType: goog.structs.QuadTree.NodeType;

        /**
         * The child node in the North-West quadrant.
         * @type {goog.structs.QuadTree.Node?}
         */
        nw: goog.structs.QuadTree.Node|null;

        /**
         * The child node in the North-East quadrant.
         * @type {goog.structs.QuadTree.Node?}
         */
        ne: goog.structs.QuadTree.Node|null;

        /**
         * The child node in the South-West quadrant.
         * @type {goog.structs.QuadTree.Node?}
         */
        sw: goog.structs.QuadTree.Node|null;

        /**
         * The child node in the South-East quadrant.
         * @type {goog.structs.QuadTree.Node?}
         */
        se: goog.structs.QuadTree.Node|null;

        /**
         * The point for the node, if it is a leaf node.
         * @type {goog.structs.QuadTree.Point?}
         */
        point: goog.structs.QuadTree.Point|null;
    }

    /**
     * Creates a new point object.
     * @final
     */
    class Point extends __Point {}
    abstract class __Point {
        /**
         * @param {number} x The x-coordinate of the point.
         * @param {number} y The y-coordinate of the point.
         * @param {*=} opt_value Optional value associated with the point.
         */
        constructor(x: number, y: number, opt_value?: any);

        /**
         * The x-coordinate for the point.
         * @type {number}
         */
        x: number;

        /**
         * The y-coordinate for the point.
         * @type {number}
         */
        y: number;

        /**
         * Optional value associated with the point.
         * @type {*}
         */
        value: any;
    }

    /**
     * Enumeration of node types.
     * @enum {number}
     */
    enum NodeType { EMPTY, LEAF, POINTER }
}
