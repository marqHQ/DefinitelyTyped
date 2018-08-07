/// <reference path="../../../globals.d.ts"/>
/// <reference path="./testcase.d.ts"/>

declare module 'goog:goog.testing.TestRunner' {
    import alias = goog.testing.TestRunner;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Construct a test runner.
     *
     * NOTE(user): This is currently pretty weird, I'm essentially trying to
     * create a wrapper that the Selenium test can hook into to query the state of
     * the running test case, while making goog.testing.TestCase general.
     *
     */
    class TestRunner extends __TestRunner {}
    abstract class __TestRunner {
        /**
         */
        constructor();

        /**
         * Errors that occurred in the window.
         * @type {!Array<string>}
         */
        errors: string[];

        /**
         * Reference to the active test case.
         * @type {?goog.testing.TestCase}
         */
        testCase: goog.testing.TestCase|null;

        /**
         * Whether the test runner has been initialized yet.
         * @type {boolean}
         */
        initialized: boolean;

        /**
         * Element created in the document to add test results to.
         * @private {?Element}
         */
        private logEl_: any /*missing*/;

        /**
         * Function to use when filtering errors.
         * @private {(function(string))?}
         */
        private errorFilter_: any /*missing*/;

        /**
         * Whether an empty test case counts as an error.
         * @private {boolean}
         */
        private strict_: any /*missing*/;

        /**
         * An id unique to this runner. Checked by the server during polling to
         * verify that the page was not reloaded.
         * @private {!string}
         */
        private uniqueId_: any /*missing*/;

        /**
         * The uuid is embedded in the URL search. This function allows us to mock
         * the search in the test.
         * @return {string}
         */
        getSearchString(): string;

        /**
         * Returns the unique id for this test page.
         * @return {!string}
         */
        getUniqueId(): string;

        /**
         * Clears the unique id for this page. The value will hint the reason.
         */
        clearUniqueId(): void;

        /**
         * Initializes the test runner.
         * @param {goog.testing.TestCase} testCase The test case to initialize with.
         */
        initialize(testCase: goog.testing.TestCase): void;

        /**
         * By default, the test runner is strict, and fails if it runs an empty
         * test case.
         * @param {boolean} strict Whether the test runner should fail on an empty
         *     test case.
         */
        setStrict(strict: boolean): void;

        /**
         * @return {boolean} Whether the test runner should fail on an empty
         *     test case.
         */
        isStrict(): boolean;

        /**
         * Returns true if the test runner is initialized.
         * Used by Selenium Hooks.
         * @return {boolean} Whether the test runner is active.
         */
        isInitialized(): boolean;

        /**
         * Returns false if the test runner has not finished successfully.
         * Used by Selenium Hooks.
         * @return {boolean} Whether the test runner is not active.
         */
        isFinished(): boolean;

        /**
         * Returns true if the test runner is finished.
         * @return {boolean} True if the test runner started and subsequently completed.
         */
        isComplete(): boolean;

        /**
         * Returns true if the test case didn't fail.
         * Used by Selenium Hooks.
         * @return {boolean} Whether the current test returned successfully.
         */
        isSuccess(): boolean;

        /**
         * Returns true if the test case runner has errors that were caught outside of
         * the test case.
         * @return {boolean} Whether there were JS errors.
         */
        hasErrors(): boolean;

        /**
         * Logs an error that occurred.  Used in the case of environment setting up
         * an onerror handler.
         * @param {string} msg Error message.
         */
        logError(msg: string): void;

        /**
         * Log failure in current running test.
         * @param {Error} ex Exception.
         */
        logTestFailure(ex: Error): void;

        /**
         * Sets a function to use as a filter for errors.
         * @param {function(string)} fn Filter function.
         */
        setErrorFilter(fn: (_0: string) => void): void;

        /**
         * Returns a report of the test case that ran.
         * Used by Selenium Hooks.
         * @param {boolean=} opt_verbose If true results will include data about all
         *     tests, not just what failed.
         * @return {string} A report summary of the test.
         */
        getReport(opt_verbose?: boolean): string;

        /**
         * Returns the amount of time it took for the test to run.
         * Used by Selenium Hooks.
         * @return {number} The run time, in milliseconds.
         */
        getRunTime(): number;

        /**
         * Returns the number of script files that were loaded in order to run the test.
         * @return {number} The number of script files.
         */
        getNumFilesLoaded(): number;

        /**
         * Executes a test case and prints the results to the window.
         */
        execute(): void;

        /**
         * Writes the results to the document when the test case completes.
         * @private
         */
        private onComplete_(): void;

        /**
         * Writes a nicely formatted log out to the document.
         * @param {string} log The string to write.
         */
        writeLog(log: string): void;

        /**
         * Logs a message to the current test case.
         * @param {string} s The text to output to the log.
         */
        log(s: string): void;

        /**
         * @return {Object<string, !Array<!goog.testing.TestCase.IResult>>} A map of
         * test names to a list of test failures (if any) to provide formatted data
         * for the test runner.
         */
        getTestResults(): {[key: string]: goog.testing.TestCase.IResult[]};

        /**
         * Returns the test results as json.
         * This is called by the testing infrastructure through G_testrunner.
         * @return {?string} Tests results object.
         */
        getTestResultsAsJson(): string|null;
    }
}

declare namespace goog.testing.TestRunner {
    /** @const {string} The ID of the element to log output to. */
    const TEST_LOG_ID: any /*missing*/;
}
