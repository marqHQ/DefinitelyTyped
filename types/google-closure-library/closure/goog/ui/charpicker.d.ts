/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../i18n/charpickerdata.d.ts"/>
/// <reference path="../i18n/uchar/namefetcher.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../structs/set.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="./menubutton.d.ts"/>
/// <reference path="./hovercard.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="./menuitem.d.ts"/>
/// <reference path="./button.d.ts"/>

declare module 'goog:goog.ui.CharPicker' {
    import alias = goog.ui.CharPicker;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Character Picker Class. This widget can be used to pick any Unicode
     * character by traversing a category-subcategory structure or by inputing its
     * hex value.
     *
     * See charpicker.html demo for example usage.
     * @extends {goog.ui.Component}
     * @final
     */
    class CharPicker extends __CharPicker {}
    abstract class __CharPicker extends goog.ui.__Component {
        /**
         * @param {goog.i18n.CharPickerData} charPickerData Category names and charlist.
         * @param {!goog.i18n.uChar.NameFetcher} charNameFetcher Object which fetches
         *     the names of the characters that are shown in the widget. These names
         *     may be stored locally or come from an external source.
         * @param {Array<string>=} opt_recents List of characters to be displayed in
         *     resently selected characters area.
         * @param {number=} opt_initCategory Sequence number of initial category.
         * @param {number=} opt_initSubcategory Sequence number of initial subcategory.
         * @param {number=} opt_rowCount Number of rows in the grid.
         * @param {number=} opt_columnCount Number of columns in the grid.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            charPickerData: goog.i18n.CharPickerData,
            charNameFetcher: goog.i18n.uChar.NameFetcher,
            opt_recents?: string[],
            opt_initCategory?: number,
            opt_initSubcategory?: number,
            opt_rowCount?: number,
            opt_columnCount?: number,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * Object used to retrieve character names.
         * @type {!goog.i18n.uChar.NameFetcher}
         * @private
         */
        private charNameFetcher_: goog.i18n.uChar.NameFetcher;

        /**
         * Object containing character lists and category names.
         * @type {goog.i18n.CharPickerData}
         * @private
         */
        private data_: goog.i18n.CharPickerData;

        /**
         * The category number to be used on widget init.
         * @type {number}
         * @private
         */
        private initCategory_: number;

        /**
         * The subcategory number to be used on widget init.
         * @type {number}
         * @private
         */
        private initSubcategory_: number;

        /**
         * Number of columns in the grid.
         * @type {number}
         * @private
         */
        private columnCount_: number;

        /**
         * Number of entries to be added to the grid.
         * @type {number}
         * @private
         */
        private gridsize_: number;

        /**
         * Number of the recently selected characters displayed.
         * @type {number}
         * @private
         */
        private recentwidth_: number;

        /**
         * List of recently used characters.
         * @type {Array<string>}
         * @private
         */
        private recents_: string[];

        /**
         * Handler for events.
         * @type {goog.events.EventHandler<!goog.ui.CharPicker>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.CharPicker>;

        /**
         * Decompressor used to get the list of characters from a base88 encoded
         * character list.
         * @type {Object}
         * @private
         */
        private decompressor_: Object;

        /**
         * The last selected character.
         * @type {?string}
         * @private
         */
        private selectedChar_: string|null;

        /**
         * Set of formatting characters whose display need to be swapped with nbsp
         * to prevent layout issues.
         * @type {goog.structs.Set}
         * @private
         */
        private layoutAlteringChars_: goog.structs.Set<any>;

        /**
         * The top category menu.
         * @type {goog.ui.Menu}
         * @private
         */
        private menu_: goog.ui.Menu;

        /**
         * The top category menu button.
         * @type {goog.ui.MenuButton}
         * @private
         */
        private menubutton_: goog.ui.MenuButton;

        /**
         * The subcategory menu.
         * @type {goog.ui.Menu}
         * @private
         */
        private submenu_: goog.ui.Menu;

        /**
         * The subcategory menu button.
         * @type {goog.ui.MenuButton}
         * @private
         */
        private submenubutton_: goog.ui.MenuButton;

        /** @type {number} */
        itempos: number;

        /** @type {!Array<string>} */
        items: string[];

        /** @private {!goog.events.KeyHandler} */
        private keyHandler_: any /*missing*/;

        /**
         * Category index used to index the data tables.
         * @type {number}
         */
        category: number;

        /** @private {Element} */
        private stick_: any /*missing*/;

        /**
         * The element representing the number of rows visible in the grid.
         * This along with goog.ui.CharPicker.stick_ would help to create a scrollbar
         * of right size.
         * @type {HTMLElement}
         * @private
         */
        private stickwrap_: HTMLElement;

        /**
         * The component containing all the buttons for each character in display.
         * @type {goog.ui.Component}
         * @private
         */
        private grid_: goog.ui.Component;

        /**
         * The component used for extra information about the character set displayed.
         * @type {goog.ui.Component}
         * @private
         */
        private notice_: goog.ui.Component;

        /**
         * Grid displaying recently selected characters.
         * @type {goog.ui.Component}
         * @private
         */
        private recentgrid_: goog.ui.Component;

        /**
         * Input field for entering the hex value of the character.
         * @type {goog.ui.Component}
         * @private
         */
        private input_: goog.ui.Component;

        /**
         * OK button for entering hex value of the character.
         * @private {goog.ui.Button}
         */
        private okbutton_: any /*missing*/;

        /**
         * Element displaying character name in preview.
         * @type {Element}
         * @private
         */
        private charNameEl_: Element;

        /**
         * Element displaying character in preview.
         * @type {Element}
         * @private
         */
        private zoomEl_: Element;

        /**
         * Element displaying character number (codepoint) in preview.
         * @type {Element}
         * @private
         */
        private unicodeEl_: Element;

        /**
         * Hover card for displaying the preview of a character.
         * Preview would contain character in large size and its U+ notation. It would
         * also display the name, if available.
         * @type {goog.ui.HoverCard}
         * @private
         */
        private hc_: goog.ui.HoverCard;

        /**
         * Gets the last selected character.
         * @return {?string} The last selected character.
         */
        getSelectedChar(): string|null;

        /**
         * Gets the list of characters user selected recently.
         * @return {Array<string>} The recent character list.
         */
        getRecentChars(): string[];

        /**
         * Handles the button focus by updating the aria label with the character name
         * so it becomes possible to get spoken feedback while tabbing through the
         * visible symbols.
         * @param {goog.events.Event} e The focus event.
         * @private
         */
        private handleFocus_(e: goog.events.Event): void;

        /**
         * On scroll, updates the grid with characters correct to the scroll position.
         * @param {goog.events.Event} e Scroll event to handle.
         * @private
         */
        private handleScroll_(e: goog.events.Event): void;

        /**
         * On a menu click, sets correct character set in the grid; on a grid click
         * accept the character as the selected one and adds to recent selection, if not
         * already present.
         * @param {goog.events.Event} e Event for the click on menus or grid.
         * @private
         */
        private handleSelectedItem_(e: goog.events.Event): void;

        /**
         * When user types the characters displays the preview. Enables the OK button,
         * if the character is valid.
         * @param {goog.events.Event} e Event for typing in input field.
         * @private
         */
        private handleInput_(e: goog.events.Event): void;

        /**
         * On OK click accepts the character and updates the recent char list.
         * @param {goog.events.Event=} opt_event Event for click on OK button.
         * @return {boolean} Indicates whether to propagate event.
         * @private
         */
        private handleOkClick_(opt_event?: goog.events.Event): boolean;

        /**
         * Behaves exactly like the OK button on Enter key.
         * @param {goog.events.KeyEvent} e Event for enter on the input field.
         * @return {boolean} Indicates whether to propagate event.
         * @private
         */
        private handleEnter_(e: goog.events.KeyEvent): boolean;

        /**
         * Gets the character from the event target.
         * @param {Element} e Event target containing the 'char' attribute.
         * @return {string} The character specified in the event.
         * @private
         */
        private getChar_(e: Element): string;

        /**
         * Creates a menu entry for either the category listing or subcategory listing.
         * @param {number} id Id to be used for the entry.
         * @param {string} caption Text displayed for the menu item.
         * @return {!goog.ui.MenuItem} Menu item to be added to the menu listing.
         * @private
         */
        private createMenuItem_(id: number, caption: string): goog.ui.MenuItem;

        /**
         * Sets the category and updates the submenu items and grid accordingly.
         * @param {number} category Category index used to index the data tables.
         * @param {number=} opt_subcategory Subcategory index used with category index.
         * @private
         */
        private setSelectedCategory_(category: number, opt_subcategory?: number): void;

        /**
         * Sets the subcategory and updates the grid accordingly.
         * @param {number} subcategory Sub-category index used to index the data tables.
         * @private
         */
        private setSelectedSubcategory_(subcategory: number): void;

        /**
         * Updates the grid according to a given category and subcategory.
         * @param {number} category Index to the category table.
         * @param {number} subcategory Index to the subcategory table.
         * @private
         */
        private setSelectedGrid_(category: number, subcategory: number): void;

        /**
         * Updates the grid with new character list.
         * @param {goog.ui.Component} grid The grid which is updated with a new set of
         *     characters.
         * @param {Array<string>} items Characters to be added to the grid.
         * @private
         */
        private updateGrid_(grid: goog.ui.Component, items: string[]): void;

        /**
         * Updates the grid with new character list for a given starting point.
         * @param {goog.ui.Component} grid The grid which is updated with a new set of
         *     characters.
         * @param {Array<string>} items Characters to be added to the grid.
         * @param {number} start The index from which the characters should be
         *     displayed.
         * @private
         */
        private modifyGridWithItems_(grid: goog.ui.Component, items: string[], start: number): void;

        /**
         * Creates the grid for characters to displayed for selection.
         * @param {goog.ui.Component} grid The grid which is updated with a new set of
         *     characters.
         * @private
         */
        private populateGridWithButtons_(grid: goog.ui.Component): void;

        /**
         * Updates the grid cell with new character.
         * @param {goog.ui.Button} button This button is popped up for new character.
         * @param {string} ch Character to be displayed by the button.
         * @private
         */
        private modifyCharNode_(button: goog.ui.Button, ch: string): void;

        /**
         * Adds a given character to the recent character list.
         * @param {string} character Character to be added to the recent list.
         * @private
         */
        private updateRecents_(character: string): void;

        /**
         * Gets the user inputed unicode character.
         * @return {string} Unicode character inputed by user.
         */
        getInputChar(): string;

        /**
         * Gets the display character for the given character.
         * @param {string} ch Character whose display is fetched.
         * @return {string} The display of the given character.
         * @private
         */
        private displayChar_(ch: string): string;
    }
}
