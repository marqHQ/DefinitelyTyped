/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="./datepicker.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./popup.d.ts"/>
/// <reference path="../date/date.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.PopupDatePicker' {
    import alias = goog.ui.PopupDatePicker;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Popup date picker widget. Fires goog.ui.PopupBase.EventType.SHOW or HIDE
     * events when its visibility changes.
     *
     * @extends {goog.ui.Component}
     */
    class PopupDatePicker extends __PopupDatePicker {}
    abstract class __PopupDatePicker extends goog.ui.__Component {
        /**
         * @param {goog.ui.DatePicker=} opt_datePicker Optional DatePicker.  This
         *     enables the use of a custom date-picker instance.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_datePicker?: goog.ui.DatePicker, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Instance of a date picker control.
         * @type {goog.ui.DatePicker?}
         * @private
         */
        private datePicker_: goog.ui.DatePicker|null;

        /**
         * Instance of goog.ui.Popup used to manage the behavior of the date picker.
         * @type {goog.ui.Popup?}
         * @private
         */
        private popup_: goog.ui.Popup|null;

        /**
         * Reference to the element that triggered the last popup.
         * @type {Element}
         * @private
         */
        private lastTarget_: Element;

        /**
         * Whether the date picker can move the focus to its key event target when it
         * is shown.  The default is true.  Setting to false can break keyboard
         * navigation, but this is needed for certain scenarios, for example the
         * toolbar menu in trogedit which can't have the selection changed.
         * @type {boolean}
         * @private
         */
        private allowAutoFocus_: boolean;

        /**
         * @return {boolean} Whether the date picker is visible.
         */
        isVisible(): boolean;

        /**
         * @return {goog.ui.DatePicker} The date picker instance.
         */
        getDatePicker(): goog.ui.DatePicker;

        /**
         * @return {goog.date.Date?} The selected date, if any.  See
         *     goog.ui.DatePicker.getDate().
         */
        getDate(): goog.date.Date|null;

        /**
         * Sets the selected date.  See goog.ui.DatePicker.setDate().
         * @param {goog.date.Date?} date The date to select.
         */
        setDate(date: goog.date.Date|null): void;

        /**
         * @return {Element} The last element that triggered the popup.
         */
        getLastTarget(): Element;

        /**
         * Attaches the popup date picker to an element.
         * @param {Element} element The element to attach to.
         */
        attach(element: Element): void;

        /**
         * Detatches the popup date picker from an element.
         * @param {Element} element The element to detach from.
         */
        detach(element: Element): void;

        /**
         * Sets whether the date picker can automatically move focus to its key event
         * target when it is set to visible.
         * @param {boolean} allow Whether to allow auto focus.
         */
        setAllowAutoFocus(allow: boolean): void;

        /**
         * @return {boolean} Whether the date picker can automatically move focus to
         * its key event target when it is set to visible.
         */
        getAllowAutoFocus(): boolean;

        /**
         * Show the popup at the bottom-left corner of the specified element.
         * @param {Element} element Reference element for displaying the popup -- popup
         *     will appear at the bottom-left corner of this element.
         * @param {boolean=} opt_keepDate Whether to keep the date picker's current
         *     date. If false, the date is set to null. Defaults to false.
         */
        showPopup(element: Element, opt_keepDate?: boolean): void;

        /**
         * Handles click events on the targets and shows the date picker.
         * @param {goog.events.Event} event The click event.
         * @private
         */
        private showPopup_(event: goog.events.Event): void;

        /**
         * Hides this popup.
         */
        hidePopup(): void;

        /**
         * Called when date selection is made.
         *
         * @param {!goog.events.Event} event The date change event.
         * @private
         */
        private onDateSelected_(event: goog.events.Event): void;

        /**
         * Called when the date is changed.
         *
         * @param {!goog.events.Event} event The date change event.
         * @private
         */
        private onDateChanged_(event: goog.events.Event): void;
    }
}
