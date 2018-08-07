/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datasource.d.ts"/>

declare module 'goog:goog.ds.JsPropertyDataSource' {
    import alias = goog.ds.JsPropertyDataSource;
    export default alias;
}

declare module 'goog:goog.ds.JsDataSource' {
    import alias = goog.ds.JsDataSource;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Data source whose backing is JavaScript data
     *
     * Names that are reserved for system use and shouldn't be used for data node
     * names: eval, toSource, toString, unwatch, valueOf, watch. Behavior is
     * undefined if these names are used.
     *
     * @extends {goog.ds.DataNode}
     */
    class JsDataSource extends __JsDataSource {}
    abstract class __JsDataSource extends goog.ds.__DataNode {
        /**
         * @param {Object} root The root JS node.
         * @param {string} dataName The name of this node relative to the parent node.
         * @param {Object=} opt_parent Optional parent of this JsDataSource.
         *
         * implements goog.ds.DataNode.
         */
        constructor(root: Object, dataName: string, opt_parent?: Object);

        /**
         * The root JS object. Can be null.
         * @type {*}
         * @protected
         * @suppress {underscore|visibility}
         */
        protected root_: any;

        /**
         * Sets the root JS object
         * @param {Object} root The root JS object. Can be null.
         *
         * @protected
         */
        protected setRoot(root: Object): void;

        /**
         * Set this data source to use list semantics. List data sources:
         * - Are assumed to have child nodes of all of the same type of data
         * - Fire data changes on the root node of the list whenever children
         *     are added or removed
         * @param {?boolean} isList True to use list semantics.
         * @private
         */
        private setIsList_(isList: boolean|null): void;

        /**
         * Creates the DataNodeList with the child nodes for this element.
         * Allows for only building list as needed.
         *
         * @param {boolean=} opt_force Whether to force recreating child nodes,
         *     defaults to false.
         * @private
         */
        private createChildNodes_(opt_force?: boolean): void;
    }

    /**
     * Data source for JavaScript properties that arent objects. Contains reference
     * to parent object so that you can set the vaule
     *
     * @extends {goog.ds.BaseDataNode}
     * @final
     */
    class JsPropertyDataSource extends __JsPropertyDataSource {}
    abstract class __JsPropertyDataSource extends goog.ds.__BaseDataNode {
        /**
         * @param {goog.ds.DataNode} parent Parent object.
         * @param {string} dataName Name of this property.
         * @param {goog.ds.DataNode=} opt_parentDataNode The parent data node. If
         *     omitted, assumes that the parent object is the parent data node.
         *
         */
        constructor(parent: goog.ds.DataNode, dataName: string, opt_parentDataNode?: goog.ds.DataNode);

        /**
         * Get the value of the node
         * @return {Object} The value of the node, or null if no value.
         */
        get(): Object;
    }
}
