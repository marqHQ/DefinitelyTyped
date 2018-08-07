/// <reference path="../../../globals.d.ts"/>
/// <reference path="./testcase.d.ts"/>

declare module 'goog:goog.testing.AsyncTestCase' {
    import alias = goog.testing.AsyncTestCase;
    export default alias;
}

declare module 'goog:goog.testing.AsyncTestCase.ControlBreakingException' {
    import alias = goog.testing.AsyncTestCase.ControlBreakingException;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A test case that is capable of running tests that contain asynchronous logic.
     * @extends {goog.testing.TestCase}
     * @deprecated Use goog.testing.TestCase instead. goog.testing.TestCase now
     *    supports async testing using promises.
     */
    class AsyncTestCase extends __AsyncTestCase {}
    abstract class __AsyncTestCase extends goog.testing.__TestCase {
        /**
         * @param {string=} opt_name A descriptive name for the test case.
         */
        constructor(opt_name?: string);

        /**
         * How long to wait for a single step of a test to complete in milliseconds.
         * A step starts when a call to waitForAsync() is made.
         * @type {number}
         */
        stepTimeout: number;

        /**
         * How long to wait after a failed test before moving onto the next one.
         * The purpose of this is to allow any pending async callbacks from the failing
         * test to finish up and not cause the next test to fail.
         * @type {number}
         */
        timeToSleepAfterFailure: number;

        /**
         * Turn on extra logging to help debug failing async. tests.
         * @type {boolean}
         * @private
         */
        private enableDebugLogs_: boolean;

        /**
         * A reference to the original asserts.js assert_() function.
         * @private
         */
        private origAssert_: any /*missing*/;

        /**
         * A reference to the original asserts.js fail() function.
         * @private
         */
        private origFail_: any /*missing*/;

        /**
         * A reference to the original window.onerror function.
         * @type {?Function|undefined}
         * @private
         */
        private origOnError_: Function|null|undefined;

        /**
         * The stage of the test we are currently on.
         * @type {?Function|undefined}}
         * @private
         */
        private curStepFunc_: Function|null|undefined;

        /**
         * The name of the stage of the test we are currently on.
         * @type {string}
         * @private
         */
        private curStepName_: string;

        /**
         * The stage of the test we should run next.
         * @type {?Function|undefined}
         * @private
         */
        private nextStepFunc_: Function|null|undefined;

        /**
         * The name of the stage of the test we should run next.
         * @type {string}
         * @private
         */
        private nextStepName_: string;

        /**
         * The handle to the current setTimeout timer.
         * @type {number}
         * @private
         */
        private timeoutHandle_: number;

        /**
         * Marks if the cleanUp() function has been called for the currently running
         * test.
         * @type {boolean}
         * @private
         */
        private cleanedUp_: boolean;

        /**
         * The currently active test.
         * @type {goog.testing.TestCase.Test|undefined}
         * @protected
         */
        protected activeTest: goog.testing.TestCase.Test|undefined;

        /**
         * A flag to prevent recursive exception handling.
         * @type {boolean}
         * @private
         */
        private inException_: boolean;

        /**
         * Flag used to determine if we can move to the next step in the testing loop.
         * @type {boolean}
         * @private
         */
        private isReady_: boolean;

        /**
         * Number of signals to wait for before continuing testing when waitForSignals
         * is used.
         * @type {number}
         * @private
         */
        private expectedSignalCount_: number;

        /**
         * Number of signals received.
         * @type {number}
         * @private
         */
        private receivedSignalCount_: number;

        /**
         * Flag that tells us if there is a function in the call stack that will make
         * a call to pump_().
         * @type {boolean}
         * @private
         */
        private returnWillPump_: boolean;

        /**
         * The number of times we have thrown a ControlBreakingException so that we
         * know not to complain in our window.onerror handler. In Webkit, window.onerror
         * is not supported, and so this counter will keep going up but we won't care
         * about it.
         * @type {number}
         * @private
         */
        private numControlExceptionsExpected_: number;

        /**
         * The current step name.
         * @return {string} Step name.
         * @protected
         */
        protected getCurrentStepName(): string;

        /**
         * Informs the testcase not to continue to the next step in the test cycle
         * until continueTesting is called.
         * @param {string=} opt_name A description of what we are waiting for.
         */
        waitForAsync(opt_name?: string): void;

        /**
         * Continue with the next step in the test cycle.
         */
        continueTesting(): void;

        /**
         * Ends the current test step and queues the next test step to run.
         * @private
         */
        private endCurrentStep_(): void;

        /**
         * Informs the testcase not to continue to the next step in the test cycle
         * until signal is called the specified number of times. Within a test, this
         * function behaves additively if called multiple times; the number of signals
         * to wait for will be the sum of all expected number of signals this function
         * was called with.
         * @param {number} times The number of signals to receive before
         *    continuing testing.
         * @param {string=} opt_name A description of what we are waiting for.
         */
        waitForSignals(times: number, opt_name?: string): void;

        /**
         * Signals once to continue with the test. If this is the last signal that the
         * test was waiting on, call continueTesting.
         */
        signal(): void;

        /**
         * Handles an exception thrown by a test.
         * @param {*=} opt_e The exception object associated with the failure
         *     or a string.
         * @throws Always throws a ControlBreakingException.
         */
        doAsyncError(opt_e?: any): void;

        /**
         * Enables verbose logging of what is happening inside of the AsyncTestCase.
         */
        enableDebugLogging(): void;

        /**
         * Logs the given debug message to the console (when enabled).
         * @param {string} message The message to log.
         * @private
         */
        private dbgLog_(message: string): void;

        /**
         * Wraps doAsyncError() for when we are sure that the test runner has no user
         * code above it in the stack.
         * @param {string|Error=} opt_e The exception object associated with the
         *     failure or a string.
         * @private
         */
        private doTopOfStackAsyncError_(opt_e?: string|Error): void;

        /**
         * Calls the tearDown function, catching any errors, and then moves on to
         * the next step in the testing cycle.
         * @private
         */
        private doAsyncErrorTearDown_(): void;

        /**
         * Replaces the asserts.js assert_() and fail() functions with a wrappers to
         * catch the exceptions.
         * @private
         */
        private hookAssert_(): void;

        /**
         * Sets a window.onerror handler for catching exceptions that happen in async
         * callbacks. Note that as of Safari 3.1, Safari does not support this.
         * @private
         */
        private hookOnError_(): void;

        /**
         * Unhooks window.onerror and _assert.
         * @private
         */
        private unhookAll_(): void;

        /**
         * Enables the timeout timer. This timer fires unless continueTesting is
         * called.
         * @private
         */
        private startTimeoutTimer_(): void;

        /**
         * Disables the timeout timer.
         * @private
         */
        private stopTimeoutTimer_(): void;

        /**
         * Sets the next function to call in our sequence of async callbacks.
         * @param {Function} func The function that executes the next step.
         * @param {string} name A description of the next step.
         * @private
         */
        private setNextStep_(func: Function, name: string): void;

        /**
         * Calls the given function, redirecting any exceptions to doAsyncError.
         * @param {Function} func The function to call.
         * @return {!goog.testing.AsyncTestCase.TopStackFuncResult_} Returns a
         * TopStackFuncResult_.
         * @private
         */
        private callTopOfStackFunc_(func: Function): any;

        /**
         * Calls the next callback when the isReady_ flag is true.
         * @param {Function=} opt_doFirst A function to call before pumping.
         * @private
         * @throws Throws a ControlBreakingException if there were any failing steps.
         */
        private pump_(opt_doFirst?: Function): void;

        /**
         * Sets up the test page and then waits until the test case has been marked
         * as ready before executing the tests.
         * @private
         */
        private doSetUpPage_(): void;

        /**
         * Step 1: Move to the next test.
         * @private
         */
        private doIteration_(): void;

        /**
         * Step 2: Call setUp().
         * @private
         */
        private doSetUp_(): void;

        /**
         * Step 3: Call test.execute().
         * @private
         */
        private doExecute_(): void;

        /**
         * Step 4: Call tearDown().
         * @private
         */
        private doTearDown_(): void;

        /**
         * Step 5: Call doSuccess()
         * @private
         */
        private doNext_(): void;
    }
}

declare namespace goog.testing.AsyncTestCase {
    /**
     * An exception class used solely for control flow.
     * @extends {Error}
     * @final
     */
    class ControlBreakingException extends __ControlBreakingException {}
    abstract class __ControlBreakingException extends Error {
        /**
         * @param {string=} opt_message Error message.
         */
        constructor(opt_message?: string);

        /**
         * The exception message.
         * @type {string}
         */
        message: string;

        /**
         * Marks this object as a ControlBreakingException
         * @type {boolean}
         */
        isControlBreakingException: boolean;
    }

    /**
     * Preferred way of creating an AsyncTestCase. Creates one and initializes it
     * with the G_testRunner.
     * @param {string=} opt_name A descriptive name for the test case.
     * @return {!goog.testing.AsyncTestCase} The created AsyncTestCase.
     */
    function createAndInstall(opt_name?: string): goog.testing.AsyncTestCase;
}

declare namespace goog.testing.AsyncTestCase.ControlBreakingException {
    /**
     * Return value for .toString().
     * @type {string}
     */
    let TO_STRING: string;
}
