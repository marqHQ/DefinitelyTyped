/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubase.d.ts"/>

declare module 'goog:goog.ui.AttachableMenu' {
    import alias = goog.ui.AttachableMenu;
    export default alias;
}

declare namespace goog.ui {
    /**
     * An implementation of a menu that can attach itself to DOM element that
     * are annotated appropriately.
     *
     * The following attributes are used by the AttachableMenu
     *
     * menu-item - Should be set on DOM elements that function as items in the
     * menu that can be selected.
     * classNameSelected - A class that will be added to the element's class names
     * when the item is selected via keyboard or mouse.
     *
     * @extends {goog.ui.MenuBase}
     * @deprecated Use goog.ui.PopupMenu.
     * @final
     */
    class AttachableMenu extends __AttachableMenu {}
    abstract class __AttachableMenu extends goog.ui.__MenuBase {
        /**
         * @param {Element=} opt_element A DOM element for the popup.
         */
        constructor(opt_element?: Element);

        /**
         * The currently selected element (mouse was moved over it or keyboard arrows)
         * @type {HTMLElement}
         * @private
         */
        private selectedElement_: HTMLElement;

        /**
         * Class name to append to a menu item's class when it's selected
         * @type {string}
         * @private
         */
        private itemClassName_: string;

        /**
         * Class name to append to a menu item's class when it's selected
         * @type {string}
         * @private
         */
        private selectedItemClassName_: string;

        /**
         * Keep track of when the last key was pressed so that a keydown-scroll doesn't
         * trigger a mouseover event
         * @type {number}
         * @private
         */
        private lastKeyDown_: number;

        /**
         * Sets the class name to use for menu items
         *
         * @return {string} The class name to use for items.
         */
        getItemClassName(): string;

        /**
         * Sets the class name to use for menu items
         *
         * @param {string} name The class name to use for items.
         */
        setItemClassName(name: string): void;

        /**
         * Sets the class name to use for selected menu items
         * todo(user) - reevaluate if we can simulate pseudo classes in IE
         *
         * @return {string} The class name to use for selected items.
         */
        getSelectedItemClassName(): string;

        /**
         * Sets the class name to use for selected menu items
         * todo(user) - reevaluate if we can simulate pseudo classes in IE
         *
         * @param {string} name The class name to use for selected items.
         */
        setSelectedItemClassName(name: string): void;

        /**
         * Returns the next or previous item. Used for up/down arrows.
         *
         * @param {boolean} prev True to go to the previous element instead of next.
         * @return {Element} The next or previous element.
         * @protected
         */
        protected getNextPrevItem(prev: boolean): Element;

        /**
         * Find an item that has the given prefix and select it.
         *
         * @param {string} prefix The entered prefix, so far.
         * @param {number=} opt_direction 1 to search forward from the selection
         *     (default), -1 to search backward (e.g. to go to the previous match).
         * @param {boolean=} opt_skip True if should skip the current selection,
         *     unless no other item has the given prefix.
         * @private
         */
        private selectByName_(prefix: string, opt_direction?: number, opt_skip?: boolean): void;

        /**
         * Dispatch an ITEM_ACTION event when an item is selected
         * @param {Object=} opt_item Item selected.
         * @private
         */
        private onItemSelected_(opt_item?: Object): void;

        /**
         * Returns whether the specified element is a menu item.
         * @param {Element} elt The element to find a menu item ancestor of.
         * @return {boolean} Whether the specified element is a menu item.
         * @private
         */
        private isMenuItem_(elt: Element): boolean;

        /**
         * Returns the menu-item scoping the specified element, or null if there is
         * none.
         * @param {Element|undefined} elt The element to find a menu item ancestor of.
         * @return {Element} The menu-item scoping the specified element, or null if
         *     there is none.
         * @private
         */
        private getAncestorMenuItem_(elt: Element|undefined): Element;
    }
}
