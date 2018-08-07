/// <reference path="../../../globals.d.ts"/>
/// <reference path="./performancetimer.d.ts"/>

declare module 'goog:goog.testing.PerformanceTable' {
    import alias = goog.testing.PerformanceTable;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A UI widget that runs performance tests and displays the results.
     * @final
     */
    class PerformanceTable extends __PerformanceTable {}
    abstract class __PerformanceTable {
        /**
         * @param {Element} root The element where the table should be attached.
         * @param {goog.testing.PerformanceTimer=} opt_timer A timer to use for
         *     executing functions and profiling them.
         * @param {number=} opt_precision Number of digits of precision to include in
         *     results.  Defaults to 0.
         * @param {number=} opt_numSamples The number of samples to take. Defaults to 5.
         */
        constructor(
            root: Element, opt_timer?: goog.testing.PerformanceTimer, opt_precision?: number, opt_numSamples?: number
        );

        /**
         * Where the table should be attached.
         * @private {Element}
         */
        private root_: any /*missing*/;

        /**
         * Number of digits of precision to include in results.
         * Defaults to 0.
         * @private {number}
         */
        private precision_: any /*missing*/;

        /**
         * A timer for running the tests.
         * @private {goog.testing.PerformanceTimer}
         */
        private timer_: any /*missing*/;

        /**
         * @return {goog.testing.PerformanceTimer} The timer being used.
         */
        getTimer(): goog.testing.PerformanceTimer;

        /**
         * Render the initial table.
         * @private
         */
        private initRoot_(): void;

        /**
         * @return {Element} The body of the table.
         * @private
         */
        private getTableBody_(): Element;

        /**
         * Round to the specified precision.
         * @param {number} num The number to round.
         * @return {string} The rounded number, as a string.
         * @private
         */
        private round_(num: number): string;

        /**
         * Run the given function with the performance timer, and show the results.
         * @param {Function} fn The function to run.
         * @param {string=} opt_desc A description to associate with this run.
         */
        run(fn: Function, opt_desc?: string): void;

        /**
         * Run the given task with the performance timer, and show the results.
         * @param {goog.testing.PerformanceTimer.Task} task The performance timer task
         *     to run.
         * @param {string=} opt_desc A description to associate with this run.
         */
        runTask(task: goog.testing.PerformanceTimer.Task, opt_desc?: string): void;

        /**
         * Record a performance timer results object to the performance table. See
         * `goog.testing.PerformanceTimer` for details of the format of this
         * object.
         * @param {Object} results The performance timer results object.
         * @param {string=} opt_desc A description to associate with these results.
         */
        recordResults(results: Object, opt_desc?: string): void;

        /**
         * Report an error in the table.
         * @param {*} reason The reason for the error.
         */
        reportError(reason: any): void;
    }
}
