/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>
/// <reference path="../nodetype.d.ts"/>

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches any node of the given type.
     * @extends {goog.dom.pattern.AbstractPattern}
     * @final
     */
    class NodeType extends __NodeType {}
    abstract class __NodeType extends goog.dom.pattern.__AbstractPattern {
        /**
         * @param {goog.dom.NodeType} nodeType The node type to match.
         */
        constructor(nodeType: goog.dom.NodeType);

        /**
         * The node type to match.
         * @type {goog.dom.NodeType}
         * @private
         */
        private nodeType_: goog.dom.NodeType;
    }
}
