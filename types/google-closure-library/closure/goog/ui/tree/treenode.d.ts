/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./basenode.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.ui.tree.TreeNode' {
    import alias = goog.ui.tree.TreeNode;
    export default alias;
}

declare namespace goog.ui.tree {
    /**
     * A single node in the tree.
     * @extends {goog.ui.tree.BaseNode}
     */
    class TreeNode extends __TreeNode {}
    abstract class __TreeNode extends goog.ui.tree.__BaseNode {
        /**
         * @param {string|!goog.html.SafeHtml} content The content of the node label.
         *     Strings are treated as plain-text and will be HTML escaped.
         * @param {Object=} opt_config The configuration for the tree. See
         *    goog.ui.tree.TreeControl.defaultConfig. If not specified, a default config
         *    will be used.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(content: string|goog.html.SafeHtml, opt_config?: Object, opt_domHelper?: goog.dom.DomHelper);
    }
}
