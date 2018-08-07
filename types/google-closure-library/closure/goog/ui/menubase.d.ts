/// <reference path="../../../globals.d.ts"/>
/// <reference path="./popup.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.MenuBase' {
    import alias = goog.ui.MenuBase;
    export default alias;
}

declare namespace goog.ui {
    /**
     * The MenuBase class provides an abstract base class for different
     * implementations of menu controls.
     *
     * @deprecated Use goog.ui.Menu.
     * @extends {goog.ui.Popup}
     */
    class MenuBase extends __MenuBase {}
    abstract class __MenuBase extends goog.ui.__Popup {
        /**
         * @param {Element=} opt_element A DOM element for the popup.
         */
        constructor(opt_element?: Element);

        /**
         * Event handler for simplifiying adding/removing listeners.
         * @type {goog.events.EventHandler<!goog.ui.MenuBase>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.MenuBase>;

        /**
         * KeyHandler to cope with the vagaries of cross-browser key events.
         * @type {goog.events.KeyHandler}
         * @private
         */
        private keyHandler_: goog.events.KeyHandler;

        /**
         * Returns the selected item
         *
         * @return {Object} The item selected or null if no item is selected.
         */
        getSelectedItem(): Object;

        /**
         * Sets the selected item
         *
         * @param {Object} item The item to select. The type of this item is specific
         *     to the menu class.
         */
        setSelectedItem(item: Object): void;

        /**
         * Mouse over handler for the menu. Derived classes should override.
         *
         * @param {goog.events.Event} e The event object.
         * @protected
         */
        protected onMouseOver(e: goog.events.Event): void;

        /**
         * Mouse out handler for the menu. Derived classes should override.
         *
         * @param {goog.events.Event} e The event object.
         * @protected
         */
        protected onMouseOut(e: goog.events.Event): void;

        /**
         * Mouse down handler for the menu. Derived classes should override.
         *
         * @param {!goog.events.Event} e The event object.
         * @protected
         */
        protected onMouseDown(e: goog.events.Event): void;

        /**
         * Mouse up handler for the menu. Derived classes should override.
         *
         * @param {goog.events.Event} e The event object.
         * @protected
         */
        protected onMouseUp(e: goog.events.Event): void;

        /**
         * Key down handler for the menu. Derived classes should override.
         *
         * @param {goog.events.KeyEvent} e The event object.
         * @protected
         */
        protected onKeyDown(e: goog.events.KeyEvent): void;
    }
}

/**
 * Events fired by the Menu
 * @const
 */
declare namespace goog.ui.MenuBase.Events {
    /**
     * Event fired by the Menu when an item is "clicked".
     */
    let ITEM_ACTION: any /*missing*/;
}
