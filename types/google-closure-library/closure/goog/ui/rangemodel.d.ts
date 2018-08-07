/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>

declare module 'goog:goog.ui.RangeModel' {
    import alias = goog.ui.RangeModel;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates a range model
     * @extends {goog.events.EventTarget}
     */
    class RangeModel extends __RangeModel {}
    abstract class __RangeModel extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * @type {number}
         * @private
         */
        private value_: number;

        /**
         * @type {number}
         * @private
         */
        private minimum_: number;

        /**
         * @type {number}
         * @private
         */
        private maximum_: number;

        /**
         * @type {number}
         * @private
         */
        private extent_: number;

        /**
         * @type {?number}
         * @private
         */
        private step_: number|null;

        /**
         * This is true if something is changed as a side effect. This happens when for
         * example we set the maximum below the current value.
         * @type {boolean}
         * @private
         */
        private isChanging_: boolean;

        /**
         * If set to true, we do not fire any change events.
         * @type {boolean}
         * @private
         */
        private mute_: boolean;

        /**
         * Sets the model to mute / unmute.
         * @param {boolean} muteValue Whether or not to mute the range, i.e.,
         *     suppress any CHANGE events.
         */
        setMute(muteValue: boolean): void;

        /**
         * Sets the value.
         * @param {number} value The new value.
         */
        setValue(value: number): void;

        /**
         * @return {number} the current value.
         */
        getValue(): number;

        /**
         * Sets the extent. The extent is the 'size' of the value.
         * @param {number} extent The new extent.
         */
        setExtent(extent: number): void;

        /**
         * @return {number} The extent for the range model.
         */
        getExtent(): number;

        /**
         * Sets the minimum
         * @param {number} minimum The new minimum.
         */
        setMinimum(minimum: number): void;

        /**
         * @return {number} The minimum value for the range model.
         */
        getMinimum(): number;

        /**
         * Sets the maximum
         * @param {number} maximum The new maximum.
         */
        setMaximum(maximum: number): void;

        /**
         * @return {number} The maximimum value for the range model.
         */
        getMaximum(): number;

        /**
         * Returns the step value. The step value is used to determine how to round the
         * value.
         * @return {?number} The maximimum value for the range model.
         */
        getStep(): number|null;

        /**
         * Sets the step. The step value is used to determine how to round the value.
         * @param {?number} step  The step size.
         */
        setStep(step: number|null): void;

        /**
         * Rounds to the closest step using the minimum value as the base.
         * @param {number} value  The number to round.
         * @return {number} The number rounded to the closest step.
         */
        roundToStepWithMin(value: number): number;

        /**
         * Rounds to the closest step.
         * @param {number} value  The number to round.
         * @return {number} The number rounded to the closest step.
         */
        roundToStep(value: number): number;
    }
}
