/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datasource.d.ts"/>

declare module 'goog:goog.ds.PrimitiveFastDataNode' {
    import alias = goog.ds.PrimitiveFastDataNode;
    export default alias;
}

declare module 'goog:goog.ds.FastListNode' {
    import alias = goog.ds.FastListNode;
    export default alias;
}

declare module 'goog:goog.ds.FastDataNode' {
    import alias = goog.ds.FastDataNode;
    export default alias;
}

declare module 'goog:goog.ds.AbstractFastDataNode' {
    import alias = goog.ds.AbstractFastDataNode;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Creates a new abstract data node.
     * @extends {goog.ds.DataNodeList}
     */
    class AbstractFastDataNode extends __AbstractFastDataNode {}
    abstract class __AbstractFastDataNode extends goog.ds.__DataNodeList {
        /**
         * @param {string} dataName Name of the datanode.
         * @param {goog.ds.DataNode=} opt_parent Parent of this data node.
         */
        constructor(dataName: string, opt_parent?: goog.ds.DataNode);
    }

    /**
     * Creates a new fast data node, using the properties of root.
     * @extends {goog.ds.AbstractFastDataNode}
     */
    class FastDataNode extends __FastDataNode {}
    abstract class __FastDataNode extends goog.ds.__AbstractFastDataNode {
        /**
         * @param {Object} root JSON-like object to initialize data node from.
         * @param {string} dataName Name of this data node.
         * @param {goog.ds.DataNode=} opt_parent Parent of this data node.
         */
        constructor(root: Object, dataName: string, opt_parent?: goog.ds.DataNode);

        /**
         * Add all attributes of object to this data node.
         * @param {Object} object Object to add attributes from.
         * @protected
         */
        protected extendWith(object: Object): void;

        /**
         * Makes sure that a named child is wrapped in a data node structure.
         * @param {string} name Name of child to wrap.
         * @private
         */
        private wrapChild_(name: string): void;

        /**
         * Returns a javascript object representation of this data node. You should
         * not modify the object returned by this function.
         * @return {!Object} Javascript object representation of this data node.
         */
        getJsObject(): Object;

        /**
         * Creates a deep copy of this data node.
         * @return {goog.ds.FastDataNode} Clone of this data node.
         */
        clone(): goog.ds.FastDataNode;
    }

    /**
     * Creates a new data node wrapping a primitive value.
     * @extends {goog.ds.AbstractFastDataNode}
     * @final
     */
    class PrimitiveFastDataNode extends __PrimitiveFastDataNode {}
    abstract class __PrimitiveFastDataNode extends goog.ds.__AbstractFastDataNode {
        /**
         * @param {number|boolean|string} value Value the value to wrap.
         * @param {string} dataName name Name of this data node.
         * @param {goog.ds.DataNode=} opt_parent Parent of this data node.
         */
        constructor(value: number|boolean|string, dataName: string, opt_parent?: goog.ds.DataNode);

        /**
         * Returns a javascript object representation of this data node. You should
         * not modify the object returned by this function.
         * @return {*} Javascript object representation of this data node.
         */
        getJsObject(): any;
    }

    /**
     * Creates a new list node from an array.
     * @extends {goog.ds.AbstractFastDataNode}
     * @final
     */
    class FastListNode extends __FastListNode {}
    abstract class __FastListNode extends goog.ds.__AbstractFastDataNode {
        /**
         * @param {Array<?>} values values hold by this list node.
         * @param {string} dataName name of this node.
         * @param {goog.ds.DataNode=} opt_parent parent of this node.
         */
        constructor(values: any[], dataName: string, opt_parent?: goog.ds.DataNode);

        /**
         * Tries to interpret key as a numeric index enclosed by square brakcets.
         * @param {string} key Key that should be interpreted as a number.
         * @return {?number} Numeric index or null if key is not of the form
         *  described above.
         * @private
         */
        private getKeyAsNumber_(key: string): number|null;

        /**
         * Fire data changes that are appropriate when the size of this list changes.
         * Should be called whenever the list size has changed.
         * @private
         */
        private listSizeChanged_(): void;

        /**
         * Returns a javascript object representation of this data node. You should
         * not modify the object returned by this function.
         * @return {!Object} Javascript object representation of this data node.
         */
        getJsObject(): Object;

        /**
         * Returns the index of a named child nodes. This method only works if
         * this list uses mixed name/indexed lookup, i.e. if its child node have
         * an 'id' attribute.
         * @param {string} name Name of child node to determine index of.
         * @return {number} Index of child node named name.
         */
        indexOf(name: string): number;
    }
}

declare namespace goog.ds.FastDataNode {
    /**
     * Creates a new FastDataNode structure initialized from object. This will
     * return an instance of the most suitable sub-class of FastDataNode.
     *
     * You should not modify object after creating a fast data node from it
     * or assume that changing object changes the data node. Doing so results
     * in undefined behaviour.
     *
     * @param {Object|number|boolean|string} object Object to initialize data
     *     node from.
     * @param {string} dataName Name of data node.
     * @param {goog.ds.DataNode=} opt_parent Parent of data node.
     * @return {!goog.ds.AbstractFastDataNode} Data node representing object.
     */
    function fromJs(object: Object|number|boolean|string, dataName: string, opt_parent?: goog.ds.DataNode):
        goog.ds.AbstractFastDataNode;
}
