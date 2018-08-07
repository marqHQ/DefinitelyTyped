/// <reference path="../../../globals.d.ts"/>
/// <reference path="../ui/component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../ui/tablesorter.d.ts"/>
/// <reference path="./testcase.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.testing.MultiTestRunner' {
    import alias = goog.testing.MultiTestRunner;
    export default alias;
}

declare module 'goog:goog.testing.MultiTestRunner.TestFrame' {
    import alias = goog.testing.MultiTestRunner.TestFrame;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A component for running multiple tests within the browser.
     * @extends {goog.ui.Component}
     * @final
     */
    class MultiTestRunner extends __MultiTestRunner {}
    abstract class __MultiTestRunner extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper A DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * Array of tests to execute, when combined with the base path this should be
         * a relative path to the test from the page containing the multi testrunner.
         * @type {Array<string>}
         * @private
         */
        private allTests_: string[];

        /**
         * Tests that match the filter function.
         * @type {Array<string>}
         * @private
         */
        private activeTests_: string[];

        /**
         * An event handler for handling events.
         * @type {goog.events.EventHandler<!goog.testing.MultiTestRunner>}
         * @private
         */
        private eh_: goog.events.EventHandler<goog.testing.MultiTestRunner>;

        /**
         * A table sorter for the stats.
         * @type {goog.ui.TableSorter}
         * @private
         */
        private tableSorter_: goog.ui.TableSorter;

        /**
         * Array to hold individual test reports for tests that failed.
         * @type {!Array<!string>}
         * @private
         */
        private failureReports_: string[];

        /**
         * Array of test result objects returned from G_testRunner.getTestResults for
         * each individual test run.
         * @private {!Array<!Object<string,!Array<!goog.testing.TestCase.IResult>>>}
         */
        private allTestResults_: any /*missing*/;

        /**
         * The test suite's name.
         * @type {string} name
         * @private
         */
        private name_: string;

        /**
         * The base path used to resolve files within the allTests_ array.
         * @type {string}
         * @private
         */
        private basePath_: string;

        /**
         * A set of tests that have finished.  All extant keys map to true.
         * @type {Object<boolean>}
         * @private
         */
        private finished_: {[key: string]: boolean};

        /**
         * Whether the report should contain verbose information about the passes.
         * @type {boolean}
         * @private
         */
        private verbosePasses_: boolean;

        /**
         * Whether to hide passing tests completely in the report, makes verbosePasses_
         * obsolete.
         * @type {boolean}
         * @private
         */
        private hidePasses_: boolean;

        /**
         * Flag used to tell the test runner to stop after the current test.
         * @type {boolean}
         * @private
         */
        private stopped_: boolean;

        /**
         * Flag indicating whether the test runner is active.
         * @type {boolean}
         * @private
         */
        private active_: boolean;

        /**
         * Index of the next test to run.
         * @type {number}
         * @private
         */
        private startedCount_: number;

        /**
         * Count of the results received so far.
         * @type {number}
         * @private
         */
        private resultCount_: number;

        /**
         * Number of passes so far.
         * @type {number}
         * @private
         */
        private passes_: number;

        /**
         * Timestamp for the current start time.
         * @type {number}
         * @private
         */
        private startTime_: number;

        /**
         * Only tests whose paths patch this filter function will be
         * executed.
         * @type {function(string): boolean}
         * @private
         */
        private filterFn_: (_0: string) => boolean;

        /**
         * Number of milliseconds to wait for loading and initialization steps.
         * @type {number}
         * @private
         */
        private timeoutMs_: number;

        /**
         * An array of objects containing stats about the tests.
         * @type {Array<Object>?}
         * @private
         */
        private stats_: Object[]|null;

        /**
         * Reference to the start button element.
         * @type {Element}
         * @private
         */
        private startButtonEl_: Element;

        /**
         * Reference to the stop button element.
         * @type {Element}
         * @private
         */
        private stopButtonEl_: Element;

        /**
         * Reference to the log element.
         * @type {Element}
         * @private
         */
        private logEl_: Element;

        /**
         * Reference to the report element.
         * @type {Element}
         * @private
         */
        private reportEl_: Element;

        /**
         * Reference to the stats element.
         * @type {Element}
         * @private
         */
        private statsEl_: Element;

        /**
         * Reference to the progress bar's element.
         * @type {Element}
         * @private
         */
        private progressEl_: Element;

        /**
         * Reference to the progress bar's inner row element.
         * @type {Element}
         * @private
         */
        private progressRow_: Element;

        /**
         * Reference to the log tab.
         * @type {Element}
         * @private
         */
        private logTabEl_: Element;

        /**
         * Reference to the report tab.
         * @type {Element}
         * @private
         */
        private reportTabEl_: Element;

        /**
         * Reference to the stats tab.
         * @type {Element}
         * @private
         */
        private statsTabEl_: Element;

        /**
         * The number of tests to run at a time.
         * @type {number}
         * @private
         */
        private poolSize_: number;

        /**
         * The size of the stats bucket for the number of files loaded histogram.
         * @type {number}
         * @private
         */
        private numFilesStatsBucketSize_: number;

        /**
         * The size of the stats bucket in ms for the run time histogram.
         * @type {number}
         * @private
         */
        private runTimeStatsBucketSize_: number;

        /**
         * Sets the name for the test suite.
         * @param {string} name The suite's name.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setName(name: string): goog.testing.MultiTestRunner;

        /**
         * Returns the name for the test suite.
         * @return {string} The name for the test suite.
         */
        getName(): string;

        /**
         * Sets the basepath that tests added using addTests are resolved with.
         * @param {string} path The relative basepath.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setBasePath(path: string): goog.testing.MultiTestRunner;

        /**
         * Returns the basepath that tests added using addTests are resolved with.
         * @return {string} The basepath that tests added using addTests are resolved
         *     with.
         */
        getBasePath(): string;

        /**
         * Sets whether the report should contain verbose information for tests that
         * pass.
         * @param {boolean} verbose Whether report should be verbose.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setVerbosePasses(verbose: boolean): goog.testing.MultiTestRunner;

        /**
         * Returns whether the report should contain verbose information for tests that
         * pass.
         * @return {boolean} Whether the report should contain verbose information for
         *     tests that pass.
         */
        getVerbosePasses(): boolean;

        /**
         * Sets whether the report should contain passing tests at all, makes
         * setVerbosePasses obsolete.
         * @param {boolean} hide Whether report should not contain passing tests.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setHidePasses(hide: boolean): goog.testing.MultiTestRunner;

        /**
         * Returns whether the report should contain passing tests at all, makes
         * setVerbosePasses obsolete.
         * @return {boolean} Whether the report should contain passing tests at all,
         *     makes setVerbosePasses obsolete.
         */
        getHidePasses(): boolean;

        /**
         * Sets the bucket sizes for the histograms.
         * @param {number} f Bucket size for num files loaded histogram.
         * @param {number} t Bucket size for run time histogram.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setStatsBucketSizes(f: number, t: number): goog.testing.MultiTestRunner;

        /**
         * Sets the number of milliseconds to wait for the page to load, initialize and
         * run the tests.
         * @param {number} timeout Time in milliseconds.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setTimeout(timeout: number): goog.testing.MultiTestRunner;

        /**
         * Returns the number of milliseconds to wait for the page to load, initialize
         * and run the tests.
         * @return {number} The number of milliseconds to wait for the page to load,
         *     initialize and run the tests.
         */
        getTimeout(): number;

        /**
         * Sets the number of tests that can be run at the same time. This only improves
         * performance due to the amount of time spent loading the tests.
         * @param {number} size The number of tests to run at a time.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setPoolSize(size: number): goog.testing.MultiTestRunner;

        /**
         * Returns the number of tests that can be run at the same time. This only
         * improves performance due to the amount of time spent loading the tests.
         * @return {number} The number of tests that can be run at the same time. This
         *     only improves performance due to the amount of time spent loading the
         *     tests.
         */
        getPoolSize(): number;

        /**
         * Sets a filter function. Only test paths that match the filter function
         * will be executed.
         * @param {function(string): boolean} filterFn Filters test paths.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        setFilterFunction(filterFn: (_0: string) => boolean): goog.testing.MultiTestRunner;

        /**
         * Returns a filter function. Only test paths that match the filter function
         * will be executed.
         * @return {function(string): boolean} A filter function. Only test paths that
         *     match the filter function will be executed.

         */
        getFilterFunction(): (_0: string) => boolean;

        /**
         * Adds an array of tests to the tests that the test runner should execute.
         * @param {Array<string>} tests Adds tests to the test runner.
         * @return {!goog.testing.MultiTestRunner} Instance for chaining.
         */
        addTests(tests: string[]): goog.testing.MultiTestRunner;

        /**
         * Returns the list of all tests added to the runner.
         * @return {Array<string>} The list of all tests added to the runner.
         */
        getAllTests(): string[];

        /**
         * Returns the list of tests that will be run when start() is called.
         * @return {!Array<string>} The list of tests that will be run when start() is
         *     called.
         */
        getTestsToRun(): string[];

        /**
         * Returns a list of tests from runner that have been marked as failed.
         * @return {!Array<string>} A list of tests from runner that have been marked
         *     as failed.
         */
        getTestsThatFailed(): string[];

        /**
         * Returns a list of reports for tests that have finished since last "start".
         * @return {!Array<string>} A list of tests reports.
         */
        getFailureReports(): string[];

        /**
         * Returns list of each frame's test results.
         * @return {!Array<!Object<string,!Array<!goog.testing.TestCase.IResult>>>}
         */
        getAllTestResults(): {[key: string]: goog.testing.TestCase.IResult[]}[];

        /**
         * Deletes and re-creates the progress table inside the progess element.
         * @private
         */
        private resetProgressDom_(): void;

        /**
         * Starts executing the tests.
         */
        start(): void;

        /**
         * Logs a message to the log window.
         * @param {string} msg A message to log.
         */
        log(msg: string): void;

        /**
         * Processes a result returned from a TestFrame.  If there are tests remaining
         * it will trigger the next one to be run, otherwise if there are no tests and
         * all results have been received then it will call finish.
         * @param {goog.testing.MultiTestRunner.TestFrame} frame The frame that just
         *     finished.
         */
        processResult(frame: goog.testing.MultiTestRunner.TestFrame): void;

        /**
         * Runs the next available test, if there are any left.
         * @param {goog.testing.MultiTestRunner.TestFrame} frame Where to run the test.
         * @private
         */
        private runNextTest_(frame: goog.testing.MultiTestRunner.TestFrame): void;

        /**
         * Handles the test finishing, processing the results and rendering the report.
         * @private
         */
        private finish_(): void;

        /**
         * Resets the report, clearing out all children and drawing the initial summary.
         * @private
         */
        private resetReport_(): void;

        /**
         * Draws the stats for the test run.
         * @private
         */
        private drawStats_(): void;

        /**
         * Draws the histogram showing number of files loaded.
         * @private
         */
        private drawFilesHistogram_(): void;

        /**
         * Draws the histogram showing how long each test took to complete.
         * @private
         */
        private drawTimeHistogram_(): void;

        /**
         * Draws a stats histogram.
         * @param {string} statsField Field of the stats object to graph.
         * @param {number} bucketSize The size for the histogram's buckets.
         * @param {function(number, ...*): *} valueTransformFn Function for
         *     transforming the x-labels value for display.
         * @param {number} width The width in pixels of the graph.
         * @param {string} title The graph's title.
         * @private
         */
        private drawStatsHistogram_(
            statsField: string,
            bucketSize: number,
            valueTransformFn: (_0: number, _1: any[]) => any,
            width: number,
            title: string
        ): void;

        /**
         * Draws a pie chart showing the percentage of time spent running the tests
         * compared to loading them etc.
         * @private
         */
        private drawRunTimePie_(): void;

        /**
         * Draws a pie chart showing the percentage of time spent running the tests
         * compared to loading them etc.
         * @private
         */
        private drawWorstTestsTable_(): void;

        /**
         * Clears the stats page.
         * @private
         */
        private clearStats_(): void;

        /**
         * Updates the report's summary.
         * @private
         */
        private writeCurrentSummary_(): void;

        /**
         * Adds a segment to the progress bar.
         * @param {string} title Title for the segment.
         * @param {*} success Whether the segment should indicate a success.
         * @private
         */
        private drawProgressSegment_(title: string, success: any): void;

        /**
         * Draws a test result in the report pane.
         * @param {string} test Test name.
         * @param {*} success Whether the test succeeded.
         * @param {string} report The report.
         * @private
         */
        private drawTestResult_(test: string, success: any, report: string): void;

        /**
         * Returns the current timestamp.
         * @return {string} HH:MM:SS.
         * @private
         */
        private getTimeStamp_(): string;

        /**
         * Trims a filename to be less than 35-characters, ensuring that we do not break
         * a path part.
         * @param {string} name The file name.
         * @return {string} The shortened name.
         * @private
         */
        private trimFileName_(name: string): string;

        /**
         * Shows the report and hides the log if the argument is true.
         * @param {number} tab Which tab to show.
         * @private
         */
        private showTab_(tab: number): void;

        /**
         * Handles the start button being clicked.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private onStartClicked_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the stop button being clicked.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private onStopClicked_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the log tab being clicked.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private onLogTabClicked_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the log tab being clicked.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private onReportTabClicked_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the stats tab being clicked.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private onStatsTabClicked_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.testing.MultiTestRunner {
    /**
     * Class used to manage the interaction with a single iframe.
     * @extends {goog.ui.Component}
     * @final
     */
    class TestFrame extends __TestFrame {}
    abstract class __TestFrame extends goog.ui.__Component {
        /**
         * @param {string} basePath The base path for tests.
         * @param {number} timeoutMs The time to wait for the test to load and run.
         * @param {boolean} verbosePasses Whether to show results for passes.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional dom helper.
         */
        constructor(basePath: string, timeoutMs: number, verbosePasses: boolean, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Base path where tests should be resolved from.
         * @type {string}
         * @private
         */
        private basePath_: string;

        /**
         * The timeout for the test.
         * @type {number}
         * @private
         */
        private timeoutMs_: number;

        /**
         * Whether to show a summary for passing tests.
         * @type {boolean}
         * @private
         */
        private verbosePasses_: boolean;

        /**
         * An event handler for handling events.
         * @type {goog.events.EventHandler<!goog.testing.MultiTestRunner.TestFrame>}
         * @private
         */
        private eh_: goog.events.EventHandler<goog.testing.MultiTestRunner.TestFrame>;

        /**
         * Object to hold test results. Key is test method or file name (depending on
         * failure mode) and the value is an array of failure messages.
         * @private {!Object<string,!Array<!goog.testing.TestCase.IResult>>}
         */
        private testResults_: any /*missing*/;

        /**
         * Reference to the iframe.
         * @type {HTMLIFrameElement}
         * @private
         */
        private iframeEl_: HTMLIFrameElement;

        /**
         * Whether the iframe for the current test has loaded.
         * @type {boolean}
         * @private
         */
        private iframeLoaded_: boolean;

        /**
         * The test file being run.
         * @type {string}
         * @private
         */
        private testFile_: string;

        /**
         * The report returned from the test.
         * @type {string}
         * @private
         */
        private report_: string;

        /**
         * The total time loading and running the test in milliseconds.
         * @type {number}
         * @private
         */
        private totalTime_: number;

        /**
         * The actual runtime of the test in milliseconds.
         * @type {number}
         * @private
         */
        private runTime_: number;

        /**
         * The number of files loaded by the test.
         * @type {number}
         * @private
         */
        private numFilesLoaded_: number;

        /**
         * Whether the test was successful, null if no result has been returned yet.
         * @type {?boolean}
         * @private
         */
        private isSuccess_: boolean|null;

        /**
         * Timestamp for the when the test was started.
         * @type {number}
         * @private
         */
        private startTime_: number;

        /**
         * Timestamp for the last state, used to determine timeouts.
         * @type {number}
         * @private
         */
        private lastStateTime_: number;

        /**
         * The state of the active test.
         * @type {number}
         * @private
         */
        private currentState_: number;

        /**
         * Runs a test file in this test frame.
         * @param {string} testFile The test to run.
         */
        runTest(testFile: string): void;

        /**
         * @return {string} The test file the TestFrame is running.
         */
        getTestFile(): string;

        /**
         * @return {!Object} Stats about the test run.
         */
        getStats(): Object;

        /**
         * @return {string} The report for the test run.
         */
        getReport(): string;

        /**
         * @return {!Object<string,!Array<!goog.testing.TestCase.IResult>>} The results
         *     per individual test in the file. Key is the test filename concatenated
         *     with the test name, and the array holds failures.
         */
        getTestResults(): {[key: string]: goog.testing.TestCase.IResult[]};

        /**
         * @return {?boolean} Whether the test frame had a success.
         */
        isSuccess(): boolean|null;

        /**
         * Handles the TestFrame finishing a single test.
         * @private
         */
        private finish_(): void;

        /**
         * Creates an iframe to run the tests in.  For overriding in unit tests.
         * @private
         */
        private createIframe_(): void;

        /**
         * Handles the iframe loading.
         * @param {goog.events.BrowserEvent} e The load event.
         * @private
         */
        private onIframeLoaded_(e: goog.events.BrowserEvent): void;

        /**
         * Checks the active test for completion, keeping track of the tests' various
         * execution stages.
         * @private
         */
        private checkForCompletion_(): void;
    }

    /**
     * Default maximimum amount of time to spend at each stage of the test.
     * @type {number}
     */
    let DEFAULT_TIMEOUT_MS: number;

    /**
     * Messages corresponding to the numeric states.
     * @type {Array<string>}
     */
    let STATES: string[];

    /**
     * Event type dispatched when tests are completed.
     * @const
     */
    const TESTS_FINISHED: any /*missing*/;
}
