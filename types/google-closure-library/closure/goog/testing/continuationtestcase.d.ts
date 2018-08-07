/// <reference path="../../../globals.d.ts"/>
/// <reference path="./testcase.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>

declare module 'goog:goog.testing.ContinuationTestCase' {
    import alias = goog.testing.ContinuationTestCase;
    export default alias;
}

declare module 'goog:goog.testing.ContinuationTestCase.Step' {
    import alias = goog.testing.ContinuationTestCase.Step;
    export default alias;
}

declare module 'goog:goog.testing.ContinuationTestCase.ContinuationTest' {
    import alias = goog.testing.ContinuationTestCase.ContinuationTest;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Constructs a test case that supports tests with continuations. Test functions
     * may issue "wait" commands that suspend the test temporarily and continue once
     * the wait condition is met.
     *
     * @extends {goog.testing.TestCase}
     * @deprecated ContinuationTestCase is deprecated. Prefer returning Promises
     *     for tests that assert Asynchronous behavior.
     * @final
     */
    class ContinuationTestCase extends __ContinuationTestCase {}
    abstract class __ContinuationTestCase extends goog.testing.__TestCase {
        /**
         * @param {string=} opt_name Optional name for the test case.
         */
        constructor(opt_name?: string);

        /**
         * An event handler for waiting on Closure or browser events during tests.
         * @type {goog.events.EventHandler<!goog.testing.ContinuationTestCase>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.testing.ContinuationTestCase>;

        /**
         * The current test being run.
         * @type {goog.testing.ContinuationTestCase.ContinuationTest}
         * @private
         */
        private currentTest_: goog.testing.ContinuationTestCase.ContinuationTest;

        /**
         * Enables or disables the wait functions in the global scope.
         * @param {boolean} enable Whether the wait functions should be exported.
         * @private
         */
        private enableWaitFunctions_(enable: boolean): void;

        /**
         * Creates the next test in the queue.
         * @return {goog.testing.ContinuationTestCase.ContinuationTest} The next test to
         *     execute, or null if no pending tests remain.
         * @private
         */
        private createNextTest_(): goog.testing.ContinuationTestCase.ContinuationTest;

        /**
         * Cleans up a finished test and cycles to the next test.
         * @private
         */
        private finishTest_(): void;

        /**
         * Executes the next step in the current phase, advancing through each phase as
         * all steps are completed.
         * @private
         */
        private runNextStep_(): void;

        /**
         * Creates a new test step that will run after a user-specified
         * timeout.  No guarantee is made on the execution order of the
         * continuation, except for those provided by each browser's
         * window.setTimeout. In particular, if two continuations are
         * registered at the same time with very small delta for their
         * durations, this class can not guarantee that the continuation with
         * the smaller duration will be executed first.
         * @param {function()} continuation The test function to invoke after the timeout.
         * @param {number=} opt_duration The length of the timeout in milliseconds.
         */
        waitForTimeout(continuation: () => void, opt_duration?: number): void;

        /**
         * Creates a new test step that will run after an event has fired. If the event
         * does not fire within a reasonable timeout, the test will fail.
         * @param {goog.events.EventTarget|EventTarget} eventTarget The target that will
         *     fire the event.
         * @param {string} eventType The type of event to listen for.
         * @param {function()} continuation The test function to invoke after the event
         *     fires.
         */
        waitForEvent(eventTarget: goog.events.EventTarget|EventTarget, eventType: string, continuation: () => void):
            void;

        /**
         * Creates a new test step which will run once a condition becomes true. The
         * condition will be polled at a user-specified interval until it becomes true,
         * or until a maximum timeout is reached.
         * @param {Function} condition The condition to poll.
         * @param {function()} continuation The test code to evaluate once the condition
         *     becomes true.
         * @param {number=} opt_interval The polling interval in milliseconds.
         * @param {number=} opt_maxTimeout The maximum amount of time to wait for the
         *     condition in milliseconds (defaults to 1000).
         */
        waitForCondition(condition: Function, continuation: () => void, opt_interval?: number, opt_maxTimeout?: number):
            void;

        /**
         * Creates a new asynchronous test step which will be added to the current test
         * phase.
         * @param {function()} func The test function that will be executed for this step.
         * @return {!goog.testing.ContinuationTestCase.Step} A new test step.
         * @private
         */
        private addStep_(func: () => void): goog.testing.ContinuationTestCase.Step;

        /**
         * Handles completion of a step's wait condition. Advances the test, allowing
         * the step's test method to run.
         * @param {goog.testing.ContinuationTestCase.Step} step The step that has
         *     finished waiting.
         * @private
         */
        private handleComplete_(step: goog.testing.ContinuationTestCase.Step): void;

        /**
         * Handles the timeout event for a step that has exceeded the maximum time. This
         * causes the current test to fail.
         * @param {goog.testing.ContinuationTestCase.Step} step The timed-out step.
         * @param {number} duration The length of the timeout in milliseconds.
         * @private
         */
        private handleTimeout_(step: goog.testing.ContinuationTestCase.Step, duration: number): void;

        /**
         * Tests a wait condition and executes the associated test step once the
         * condition is true.
         *
         * If the condition does not become true before the maximum duration, the
         * interval will stop and the test step will fail in the kill timer.
         *
         * @param {goog.testing.ContinuationTestCase.Step} step The waiting test step.
         * @param {Function} condition The test condition.
         * @param {number} startTime Time when the test step began waiting.
         * @param {number} interval The duration in milliseconds to wait between tests.
         * @param {number} timeout The maximum amount of time to wait for the condition
         *     to become true. Measured from the startTime in milliseconds.
         * @private
         */
        private testCondition_(
            step: goog.testing.ContinuationTestCase.Step,
            condition: Function,
            startTime: number,
            interval: number,
            timeout: number
        ): void;
    }
}

declare namespace goog.testing.ContinuationTestCase {
    /**
     * Creates a continuation test case, which consists of multiple test steps that
     * occur in several phases.
     *
     * The steps are distributed between setUp, test, and tearDown phases. During
     * the execution of each step, 0 or more steps may be added to the current
     * phase. Once all steps in a phase have completed, the next phase will be
     * executed.
     *
     * If any errors occur (such as an assertion failure), the setUp and Test phases
     * will be cancelled immediately. The tearDown phase will always start, but may
     * be cancelled as well if it raises an error.
     *
     * @extends {goog.testing.TestCase.Test}
     * @final
     */
    class ContinuationTest extends __ContinuationTest {}
    abstract class __ContinuationTest extends goog.testing.TestCase.__Test {
        /**
         * @param {goog.testing.TestCase.Test} setUp A setUp test method to run before
         *     the main test phase.
         * @param {goog.testing.TestCase.Test} test A test method to run.
         * @param {goog.testing.TestCase.Test} tearDown A tearDown test method to run
         *     after the test method completes or fails.
         */
        constructor(
            setUp: goog.testing.TestCase.Test, test: goog.testing.TestCase.Test, tearDown: goog.testing.TestCase.Test
        );

        /**
         * The list of test steps to run during setUp.
         * @type {Array<goog.testing.TestCase.Test>}
         * @private
         */
        private setUp_: goog.testing.TestCase.Test[];

        /**
         * The list of test steps to run for the actual test.
         * @type {Array<goog.testing.TestCase.Test>}
         * @private
         */
        private test_: goog.testing.TestCase.Test[];

        /**
         * The list of test steps to run during the tearDown phase.
         * @type {Array<goog.testing.TestCase.Test>}
         * @private
         */
        private tearDown_: goog.testing.TestCase.Test[];

        /**
         * The first error encountered during the test run, if any.
         * @type {Error}
         * @private
         */
        private error_: Error;

        /**
         * @return {Error} The first error to be raised during the test run or null if
         *     no errors occurred.
         */
        getError(): Error;

        /**
         * Sets an error for the test so it can be reported. Only the first error set
         * during a test will be reported. Additional errors that occur in later test
         * phases will be discarded.
         * @param {Error} e An error.
         */
        setError(e: Error): void;

        /**
         * @return {Array<goog.testing.TestCase.Test>} The current phase of steps
         *    being processed. Returns null if all steps have been completed.
         */
        getCurrentPhase(): goog.testing.TestCase.Test[];

        /**
         * Adds a new test step to the end of the current phase. The new step will wait
         * for a condition to be met before running, or will fail after a timeout.
         * @param {goog.testing.ContinuationTestCase.Step} step The test step to add.
         */
        addStep(step: goog.testing.ContinuationTestCase.Step): void;

        /**
         * Cancels all remaining steps in the current phase. Called after an error in
         * any phase occurs.
         */
        cancelCurrentPhase(): void;

        /**
         * Skips the rest of the setUp and test phases, but leaves the tearDown phase to
         * clean up.
         */
        cancelTestPhase(): void;

        /**
         * Clears a test phase and cancels any pending steps found.
         * @param {Array<goog.testing.TestCase.Test>} phase A list of test steps.
         * @private
         */
        private cancelPhase_(phase: goog.testing.TestCase.Test[]): void;
    }

    /**
     * Constructs a single step in a larger continuation test. Each step is similar
     * to a typical TestCase test, except it may wait for an event or timeout to
     * occur before running the test function.
     *
     * @extends {goog.testing.TestCase.Test}
     * @final
     */
    class Step extends __Step {}
    abstract class __Step extends goog.testing.TestCase.__Test {
        /**
         * @param {string} name The test name.
         * @param {function()} ref The test function to run.
         * @param {Object=} opt_scope The object context to run the test in.
         */
        constructor(name: string, ref: () => void, opt_scope?: Object);

        /**
         * Whether the step is currently waiting for a condition to continue. All new
         * steps begin in wait state.
         * @type {boolean}
         */
        waiting: boolean;

        /**
         * Key to this step's timeout. If the step is waiting for an event, the timeout
         * will be used as a kill timer. If the step is waiting
         * @type {number}
         * @private
         */
        private timeout_: number;

        /**
         * Starts a timeout for this step. Each step may have only one timeout active at
         * a time.
         * @param {Function} func The function to call after the timeout.
         * @param {number} duration The number of milliseconds to wait before invoking
         *     the function.
         */
        setTimeout(func: Function, duration: number): void;

        /**
         * Clears the current timeout if it is active.
         */
        clearTimeout(): void;
    }

    /**
     * The default maximum time to wait for a single test step in milliseconds.
     * @type {number}
     */
    let MAX_TIMEOUT: number;
}

declare namespace goog.testing.ContinuationTestCase.Step {
}
