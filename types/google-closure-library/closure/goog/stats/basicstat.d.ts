/// <reference path="../../../globals.d.ts"/>
/// <reference path="../structs/circularbuffer.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.stats.BasicStat' {
    import alias = goog.stats.BasicStat;
    export default alias;
}

declare namespace goog.stats {
    /**
     * Tracks basic statistics over a specified time interval.
     *
     * Statistics are kept in a fixed number of slots, each representing
     * an equal portion of the time interval.
     *
     * Most methods optionally allow passing in the current time, so that
     * higher level stats can synchronize operations on multiple child
     * objects.  Under normal usage, the default of goog.now() should be
     * sufficient.
     *
     * @final
     */
    class BasicStat extends __BasicStat {}
    abstract class __BasicStat {
        /**
         * @param {number} interval The stat interval, in milliseconds.
         */
        constructor(interval: number);

        /**
         * The time interval that this statistic aggregates over.
         * @type {number}
         * @private
         */
        private interval_: number;

        /**
         * The number of milliseconds in each slot.
         * @type {number}
         * @private
         */
        private slotInterval_: number;

        /**
         * The array of slots.
         * @type {goog.structs.CircularBuffer}
         * @private
         */
        private slots_: goog.structs.CircularBuffer<any>;

        /**
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * @return {number} The interval which over statistics are being
         *     accumulated, in milliseconds.
         */
        getInterval(): number;

        /**
         * Increments the count of this statistic by the specified amount.
         *
         * @param {number} amt The amount to increase the count by.
         * @param {number=} opt_now The time, in milliseconds, to be treated
         *     as the "current" time.  The current time must always be greater
         *     than or equal to the last time recorded by this stat tracker.
         */
        incBy(amt: number, opt_now?: number): void;

        /**
         * Returns the count of the statistic over its configured time
         * interval.
         * @param {number=} opt_now The time, in milliseconds, to be treated
         *     as the "current" time.  The current time must always be greater
         *     than or equal to the last time recorded by this stat tracker.
         * @return {number} The total count over the tracked interval.
         */
        get(opt_now?: number): number;

        /**
         * Returns the magnitute of the largest atomic increment that occurred
         * during the watched time interval.
         * @param {number=} opt_now The time, in milliseconds, to be treated
         *     as the "current" time.  The current time must always be greater
         *     than or equal to the last time recorded by this stat tracker.
         * @return {number} The maximum count of this statistic.
         */
        getMax(opt_now?: number): number;

        /**
         * Returns the magnitute of the smallest atomic increment that
         * occurred during the watched time interval.
         * @param {number=} opt_now The time, in milliseconds, to be treated
         *     as the "current" time.  The current time must always be greater
         *     than or equal to the last time recorded by this stat tracker.
         * @return {number} The minimum count of this statistic.
         */
        getMin(opt_now?: number): number;

        /**
         * Passes each active slot into a function and accumulates the result.
         *
         * @param {number|undefined} now The current time, in milliseconds.
         * @param {function(number, goog.stats.BasicStat.Slot_): number} func
         *     The function to call for every active slot.  This function
         *     takes two arguments: the previous result and the new slot to
         *     include in the reduction.
         * @param {number} val The initial value for the reduction.
         * @return {number} The result of the reduction.
         * @private
         */
        private reduceSlots_(now: number|undefined, func: (_0: number, _1: any) => number, val: number): number;

        /**
         * Computes the end time for the slot that should contain the count
         * around the given time.  This method ensures that every bucket is
         * aligned on a "this.slotInterval_" millisecond boundary.
         * @param {number} time The time to compute a boundary for.
         * @return {number} The computed boundary.
         * @private
         */
        private getSlotBoundary_(time: number): number;

        /**
         * Checks that time never goes backwards.  If it does (for example,
         * the user changes their system clock), the object state is cleared.
         * @param {number} now The current time, in milliseconds.
         * @private
         */
        private checkForTimeTravel_(now: number): void;

        /**
         * Clears any statistics tracked by this object, as though it were
         * freshly created.
         * @private
         */
        private reset_(): void;
    }
}
