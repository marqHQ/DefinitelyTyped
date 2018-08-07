/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../date/date.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./datepickerrenderer.d.ts"/>
/// <reference path="../i18n/datetimesymbols.d.ts"/>
/// <reference path="../date/daterange.d.ts"/>
/// <reference path="./idgenerator.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.DatePickerEvent' {
    import alias = goog.ui.DatePickerEvent;
    export default alias;
}

declare module 'goog:goog.ui.DatePicker' {
    import alias = goog.ui.DatePicker;
    export default alias;
}

declare module 'goog:goog.ui.DatePicker.Events' {
    import alias = goog.ui.DatePicker.Events;
    export default alias;
}

declare namespace goog.ui {
    /**
     * DatePicker widget. Allows a single date to be selected from a calendar like
     * view.
     *
     * @extends {goog.ui.Component}
     */
    class DatePicker extends __DatePicker {}
    abstract class __DatePicker extends goog.ui.__Component {
        /**
         * @param {goog.date.Date|Date=} opt_date Date to initialize the date picker
         *     with, defaults to the current date.
         * @param {Object=} opt_dateTimeSymbols Date and time symbols to use.
         *     Defaults to goog.i18n.DateTimeSymbols if not set.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {goog.ui.DatePickerRenderer=} opt_renderer Optional Date picker
         *     renderer.
         */
        constructor(
            opt_date?: goog.date.Date|Date,
            opt_dateTimeSymbols?: Object,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.DatePickerRenderer
        );

        /**
         * Date and time symbols to use.
         * @type {!goog.i18n.DateTimeSymbolsType}
         * @private
         */
        private symbols_: any;

        /**
         * @type {!goog.ui.DatePickerRenderer}
         * @private
         */
        private renderer_: goog.ui.DatePickerRenderer;

        /**
         * Selected date.
         * @type {goog.date.Date}
         * @private
         */
        private date_: goog.date.Date;

        /**
         * Active month.
         * @type {goog.date.Date}
         * @private
         */
        private activeMonth_: goog.date.Date;

        /**
         * Class names to apply to the weekday columns.
         * @type {Array<string>}
         * @private
         */
        private wdayStyles_: string[];

        /**
         * Object that is being used to cache key handlers.
         * @type {Object}
         * @private
         */
        private keyHandlers_: Object;

        /**
         * Collection of dates that make up the date picker.
         * @type {!Array<!Array<!goog.date.Date>>}
         * @private
         */
        private grid_: goog.date.Date[][];

        /** @private {Array<!Array<Element>>} */
        private elTable_: any /*missing*/;

        /**
         * TODO(tbreisacher): Remove external references to this field,
         * and make it private.
         * @type {Element}
         */
        tableBody_: Element;

        /** @private {Element} */
        private tableFoot_: any /*missing*/;

        /** @private {Element} */
        private elYear_: any /*missing*/;

        /** @private {Element} */
        private elMonth_: any /*missing*/;

        /** @private {Element} */
        private elToday_: any /*missing*/;

        /** @private {Element} */
        private elNone_: any /*missing*/;

        /** @private {Element} */
        private menu_: any /*missing*/;

        /** @private {Element} */
        private menuSelected_: any /*missing*/;

        /** @private {?Element} */
        private selectedCell_: any /*missing*/;

        /** @private {function(Element)} */
        private menuCallback_: any /*missing*/;

        /**
         * Flag indicating if the number of weeks shown should be fixed.
         * @type {boolean}
         * @private
         */
        private showFixedNumWeeks_: boolean;

        /**
         * Flag indicating if days from other months should be shown.
         * @type {boolean}
         * @private
         */
        private showOtherMonths_: boolean;

        /**
         * Range of dates which are selectable by the user.
         * @type {!goog.date.DateRange}
         * @private
         */
        private userSelectableDateRange_: goog.date.DateRange;

        /**
         * Flag indicating if extra week(s) always should be added at the end. If not
         * set the extra week is added at the beginning if the number of days shown
         * from the previous month is less than the number from the next month.
         * @type {boolean}
         * @private
         */
        private extraWeekAtEnd_: boolean;

        /**
         * Flag indicating if week numbers should be shown.
         * @type {boolean}
         * @private
         */
        private showWeekNum_: boolean;

        /**
         * Flag indicating if weekday names should be shown.
         * @type {boolean}
         * @private
         */
        private showWeekdays_: boolean;

        /**
         * Flag indicating if none is a valid selection. Also controls if the none
         * button should be shown or not.
         * @type {boolean}
         * @private
         */
        private allowNone_: boolean;

        /**
         * Flag indicating if the today button should be shown.
         * @type {boolean}
         * @private
         */
        private showToday_: boolean;

        /**
         * Flag indicating if the picker should use a simple navigation menu that only
         * contains controls for navigating to the next and previous month. The default
         * navigation menu contains controls for navigating to the next/previous month,
         * next/previous year, and menus for jumping to specific months and years.
         * @type {boolean}
         * @private
         */
        private simpleNavigation_: boolean;

        /**
         * Custom decorator function. Takes a goog.date.Date object, returns a String
         * representing a CSS class or null if no special styling applies
         * @type {Function}
         * @private
         */
        private decoratorFunction_: Function;

        /**
         * Flag indicating if the dates should be printed as a two charater date.
         * @type {boolean}
         * @private
         */
        private longDateFormat_: boolean;

        /**
         * Element for navigation row on a datepicker.
         * @type {Element}
         * @private
         */
        private elNavRow_: Element;

        /**
         * Element for the month/year in the navigation row.
         * @type {Element}
         * @private
         */
        private elMonthYear_: Element;

        /**
         * Element for footer row on a datepicker.
         * @type {Element}
         * @private
         */
        private elFootRow_: Element;

        /**
         * Generator for unique table cell IDs.
         * @type {goog.ui.IdGenerator}
         * @private
         */
        private cellIdGenerator_: goog.ui.IdGenerator;

        /**
         * @deprecated Use isInDocument.
         */
        isCreated: any /*missing*/;

        /**
         * @return {number} The first day of week, 0 = Monday, 6 = Sunday.
         */
        getFirstWeekday(): number;

        /**
         * Returns the class name associated with specified weekday.
         * @param {number} wday The week day number to get the class name for.
         * @return {string} The class name associated with specified weekday.
         */
        getWeekdayClass(wday: number): string;

        /**
         * @return {boolean} Whether a fixed number of weeks should be showed. If not
         *     only weeks for the current month will be shown.
         */
        getShowFixedNumWeeks(): boolean;

        /**
         * @return {boolean} Whether a days from the previous and/or next month should
         *     be shown.
         */
        getShowOtherMonths(): boolean;

        /**
         * @return {boolean} Whether a the extra week(s) added always should be at the
         *     end. Only applicable if a fixed number of weeks are shown.
         */
        getExtraWeekAtEnd(): boolean;

        /**
         * @return {boolean} Whether week numbers should be shown.
         */
        getShowWeekNum(): boolean;

        /**
         * @return {boolean} Whether weekday names should be shown.
         */
        getShowWeekdayNames(): boolean;

        /**
         * @return {boolean} Whether none is a valid selection.
         */
        getAllowNone(): boolean;

        /**
         * @return {boolean} Whether the today button should be shown.
         */
        getShowToday(): boolean;

        /**
         * Returns base CSS class. This getter is used to get base CSS class part.
         * All CSS class names in component are created as:
         *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
         * @return {string} Base CSS class.
         */
        getBaseCssClass(): string;

        /**
         * Sets the first day of week
         *
         * @param {number} wday Week day, 0 = Monday, 6 = Sunday.
         */
        setFirstWeekday(wday: number): void;

        /**
         * Sets class name associated with specified weekday.
         *
         * @param {number} wday Week day, 0 = Monday, 6 = Sunday.
         * @param {string} className Class name.
         */
        setWeekdayClass(wday: number, className: string): void;

        /**
         * Sets whether a fixed number of weeks should be showed. If not only weeks
         * for the current month will be showed.
         *
         * @param {boolean} b Whether a fixed number of weeks should be showed.
         */
        setShowFixedNumWeeks(b: boolean): void;

        /**
         * Sets whether a days from the previous and/or next month should be shown.
         *
         * @param {boolean} b Whether a days from the previous and/or next month should
         *     be shown.
         */
        setShowOtherMonths(b: boolean): void;

        /**
         * Sets the range of dates which may be selected by the user.
         *
         * @param {!goog.date.DateRange} dateRange The range of selectable dates.
         */
        setUserSelectableDateRange(dateRange: goog.date.DateRange): void;

        /**
         * Gets the range of dates which may be selected by the user.
         *
         * @return {!goog.date.DateRange} The range of selectable dates.
         */
        getUserSelectableDateRange(): goog.date.DateRange;

        /**
         * Determine if a date may be selected by the user.
         *
         * @param {!goog.date.Date} date The date to be tested.
         * @return {boolean} Whether the user may select this date.
         * @private
         */
        private isUserSelectableDate_(date: goog.date.Date): boolean;

        /**
         * Sets whether the picker should use a simple navigation menu that only
         * contains controls for navigating to the next and previous month. The default
         * navigation menu contains controls for navigating to the next/previous month,
         * next/previous year, and menus for jumping to specific months and years.
         *
         * @param {boolean} b Whether to use a simple navigation menu.
         */
        setUseSimpleNavigationMenu(b: boolean): void;

        /**
         * Sets whether a the extra week(s) added always should be at the end. Only
         * applicable if a fixed number of weeks are shown.
         *
         * @param {boolean} b Whether a the extra week(s) added always should be at the
         *     end.
         */
        setExtraWeekAtEnd(b: boolean): void;

        /**
         * Sets whether week numbers should be shown.
         *
         * @param {boolean} b Whether week numbers should be shown.
         */
        setShowWeekNum(b: boolean): void;

        /**
         * Sets whether weekday names should be shown.
         *
         * @param {boolean} b Whether weekday names should be shown.
         */
        setShowWeekdayNames(b: boolean): void;

        /**
         * Sets whether the picker uses narrow weekday names ('M', 'T', 'W', ...).
         *
         * The default behavior is to use short names ('Mon', 'Tue', 'Wed', ...).
         *
         * @param {boolean} b Whether to use narrow weekday names.
         */
        setUseNarrowWeekdayNames(b: boolean): void;

        /**
         * Sets whether none is a valid selection.
         *
         * @param {boolean} b Whether none is a valid selection.
         */
        setAllowNone(b: boolean): void;

        /**
         * Sets whether the today button should be shown.
         *
         * @param {boolean} b Whether the today button should be shown.
         */
        setShowToday(b: boolean): void;

        /**
         * Updates the display style of the None and Today buttons as well as hides the
         * table foot if both are hidden.
         * @private
         */
        private updateTodayAndNone_(): void;

        /**
         * Sets the decorator function. The function should have the interface of
         *   {string} f({goog.date.Date});
         * and return a String representing a CSS class to decorate the cell
         * corresponding to the date specified.
         *
         * @param {Function} f The decorator function.
         */
        setDecorator(f: Function): void;

        /**
         * Sets whether the date will be printed in long format. In long format, dates
         * such as '1' will be printed as '01'.
         *
         * @param {boolean} b Whethere dates should be printed in long format.
         */
        setLongDateFormat(b: boolean): void;

        /**
         * Changes the active month to the previous one.
         */
        previousMonth(): void;

        /**
         * Changes the active month to the next one.
         */
        nextMonth(): void;

        /**
         * Changes the active year to the previous one.
         */
        previousYear(): void;

        /**
         * Changes the active year to the next one.
         */
        nextYear(): void;

        /**
         * Selects the current date.
         */
        selectToday(): void;

        /**
         * Clears the selection.
         */
        selectNone(): void;

        /**
         * @return {!goog.date.Date} The active month displayed.
         */
        getActiveMonth(): goog.date.Date;

        /**
         * @return {goog.date.Date} The selected date or null if nothing is selected.
         */
        getDate(): goog.date.Date;

        /**
         * @param {number} row The row in the grid.
         * @param {number} col The column in the grid.
         * @return {goog.date.Date} The date in the grid or null if there is none.
         */
        getDateAt(row: number, col: number): goog.date.Date;

        /**
         * Returns a date element given a row and column. In elTable_, the elements that
         * represent dates are 1 indexed because of other elements such as headers.
         * This corrects for the offset and makes the API 0 indexed.
         *
         * @param {number} row The row in the element table.
         * @param {number} col The column in the element table.
         * @return {Element} The element in the grid or null if there is none.
         * @protected
         */
        protected getDateElementAt(row: number, col: number): Element;

        /**
         * Sets the selected date. Will always fire the SELECT event.
         *
         * @param {goog.date.Date|Date} date Date to select or null to select nothing.
         */
        setDate(date: goog.date.Date|Date): void;

        /**
         * Sets the selected date, and optionally fires the SELECT event based on param.
         *
         * @param {goog.date.Date|Date} date Date to select or null to select nothing.
         * @param {boolean} fireSelection Whether to fire the selection event.
         * @private
         */
        private setDate_(date: goog.date.Date|Date, fireSelection: boolean): void;

        /**
         * Updates the navigation row (navigating months and maybe years) in the navRow_
         * element of a created picker.
         * @private
         */
        private updateNavigationRow_(): void;

        /**
         * Setup click handler with prevent default.
         *
         * @param {!Element} parentElement The parent element of the element. This is
         *     needed because the element in question might not be in the dom yet.
         * @param {string} cssName The CSS class name of the element to attach a click
         *     handler.
         * @param {Function} handlerFunction The click handler function.
         * @private
         */
        private addPreventDefaultClickHandler_(parentElement: Element, cssName: string, handlerFunction: Function):
            void;

        /**
         * Updates the footer row (with select buttons) in the footRow_ element of a
         * created picker.
         * @private
         */
        private updateFooterRow_(): void;

        /**
         * @deprecated Use decorate instead.
         */
        create: any /*missing*/;

        /**
         * Click handler for date grid.
         *
         * @param {goog.events.BrowserEvent} event Click event.
         * @private
         */
        private handleGridClick_(event: goog.events.BrowserEvent): void;

        /**
         * Keypress handler for date grid.
         *
         * @param {goog.events.BrowserEvent} event Keypress event.
         * @private
         */
        private handleGridKeyPress_(event: goog.events.BrowserEvent): void;

        /**
         * Click handler for month button. Opens month selection menu.
         *
         * @param {goog.events.BrowserEvent} event Click event.
         * @private
         */
        private showMonthMenu_(event: goog.events.BrowserEvent): void;

        /**
         * Click handler for year button. Opens year selection menu.
         *
         * @param {goog.events.BrowserEvent} event Click event.
         * @private
         */
        private showYearMenu_(event: goog.events.BrowserEvent): void;

        /**
         * Call back function for month menu.
         *
         * @param {Element} target Selected item.
         * @private
         */
        private handleMonthMenuClick_(target: Element): void;

        /**
         * Call back function for year menu.
         *
         * @param {Element} target Selected item.
         * @private
         */
        private handleYearMenuClick_(target: Element): void;

        /**
         * Support function for menu creation.
         *
         * @param {Element} srcEl Button to create menu for.
         * @param {Array<string>} items List of items to populate menu with.
         * @param {function(Element)} method Call back method.
         * @param {string} selected Item to mark as selected in menu.
         * @private
         */
        private createMenu_(srcEl: Element, items: string[], method: (_0: Element) => void, selected: string): void;

        /**
         * Click handler for menu.
         *
         * @param {goog.events.BrowserEvent} event Click event.
         * @private
         */
        private handleMenuClick_(event: goog.events.BrowserEvent): void;

        /**
         * Keypress handler for menu.
         *
         * @param {goog.events.BrowserEvent} event Keypress event.
         * @private
         */
        private handleMenuKeyPress_(event: goog.events.BrowserEvent): void;

        /**
         * Support function for menu destruction.
         * @private
         */
        private destroyMenu_(): void;

        /**
         * Determines the dates/weekdays for the current month and builds an in memory
         * representation of the calendar.
         *
         * @private
         */
        private updateCalendarGrid_(): void;

        /**
         * Draws calendar view from in memory representation and applies class names
         * depending on the selection, weekday and whatever the day belongs to the
         * active month or not.
         * @private
         */
        private redrawCalendarGrid_(): void;

        /**
         * Fires the CHANGE_ACTIVE_MONTH event.
         * @private
         */
        private fireChangeActiveMonthEvent_(): void;

        /**
         * Draw weekday names, if enabled. Start with whatever day has been set as the
         * first day of week.
         * @private
         */
        private redrawWeekdays_(): void;

        /**
         * Returns the key handler for an element and caches it so that it can be
         * retrieved at a later point.
         * @param {Element} el The element to get the key handler for.
         * @return {goog.events.KeyHandler} The key handler for the element.
         * @private
         */
        private getKeyHandlerForElement_(el: Element): goog.events.KeyHandler;
    }

    /**
     * Object representing a date picker event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class DatePickerEvent extends __DatePickerEvent {}
    abstract class __DatePickerEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {goog.ui.DatePicker} target Date picker initiating event.
         * @param {goog.date.Date} date Selected date.
         */
        constructor(type: string, target: goog.ui.DatePicker, date: goog.date.Date);

        /**
         * The selected date
         * @type {goog.date.Date}
         */
        date: goog.date.Date;
    }
}

declare namespace goog.ui.DatePicker {
    /**
     * Constants for event names
     *
     * @enum {string}
     */
    enum Events { CHANGE, CHANGE_ACTIVE_MONTH, SELECT }
}
