/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>
/// <reference path="../link.d.ts"/>
/// <reference path="../../dom/tagname.d.ts"/>

declare module 'goog:goog.editor.plugins.BasicTextFormatter' {
    import alias = goog.editor.plugins.BasicTextFormatter;
    export default alias;
}

declare module 'goog:goog.editor.plugins.BasicTextFormatter.COMMAND' {
    import alias = goog.editor.plugins.BasicTextFormatter.COMMAND;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Functions to style text (e.g. underline, make bold, etc.)
     * @extends {goog.editor.Plugin}
     */
    class BasicTextFormatter extends __BasicTextFormatter {}
    abstract class __BasicTextFormatter extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * @return {goog.dom.AbstractRange} The closure range object that wraps the
         *     current user selection.
         * @private
         */
        private getRange_(): goog.dom.AbstractRange;

        /**
         * @return {!Document} The document object associated with the currently active
         *     field.
         * @private
         */
        private getDocument_(): Document;

        /**
         * Focuses on the field.
         * @private
         */
        private focusField_(): void;

        /**
         * Convert BRs in the selection to divs.
         * This is only intended to be used in IE and Opera.
         * @return {boolean} Whether any BR's were converted.
         * @private
         */
        private convertBreaksToDivs_(): boolean;

        /**
         * Justify the text in the selection.
         * @param {string} command The type of justification to perform.
         * @private
         */
        private justify_(command: string): void;

        /**
         * Perform an execCommand on the active document.
         * @param {string} command The command to execute.
         * @param {string|number|boolean|null=} opt_value Optional value.
         * @param {boolean=} opt_preserveDir Set true to make sure that command does not
         *     change directionality of the selected text (works only if all selected
         *     text has the same directionality, otherwise ignored). Should not be true
         *     if bidi plugin is not loaded.
         * @param {boolean=} opt_styleWithCss Set to true to ask the browser to use CSS
         *     to perform the execCommand.
         * @private
         */
        private execCommandHelper_(
            command: string,
            opt_value?: string|number|boolean|null,
            opt_preserveDir?: boolean,
            opt_styleWithCss?: boolean
        ): void;

        /**
         * Applies a background color to a selection when the browser can't do the job.
         *
         * NOTE(nicksantos): If you think this is hacky, you should try applying
         * background color in Opera. It made me cry.
         *
         * @param {string} bgColor backgroundColor from .formatText to .execCommand.
         * @private
         */
        private applyBgColorManually_(bgColor: string): void;

        /**
         * Toggle link for the current selection:
         *   If selection contains a link, unlink it, return null.
         *   Otherwise, make selection into a link, return the link.
         * @param {string=} opt_target Target for the link.
         * @return {goog.editor.Link?} The resulting link, or null if a link was
         *     removed.
         * @private
         */
        private toggleLink_(opt_target?: string): goog.editor.Link|null;

        /**
         * Create a link out of the current selection.  If nothing is selected, insert
         * a new link.  Otherwise, enclose the selection in a link.
         * @param {goog.dom.AbstractRange} range The closure range object for the
         *     current selection.
         * @param {string} url The url to link to.
         * @param {string=} opt_target Target for the link.
         * @return {goog.editor.Link?} The newly created link, or null if the link
         *     couldn't be created.
         * @private
         */
        private createLink_(range: goog.dom.AbstractRange, url: string, opt_target?: string): goog.editor.Link|null;

        /**
         * Makes sure that superscript is removed before applying subscript, and vice
         * versa. Fixes {@link http://buganizer/issue?id=1173491} .
         * @param {goog.editor.plugins.BasicTextFormatter.COMMAND} command The command
         *     being applied, either SUBSCRIPT or SUPERSCRIPT.
         * @private
         */
        private applySubscriptSuperscriptWorkarounds_(command: goog.editor.plugins.BasicTextFormatter.COMMAND): void;

        /**
         * Removes inline font-size styles from elements fully contained in the
         * selection, so the font tags produced by execCommand work properly.
         * See {@bug 1286408}.
         * @private
         */
        private removeFontSizeFromStyleAttrs_(): void;

        /**
         * Apply pre-execCommand fixes for IE.
         * @param {string} command The command to execute.
         * @return {!Array<Node>} Array of nodes to be removed after the execCommand.
         *     Will never be longer than 2 elements.
         * @private
         */
        private applyExecCommandIEFixes_(command: string): Node[];

        /**
         * Fix a ridiculous Safari bug: the first letters of new headings
         * somehow retain their original font size and weight if multiple lines are
         * selected during the execCommand that turns them into headings.
         * The solution is to strip these styles which are normally stripped when
         * making things headings anyway.
         * @private
         */
        private cleanUpSafariHeadings_(): void;

        /**
         * Prevent Safari from making each list item be "1" when converting from
         * unordered to ordered lists.
         * (see https://bugs.webkit.org/show_bug.cgi?id=19539, fixed by 2010-04-21)
         * @private
         */
        private fixSafariLists_(): void;

        /**
         * Changing an OL to a UL (or the other way around) will fail if the list
         * has a type attribute (such as "UL type=disc" becoming "OL type=disc", which
         * is visually identical). Most browsers will remove the type attribute
         * automatically, but IE doesn't. This does it manually.
         * @private
         */
        private fixIELists_(): void;

        /**
         * Apply pre-execCommand fixes for Safari.
         * @param {string} command The command to execute.
         * @return {!Element|undefined} The div added to the field.
         * @private
         */
        private applyExecCommandSafariFixes_(command: string): Element|undefined;

        /**
         * Apply pre-execCommand fixes for Gecko.
         * @param {string} command The command to execute.
         * @private
         */
        private applyExecCommandGeckoFixes_(command: string): void;

        /**
         * Workaround for Opera bug CORE-23903. Opera sometimes fails to invalidate
         * serialized CSS or innerHTML for the DOM after certain execCommands when
         * styleWithCSS is on. Toggling an inline style on the elements fixes it.
         * @private
         */
        private invalidateInlineCss_(): void;

        /**
         * Work around a Gecko bug that causes inserted lists to forget the current
         * font. This affects WebKit in the same way and Opera in a slightly different
         * way, but this workaround only works in Gecko.
         * WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=19653
         * Mozilla bug: https://bugzilla.mozilla.org/show_bug.cgi?id=439966
         * Opera bug: https://bugs.opera.com/show_bug.cgi?id=340392
         * TODO: work around this issue in WebKit and Opera as well.
         * @return {boolean} Whether the workaround was applied.
         * @private
         */
        private beforeInsertListGecko_(): boolean;

        /** @type {function():?string}} */
        getSelectionAlignment: () => string | null;

        /**
         * Returns true if the current justification matches the justification
         * command for the entire selection.
         * @param {string} command The justification command to check for.
         * @return {boolean} Whether the current justification matches the justification
         *     command for the entire selection.
         * @private
         */
        private isJustification_(command: string): boolean;

        /**
         * Returns true if a selection contained in the node should set the appropriate
         * toolbar state for the given nodeName, e.g. if the node is contained in a
         * strong element and nodeName is "strong", then it will return true.
         * @param {!goog.dom.TagName} nodeName The type of node to check for.
         * @return {boolean} Whether the user's selection is in the given state.
         * @private
         */
        private isNodeInState_(nodeName: goog.dom.TagName<any>): boolean;

        /**
         * Wrapper for browser's queryCommandState.
         * @param {Document|TextRange|Range} queryObject The object to query.
         * @param {string} command The command to check.
         * @param {boolean=} opt_styleWithCss Set to true to enable styleWithCSS before
         *     performing the queryCommandState.
         * @return {boolean} The command state.
         * @private
         */
        private queryCommandStateInternal_(queryObject: Document|Range, command: string, opt_styleWithCss?: boolean):
            boolean;

        /**
         * Wrapper for browser's queryCommandValue.
         * @param {Document|TextRange|Range} queryObject The object to query.
         * @param {string} command The command to check.
         * @param {boolean=} opt_styleWithCss Set to true to enable styleWithCSS before
         *     performing the queryCommandValue.
         * @return {string|boolean|null} The command value.
         * @private
         */
        private queryCommandValueInternal_(queryObject: Document|Range, command: string, opt_styleWithCss?: boolean):
            string|boolean|null;

        /**
         * Helper function to perform queryCommand(Value|State).
         * @param {boolean} isGetQueryCommandState True to use queryCommandState, false
         *     to use queryCommandValue.
         * @param {Document|TextRange|Range} queryObject The object to query.
         * @param {string} command The command to check.
         * @param {boolean=} opt_styleWithCss Set to true to enable styleWithCSS before
         *     performing the queryCommand(Value|State).
         * @return {string|boolean|null} The command value.
         * @private
         */
        private queryCommandHelper_(
            isGetQueryCommandState: boolean, queryObject: Document|Range, command: string, opt_styleWithCss?: boolean
        ): string|boolean|null;
    }
}

declare namespace goog.editor.plugins.BasicTextFormatter {
    /**
     * Commands implemented by this plugin.
     * @enum {string}
     */
    enum COMMAND {
        LINK,
        CREATE_LINK,
        FORMAT_BLOCK,
        INDENT,
        OUTDENT,
        STRIKE_THROUGH,
        HORIZONTAL_RULE,
        SUBSCRIPT,
        SUPERSCRIPT,
        UNDERLINE,
        BOLD,
        ITALIC,
        FONT_SIZE,
        FONT_FACE,
        FONT_COLOR,
        BACKGROUND_COLOR,
        ORDERED_LIST,
        UNORDERED_LIST,
        JUSTIFY_CENTER,
        JUSTIFY_FULL,
        JUSTIFY_RIGHT,
        JUSTIFY_LEFT
    }

    /**
     * To avoid forcing the BidiPlugin code to be loaded create a simple interface
     * for the method that is needed.
     *
     * @record
     */
    function IBidiPlugin(): void;
}
