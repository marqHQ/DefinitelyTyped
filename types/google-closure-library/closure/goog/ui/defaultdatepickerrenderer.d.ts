/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datepickerrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.DefaultDatePickerRenderer' {
    import alias = goog.ui.DefaultDatePickerRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.DatePicker}. Renders the date picker's
     * navigation header and footer.
     *
     * @implements {goog.ui.DatePickerRenderer}
     */
    class DefaultDatePickerRenderer extends __DefaultDatePickerRenderer {}
    abstract class __DefaultDatePickerRenderer implements goog.ui.DatePickerRenderer {
        /**
         * @param {string} baseCssClass Name of base CSS class of the date picker.
         * @param {goog.dom.DomHelper=} opt_domHelper DOM helper.
         */
        constructor(baseCssClass: string, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Name of base CSS class of datepicker
         * @type {string}
         * @private
         */
        private baseCssClass_: string;

        /**
         * @type {!goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * Returns the dom helper that is being used on this component.
         * @return {!goog.dom.DomHelper} The dom helper used on this component.
         */
        getDomHelper(): goog.dom.DomHelper;

        /**
         * Returns base CSS class. This getter is used to get base CSS class part.
         * All CSS class names in component are created as:
         *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
         * @return {string} Base CSS class.
         */
        getBaseCssClass(): string;

        /**
         * Support function for button creation.
         *
         * @param {Element} parentNode Container the button should be added to.
         * @param {string} label Button label.
         * @param {string=} opt_className Class name for button, which will be used
         *    in addition to "goog-date-picker-btn".
         * @private
         * @return {!Element} The created button element.
         */
        private createButton_(parentNode: Element, label: string, opt_className?: string): Element;

        /**
         * Render the navigation row.
         *
         * @param {!Element} row The parent element to render the component into.
         * @param {boolean} simpleNavigation Whether the picker should render a simple
         *     navigation menu that only contains controls for navigating to the next
         *     and previous month. The default navigation menu contains controls for
         *     navigating to the next/previous month, next/previous year, and menus for
         *     jumping to specific months and years.
         * @param {boolean} showWeekNum Whether week numbers should be shown.
         * @param {string} fullDateFormat The full date format.
         *     {@see goog.i18n.DateTimeSymbols}.
         */
        renderNavigationRow(row: Element, simpleNavigation: boolean, showWeekNum: boolean, fullDateFormat: string):
            void;

        /**
         * Render the footer row.
         *
         * @param {!Element} row The parent element to render the component into.
         * @param {boolean} showWeekNum Whether week numbers should be shown.
         */
        renderFooterRow(row: Element, showWeekNum: boolean): void;
    }
}
