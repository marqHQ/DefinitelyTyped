/// <reference path="../../../globals.d.ts"/>
/// <reference path="./functionmock.d.ts"/>
/// <reference path="./jsunitexception.d.ts"/>
/// <reference path="../promise/promise.d.ts"/>

declare module 'goog:goog.testing.TestCase' {
    import alias = goog.testing.TestCase;
    export default alias;
}

declare module 'goog:goog.testing.TestCase.Test' {
    import alias = goog.testing.TestCase.Test;
    export default alias;
}

declare module 'goog:goog.testing.TestCase.Result' {
    import alias = goog.testing.TestCase.Result;
    export default alias;
}

declare module 'goog:goog.testing.TestCase.Order' {
    import alias = goog.testing.TestCase.Order;
    export default alias;
}

declare module 'goog:goog.testing.TestCase.Error' {
    import alias = goog.testing.TestCase.Error;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A class representing a JsUnit test case. A TestCase is made up of a number
     * of test functions which can be run. Individual test cases can override the
     * following functions to set up their test environment:
     *   - runTests - completely override the test's runner
     *   - setUpPage - called before any of the test functions are run
     *   - tearDownPage - called after all tests are finished
     *   - setUp - called before each of the test functions
     *   - tearDown - called after each of the test functions
     *   - shouldRunTests - called before a test run, all tests are skipped if it
     *                      returns false. Can be used to disable tests on browsers
     *                      where they aren't expected to pass.
     * <p>
     * TestCase objects are usually constructed by inspecting the global environment
     * to discover functions that begin with the prefix <code>test</code>.
     * (See {@link #autoDiscoverLifecycle} and {@link #autoDiscoverTests}.)
     * </p>
     *
     * <h2>Testing asychronous code with promises</h2>
     *
     * <p>
     * In the simplest cases, the behavior that the developer wants to test
     * is synchronous, and the test functions exercising the behavior execute
     * synchronously. But TestCase can also be used to exercise asynchronous code
     * through the use of <a
     * href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">
     * promises</a>. If a test function returns an object that has a
     * <code>then</code> method defined on it, the test framework switches to an
     * asynchronous execution strategy: the next test function will not begin
     * execution until the returned promise is resolved or rejected. Instead of
     * writing test assertions at the top level inside a test function, the test
     * author chains them on the end of the returned promise. For example:
     * </p>
     * <pre>
     *   function testPromiseBasedAPI() {
     *     return promiseBasedAPI().then(function(value) {
     *       // Will run when the promise resolves, and before the next
     *       // test function begins execution.
     *       assertEquals('foo', value.bar);
     *     });
     *   }
     * </pre>
     * <p>
     * Synchronous and asynchronous tests can be mixed in the same TestCase.
     * Test functions that return an object with a <code>then</code> method are
     * executed asynchronously, and all other test functions are executed
     * synchronously. While this is convenient for test authors (since it doesn't
     * require any explicit configuration for asynchronous tests), it can lead to
     * confusion if the test author forgets to return the promise from the test
     * function. For example:
     * </p>
     * <pre>
     *   function testPromiseBasedAPI() {
     *     // This test should never succeed.
     *     promiseBasedAPI().then(fail, fail);
     *     // Oops! The promise isn't returned to the framework,
     *     // so this test actually does succeed.
     *   }
     * </pre>
     * <p>
     * Since the test framework knows nothing about the promise created
     * in the test function, it will run the function synchronously, record
     * a success, and proceed immediately to the next test function.
     * </p>
     * <p>
     * Promises returned from test functions can time out. If a returned promise
     * is not resolved or rejected within {@link promiseTimeout} milliseconds,
     * the test framework rejects the promise without a timeout error message.
     * Test cases can configure the value of `promiseTimeout` by setting
     * <pre>
     *   goog.testing.TestCase.getActiveTestCase().promiseTimeout = ...
     * </pre>
     * in their `setUpPage` methods.
     * </p>
     *
     */
    class TestCase extends __TestCase {}
    abstract class __TestCase {
        /**
         * @param {string=} opt_name The name of the test case, defaults to
         *     'Untitled Test Case'.
         */
        constructor(opt_name?: string);

        /**
         * A name for the test case.
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * Array of test functions that can be executed.
         * @type {!Array<!goog.testing.TestCase.Test>}
         * @private
         */
        private tests_: goog.testing.TestCase.Test[];

        /**
         * Set of test names and/or indices to execute, or null if all tests should
         * be executed.
         *
         * Indices are included to allow automation tools to run a subset of the
         * tests without knowing the exact contents of the test file.
         *
         * Indices should only be used with SORTED ordering.
         *
         * Example valid values:
         * <ul>
         * <li>[testName]
         * <li>[testName1, testName2]
         * <li>[2] - will run the 3rd test in the order specified
         * <li>[1,3,5]
         * <li>[testName1, testName2, 3, 5] - will work
         * <ul>
         * @type {Object}
         * @private
         */
        private testsToRun_: Object;

        /**
         * A call back for each test.
         * @private {?function(goog.testing.TestCase.Test, !Array<string>)}
         */
        private testDone_: any /*missing*/;

        /**
         * The order to run the auto-discovered tests in.
         * @type {string}
         */
        order: string;

        /** @private {function(!goog.testing.TestCase.Result)} */
        private runNextTestCallback_: any /*missing*/;

        /**
         * The currently executing test case or null.
         * @private {?goog.testing.TestCase.Test}
         */
        private curTest_: any /*missing*/;

        /**
         * Object used to encapsulate the test results.
         * @type {!goog.testing.TestCase.Result}
         * @protected
         * @suppress {underscore|visibility}
         */
        protected result_: goog.testing.TestCase.Result;

        /**
         * An array of exceptions generated by `assert` statements.
         * @private {!Array<!goog.testing.JsUnitException>}
         */
        private thrownAssertionExceptions_: any /*missing*/;

        /**
         * Whether the test should fail if exceptions arising from an assert statement
         * never bubbled up to the testing framework.
         * @type {boolean}
         */
        failOnUnreportedAsserts: boolean;

        /**
         * The maximum time in milliseconds a promise returned from a test function
         * may remain pending before the test fails due to timeout.
         * @type {number}
         */
        promiseTimeout: number;

        /**
         * @return {string} The name of the test.
         */
        getName(): string;

        /**
         * Returns the current test or null.
         * @return {?goog.testing.TestCase.Test}
         * @protected
         */
        protected getCurrentTest(): goog.testing.TestCase.Test|null;

        /**
         * Exception object that was detected before a test runs.
         * @type {*}
         * @protected
         */
        protected exceptionBeforeTest: any;

        /**
         * Whether the test case has ever tried to execute.
         * @type {boolean}
         */
        started: boolean;

        /**
         * Whether the test case is running.
         * @type {boolean}
         */
        running: boolean;

        /**
         * Timestamp for when the test was started.
         * @type {number}
         * @private
         */
        private startTime_: number;

        /**
         * Time since the last batch of tests was started, if batchTime exceeds
         * {@link #maxRunTime} a timeout will be used to stop the tests blocking the
         * browser and a new batch will be started.
         * @type {number}
         * @private
         */
        private batchTime_: number;

        /**
         * Pointer to the current test.
         * @type {number}
         * @private
         */
        private currentTestPointer_: number;

        /**
         * Optional callback that will be executed when the test has finalized.
         * @type {Function}
         * @private
         */
        private onCompleteCallback_: Function;

        /**
         * Adds a new test to the test case.
         * @param {!goog.testing.TestCase.Test} test The test to add.
         */
        add(test: goog.testing.TestCase.Test): void;

        /**
         * Creates and adds a new test.
         *
         * Convenience function to make syntax less awkward when not using automatic
         * test discovery.
         *
         * @param {string} name The test name.
         * @param {function()} ref Reference to the test function.
         * @param {!Object=} scope Optional scope that the test function should be
         *     called in.
         * @param {!Array<!Object>=} objChain An array of Objects that may have
         *     additional set up/tear down logic for a particular test.
         */
        addNewTest(name: string, ref: () => void, scope?: Object, objChain?: Object[]): void;

        /**
         * Sets the tests.
         * @param {!Array<goog.testing.TestCase.Test>} tests A new test array.
         * @protected
         */
        protected setTests(tests: goog.testing.TestCase.Test[]): void;

        /**
         * Gets the tests.
         * @return {!Array<goog.testing.TestCase.Test>} The test array.
         */
        getTests(): goog.testing.TestCase.Test[];

        /**
         * Returns the number of tests contained in the test case.
         * @return {number} The number of tests.
         */
        getCount(): number;

        /**
         * Returns the number of tests actually run in the test case, i.e. subtracting
         * any which are skipped.
         * @return {number} The number of un-ignored tests.
         */
        getActuallyRunCount(): number;

        /**
         * Returns the current test and increments the pointer.
         * @return {goog.testing.TestCase.Test} The current test case.
         */
        next(): goog.testing.TestCase.Test;

        /**
         * Resets the test case pointer, so that next returns the first test.
         */
        reset(): void;

        /**
         * Sets the callback function that should be executed when the tests have
         * completed.
         * @param {Function} fn The callback function.
         */
        setCompletedCallback(fn: Function): void;

        /**
         * @param {goog.testing.TestCase.Order} order The sort order for running tests.
         */
        setOrder(order: goog.testing.TestCase.Order): void;

        /**
         * @param {Object<string, boolean>} testsToRun Set of tests to run. Entries in
         *     the set may be test names, like "testFoo", or numeric indicies. Only
         *     tests identified by name or by index will be executed.
         */
        setTestsToRun(testsToRun: {[key: string]: boolean}): void;

        /**
         * Can be overridden in test classes to indicate whether the tests in a case
         * should be run in that particular situation.  For example, this could be used
         * to stop tests running in a particular browser, where browser support for
         * the class under test was absent.
         * @return {boolean} Whether any of the tests in the case should be run.
         */
        shouldRunTests(): boolean;

        /**
         * Executes the tests, yielding asynchronously if execution time exceeds
         * {@link maxRunTime}. There is no guarantee that the test case has finished
         * once this method has returned. To be notified when the test case
         * has finished, use {@link #setCompletedCallback} or
         * {@link #runTestsReturningPromise}.
         */
        execute(): void;

        /**
         * Sets up the internal state of the test case for a run.
         * @return {boolean} If false, preparation failed because the test case
         *     is not supposed to run in the present environment.
         * @private
         */
        private prepareForRun_(): boolean;

        /**
         * Finalizes the test case, called when the tests have finished executing.
         */
        finalize(): void;

        /**
         * Saves a message to the result set.
         * @param {string} message The message to save.
         */
        saveMessage(message: string): void;

        /**
         * @return {boolean} Whether the test case is running inside the multi test
         *     runner.
         */
        isInsideMultiTestRunner(): boolean;

        /**
         * Logs an object to the console, if available.
         * @param {*} val The value to log. Will be ToString'd.
         */
        log(val: any): void;

        /**
         * @return {boolean} Whether the test was a success.
         */
        isSuccess(): boolean;

        /**
         * Returns a string detailing the results from the test.
         * @param {boolean=} opt_verbose If true results will include data about all
         *     tests, not just what failed.
         * @return {string} The results from the test.
         */
        getReport(opt_verbose?: boolean): string;

        /**
         * Returns the test results.
         * @return {!goog.testing.TestCase.Result}
         * @package
         */
        getResult(): goog.testing.TestCase.Result;

        /**
         * Returns the amount of time it took for the test to run.
         * @return {number} The run time, in milliseconds.
         */
        getRunTime(): number;

        /**
         * Returns the number of script files that were loaded in order to run the test.
         * @return {number} The number of script files.
         */
        getNumFilesLoaded(): number;

        /**
         * Returns the test results object: a map from test names to a list of test
         * failures (if any exist).
         * @return {!Object<string, !Array<goog.testing.TestCase.IResult>>} Test
         *     results object.
         */
        getTestResults(): {[key: string]: goog.testing.TestCase.IResult[]};

        /**
         * Returns the test results as json.
         * This is called by the testing infrastructure through G_testrunner.
         * @return {string} Tests results object.
         */
        getTestResultsAsJson(): string;

        /**
         * Executes each of the tests, yielding asynchronously if execution time
         * exceeds {@link #maxRunTime}. There is no guarantee that the test case
         * has finished execution once this method has returned.
         * To be notified when the test case has finished execution, use
         * {@link #setCompletedCallback} or {@link #runTestsReturningPromise}.
         *
         * Overridable by the individual test case.  This allows test cases to defer
         * when the test is actually started.  If overridden, finalize must be
         * called by the test to indicate it has finished.
         */
        runTests(): void;

        /**
         * Executes each of the tests, returning a promise that resolves with the
         * test results once they are done running.
         * @return {!IThenable<!goog.testing.TestCase.Result>}
         * @final
         * @package
         */
        runTestsReturningPromise(): IThenable<goog.testing.TestCase.Result>;

        /**
         * Runs the setUpPage methods.
         * @param {function(this:goog.testing.TestCase)} runTestsFn Callback to invoke
         *     after setUpPage has completed.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private runSetUpPage_(runTestsFn: (this: goog.testing.TestCase) => void): any|null;

        /**
         * Executes the next test method synchronously or with promises, depending on
         * the test method's return value.
         *
         * If the test method returns a promise, the next test method will run once
         * the promise is resolved or rejected. If the test method does not
         * return a promise, it is assumed to be synchronous, and execution proceeds
         * immediately to the next test method. This means that test cases can run
         * partially synchronously and partially asynchronously, depending on
         * the return values of their test methods. In particular, a test case
         * executes synchronously until the first promise is returned from a
         * test method (or until a resource limit is reached; see
         * {@link finishTestInvocation_}).
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private runNextTest_(): any|null;

        /**
         * Runs all the setups associated with a test.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private safeSetUp_(): any|null;

        /**
         * Recursively invokes setUp functions.
         * @param {!Array<function()>} setUps
         * @return {function(): ?goog.testing.Continuation_}
         * @private
         */
        private safeSetUpHelper_(setUps: () => void[]): () => any | null;

        /**
         * Calls the given test function, handling errors appropriately.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private safeRunTest_(): any|null;

        /**
         * Calls {@link tearDown}, handling errors appropriately.
         * @param {*=} opt_error Error associated with the test, if any.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private safeTearDown_(opt_error?: any): any|null;

        /**
         * Recursively invokes tearDown functions.
         * @param {!Array<function()>} tearDowns
         * @return {function(): ?goog.testing.Continuation_}
         * @private
         */
        private safeTearDownHelper_(tearDowns: () => void[]): () => any | null;

        /**
         * Calls the given `fn`, then calls either `onSuccess` or
         * `onFailure`, either synchronously or using promises, depending on
         * `fn`'s return value.
         *
         * If `fn` throws an exception, `onFailure` is called immediately
         * with the exception.
         *
         * If `fn` returns a promise, and the promise is eventually resolved,
         * `onSuccess` is called with no arguments. If the promise is eventually
         * rejected, `onFailure` is called with the rejection reason.
         *
         * Otherwise, if `fn` neither returns a promise nor throws an exception,
         * `onSuccess` is called immediately with no arguments.
         *
         * `fn`, `onSuccess`, and `onFailure` are all called with
         * the TestCase instance as the method receiver.
         *
         * @param {function()} fn The function to call.
         * @param {function(): (?goog.testing.Continuation_|undefined)} onSuccess
         * @param {function(*): (?goog.testing.Continuation_|undefined)} onFailure
         * @param {string} fnName Name of the function being invoked e.g. 'setUp'.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private invokeFunction_(
            fn: () => void,
            onSuccess: () => any | null | undefined,
            onFailure: (_0: any) => any | null | undefined,
            fnName: string
        ): any|null;

        /**
         * Logs all of the exceptions generated from failing assertions, and returns a
         * generic exception informing the user that one or more exceptions were not
         * propagated, causing the test to erroneously pass.
         * @param {string} testName The test function's name.
         * @return {!goog.testing.JsUnitException}
         * @private
         */
        private reportUnpropagatedAssertionExceptions_(testName: string): goog.testing.JsUnitException;

        /**
         * Resets the batch run timer. This should only be called after resolving a
         * promise since Promise.then() has an implicit yield.
         * @private
         */
        private resetBatchTimeAfterPromise_(): void;

        /**
         * Finishes up bookkeeping for the current test function, and schedules
         * the next test function to run, either immediately or asychronously.
         * @param {*=} opt_error Optional error resulting from the test invocation.
         * @return {?goog.testing.Continuation_}
         * @private
         */
        private finishTestInvocation_(opt_error?: any): any|null;

        /**
         * Start a new batch to tests after yielding, resetting batchTime and depth.
         * @private
         */
        private startNextBatch_(): void;

        /**
         * Reorders the tests depending on the `order` field.
         * @private
         */
        private orderTests_(): void;

        /**
         * Gets list of objects that potentially contain test cases. For IE 8 and
         * below, this is the global "this" (for properties set directly on the global
         * this or window) and the RuntimeObject (for global variables and functions).
         * For all other browsers, the array simply contains the global this.
         *
         * @param {string=} opt_prefix An optional prefix. If specified, only get things
         *     under this prefix. Note that the prefix is only honored in IE, since it
         *     supports the RuntimeObject:
         *     http://msdn.microsoft.com/en-us/library/ff521039%28VS.85%29.aspx
         *     TODO: Remove this option.
         * @return {!Array<!Object>} A list of objects that should be inspected.
         */
        getGlobals(opt_prefix?: string): Object[];

        /**
         * Gets called before any tests are executed.  Can be overridden to set up the
         * environment for the whole test case.
         * @return {!Thenable|undefined}
         */
        setUpPage(): Thenable<any>|undefined;

        /**
         * Gets called after all tests have been executed.  Can be overridden to tear
         * down the entire test case.
         */
        tearDownPage(): void;

        /**
         * Gets called before every goog.testing.TestCase.Test is been executed. Can
         * be overridden to add set up functionality to each test.
         * @return {!Thenable|undefined}
         */
        setUp(): Thenable<any>|undefined;

        /**
         * Gets called after every goog.testing.TestCase.Test has been executed. Can
         * be overridden to add tear down functionality to each test.
         * @return {!Thenable|undefined}
         */
        tearDown(): Thenable<any>|undefined;

        /**
         * @return {string} The function name prefix used to auto-discover tests.
         */
        getAutoDiscoveryPrefix(): string;

        /**
         * @return {number} Time since the last batch of tests was started.
         * @protected
         */
        protected getBatchTime(): number;

        /**
         * @param {number} batchTime Time since the last batch of tests was started.
         * @protected
         */
        protected setBatchTime(batchTime: number): void;

        /**
         * Creates a `goog.testing.TestCase.Test` from an auto-discovered
         *     function.
         * @param {string} name The name of the function.
         * @param {function()} ref The auto-discovered function.
         * @param {!Object=} scope The scope to attach to the test.
         * @param {!Array<!Object>=} objChain
         * @return {!goog.testing.TestCase.Test} The newly created test.
         * @protected
         */
        protected createTest(name: string, ref: () => void, scope?: Object, objChain?: Object[]):
            goog.testing.TestCase.Test;

        /**
         * Adds any functions defined on 'obj' (the global object, by default)
         * that correspond to lifecycle events for the test case. Overrides
         * setUp, tearDown, setUpPage, tearDownPage, runTests, and shouldRunTests
         * if they are defined on 'obj'.
         * @param {!Object=} opt_obj Defaults to goog.global.
         */
        autoDiscoverLifecycle(opt_obj?: Object): void;

        /**
         * @param {!Object} obj  An object from which to extract test and lifecycle
         * methods.
         */
        setTestObj(obj: Object): void;

        /**
         * @param {!Object} obj  An object from which to extract test and lifecycle
         *     methods.
         * @param {string} name
         * @param {!Array<!Object>} objChain List of objects that have methods used
         *     to create tests such as setUp, tearDown.
         * @private
         */
        private addTestObj_(obj: Object, name: string, objChain: Object[]): void;

        /**
         * Adds any functions defined in the global scope that are prefixed with
         * "test" to the test case.
         */
        autoDiscoverTests(): void;

        /**
         * Checks to see if the test should be marked as failed before it is run.
         *
         * If there was an error in setUpPage, we treat that as a failure for all
         * tests and mark them all as having failed.
         *
         * @param {goog.testing.TestCase.Test} testCase The current test case.
         * @return {boolean} Whether the test was marked as failed.
         * @protected
         */
        protected maybeFailTestEarly(testCase: goog.testing.TestCase.Test): boolean;

        /**
         * Cycles through the tests, yielding asynchronously if the execution time
         * exceeds {@link #maxRunTime}. In particular, there is no guarantee that
         * the test case has finished execution once this method has returned.
         * To be notified when the test case has finished execution, use
         * {@link #setCompletedCallback} or {@link #runTestsReturningPromise}.
         */
        cycleTests(): void;

        /**
         * Counts the number of files that were loaded for dependencies that are
         * required to run the test.
         * @return {number} The number of files loaded.
         * @private
         */
        private countNumFilesLoaded_(): number;

        /**
         * Calls a function after a delay, using the protected timeout.
         * @param {Function} fn The function to call.
         * @param {number} time Delay in milliseconds.
         * @return {number} The timeout id.
         * @protected
         */
        protected timeout(fn: Function, time: number): number;

        /**
         * Clears a timeout created by `this.timeout()`.
         * @param {number} id A timeout id.
         * @protected
         */
        protected clearTimeout(id: number): void;

        /**
         * @return {number} The current time in milliseconds.
         * @protected
         */
        protected now(): number;

        /**
         * Returns the current time.
         * @return {string} HH:MM:SS.
         * @private
         */
        private getTimeStamp_(): string;

        /**
         * Pads a number to make it have a leading zero if it's less than 10.
         * @param {number} number The number to pad.
         * @return {string} The resulting string.
         * @private
         */
        private pad_(number: number): string;

        /**
         * Trims a path to be only that after google3.
         * @param {string} path The path to trim.
         * @return {string} The resulting string.
         * @private
         */
        private trimPath_(path: string): string;

        /**
         * Handles a test that passed.
         * @param {goog.testing.TestCase.Test} test The test that passed.
         * @protected
         */
        protected doSuccess(test: goog.testing.TestCase.Test): void;

        /**
         * Records and logs a test failure.
         * @param {string} testName The name of the test that failed.
         * @param {*=} opt_e The exception object associated with the
         *     failure or a string.
         * @private
         */
        private recordError_(testName: string, opt_e?: any): void;

        /**
         * Handles a test that failed.
         * @param {goog.testing.TestCase.Test} test The test that failed.
         * @param {*=} opt_e The exception object associated with the
         *     failure or a string.
         * @protected
         */
        protected doError(test: goog.testing.TestCase.Test, opt_e?: any): void;

        /**
         * Makes note of an exception arising from an assertion, and then throws it.
         * If the test otherwise passes (i.e., because something else caught the
         * exception on its way to the test framework), it will be forced to fail.
         * @param {!goog.testing.JsUnitException} e The exception object being thrown.
         * @throws {goog.testing.JsUnitException}
         * @package
         */
        raiseAssertionException(e: goog.testing.JsUnitException): void;

        /**
         * Removes the specified exception from being tracked. This only needs to be
         * called for internal functions that intentionally catch an exception, such
         * as
         * `#assertThrowsJsUnitException`.
         * @param {!goog.testing.JsUnitException} e The exception object to invalidate.
         * @package
         */
        invalidateAssertionException(e: goog.testing.JsUnitException): void;

        /**
         * @param {string} name Failed test name.
         * @param {*=} opt_e The exception object associated with the
         *     failure or a string.
         * @return {!goog.testing.TestCase.Error} Error object.
         */
        logError(name: string, opt_e?: any): goog.testing.TestCase.Error;

        /**
         * @param {function(goog.testing.TestCase.Test, !Array<string>)} testDone
         */
        setTestDoneCallback(testDone: (_0: goog.testing.TestCase.Test, _1: string[]) => void): void;

        /**
         * @param {goog.testing.TestCase.Test} test
         * @param {!Array<string>} errMsgs
         * @private
         */
        private doTestDone_(test: goog.testing.TestCase.Test, errMsgs: string[]): void;

        /**
         * Wraps provided promise and returns a new promise which will be rejected
         * if the original promise does not settle within the given timeout.
         * @param {!goog.Promise<T>} promise
         * @param {number} timeoutInMs Number of milliseconds to wait for the promise to
         *     settle before failing it with a timeout error.
         * @param {string} errorMsg Error message to use if the promise times out.
         * @return {!goog.Promise<T>} A promise that will settle with the original
               promise unless the timeout is exceeded.
         *     errror.
         * @template T
         * @private
         */
        private rejectIfPromiseTimesOut_<T>(promise: goog.Promise<T>, timeoutInMs: number, errorMsg: string):
            goog.Promise<T>;
    }

    /**
     * @private
     */
    class Continuation_ extends __Continuation_ {}
    abstract class __Continuation_ {
        /**
         * @param {!function(): (?goog.testing.Continuation_|undefined)} fn
         */
        constructor(fn: () => any | null | undefined);

        /** @private @const */
        private fn_: any /*missing*/;
    }
}

declare namespace goog.testing.TestCase {
    /**
     * A class representing a single test function.
     */
    class Test extends __Test {}
    abstract class __Test {
        /**
         * @param {string} name The test name.
         * @param {?function()} ref Reference to the test function or test object.
         * @param {?Object=} scope Optional scope that the test function should be
         *     called in.
         * @param {!Array<!Object>=} objChain A chain of objects used to populate setUps
         *     and tearDowns.
         */
        constructor(name: string, ref: (() => void)|null, scope?: Object|null, objChain?: Object[]);

        /**
         * The name of the test.
         * @type {string}
         */
        name: string;

        /**
         * TODO(user): Rename this to something more clear.
         * Reference to the test function.
         * @type {function()}
         */
        ref: () => void;

        /**
         * Scope that the test function should be called in.
         * @type {?Object}
         */
        scope: Object|null;

        /**
         * @type {!Array<function()>}
         */
        setUps: () => void[];

        /**
         * @type {!Array<function()>}
         */
        tearDowns: () => void[];

        /**
         * Timestamp just before the test begins execution.
         * @type {number}
         * @private
         */
        private startTime_: number;

        /**
         * Timestamp just after the test ends execution.
         * @type {number}
         * @private
         */
        private stoppedTime_: number;

        /**
         * Executes the test function.
         * @package
         */
        execute(): void;

        /**
         * Sets the start time
         */
        started(): void;

        /**
         * Sets the stop time
         */
        stopped(): void;

        /**
         * Returns the runtime for this test function
         * @return {number} milliseconds takenn by the test.
         */
        getElapsedTime(): number;
    }

    /**
     * A class for representing test results.  A bag of public properties.
     * @final
     */
    class Result extends __Result {}
    abstract class __Result {
        /**
         * @param {goog.testing.TestCase} testCase The test case that owns this result.
         */
        constructor(testCase: goog.testing.TestCase);

        /**
         * The test case that owns this result.
         * @type {goog.testing.TestCase}
         * @private
         */
        private testCase_: goog.testing.TestCase;

        /**
         * Total number of tests that should have been run.
         * @type {number}
         */
        totalCount: number;

        /**
         * Total number of tests that were actually run.
         * @type {number}
         */
        runCount: number;

        /**
         * Number of successful tests.
         * @type {number}
         */
        successCount: number;

        /**
         * The amount of time the tests took to run.
         * @type {number}
         */
        runTime: number;

        /**
         * The number of files loaded to run this test.
         * @type {number}
         */
        numFilesLoaded: number;

        /**
         * Whether this test case was suppressed by shouldRunTests() returning
         * false.
         * @type {boolean}
         */
        testSuppressed: boolean;

        /**
         * Test results for each test that was run. The test name is always added
         * as the key in the map, and the array of strings is an optional list
         * of failure messages. If the array is empty, the test passed. Otherwise,
         * the test failed.
         * @type {!Object<string, !Array<goog.testing.TestCase.Error>>}
         */
        resultsByName: {[key: string]: goog.testing.TestCase.Error[]};

        /**
         * Errors encountered while running the test.
         * @type {!Array<goog.testing.TestCase.Error>}
         */
        errors: goog.testing.TestCase.Error[];

        /**
         * Messages to show the user after running the test.
         * @type {!Array<string>}
         */
        messages: string[];

        /**
         * Whether the tests have completed.
         * @type {boolean}
         */
        complete: boolean;

        /**
         * @return {boolean} Whether the test was successful.
         */
        isSuccess(): boolean;

        /**
         * @return {string} A summary of the tests, including total number of tests that
         *     passed, failed, and the time taken.
         */
        getSummary(): string;
    }

    /**
     * A class representing an error thrown by the test
     * @final
     */
    class Error extends __Error {}
    abstract class __Error {
        /**
         * @param {string} source The name of the test which threw the error.
         * @param {string} message The error message.
         * @param {string=} opt_stack A string showing the execution stack.
         */
        constructor(source: string, message: string, opt_stack?: string);

        /**
         * The name of the test which threw the error.
         * @type {string}
         */
        source: string;

        /**
         * Reference to the test function.
         * @type {string}
         */
        message: string;

        /**
         * The stack.
         * @type {?string}
         */
        stack: string|null;

        /**
         * Returns an object representing the error suitable for JSON serialization.
         * @return {!goog.testing.TestCase.IResult} An object
         *     representation of the error.
         * @private
         */
        private toObject_(): goog.testing.TestCase.IResult;
    }

    /**
     * The order to run the auto-discovered tests.
     * @enum {string}
     */
    enum Order { NATURAL, RANDOM, SORTED }

    /**
     * The maximum amount of time in milliseconds that the test case can take
     * before it is forced to yield and reschedule. This prevents the test runner
     * from blocking the browser and potentially hurting the test harness.
     * @type {number}
     */
    let maxRunTime: number;

    /**
     * Name of the current test that is running, or null if none is running.
     * @type {?string}
     */
    let currentTestName: string|null;

    /**
     * Avoid a dependency on goog.userAgent and keep our own reference of whether
     * the browser is IE.
     * @type {boolean}
     */
    let IS_IE: boolean;

    /**
     * Represents a test result.
     * @typedef {{
     *     'source': string,
     *     'message': string,
     *     'stacktrace': string
     * }}
     */
    interface IResult {
        source: string;
        message: string;
        stacktrace: string;
    }

    /**
     * Gets list of objects that potentially contain test cases. For IE 8 and
     * below, this is the global "this" (for properties set directly on the global
     * this or window) and the RuntimeObject (for global variables and functions).
     * For all other browsers, the array simply contains the global this.
     *
     * @param {string=} opt_prefix An optional prefix. If specified, only get things
     *     under this prefix. Note that the prefix is only honored in IE, since it
     *     supports the RuntimeObject:
     *     http://msdn.microsoft.com/en-us/library/ff521039%28VS.85%29.aspx
     *     TODO: Remove this option.
     * @return {!Array<!Object>} A list of objects that should be inspected.
     */
    function getGlobals(opt_prefix?: string): Object[];

    /**
     * @return {?goog.testing.TestCase} currently active test case or null if not
     *     test is currently running. Tries the G_testRunner first then the stored
     *     value (when run outside of G_testRunner.
     */
    function getActiveTestCase(): goog.testing.TestCase|null;

    /**
     * Calls {@link goog.testing.TestCase.prototype.invalidateAssertionException}
     * on the active test case if it is installed, and logs an error otherwise.
     * @param {!goog.testing.JsUnitException} e The exception object to invalidate.
     * @package
     */
    function invalidateAssertionException(e: goog.testing.JsUnitException): void;

    /**
     * Initializes the TestCase.
     * @param {goog.testing.TestCase} testCase The test case to install.
     * @param {function(goog.testing.TestCase.Test, Array<string>)=} opt_testDone
     *     Called when each test completes.
     */
    function initializeTestCase(
        testCase: goog.testing.TestCase, opt_testDone?: (_0: goog.testing.TestCase.Test, _1: string[]) => void
    ): void;

    /**
     * Initializes the given test case with the global test runner 'G_testRunner'.
     * @param {goog.testing.TestCase} testCase The test case to install.
     * @param {function(goog.testing.TestCase.Test, Array<string>)=} opt_testDone
     *     Called when each test completes.
     */
    function initializeTestRunner(
        testCase: goog.testing.TestCase, opt_testDone?: (_0: goog.testing.TestCase.Test, _1: string[]) => void
    ): void;
}

declare namespace goog.testing.Continuation_ {
    /** @param {?goog.testing.Continuation_|undefined} continuation */
    function run(continuation: any|null|undefined): void;
}
