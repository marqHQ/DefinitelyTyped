/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="./menurenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/inputhandler.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="./control.d.ts"/>

declare module 'goog:goog.ui.FilteredMenu' {
    import alias = goog.ui.FilteredMenu;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Filtered menu class.
     * @extends {goog.ui.Menu}
     */
    class FilteredMenu extends __FilteredMenu {}
    abstract class __FilteredMenu extends goog.ui.__Menu {
        /**
         * @param {goog.ui.MenuRenderer=} opt_renderer Renderer used to render filtered
         *     menu; defaults to {@link goog.ui.MenuRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_renderer?: goog.ui.MenuRenderer, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Filter input element.
         * @type {Element|undefined}
         * @private
         */
        private filterInput_: Element|undefined;

        /**
         * The input handler that provides the input event.
         * @type {goog.events.InputHandler|undefined}
         * @private
         */
        private inputHandler_: goog.events.InputHandler|undefined;

        /**
         * Maximum number of characters for filter input.
         * @type {number}
         * @private
         */
        private maxLength_: number;

        /**
         * Label displayed in the filter input when no text has been entered.
         * @type {string}
         * @private
         */
        private label_: string;

        /**
         * Label element.
         * @type {Element|undefined}
         * @private
         */
        private labelEl_: Element|undefined;

        /**
         * Whether multiple items can be entered comma separated.
         * @type {boolean}
         * @private
         */
        private allowMultiple_: boolean;

        /**
         * List of items entered in the search box if multiple entries are allowed.
         * @type {Array<string>|undefined}
         * @private
         */
        private enteredItems_: string[]|undefined;

        /**
         * Index of first item that should be affected by the filter. Menu items with
         * a lower index will not be affected by the filter.
         * @type {number}
         * @private
         */
        private filterFromIndex_: number;

        /**
         * Filter applied to the menu.
         * @type {string|undefined|null}
         * @private
         */
        private filterStr_: string|undefined|null;

        /**
         * @private {Element}
         */
        private contentElement_: any /*missing*/;

        /**
         * Map of child nodes that shouldn't be affected by filtering.
         * @type {Object|undefined}
         * @private
         */
        private persistentChildren_: Object|undefined;

        /**
         * Helper method that initializes the filter input element.
         * @private
         */
        private initFilterInput_(): void;

        /**
         * Sets up listeners and prepares the filter functionality.
         * @private
         */
        private setUpFilterListeners_(): void;

        /**
         * Tears down listeners and resets the filter functionality.
         * @private
         */
        private tearDownFilterListeners_(): void;

        /**
         * Sets the filter label (the label displayed in the filter input element if no
         * text has been entered).
         * @param {?string} label Label text.
         */
        setFilterLabel(label: string|null): void;

        /**
         * @return {string} The filter label.
         */
        getFilterLabel(): string;

        /**
         * Sets the filter string.
         * @param {?string} str Filter string.
         */
        setFilter(str: string|null): void;

        /**
         * Returns the filter string.
         * @return {string} Current filter or an an empty string.
         */
        getFilter(): string;

        /**
         * Sets the index of first item that should be affected by the filter. Menu
         * items with a lower index will not be affected by the filter.
         * @param {number} index Index of first item that should be affected by filter.
         */
        setFilterFromIndex(index: number): void;

        /**
         * Returns the index of first item that is affected by the filter.
         * @return {number} Index of first item that is affected by filter.
         */
        getFilterFromIndex(): number;

        /**
         * Gets a list of items entered in the search box.
         * @return {!Array<string>} The entered items.
         */
        getEnteredItems(): string[];

        /**
         * Sets whether multiple items can be entered comma separated.
         * @param {boolean} b Whether multiple items can be entered.
         */
        setAllowMultiple(b: boolean): void;

        /**
         * @return {boolean} Whether multiple items can be entered comma separated.
         */
        getAllowMultiple(): boolean;

        /**
         * Sets whether the specified child should be affected (shown/hidden) by the
         * filter criteria.
         * @param {goog.ui.Component} child Child to change.
         * @param {boolean} persistent Whether the child should be persistent.
         */
        setPersistentVisibility(child: goog.ui.Component, persistent: boolean): void;

        /**
         * Returns whether the specified child should be affected (shown/hidden) by the
         * filter criteria.
         * @param {goog.ui.Component} child Menu item to check.
         * @return {boolean} Whether the menu item is persistent.
         */
        hasPersistentVisibility(child: goog.ui.Component): boolean;

        /**
         * Handles filter input events.
         * @param {goog.events.BrowserEvent} e The event object.
         */
        handleFilterEvent(e: goog.events.BrowserEvent): void;

        /**
         * Shows/hides elements based on the supplied filter.
         * @param {?string} str Filter string.
         * @private
         */
        private filterItems_(str: string|null): void;

        /**
         * Updates the content of the given menu item, bolding the part of its caption
         * from start and through the next len characters.
         * @param {!goog.ui.Control} child The control to bold content on.
         * @param {number} start The index at which to start bolding.
         * @param {number} len How many characters to bold.
         * @private
         */
        private boldContent_(child: goog.ui.Control, start: number, len: number): void;

        /**
         * Handles clicks on the filter label. Focuses the input element.
         * @param {goog.events.BrowserEvent} e A browser event.
         * @private
         */
        private onFilterLabelClick_(e: goog.events.BrowserEvent): void;

        /**
         * Returns the filter input element.
         * @return {Element} Input element.
         */
        getFilterInputElement(): Element;
    }
}

declare namespace goog.ui.FilteredMenu {
    /**
     * Events fired by component.
     * @enum {string}
     */
    enum EventType { FILTER_CHANGED }
}
