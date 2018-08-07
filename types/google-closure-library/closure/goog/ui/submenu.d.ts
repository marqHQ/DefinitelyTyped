/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="./menuheader.d.ts"/>
/// <reference path="./menuseparator.d.ts"/>
/// <reference path="./component.d.ts"/>

declare module 'goog:goog.ui.SubMenu' {
    import alias = goog.ui.SubMenu;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a submenu that can be added as an item to other menus.
     *
     * @extends {goog.ui.MenuItem}
     */
    class SubMenu extends __SubMenu {}
    abstract class __SubMenu extends goog.ui.__MenuItem {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the submenu (use to add icons or styling to
         *     menus).
         * @param {*=} opt_model Data/model associated with the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional dom helper used for dom
         *     interactions.
         * @param {goog.ui.MenuItemRenderer=} opt_renderer Renderer used to render or
         *     decorate the component; defaults to {@link goog.ui.SubMenuRenderer}.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_model?: any,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuItemRenderer
        );

        /**
         * Timer used to dismiss the submenu when the item becomes unhighlighted.
         * @type {?number}
         * @private
         */
        private dismissTimer_: number|null;

        /**
         * Timer used to show the submenu on mouseover.
         * @type {?number}
         * @private
         */
        private showTimer_: number|null;

        /**
         * Whether the submenu believes the menu is visible.
         * @type {boolean}
         * @private
         */
        private menuIsVisible_: boolean;

        /**
         * The lazily created sub menu.
         * @type {goog.ui.Menu?}
         * @private
         */
        private subMenu_: goog.ui.Menu|null;

        /**
         * Whether or not the sub-menu was set explicitly.
         * @type {boolean}
         * @private
         */
        private externalSubMenu_: boolean;

        /**
         * Whether or not to align the submenu at the end of the parent menu.
         * If true, the menu expands to the right in LTR languages and to the left
         * in RTL langauges.
         * @type {boolean}
         * @private
         */
        private alignToEnd_: boolean;

        /**
         * Whether the position of this submenu may be adjusted to fit
         * the visible area, as in {@link goog.ui.Popup.positionAtCoordinate}.
         * @type {boolean}
         * @private
         */
        private isPositionAdjustable_: boolean;

        /**
         * Show the submenu and ensure that all siblings are hidden.
         */
        showSubMenu(): void;

        /**
         * Dismisses the menu and all further submenus.
         */
        dismissSubMenu(): void;

        /**
         * Clears the show and hide timers for the sub menu.
         */
        clearTimers(): void;

        /**
         * Dismiss all the sub menus of sibling menu items.
         * @private
         */
        private dismissSiblings_(): void;

        /**
         * Listens to the sub menus items and ensures that this menu item is selected
         * while dismissing the others.  This handles the case when the user mouses
         * over other items on their way to the sub menu.
         * @param {goog.events.Event} e Enter event to handle.
         * @private
         */
        private onChildEnter_(e: goog.events.Event): void;

        /**
         * Listens to the parent menu's hide event and ensures that all submenus are
         * hidden at the same time.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private onParentHidden_(e: goog.events.Event): void;

        /**
         * Sets the visiblility of the sub menu.
         * @param {boolean} visible Whether to show menu.
         * @private
         */
        private setSubMenuVisible_(visible: boolean): void;

        /**
         * Attaches or detaches menu event listeners to/from the given menu.  Called
         * each time a menu is attached to or detached from the submenu.
         * @param {goog.ui.Menu} menu Menu on which to listen for events.
         * @param {boolean} attach Whether to attach or detach event listeners.
         * @private
         */
        private setMenuListenersEnabled_(menu: goog.ui.Menu, attach: boolean): void;

        /**
         * Sets whether the submenu is aligned at the end of the parent menu.
         * @param {boolean} alignToEnd True to align to end, false to align to start.
         */
        setAlignToEnd(alignToEnd: boolean): void;

        /**
         * Determines whether the submenu is aligned at the end of the parent menu.
         * @return {boolean} True if aligned to the end (the default), false if
         *     aligned to the start.
         */
        isAlignedToEnd(): boolean;

        /**
         * Positions the submenu. This method should be called if the sub menu is
         * opened and the menu element's size changes (e.g., when adding/removing items
         * to an opened sub menu).
         */
        positionSubMenu(): void;

        /**
         * Adds a new menu item at the end of the menu.
         * @param {goog.ui.MenuHeader|goog.ui.MenuItem|goog.ui.MenuSeparator} item Menu
         *     item to add to the menu.
         */
        addItem(item: goog.ui.MenuHeader|goog.ui.MenuItem|goog.ui.MenuSeparator): void;

        /**
         * Adds a new menu item at a specific index in the menu.
         * @param {goog.ui.MenuHeader|goog.ui.MenuItem|goog.ui.MenuSeparator} item Menu
         *     item to add to the menu.
         * @param {number} n Index at which to insert the menu item.
         */
        addItemAt(item: goog.ui.MenuHeader|goog.ui.MenuItem|goog.ui.MenuSeparator, n: number): void;

        /**
         * Removes an item from the menu and disposes it.
         * @param {goog.ui.MenuItem} item The menu item to remove.
         */
        removeItem(item: goog.ui.MenuItem): void;

        /**
         * Removes a menu item at a given index in the menu and disposes it.
         * @param {number} n Index of item.
         */
        removeItemAt(n: number): void;

        /**
         * Returns a reference to the menu item at a given index.
         * @param {number} n Index of menu item.
         * @return {goog.ui.Component} Reference to the menu item.
         */
        getItemAt(n: number): goog.ui.Component;

        /**
         * Returns the number of items in the sub menu (including separators).
         * @return {number} The number of items in the menu.
         */
        getItemCount(): number;

        /**
         * Returns the menu items contained in the sub menu.
         * @return {!Array<!goog.ui.MenuItem>} An array of menu items.
         * @deprecated Use getItemAt/getItemCount instead.
         */
        getItems(): goog.ui.MenuItem[];

        /**
         * Gets a reference to the submenu's actual menu.
         * @return {!goog.ui.Menu} Reference to the object representing the sub menu.
         */
        getMenu(): goog.ui.Menu;

        /**
         * Sets the submenu to a specific menu.
         * @param {goog.ui.Menu} menu The menu to show when this item is selected.
         * @param {boolean=} opt_internal Whether this menu is an "internal" menu, and
         *     should be disposed of when this object is disposed of.
         */
        setMenu(menu: goog.ui.Menu, opt_internal?: boolean): void;

        /**
         * Returns true if the provided element is to be considered inside the menu for
         * purposes such as dismissing the menu on an event.  This is so submenus can
         * make use of elements outside their own DOM.
         * @param {Element} element The element to test for.
         * @return {boolean} Whether or not the provided element is contained.
         */
        containsElement(element: Element): boolean;

        /**
         * @param {boolean} isAdjustable Whether this submenu is adjustable.
         */
        setPositionAdjustable(isAdjustable: boolean): void;

        /**
         * @return {boolean} Whether this submenu is adjustable.
         */
        isPositionAdjustable(): boolean;
    }
}

declare namespace goog.ui.SubMenu {
    /**
     * The delay before opening the sub menu in milliseconds.
     * @type {number}
     */
    let MENU_DELAY_MS: number;
}
