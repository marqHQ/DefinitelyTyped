/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../i18n/datetimeformat.d.ts"/>
/// <reference path="../i18n/datetimeparse.d.ts"/>
/// <reference path="./datepicker.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./popupdatepicker.d.ts"/>
/// <reference path="../date/date.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.InputDatePicker' {
    import alias = goog.ui.InputDatePicker;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Input date picker widget.
     *
     * @extends {goog.ui.Component}
     */
    class InputDatePicker extends __InputDatePicker {}
    abstract class __InputDatePicker extends goog.ui.__Component {
        /**
         * @param {goog.i18n.DateTimeFormat} dateTimeFormatter A formatter instance
         *     used to format the date picker's date for display in the input element.
         * @param {goog.i18n.DateTimeParse} dateTimeParser A parser instance used to
         *     parse the input element's string as a date to set the picker.
         * @param {goog.ui.DatePicker=} opt_datePicker Optional DatePicker.  This
         *     enables the use of a custom date-picker instance.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            dateTimeFormatter: goog.i18n.DateTimeFormat,
            dateTimeParser: goog.i18n.DateTimeParse,
            opt_datePicker?: goog.ui.DatePicker,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * Used to format the date picker's date for display in the input element.
         * @type {goog.i18n.DateTimeFormat}
         * @private
         */
        private dateTimeFormatter_: goog.i18n.DateTimeFormat;

        /**
         * Used to parse the input element's string as a date to set the picker.
         * @type {goog.i18n.DateTimeParse}
         * @private
         */
        private dateTimeParser_: goog.i18n.DateTimeParse;

        /**
         * The instance of goog.ui.PopupDatePicker used to pop up and select the date.
         * @type {goog.ui.PopupDatePicker}
         * @private
         */
        private popupDatePicker_: goog.ui.PopupDatePicker;

        /**
         * The element that the PopupDatePicker should be parented to. Defaults to the
         * body element of the page.
         * @type {Element}
         * @private
         */
        private popupParentElement_: Element;

        /**
         * Returns the PopupDatePicker's internal DatePicker instance.  This can be
         * used to customize the date picker's styling.
         *
         * @return {goog.ui.DatePicker} The internal DatePicker instance.
         */
        getDatePicker(): goog.ui.DatePicker;

        /**
         * Returns the PopupDatePicker instance.
         *
         * @return {goog.ui.PopupDatePicker} Popup instance.
         */
        getPopupDatePicker(): goog.ui.PopupDatePicker;

        /**
         * Returns the selected date, if any.  Compares the dates from the date picker
         * and the input field, causing them to be synced if different.
         * @return {goog.date.DateTime} The selected date, if any.
         */
        getDate(): goog.date.DateTime;

        /**
         * Sets the selected date.  See goog.ui.PopupDatePicker.setDate().
         * @param {goog.date.Date} date The date to set.
         */
        setDate(date: goog.date.Date): void;

        /**
         * Sets the value of the input element.  This can be overridden to support
         * alternative types of input setting.
         *
         * @param {string} value The value to set.
         */
        setInputValue(value: string): void;

        /**
         * Returns the value of the input element.  This can be overridden to support
         * alternative types of input getting.
         *
         * @return {string} The input value.
         */
        getInputValue(): string;

        /**
         * Sets the value of the input element from date object.
         *
         * @param {?goog.date.Date} date The value to set.
         * @private
         */
        private setInputValueAsDate_(date: goog.date.Date|null): void;

        /**
         * Gets the input element value and attempts to parse it as a date.
         *
         * @return {goog.date.DateTime} The date object is returned if the parse
         *      is successful, null is returned on failure.
         * @private
         */
        private getInputValueAsDate_(): goog.date.DateTime;

        /**
         * Sets the element that the PopupDatePicker should be parented to. If not set,
         * defaults to the body element of the page.
         * @param {Element} el The element that the PopupDatePicker should be parented
         *     to.
         */
        setPopupParentElement(el: Element): void;

        /**
         * See goog.ui.PopupDatePicker.showPopup().
         * @param {Element} element Reference element for displaying the popup -- popup
         *     will appear at the bottom-left corner of this element.
         */
        showForElement(element: Element): void;

        /**
         * See goog.ui.PopupDatePicker.hidePopup().
         */
        hidePopup(): void;

        /**
         * Event handler for popup date picker popup events.
         *
         * @param {goog.events.Event} e popup event.
         * @private
         */
        private onPopup_(e: goog.events.Event): void;

        /**
         * Event handler for date change events.  Called when the date changes.
         *
         * @param {goog.ui.DatePickerEvent} e Date change event.
         * @private
         */
        private onDateChanged_(e: goog.ui.DatePickerEvent): void;
    }
}
