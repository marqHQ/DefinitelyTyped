/// <reference path="../../../globals.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.testing.PerformanceTimer' {
    import alias = goog.testing.PerformanceTimer;
    export default alias;
}

declare module 'goog:goog.testing.PerformanceTimer.Task' {
    import alias = goog.testing.PerformanceTimer.Task;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Creates a performance timer that runs test functions a number of times to
     * generate timing samples, and provides performance statistics (minimum,
     * maximum, average, and standard deviation).
     */
    class PerformanceTimer extends __PerformanceTimer {}
    abstract class __PerformanceTimer {
        /**
         * @param {number=} opt_numSamples Number of times to run the test function;
         *     defaults to 10.
         * @param {number=} opt_timeoutInterval Number of milliseconds after which the
         *     test is to be aborted; defaults to 5 seconds (5,000ms).
         */
        constructor(opt_numSamples?: number, opt_timeoutInterval?: number);

        /**
         * Number of times the test function is to be run; defaults to 10.
         * @private {number}
         */
        private numSamples_: any /*missing*/;

        /**
         * Number of milliseconds after which the test is to be aborted; defaults to
         * 5,000ms.
         * @private {number}
         */
        private timeoutInterval_: any /*missing*/;

        /**
         * Whether to discard outliers (i.e. the smallest and the largest values)
         * from the sample set before computing statistics.  Defaults to false.
         * @private {boolean}
         */
        private discardOutliers_: any /*missing*/;

        /**
         * @return {number} The number of times the test function will be run.
         */
        getNumSamples(): number;

        /**
         * Sets the number of times the test function will be run.
         * @param {number} numSamples Number of times to run the test function.
         */
        setNumSamples(numSamples: number): void;

        /**
         * @return {number} The number of milliseconds after which the test times out.
         */
        getTimeoutInterval(): number;

        /**
         * Sets the number of milliseconds after which the test times out.
         * @param {number} timeoutInterval Timeout interval in ms.
         */
        setTimeoutInterval(timeoutInterval: number): void;

        /**
         * Sets whether to ignore the smallest and the largest values when computing
         * stats.
         * @param {boolean} discard Whether to discard outlier values.
         */
        setDiscardOutliers(discard: boolean): void;

        /**
         * @return {boolean} Whether outlier values are discarded prior to computing
         *     stats.
         */
        isDiscardOutliers(): boolean;

        /**
         * Executes the test function the required number of times (or until the
         * test run exceeds the timeout interval, whichever comes first).  Returns
         * an object containing the following:
         * <pre>
         *   {
         *     'average': average execution time (ms)
         *     'count': number of executions (may be fewer than expected due to timeout)
         *     'maximum': longest execution time (ms)
         *     'minimum': shortest execution time (ms)
         *     'standardDeviation': sample standard deviation (ms)
         *     'total': total execution time (ms)
         *   }
         * </pre>
         *
         * @param {Function} testFn Test function whose performance is to
         *     be measured.
         * @return {!Object} Object containing performance stats.
         */
        run(testFn: Function): Object;

        /**
         * Executes the test function of the specified task as described in
         * `run`. In addition, if specified, the set up and tear down functions of
         * the task are invoked before and after each invocation of the test function.
         * @see goog.testing.PerformanceTimer#run
         * @param {goog.testing.PerformanceTimer.Task} task A task describing the test
         *     function to invoke.
         * @return {!Object} Object containing performance stats.
         */
        runTask(task: goog.testing.PerformanceTimer.Task): Object;

        /**
         * Finishes the run of a task by creating a result object from samples, in the
         * format described in `run`.
         * @see goog.testing.PerformanceTimer#run
         * @param {!Array<number>} samples The samples to analyze.
         * @return {!Object} Object containing performance stats.
         * @private
         */
        private finishTask_(samples: number[]): Object;

        /**
         * Executes the test function of the specified task asynchronously. The test
         * function is expected to take a callback as input and has to call it to signal
         * that it's done. In addition, if specified, the setUp and tearDown functions
         * of the task are invoked before and after each invocation of the test
         * function. Note that setUp/tearDown functions take a callback as input and
         * must call this callback when they are done.
         * @see goog.testing.PerformanceTimer#run
         * @param {goog.testing.PerformanceTimer.Task} task A task describing the test
         *     function to invoke.
         * @return {!goog.async.Deferred} The deferred result, eventually an object
         *     containing performance stats.
         */
        runAsyncTask(task: goog.testing.PerformanceTimer.Task): goog.async.Deferred<any>;

        /**
         * Runs a task once, waits for the test function to complete asynchronously
         * and starts another run if not enough samples have been collected. Otherwise
         * finishes this task.
         * @param {goog.testing.PerformanceTimer.TestFunction} testFn The test function.
         * @param {goog.testing.PerformanceTimer.TestFunction} setUpFn The set up
         *     function that will be called once before the test function is run.
         * @param {goog.testing.PerformanceTimer.TestFunction} tearDownFn The set up
         *     function that will be called once after the test function completed.
         * @param {!goog.async.Deferred} result The deferred result, eventually an
         *     object containing performance stats.
         * @param {!Array<number>} samples The time samples from all runs of the test
         *     function so far.
         * @param {number} testStart The timestamp when the first sample was started.
         * @private
         */
        private runAsyncTaskSample_(
            testFn: goog.testing.PerformanceTimer.TestFunction,
            setUpFn: goog.testing.PerformanceTimer.TestFunction,
            tearDownFn: goog.testing.PerformanceTimer.TestFunction,
            result: goog.async.Deferred<any>,
            samples: number[],
            testStart: number
        ): void;

        /**
         * Execute a function that optionally returns a deferred object and continue
         * with the given continuation function only once the deferred object has a
         * result.
         * @param {goog.testing.PerformanceTimer.TestFunction} deferredFactory The
         *     function that optionally returns a deferred object.
         * @param {function()} continuationFunction The function that should be called
         *     after the optional deferred has a result.
         * @private
         */
        private handleOptionalDeferred_(
            deferredFactory: goog.testing.PerformanceTimer.TestFunction, continuationFunction: () => void
        ): void;
    }
}

declare namespace goog.testing.PerformanceTimer {
    /**
     * A task for the performance timer to measure. Callers can specify optional
     * setUp and tearDown methods to control state before and after each run of the
     * test function.
     * @final
     */
    class Task extends __Task {}
    abstract class __Task {
        /**
         * @param {goog.testing.PerformanceTimer.TestFunction} test Test function whose
         *     performance is to be measured.
         */
        constructor(test: goog.testing.PerformanceTimer.TestFunction);

        /**
         * The test function to time.
         * @type {goog.testing.PerformanceTimer.TestFunction}
         * @private
         */
        private test_: goog.testing.PerformanceTimer.TestFunction;

        /**
         * An optional set up function to run before each invocation of the test
         * function.
         * @type {goog.testing.PerformanceTimer.TestFunction}
         * @private
         */
        private setUp_: goog.testing.PerformanceTimer.TestFunction;

        /**
         * An optional tear down function to run after each invocation of the test
         * function.
         * @type {goog.testing.PerformanceTimer.TestFunction}
         * @private
         */
        private tearDown_: goog.testing.PerformanceTimer.TestFunction;

        /**
         * @return {goog.testing.PerformanceTimer.TestFunction} The test function to
         *     time.
         */
        getTest(): goog.testing.PerformanceTimer.TestFunction;

        /**
         * Specifies a set up function to be invoked before each invocation of the test
         * function.
         * @param {goog.testing.PerformanceTimer.TestFunction} setUp The set up
         *     function.
         * @return {!goog.testing.PerformanceTimer.Task} This task.
         */
        withSetUp(setUp: goog.testing.PerformanceTimer.TestFunction): goog.testing.PerformanceTimer.Task;

        /**
         * @return {goog.testing.PerformanceTimer.TestFunction} The set up function or
         *     the default no-op function if none was specified.
         */
        getSetUp(): goog.testing.PerformanceTimer.TestFunction;

        /**
         * Specifies a tear down function to be invoked after each invocation of the
         * test function.
         * @param {goog.testing.PerformanceTimer.TestFunction} tearDown The tear down
         *     function.
         * @return {!goog.testing.PerformanceTimer.Task} This task.
         */
        withTearDown(tearDown: goog.testing.PerformanceTimer.TestFunction): goog.testing.PerformanceTimer.Task;

        /**
         * @return {goog.testing.PerformanceTimer.TestFunction} The tear down function
         *     or the default no-op function if none was specified.
         */
        getTearDown(): goog.testing.PerformanceTimer.TestFunction;
    }

    /**
     * Return the median of the samples.
     * @param {!Array<number>} samples
     * @return {number}
     */
    function median(samples: number[]): number;

    /**
     * Creates a performance timer results object by analyzing a given array of
     * sample timings.
     * @param {!Array<number>} samples The samples to analyze.
     * @return {!Object} Object containing performance stats.
     */
    function createResults(samples: number[]): Object;

    /**
     * A test function whose performance should be measured or a setUp/tearDown
     * function. It may optionally return a deferred object. If it does so, the
     * test harness will assume the function is asynchronous and it must signal
     * that it's done by setting an (empty) result on the deferred object. If the
     * function doesn't return anything, the test harness will assume it's
     * synchronous.
     * @typedef {function():(goog.async.Deferred|undefined)}
     */
    interface TestFunction {
        (): goog.async.Deferred<any>|undefined;
    }
}
