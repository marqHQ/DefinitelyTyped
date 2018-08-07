/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./rangemodel.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ProgressBar' {
    import alias = goog.ui.ProgressBar;
    export default alias;
}

declare module 'goog:goog.ui.ProgressBar.Orientation' {
    import alias = goog.ui.ProgressBar.Orientation;
    export default alias;
}

declare namespace goog.ui {
    /**
     * This creates a progress bar object.
     * @extends {goog.ui.Component}
     */
    class ProgressBar extends __ProgressBar {}
    abstract class __ProgressBar extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /** @type {?HTMLDivElement} */
        thumbElement_: HTMLDivElement|null;

        /**
         * The underlying data model for the progress bar.
         * @type {goog.ui.RangeModel}
         * @private
         */
        private rangeModel_: goog.ui.RangeModel;

        /**
         * This creates the thumb element.
         * @private
         * @return {HTMLDivElement} The created thumb element.
         */
        private createThumb_(): HTMLDivElement;

        /**
         * Adds the initial event listeners to the element.
         * @private
         */
        private attachEvents_(): void;

        /**
         * Removes the event listeners added by attachEvents_.
         * @private
         */
        private detachEvents_(): void;

        /**
         * @return {number} The value.
         */
        getValue(): number;

        /**
         * Sets the value
         * @param {number} v The value.
         */
        setValue(v: number): void;

        /**
         * Sets the state for a11y of the current value.
         * @private
         */
        private setValueState_(): void;

        /**
         * @return {number} The minimum value.
         */
        getMinimum(): number;

        /**
         * Sets the minimum number
         * @param {number} v The minimum value.
         */
        setMinimum(v: number): void;

        /**
         * Sets the state for a11y of the minimum value.
         * @private
         */
        private setMinimumState_(): void;

        /**
         * @return {number} The maximum value.
         */
        getMaximum(): number;

        /**
         * Sets the maximum number
         * @param {number} v The maximum value.
         */
        setMaximum(v: number): void;

        /**
         * Sets the state for a11y of the maximum valiue.
         * @private
         */
        private setMaximumState_(): void;

        /**
         *
         * @type {goog.ui.ProgressBar.Orientation}
         * @private
         */
        private orientation_: goog.ui.ProgressBar.Orientation;

        /**
         * Call back when the internal range model changes
         * @param {goog.events.Event} e The event object.
         * @private
         */
        private handleChange_(e: goog.events.Event): void;

        /**
         * This is called when we need to update the size of the thumb. This happens
         * when first created as well as when the value and the orientation changes.
         * @private
         */
        private updateUi_(): void;

        /**
         * This is called when we need to setup the UI sizes and positions. This
         * happens when we create the element and when we change the orientation.
         * @private
         */
        private initializeUi_(): void;

        /**
         * Changes the orientation
         * @param {goog.ui.ProgressBar.Orientation} orient The orientation.
         */
        setOrientation(orient: goog.ui.ProgressBar.Orientation): void;

        /**
         * @return {goog.ui.ProgressBar.Orientation} The orientation of the
         *     progress bar.
         */
        getOrientation(): goog.ui.ProgressBar.Orientation;

        /**
         * @return {?number} The step value used to determine how to round the value.
         */
        getStep(): number|null;

        /**
         * Sets the step value. The step value is used to determine how to round the
         * value.
         * @param {?number} step  The step size.
         */
        setStep(step: number|null): void;
    }
}

declare namespace goog.ui.ProgressBar {
    /**
     * Enum for representing the orientation of the progress bar.
     *
     * @enum {string}
     */
    enum Orientation { VERTICAL, HORIZONTAL }
}
