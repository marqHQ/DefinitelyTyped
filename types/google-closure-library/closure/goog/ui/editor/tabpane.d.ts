/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../component.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../tabbar.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.ui.editor.TabPane' {
    import alias = goog.ui.editor.TabPane;
    export default alias;
}

declare namespace goog.ui.editor {
    /**
     * Creates a new Editor-style tab pane.
     * @extends {goog.ui.Component}
     * @final
     */
    class TabPane extends __TabPane {}
    abstract class __TabPane extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper} dom The dom helper for the window to create this
         *     tab pane in.
         * @param {string=} opt_caption Optional caption of the tab pane.
         */
        constructor(dom: goog.dom.DomHelper, opt_caption?: string);

        /**
         * The event handler used to register events.
         * @type {goog.events.EventHandler<!goog.ui.editor.TabPane>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.editor.TabPane>;

        /**
         * The tab bar used to render the tabs.
         * @type {goog.ui.TabBar}
         * @private
         */
        private tabBar_: goog.ui.TabBar;

        /**
         * The content element.
         * @private
         */
        private tabContent_: any /*missing*/;

        /**
         * The currently selected radio button.
         * @type {Element}
         * @private
         */
        private selectedRadio_: Element;

        /**
         * The currently visible tab content.
         * @type {Element}
         * @private
         */
        private visibleContent_: Element;

        /**
         * @return {string} The ID of the content element for the current tab.
         */
        getCurrentTabId(): string;

        /**
         * Selects the tab with the given id.
         * @param {string} id Id of the tab to select.
         */
        setSelectedTabId(id: string): void;

        /**
         * Adds a tab to the tab pane.
         * @param {string} id The id of the tab to add.
         * @param {string} caption The caption of the tab.
         * @param {string} tooltip The tooltip for the tab.
         * @param {string} groupName for the radio button group.
         * @param {Element} content The content element to show when this tab is
         *     selected.
         */
        addTab(id: string, caption: string, tooltip: string, groupName: string, content: Element): void;

        /**
         * Handles a tab change.
         * @param {goog.events.Event} e The browser change event.
         * @private
         */
        private handleTabSelect_(e: goog.events.Event): void;
    }
}
