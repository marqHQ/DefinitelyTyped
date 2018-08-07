/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.Blockquote' {
    import alias = goog.editor.plugins.Blockquote;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle splitting block quotes.  This plugin does nothing on its
     * own and should be used in conjunction with EnterHandler or one of its
     * subclasses.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class Blockquote extends __Blockquote {}
    abstract class __Blockquote extends goog.editor.__Plugin {
        /**
         * @param {boolean} requiresClassNameToSplit Whether to split only blockquotes
         *     that have the given classname.
         * @param {string=} opt_className The classname to apply to generated
         *     blockquotes.  Defaults to 'tr_bq'.
         */
        constructor(requiresClassNameToSplit: boolean, opt_className?: string);

        /**
         * Whether we only split blockquotes that have {@link classname}, or whether
         * all blockquote tags should be split on enter.
         * @type {boolean}
         * @private
         */
        private requiresClassNameToSplit_: boolean;

        /**
         * Classname to put on blockquotes that are generated via the toolbar for
         * blockquote, so that we can internally distinguish these from blockquotes
         * that are used for indentation.  This classname can be over-ridden by
         * clients for styling or other purposes.
         * @type {string}
         * @private
         */
        private className_: string;

        /**
         * Checks if a node is a blockquote which can be split. A splittable blockquote
         * meets the following criteria:
         * <ol>
         *   <li>Node is a blockquote element</li>
         *   <li>Node has the blockquote classname if the classname is required to
         *       split</li>
         * </ol>
         *
         * @param {Node} node DOM node in question.
         * @return {boolean} Whether the node is a splittable blockquote.
         */
        isSplittableBlockquote(node: Node): boolean;

        /**
         * Checks if a node is a blockquote element which has been setup.
         * @param {Node} node DOM node to check.
         * @return {boolean} Whether the node is a blockquote with the required class
         *     name applied.
         */
        isSetupBlockquote(node: Node): boolean;

        /**
         * Checks if a node is a blockquote element which has not been setup yet.
         * @param {Node} node DOM node to check.
         * @return {boolean} Whether the node is a blockquote without the required
         *     class name applied.
         */
        isUnsetupBlockquote(node: Node): boolean;

        /**
         * Gets the class name required for setup blockquotes.
         * @return {string} The blockquote class name.
         */
        getBlockquoteClassName(): string;

        /**
         * Version of splitQuotedBlock_ that uses W3C ranges.
         * @param {Object} anchorPos The current cursor position.
         * @return {boolean} Whether the blockquote was split.
         * @private
         */
        private splitQuotedBlockW3C_(anchorPos: Object): boolean;

        /**
         * Inserts an empty text node before the field's range.
         * @return {!Node} The empty text node.
         * @private
         */
        private insertEmptyTextNodeBeforeRange_(): Node;

        /**
         * IE version of splitQuotedBlock_.
         * @param {Node} splitNode The current cursor position.
         * @return {boolean} Whether the blockquote was split.
         * @private
         */
        private splitQuotedBlockIE_(splitNode: Node): boolean;
    }
}

declare namespace goog.editor.plugins.Blockquote {
    /**
     * Command implemented by this plugin.
     * @type {string}
     */
    let SPLIT_COMMAND: string;

    /**
     * Class ID used to identify this plugin.
     * @type {string}
     */
    let CLASS_ID: string;
}
