/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.TabPaneEvent' {
    import alias = goog.ui.TabPaneEvent;
    export default alias;
}

declare module 'goog:goog.ui.TabPane' {
    import alias = goog.ui.TabPane;
    export default alias;
}

declare module 'goog:goog.ui.TabPane.TabPage' {
    import alias = goog.ui.TabPane.TabPage;
    export default alias;
}

declare module 'goog:goog.ui.TabPane.TabLocation' {
    import alias = goog.ui.TabPane.TabLocation;
    export default alias;
}

declare module 'goog:goog.ui.TabPane.Events' {
    import alias = goog.ui.TabPane.Events;
    export default alias;
}

declare namespace goog.ui {
    /**
     * TabPane widget. All children already inside the tab pane container element
     * will be be converted to tabs. Each tab is represented by a goog.ui.TabPane.
     * TabPage object. Further pages can be constructed either from an existing
     * container or created from scratch.
     *
     * @extends {goog.events.EventTarget}
     * @see ../demos/tabpane.html
     * @deprecated Use goog.ui.TabBar instead.
     */
    class TabPane extends __TabPane {}
    abstract class __TabPane extends goog.events.__EventTarget {
        /**
         * @param {Element} el Container element to create the tab pane out of.
         * @param {goog.ui.TabPane.TabLocation=} opt_tabLocation Location of the tabs
         *     in relation to the content container. Default is top.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {boolean=} opt_useMouseDown Whether to use MOUSEDOWN instead of CLICK
         *     for tab changes.
         */
        constructor(
            el: Element,
            opt_tabLocation?: goog.ui.TabPane.TabLocation,
            opt_domHelper?: goog.dom.DomHelper,
            opt_useMouseDown?: boolean
        );

        /**
         * DomHelper used to interact with the document, allowing components to be
         * created in a different window.  This property is considered protected;
         * subclasses of Component may refer to it directly.
         * @type {goog.dom.DomHelper}
         * @protected
         * @suppress {underscore|visibility}
         */
        protected dom_: goog.dom.DomHelper;

        /**
         * Tab pane element.
         * @type {Element}
         * @private
         */
        private el_: Element;

        /**
         * Collection of tab panes.
         * @type {Array<goog.ui.TabPane.TabPage>}
         * @private
         */
        private pages_: goog.ui.TabPane.TabPage[];

        /**
         * Location of the tabs with respect to the content box.
         * @type {goog.ui.TabPane.TabLocation}
         * @private
         */
        private tabLocation_: goog.ui.TabPane.TabLocation;

        /**
         * Whether to use MOUSEDOWN instead of CLICK for tab change events. This
         * fixes some focus problems on Safari/Chrome.
         * @type {boolean}
         * @private
         */
        private useMouseDown_: boolean;

        /**
         * Element containing the tab buttons.
         * @type {Element}
         * @private
         */
        private elButtonBar_: Element;

        /**
         * Element containing the tab pages.
         * @type {Element}
         * @private
         */
        private elContent_: Element;

        /**
         * Selected page.
         * @type {goog.ui.TabPane.TabPage?}
         * @private
         */
        private selected_: goog.ui.TabPane.TabPage|null;

        /**
         * Creates HTML nodes for tab pane.
         *
         * @private
         */
        private create_(): void;

        /**
         * Creates the HTML node for the clearing div, and associated style in
         * the <HEAD>.
         *
         * @return {!Element} Reference to a DOM div node.
         * @private
         */
        private createClear_(): Element;

        /**
         * @return {!Array<Element>} The element child nodes of tab pane container.
         * @private
         */
        private getChildNodes_(): Element[];

        /**
         * Creates pages out of a collection of elements.
         *
         * @param {Array<Element>} nodes Array of elements to create pages out of.
         * @private
         */
        private createPages_(nodes: Element[]): void;

        /**
         * Adds a page to the tab pane.
         *
         * @param {goog.ui.TabPane.TabPage} page Tab page to add.
         * @param {number=} opt_index Zero based index to insert tab at. Inserted at the
         *                           end if not specified.
         */
        addPage(page: goog.ui.TabPane.TabPage, opt_index?: number): void;

        /**
         * Removes the specified page from the tab pane.
         *
         * @param {goog.ui.TabPane.TabPage|number} page Reference to tab page or zero
         *     based index.
         */
        removePage(page: goog.ui.TabPane.TabPage|number): void;

        /**
         * Gets the tab page by zero based index.
         *
         * @param {number} index Index of page to return.
         * @return {goog.ui.TabPane.TabPage?} page The tab page.
         */
        getPage(index: number): goog.ui.TabPane.TabPage|null;

        /**
         * Sets the selected tab page by object reference.
         *
         * @param {goog.ui.TabPane.TabPage} page Tab page to select.
         */
        setSelectedPage(page: goog.ui.TabPane.TabPage): void;

        /**
         * Sets the selected tab page by zero based index.
         *
         * @param {number} index Index of page to select.
         */
        setSelectedIndex(index: number): void;

        /**
         * @return {number} The index for the selected tab page or -1 if no page is
         *     selected.
         */
        getSelectedIndex(): number;

        /**
         * @return {goog.ui.TabPane.TabPage?} The selected tab page.
         */
        getSelectedPage(): goog.ui.TabPane.TabPage|null;

        /**
         * @return {Element} The element that contains the tab pages.
         */
        getContentElement(): Element;

        /**
         * @return {Element} The main element for the tabpane.
         */
        getElement(): Element;

        /**
         * Click event handler for header element, handles clicks on tabs.
         *
         * @param {goog.events.BrowserEvent} event Click event.
         * @private
         */
        private onHeaderClick_(event: goog.events.BrowserEvent): void;

        /**
         * KeyDown event handler for header element. Arrow keys moves between pages.
         * Home and end selects the first/last page.
         *
         * @param {goog.events.BrowserEvent} event KeyDown event.
         * @private
         */
        private onHeaderKeyDown_(event: goog.events.BrowserEvent): void;
    }

    /**
     * Object representing a tab pane page changed event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class TabPaneEvent extends __TabPaneEvent {}
    abstract class __TabPaneEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {goog.ui.TabPane} target Tab widget initiating event.
         * @param {goog.ui.TabPane.TabPage} page Selected page in tab pane.
         */
        constructor(type: string, target: goog.ui.TabPane, page: goog.ui.TabPane.TabPage);

        /**
         * The selected page.
         * @type {goog.ui.TabPane.TabPage}
         */
        page: goog.ui.TabPane.TabPage;
    }
}

declare namespace goog.ui.TabPane {
    /**
     * Object representing an individual tab pane.
     *
     */
    class TabPage extends __TabPage {}
    abstract class __TabPage {
        /**
         * @param {Element=} opt_el Container element to create the pane out of.
         * @param {(Element|string)=} opt_title Pane title or element to use as the
         *     title. If not specified the first element in the container is used as
         *     the title.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper
         * The first parameter can be omitted.
         */
        constructor(opt_el?: Element, opt_title?: Element|string, opt_domHelper?: goog.dom.DomHelper);

        /**
         * DomHelper used to interact with the document, allowing components to be
         * created in a different window.  This property is considered protected;
         * subclasses of Component may refer to it directly.
         * @type {goog.dom.DomHelper}
         * @protected
         * @suppress {underscore|visibility}
         */
        protected dom_: goog.dom.DomHelper;

        /**
         * Content element
         * @type {Element}
         * @private
         */
        private elContent_: Element;

        /**
         * Title element
         * @type {Element}
         * @private
         */
        private elTitle_: Element;

        /**
         * Parent TabPane reference.
         * @type {goog.ui.TabPane?}
         * @private
         */
        private parent_: goog.ui.TabPane|null;

        /**
         * Index for page in tab pane.
         * @type {?number}
         * @private
         */
        private index_: number|null;

        /**
         * Flags if this page is enabled and can be selected.
         * @type {boolean}
         * @private
         */
        private enabled_: boolean;

        /**
         * @return {string} The title for tab page.
         */
        getTitle(): string;

        /**
         * Sets title for tab page.
         *
         * @param {string} title Title for tab page.
         */
        setTitle(title: string): void;

        /**
         * @return {Element} The title element.
         */
        getTitleElement(): Element;

        /**
         * @return {Element} The content element.
         */
        getContentElement(): Element;

        /**
         * @return {?number} The index of page in tab pane.
         */
        getIndex(): number|null;

        /**
         * @return {goog.ui.TabPane?} The parent tab pane for page.
         */
        getParent(): goog.ui.TabPane|null;

        /**
         * Selects page in the associated tab pane.
         */
        select(): void;

        /**
         * Sets the enabled state.
         *
         * @param {boolean} enabled Enabled state.
         */
        setEnabled(enabled: boolean): void;

        /**
         * Returns if the page is enabled.
         * @return {boolean} Whether the page is enabled or not.
         */
        isEnabled(): boolean;

        /**
         * Sets visible state for page content and updates style of tab.
         *
         * @param {boolean} visible Visible state.
         * @private
         */
        private setVisible_(visible: boolean): void;

        /**
         * Sets parent tab pane for tab page.
         *
         * @param {goog.ui.TabPane?} tabPane Tab strip object.
         * @param {number=} opt_index Index of page in pane.
         * @private
         */
        private setParent_(tabPane: goog.ui.TabPane|null, opt_index?: number): void;
    }

    /**
     * Constants for event names
     *
     * @const
     */
    const Events: any /*missing*/;

    /**
     * Enum for representing the location of the tabs in relation to the content.
     *
     * @enum {number}
     */
    enum TabLocation { TOP, BOTTOM, LEFT, RIGHT }
}
