/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="./labelinput.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../events/inputhandler.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>

declare module 'goog:goog.ui.ComboBoxItem' {
    import alias = goog.ui.ComboBoxItem;
    export default alias;
}

declare module 'goog:goog.ui.ComboBox' {
    import alias = goog.ui.ComboBox;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A ComboBox control.
     * @extends {goog.ui.Component}
     */
    class ComboBox extends __ComboBox {}
    abstract class __ComboBox extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {goog.ui.Menu=} opt_menu Optional menu component.
         *     This menu is disposed of by this control.
         * @param {goog.ui.LabelInput=} opt_labelInput Optional label input.
         *     This label input is disposed of by this control.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_menu?: goog.ui.Menu, opt_labelInput?: goog.ui.LabelInput);

        /**
         * A logger to help debugging of combo box behavior.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Whether the combo box is enabled.
         * @type {boolean}
         * @private
         */
        private enabled_: boolean;

        /**
         * Keyboard event handler to manage key events dispatched by the input element.
         * @type {goog.events.KeyHandler}
         * @private
         */
        private keyHandler_: goog.events.KeyHandler;

        /**
         * Input handler to take care of firing events when the user inputs text in
         * the input.
         * @type {goog.events.InputHandler?}
         * @private
         */
        private inputHandler_: goog.events.InputHandler|null;

        /**
         * The last input token.
         * @type {?string}
         * @private
         */
        private lastToken_: string|null;

        /**
         * A LabelInput control that manages the focus/blur state of the input box.
         * @type {goog.ui.LabelInput?}
         * @private
         */
        private labelInput_: goog.ui.LabelInput|null;

        /**
         * Drop down menu for the combo box.  Will be created at construction time.
         * @type {goog.ui.Menu?}
         * @private
         */
        private menu_: goog.ui.Menu|null;

        /**
         * The cached visible count.
         * @type {number}
         * @private
         */
        private visibleCount_: number;

        /**
         * The input element.
         * @type {Element}
         * @private
         */
        private input_: Element;

        /**
         * The match function.  The first argument for the match function will be
         * a MenuItem's caption and the second will be the token to evaluate.
         * @type {Function}
         * @private
         */
        private matchFunction_: Function;

        /**
         * Element used as the combo boxes button.
         * @type {Element}
         * @private
         */
        private button_: Element;

        /**
         * Default text content for the input box when it is unchanged and unfocussed.
         * @type {string}
         * @private
         */
        private defaultText_: string;

        /**
         * Name for the input box created
         * @type {string}
         * @private
         */
        private fieldName_: string;

        /**
         * Timer identifier for delaying the dismissal of the combo menu.
         * @type {?number}
         * @private
         */
        private dismissTimer_: number|null;

        /**
         * True if the unicode inverted triangle should be displayed in the dropdown
         * button. Defaults to false.
         * @type {boolean} useDropdownArrow
         * @private
         */
        private useDropdownArrow_: boolean;

        /**
         * Enables/Disables the combo box.
         * @param {boolean} enabled Whether to enable (true) or disable (false) the
         *     combo box.
         */
        setEnabled(enabled: boolean): void;

        /**
         * @return {boolean} Whether the menu item is enabled.
         */
        isEnabled(): boolean;

        /**
         * Dismisses the menu and resets the value of the edit field.
         */
        dismiss(): void;

        /**
         * Adds a new menu item at the end of the menu.
         * @param {goog.ui.MenuItem} item Menu item to add to the menu.
         */
        addItem(item: goog.ui.MenuItem): void;

        /**
         * Adds a new menu item at a specific index in the menu.
         * @param {goog.ui.MenuItem} item Menu item to add to the menu.
         * @param {number} n Index at which to insert the menu item.
         */
        addItemAt(item: goog.ui.MenuItem, n: number): void;

        /**
         * Removes an item from the menu and disposes it.
         * @param {goog.ui.MenuItem} item The menu item to remove.
         */
        removeItem(item: goog.ui.MenuItem): void;

        /**
         * Remove all of the items from the ComboBox menu
         */
        removeAllItems(): void;

        /**
         * Removes a menu item at a given index in the menu.
         * @param {number} n Index of item.
         */
        removeItemAt(n: number): void;

        /**
         * Returns a reference to the menu item at a given index.
         * @param {number} n Index of menu item.
         * @return {goog.ui.MenuItem?} Reference to the menu item.
         */
        getItemAt(n: number): goog.ui.MenuItem|null;

        /**
         * Returns the number of items in the list, including non-visible items,
         * such as separators.
         * @return {number} Number of items in the menu for this combobox.
         */
        getItemCount(): number;

        /**
         * @return {goog.ui.Menu} The menu that pops up.
         */
        getMenu(): goog.ui.Menu;

        /**
         * @return {Element} The input element.
         */
        getInputElement(): Element;

        /**
         * @return {goog.ui.LabelInput} A LabelInput control that manages the
         *     focus/blur state of the input box.
         */
        getLabelInput(): goog.ui.LabelInput;

        /**
         * @return {number} The number of visible items in the menu.
         * @private
         */
        private getNumberOfVisibleItems_(): number;

        /**
         * Sets the match function to be used when filtering the combo box menu.
         * @param {Function} matchFunction The match function to be used when filtering
         *     the combo box menu.
         */
        setMatchFunction(matchFunction: Function): void;

        /**
         * @return {Function} The match function for the combox box.
         */
        getMatchFunction(): Function;

        /**
         * Sets the default text for the combo box.
         * @param {string} text The default text for the combo box.
         */
        setDefaultText(text: string): void;

        /**
         * @return {string} text The default text for the combox box.
         */
        getDefaultText(): string;

        /**
         * Sets the field name for the combo box.
         * @param {string} fieldName The field name for the combo box.
         */
        setFieldName(fieldName: string): void;

        /**
         * @return {string} The field name for the combo box.
         */
        getFieldName(): string;

        /**
         * Set to true if a unicode inverted triangle should be displayed in the
         * dropdown button.
         * This option defaults to false for backwards compatibility.
         * @param {boolean} useDropdownArrow True to use the dropdown arrow.
         */
        setUseDropdownArrow(useDropdownArrow: boolean): void;

        /**
         * Sets the current value of the combo box.
         * @param {string} value The new value.
         */
        setValue(value: string): void;

        /**
         * @return {string} The current value of the combo box.
         */
        getValue(): string;

        /**
         * @return {string} HTML escaped token.
         */
        getToken(): string;

        /**
         * @return {string} The token for the current cursor position in the
         *     input box, when multi-input is disabled it will be the full input value.
         * @private
         */
        private getTokenText_(): string;

        /**
         * @private
         */
        private setupMenu_(): void;

        /**
         * Shows the menu if it isn't already showing.  Also positions the menu
         * correctly, resets the menu item visibilities and highlights the relevant
         * item.
         * @param {boolean} showAll Whether to show all items, with the first matching
         *     item highlighted.
         * @private
         */
        private maybeShowMenu_(showAll: boolean): void;

        /**
         * Positions the menu.
         * @protected
         */
        protected positionMenu(): void;

        /**
         * Show the menu and add an active class to the combo box's element.
         * @private
         */
        private showMenu_(): void;

        /**
         * Hide the menu and remove the active class from the combo box's element.
         * @private
         */
        private hideMenu_(): void;

        /**
         * Clears the dismiss timer if it's active.
         * @private
         */
        private clearDismissTimer_(): void;

        /**
         * Event handler for when the combo box area has been clicked.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onComboMouseDown_(e: goog.events.BrowserEvent): void;

        /**
         * Event handler for when the document is clicked.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onDocClicked_(e: goog.events.BrowserEvent): void;

        /**
         * Handle the menu's select event.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private onMenuSelected_(e: goog.events.Event): void;

        /**
         * Event handler for when the input box looses focus -- hide the menu
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onInputBlur_(e: goog.events.BrowserEvent): void;

        /**
         * Handles keyboard events from the input box.  Returns true if the combo box
         * was able to handle the event, false otherwise.
         * @param {goog.events.KeyEvent} e Key event to handle.
         * @return {boolean} Whether the event was handled by the combo box.
         * @protected
         * @suppress {visibility} performActionInternal
         */
        protected handleKeyEvent(e: goog.events.KeyEvent): boolean;

        /**
         * Handles the content of the input box changing.
         * @param {goog.events.Event} e The INPUT event to handle.
         * @private
         */
        private onInputEvent_(e: goog.events.Event): void;

        /**
         * Handles the content of the input box changing, either because of user
         * interaction or programmatic changes.
         * @private
         */
        private handleInputChange_(): void;

        /**
         * Loops through all menu items setting their visibility according to a token.
         * @param {string} token The token.
         * @private
         */
        private setItemVisibilityFromToken_(token: string): void;

        /**
         * Highlights the first token that matches the given token.
         * @param {string} token The token.
         * @private
         */
        private setItemHighlightFromToken_(token: string): void;

        /**
         * Returns true if the item has an isSticky method and the method returns true.
         * @param {goog.ui.MenuItem} item The item.
         * @return {boolean} Whether the item has an isSticky method and the method
         *     returns true.
         * @private
         */
        private isItemSticky_(item: goog.ui.MenuItem): boolean;
    }

    /**
     * Class for combo box items.
     * @extends {goog.ui.MenuItem}
     */
    class ComboBoxItem extends __ComboBoxItem {}
    abstract class __ComboBoxItem extends goog.ui.__MenuItem {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {*=} opt_data Identifying data for the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional dom helper used for dom
         *     interactions.
         * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_data?: any,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuItemRenderer
        );

        /**
         * Whether the menu item is sticky, non-sticky items will be hidden as the
         * user types.
         * @type {boolean}
         * @private
         */
        private isSticky_: boolean;

        /**
         * Sets the menu item to be sticky or not sticky.
         * @param {boolean} sticky Whether the menu item should be sticky.
         */
        setSticky(sticky: boolean): void;

        /**
         * @return {boolean} Whether the menu item is sticky.
         */
        isSticky(): boolean;

        /**
         * Sets the format for a menu item based on a token, bolding the token.
         * @param {string} token The token.
         */
        setFormatFromToken(token: string): void;
    }
}

declare namespace goog.ui.ComboBox {
    /**
     * Number of milliseconds to wait before dismissing combobox after blur.
     * @type {number}
     */
    let BLUR_DISMISS_TIMER_MS: number;
}
