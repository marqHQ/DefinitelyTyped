/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./basenode.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>
/// <reference path="./treenode.d.ts"/>

declare module 'goog:goog.ui.tree.TreeControl' {
    import alias = goog.ui.tree.TreeControl;
    export default alias;
}

declare namespace goog.ui.tree {
    /**
     * This creates a TreeControl object. A tree control provides a way to
     * view a hierarchical set of data.
     * @extends {goog.ui.tree.BaseNode}
     */
    class TreeControl extends __TreeControl {}
    abstract class __TreeControl extends goog.ui.tree.__BaseNode {
        /**
         * @param {string|!goog.html.SafeHtml} content The content of the node label.
         *     Strings are treated as plain-text and will be HTML escaped.
         * @param {Object=} opt_config The configuration for the tree. See
         *    goog.ui.tree.TreeControl.defaultConfig. If not specified, a default config
         *    will be used.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(content: string|goog.html.SafeHtml, opt_config?: Object, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Used for typeahead support.
         * @private {!goog.ui.tree.TypeAhead}
         */
        private typeAhead_: any /*missing*/;

        /**
         * The object handling keyboard events.
         * @private {?goog.events.KeyHandler}
         */
        private keyHandler_: any /*missing*/;

        /**
         * The object handling focus events.
         * @private {?goog.events.FocusHandler}
         */
        private focusHandler_: any /*missing*/;

        /**
         * Logger
         * @private {?goog.log.Logger}
         */
        private logger_: any /*missing*/;

        /**
         * Whether the tree is focused.
         * @private {boolean}
         */
        private focused_: any /*missing*/;

        /**
         * Child node that currently has focus.
         * @private {?goog.ui.tree.BaseNode}
         */
        private focusedNode_: any /*missing*/;

        /**
         * Whether to show lines.
         * @private {boolean}
         */
        private showLines_: any /*missing*/;

        /**
         * Whether to show expanded lines.
         * @private {boolean}
         */
        private showExpandIcons_: any /*missing*/;

        /**
         * Whether to show the root node.
         * @private {boolean}
         */
        private showRootNode_: any /*missing*/;

        /**
         * Whether to show the root lines.
         * @private {boolean}
         */
        private showRootLines_: any /*missing*/;

        /**
         * Handles focus on the tree.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleFocus_(e: goog.events.BrowserEvent): void;

        /**
         * Handles blur on the tree.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleBlur_(e: goog.events.BrowserEvent): void;

        /**
         * @return {boolean} Whether the tree has keyboard focus.
         */
        hasFocus(): boolean;

        /**
         * Sets the selected item.
         * @param {goog.ui.tree.BaseNode} node The item to select.
         */
        setSelectedItem(node: goog.ui.tree.BaseNode): void;

        /**
         * Returns the selected item.
         * @return {goog.ui.tree.BaseNode} The currently selected item.
         */
        getSelectedItem(): goog.ui.tree.BaseNode;

        /**
         * Sets whether to show lines.
         * @param {boolean} b Whether to show lines.
         */
        setShowLines(b: boolean): void;

        /**
         * @return {boolean} Whether to show lines.
         */
        getShowLines(): boolean;

        /**
         * Updates the lines after the tree has been drawn.
         * @private
         */
        private updateLinesAndExpandIcons_(): void;

        /**
         * Sets whether to show root lines.
         * @param {boolean} b Whether to show root lines.
         */
        setShowRootLines(b: boolean): void;

        /**
         * @return {boolean} Whether to show root lines.
         */
        getShowRootLines(): boolean;

        /**
         * Sets whether to show expand icons.
         * @param {boolean} b Whether to show expand icons.
         */
        setShowExpandIcons(b: boolean): void;

        /**
         * @return {boolean} Whether to show expand icons.
         */
        getShowExpandIcons(): boolean;

        /**
         * Sets whether to show the root node.
         * @param {boolean} b Whether to show the root node.
         */
        setShowRootNode(b: boolean): void;

        /**
         * @return {boolean} Whether to show the root node.
         */
        getShowRootNode(): boolean;

        /**
         * Adds the event listeners to the tree.
         * @private
         */
        private attachEvents_(): void;

        /**
         * Removes the event listeners from the tree.
         * @private
         */
        private detachEvents_(): void;

        /**
         * Handles mouse events.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleMouseEvent_(e: goog.events.BrowserEvent): void;

        /**
         * Handles key down on the tree.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @return {boolean} The handled value.
         */
        handleKeyEvent(e: goog.events.BrowserEvent): boolean;

        /**
         * Finds the containing node given an event.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @return {goog.ui.tree.BaseNode} The containing node or null if no node is
         *     found.
         * @private
         */
        private getNodeFromEvent_(e: goog.events.BrowserEvent): goog.ui.tree.BaseNode;

        /**
         * Creates a new tree node using the same config as the root.
         * @param {string=} opt_content The content of the node label. Strings are
         *     treated as plain-text and will be HTML escaped. To set SafeHtml content,
         *     omit opt_content and call setSafeHtml on the resulting node.
         * @return {!goog.ui.tree.TreeNode} The new item.
         */
        createNode(opt_content?: string): goog.ui.tree.TreeNode;

        /**
         * Allows the caller to notify that the given node has been added or just had
         * been updated in the tree.
         * @param {goog.ui.tree.BaseNode} node New node being added or existing node
         *    that just had been updated.
         */
        setNode(node: goog.ui.tree.BaseNode): void;

        /**
         * Allows the caller to notify that the given node is being removed from the
         * tree.
         * @param {goog.ui.tree.BaseNode} node Node being removed.
         */
        removeNode(node: goog.ui.tree.BaseNode): void;

        /**
         * Clear the typeahead buffer.
         */
        clearTypeAhead(): void;
    }
}

declare namespace goog.ui.tree.TreeControl {
    /**
     * A default configuration for the tree.
     */
    let defaultConfig: any /*missing*/;
}
