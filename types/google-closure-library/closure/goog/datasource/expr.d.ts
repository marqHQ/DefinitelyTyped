/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datasource.d.ts"/>

declare module 'goog:goog.ds.Expr' {
    import alias = goog.ds.Expr;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Create a new expression. An expression uses a string expression language, and
     * from this string and a passed in DataNode can evaluate to a value, DataNode,
     * or a DataNodeList.
     *
     * @final
     */
    class Expr extends __Expr {}
    abstract class __Expr {
        /**
         * @param {string=} opt_expr The string expression.
         */
        constructor(opt_expr?: string);

        /**
         * Set the source expression text & parse
         *
         * @param {string} expr The string expression source.
         * @param {Array=} opt_parts Array of the parts of an expression.
         * @param {goog.ds.Expr=} opt_childExpr Optional child of this expression,
         *   passed in as a hint for processing.
         * @param {goog.ds.Expr=} opt_prevExpr Optional preceding expression
         *   (i.e. $A/B/C is previous expression to B/C) passed in as a hint for
         *   processing.
         * @private
         */
        private setSource_(expr: string, opt_parts?: any[], opt_childExpr?: goog.ds.Expr, opt_prevExpr?: goog.ds.Expr):
            void;

        /**
         * Get the source data path for the expression
         * @return {string} The path.
         */
        getSource(): string;

        /**
         * Gets the last part of the expression.
         * @return {?string} Last part of the expression.
         */
        getLast(): string|null;

        /**
         * Gets the parent expression of this expression, or null if this is top level
         * @return {goog.ds.Expr} The parent.
         */
        getParent(): goog.ds.Expr;

        /**
         * Gets the parent expression of this expression, or null if this is top level
         * @return {goog.ds.Expr} The parent.
         */
        getNext(): goog.ds.Expr;

        /**
         * Evaluate an expression on a data node, and return a value
         * Recursively walks through child nodes to evaluate
         * TODO(user) Support other expression functions
         *
         * @param {goog.ds.DataNode=} opt_ds Optional datasource to evaluate against.
         *     If not provided, evaluates against DataManager global root.
         * @return {*} Value of the node, or null if doesn't exist.
         * @suppress {missingRequire} Cannot depend on goog.ds.DataManager because
         *     it creates a circular dependency.
         */
        getValue(opt_ds?: goog.ds.DataNode): any;

        /**
         * Evaluate an expression on a data node, and return matching nodes
         * Recursively walks through child nodes to evaluate
         *
         * @param {goog.ds.DataNode=} opt_ds Optional datasource to evaluate against.
         *     If not provided, evaluates against data root.
         * @param {boolean=} opt_canCreate If true, will try to create new nodes.
         * @return {goog.ds.DataNodeList} Matching nodes.
         */
        getNodes(opt_ds?: goog.ds.DataNode, opt_canCreate?: boolean): goog.ds.DataNodeList;

        /**
         * Evaluate an expression on a data node, and return the first matching node
         * Recursively walks through child nodes to evaluate
         *
         * @param {goog.ds.DataNode=} opt_ds Optional datasource to evaluate against.
         *     If not provided, evaluates against DataManager global root.
         * @param {boolean=} opt_canCreate If true, will try to create new nodes.
         * @return {goog.ds.DataNode} Matching nodes, or null if doesn't exist.
         */
        getNode(opt_ds?: goog.ds.DataNode, opt_canCreate?: boolean): goog.ds.DataNode;

        /**
         * Evaluate an expression on a data node, and return the first matching node
         * Recursively walks through child nodes to evaluate
         *
         * @param {goog.ds.DataNode=} opt_ds Optional datasource to evaluate against.
         *     If not provided, evaluates against DataManager global root.
         * @param {boolean=} opt_selectOne Whether to return single matching DataNode
         *     or matching nodes in DataNodeList.
         * @param {boolean=} opt_canCreate If true, will try to create new nodes.
         * @return {goog.ds.DataNode|goog.ds.DataNodeList} Matching node or nodes,
         *     depending on value of opt_selectOne.
         * @private
         * @suppress {missingRequire} Cannot depend on goog.ds.DataManager because
         *     it creates a circular dependency.
         */
        private getNodes_(opt_ds?: goog.ds.DataNode, opt_selectOne?: boolean, opt_canCreate?: boolean):
            goog.ds.DataNode|goog.ds.DataNodeList;

        /**
         * Whether the expression can be null.
         *
         * @type {boolean}
         * @private
         */
        private canBeEmpty_: boolean;

        /**
         * The parsed paths in the expression
         *
         * @type {Array<string>}
         * @private
         */
        private parts_: string[];

        /**
         * Number of paths in the expression
         *
         * @type {?number}
         * @private
         */
        private size_: number|null;

        /**
         * The root node path in the expression
         *
         * @type {string}
         * @private
         */
        private root_: string;

        /**
         * The last path in the expression
         *
         * @type {?string}
         * @private
         */
        private last_: string|null;

        /**
         * Whether the expression evaluates to current node
         *
         * @type {boolean}
         * @private
         */
        private isCurrent_: boolean;

        /**
         * Whether the expression is just an attribute
         *
         * @type {boolean}
         * @private
         */
        private isJustAttribute_: boolean;

        /**
         * Does this expression select all DOM-style child nodes (element and text)
         *
         * @type {boolean}
         * @private
         */
        private isAllChildNodes_: boolean;

        /**
         * Does this expression select all DOM-style attribute nodes (starts with '@')
         *
         * @type {boolean}
         * @private
         */
        private isAllAttributes_: boolean;

        /**
         * Does this expression select all DOM-style element child nodes
         *
         * @type {boolean}
         * @private
         */
        private isAllElements_: boolean;

        /**
         * The function used by this expression
         *
         * @type {?string}
         * @private
         */
        private exprFn_: string|null;

        /**
         * Cached value for the parent expression.
         * @type {goog.ds.Expr?}
         * @private
         */
        private parentExpr_: goog.ds.Expr|null;

        /**
         * Cached value for the next expression.
         * @type {goog.ds.Expr?}
         * @private
         */
        private nextExpr_: goog.ds.Expr|null;
    }
}

declare namespace goog.ds.Expr {
    /**
     * Create an expression from a string, can use cached values
     *
     * @param {string} expr The expression string.
     * @return {goog.ds.Expr} The expression object.
     */
    function create(expr: string): goog.ds.Expr;

    /**
     * The current node
     */
    let CURRENT: any /*missing*/;

    /**
     * For DOM interop - all DOM child nodes (text + element).
     * Text nodes have dataName #text
     */
    let ALL_CHILD_NODES: any /*missing*/;

    /**
     * For DOM interop - all DOM element child nodes
     */
    let ALL_ELEMENTS: any /*missing*/;

    /**
     * For DOM interop - all DOM attribute nodes
     * Attribute nodes have dataName starting with "@"
     */
    let ALL_ATTRIBUTES: any /*missing*/;

    /**
     * Get the dataName of a node
     */
    let NAME: any /*missing*/;

    /**
     * Get the count of nodes matching an expression
     */
    let COUNT: any /*missing*/;

    /**
     * Get the position of the "current" node in the current node list
     * This will only apply for datasources that support the concept of a current
     * node (none exist yet). This is similar to XPath position() and concept of
     * current node
     */
    let POSITION: any /*missing*/;
}
