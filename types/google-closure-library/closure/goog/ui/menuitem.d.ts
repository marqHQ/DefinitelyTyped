/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>
/// <reference path="../events/keycodes.d.ts"/>

declare module 'goog:goog.ui.MenuItem' {
    import alias = goog.ui.MenuItem;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing an item in a menu.
     *
     * @extends {goog.ui.Control}
     */
    class MenuItem extends __MenuItem {}
    abstract class __MenuItem extends goog.ui.__Control {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {*=} opt_model Data/model associated with the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_model?: any,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuItemRenderer
        );

        /**
         * The access key for this menu item. This key allows the user to quickly
         * trigger this item's action with they keyboard. For example, setting the
         * mnenomic key to 70 (F), when the user opens the menu and hits "F," the
         * menu item is triggered.
         *
         * @type {goog.events.KeyCodes}
         * @private
         */
        private mnemonicKey_: goog.events.KeyCodes;

        /**
         * Returns the value associated with the menu item.  The default implementation
         * returns the model object associated with the item (if any), or its caption.
         * @return {*} Value associated with the menu item, if any, or its caption.
         */
        getValue(): any;

        /**
         * Sets the value associated with the menu item.  The default implementation
         * stores the value as the model of the menu item.
         * @param {*} value Value to be associated with the menu item.
         */
        setValue(value: any): void;

        /**
         * Sets the menu item to be selectable or not.  Set to true for menu items
         * that represent selectable options.
         * @param {boolean} selectable Whether the menu item is selectable.
         */
        setSelectable(selectable: boolean): void;

        /**
         * Sets the menu item to be selectable or not.
         * @param {boolean} selectable  Whether the menu item is selectable.
         * @private
         */
        private setSelectableInternal_(selectable: boolean): void;

        /**
         * Sets the menu item to be checkable or not.  Set to true for menu items
         * that represent checkable options.
         * @param {boolean} checkable Whether the menu item is checkable.
         */
        setCheckable(checkable: boolean): void;

        /**
         * Sets the menu item to be checkable or not.
         * @param {boolean} checkable Whether the menu item is checkable.
         * @private
         */
        private setCheckableInternal_(checkable: boolean): void;

        /**
         * @return {?string} The keyboard accelerator text, or null if the menu item
         *     doesn't have one.
         */
        getAccelerator(): string|null;

        /**
         * Sets the mnemonic key code. The mnemonic is the key associated with this
         * action.
         * @param {goog.events.KeyCodes} key The key code.
         */
        setMnemonic(key: goog.events.KeyCodes): void;

        /**
         * Gets the mnemonic key code. The mnemonic is the key associated with this
         * action.
         * @return {goog.events.KeyCodes} The key code of the mnemonic key.
         */
        getMnemonic(): goog.events.KeyCodes;
    }
}

declare namespace goog.ui.MenuItem {
    /**
     * The class set on an element that contains a keyboard accelerator hint.
     * @type {string}
     */
    let ACCELERATOR_CLASS: string;
}
