/// <reference path="../../../globals.d.ts"/>
/// <reference path="./container.d.ts"/>
/// <reference path="./tabbarrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.TabBar' {
    import alias = goog.ui.TabBar;
    export default alias;
}

declare module 'goog:goog.ui.TabBar.Location' {
    import alias = goog.ui.TabBar.Location;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Tab bar UI component.  A tab bar contains tabs, rendered above, below,
     * before, or after tab contents.  Tabs in tab bars dispatch the following
     * events:
     * <ul>
     *   <li>{@link goog.ui.Component.EventType.ACTION} when activated via the
     *       keyboard or the mouse,
     *   <li>{@link goog.ui.Component.EventType.SELECT} when selected, and
     *   <li>{@link goog.ui.Component.EventType.UNSELECT} when deselected.
     * </ul>
     * Clients may listen for all of the above events on the tab bar itself, and
     * refer to the event target to identify the tab that dispatched the event.
     * When an unselected tab is clicked for the first time, it dispatches both a
     * `SELECT` event and an `ACTION` event; subsequent clicks on an
     * already selected tab only result in `ACTION` events.
     *
     * @extends {goog.ui.Container}
     */
    class TabBar extends __TabBar {}
    abstract class __TabBar extends goog.ui.__Container {
        /**
         * @param {goog.ui.TabBar.Location=} opt_location Tab bar location; defaults to
         *     {@link goog.ui.TabBar.Location.TOP}.
         * @param {goog.ui.TabBarRenderer=} opt_renderer Renderer used to render or
         *     decorate the container; defaults to {@link goog.ui.TabBarRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
         *     interaction.
         */
        constructor(
            opt_location?: goog.ui.TabBar.Location,
            opt_renderer?: goog.ui.TabBarRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * Tab bar location; defaults to {@link goog.ui.TabBar.Location.TOP}.
         * @type {goog.ui.TabBar.Location}
         * @private
         */
        private location_: goog.ui.TabBar.Location;

        /**
         * Whether keyboard navigation should change the selected tab, or just move
         * the highlight.  Defaults to true.
         * @type {boolean}
         * @private
         */
        private autoSelectTabs_: boolean;

        /**
         * The currently selected tab (null if none).
         * @type {goog.ui.Control?}
         * @private
         */
        private selectedTab_: goog.ui.Control|null;

        /**
         * @return {goog.ui.TabBar.Location} Tab bar location relative to tab contents.
         */
        getLocation(): goog.ui.TabBar.Location;

        /**
         * Sets the location of the tab bar relative to tab contents.
         * @param {goog.ui.TabBar.Location} location Tab bar location relative to tab
         *     contents.
         * @throws {Error} If the tab bar has already been rendered.
         */
        setLocation(location: goog.ui.TabBar.Location): void;

        /**
         * @return {boolean} Whether keyboard navigation should change the selected tab,
         *     or just move the highlight.
         */
        isAutoSelectTabs(): boolean;

        /**
         * Enables or disables auto-selecting tabs using the keyboard.  If auto-select
         * is enabled, keyboard navigation switches tabs immediately, otherwise it just
         * moves the highlight.
         * @param {boolean} enable Whether keyboard navigation should change the
         *     selected tab, or just move the highlight.
         */
        setAutoSelectTabs(enable: boolean): void;

        /**
         * @return {goog.ui.Control?} The currently selected tab (null if none).
         */
        getSelectedTab(): goog.ui.Control|null;

        /**
         * Selects the given tab.
         * @param {goog.ui.Control?} tab Tab to select (null to select none).
         */
        setSelectedTab(tab: goog.ui.Control|null): void;

        /**
         * @return {number} Index of the currently selected tab (-1 if none).
         */
        getSelectedTabIndex(): number;

        /**
         * Selects the tab at the given index.
         * @param {number} index Index of the tab to select (-1 to select none).
         */
        setSelectedTabIndex(index: number): void;

        /**
         * If the specified tab is the currently selected tab, deselects it, and
         * selects the closest selectable tab in the tab bar (first looking before,
         * then after the deselected tab).  Does nothing if the argument is not the
         * currently selected tab.  Called internally when a tab is removed, hidden,
         * or disabled, to ensure that another tab is selected instead.
         * @param {goog.ui.Control?} tab Tab to deselect (if any).
         * @protected
         */
        protected deselectIfSelected(tab: goog.ui.Control|null): void;

        /**
         * Returns true if the tab is selectable, false otherwise.  Only visible and
         * enabled tabs are selectable.
         * @param {goog.ui.Control} tab Tab to check.
         * @return {boolean} Whether the tab is selectable.
         * @protected
         */
        protected isSelectableTab(tab: goog.ui.Control): boolean;

        /**
         * Handles `SELECT` events dispatched by tabs as they become selected.
         * @param {goog.events.Event} e Select event to handle.
         * @protected
         */
        protected handleTabSelect(e: goog.events.Event): void;

        /**
         * Handles `UNSELECT` events dispatched by tabs as they become deselected.
         * @param {goog.events.Event} e Unselect event to handle.
         * @protected
         */
        protected handleTabUnselect(e: goog.events.Event): void;

        /**
         * Handles `DISABLE` events displayed by tabs.
         * @param {goog.events.Event} e Disable event to handle.
         * @protected
         */
        protected handleTabDisable(e: goog.events.Event): void;

        /**
         * Handles `HIDE` events displayed by tabs.
         * @param {goog.events.Event} e Hide event to handle.
         * @protected
         */
        protected handleTabHide(e: goog.events.Event): void;

        /**
         * Subscribes to events dispatched by tabs.
         * @private
         */
        private listenToTabEvents_(): void;
    }
}

declare namespace goog.ui.TabBar {
    /**
     * Tab bar location relative to tab contents.
     * @enum {string}
     */
    enum Location { TOP, BOTTOM, START, END }

    /**
     * Returns the {@link goog.ui.Container.Orientation} that is implied by the
     * given {@link goog.ui.TabBar.Location}.
     * @param {goog.ui.TabBar.Location} location Tab bar location.
     * @return {goog.ui.Container.Orientation} Corresponding orientation.
     */
    function getOrientationFromLocation(location: goog.ui.TabBar.Location): goog.ui.Container.Orientation;
}
