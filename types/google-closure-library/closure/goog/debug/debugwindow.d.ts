/// <reference path="../../../globals.d.ts"/>
/// <reference path="./formatter.d.ts"/>
/// <reference path="./logrecord.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../html/safestylesheet.d.ts"/>

declare module 'goog:goog.debug.DebugWindow' {
    import alias = goog.debug.DebugWindow;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Provides a debug DebugWindow that is bound to the goog.debug.Logger.
     * It handles log messages and writes them to the DebugWindow. This doesn't
     * provide a lot of functionality that the old Gmail logging infrastructure
     * provided like saving debug logs for exporting to the server. Now that we
     * have an event-based logging infrastructure, we can encapsulate that
     * functionality in a separate class.
     *
     */
    class DebugWindow extends __DebugWindow {}
    abstract class __DebugWindow {
        /**
         * @param {string=} opt_identifier Identifier for this logging class.
         * @param {string=} opt_prefix Prefix prepended to messages.
         */
        constructor(opt_identifier?: string, opt_prefix?: string);

        /**
         * Identifier for this logging class
         * @protected {string}
         */
        protected identifier: any /*missing*/;

        /**
         * Array used to buffer log output
         * @protected {!Array<!goog.html.SafeHtml>}
         */
        protected outputBuffer: any /*missing*/;

        /**
         * Optional prefix to be prepended to error strings
         * @private {string}
         */
        private prefix_: any /*missing*/;

        /**
         * Buffer for saving the last 1000 messages
         * @private {!goog.structs.CircularBuffer}
         */
        private savedMessages_: any /*missing*/;

        /**
         * Save the publish handler so it can be removed
         * @private {!Function}
         */
        private publishHandler_: any /*missing*/;

        /**
         * Formatter for formatted output
         * @private {goog.debug.Formatter}
         */
        private formatter_: any /*missing*/;

        /**
         * Loggers that we shouldn't output
         * @private {!Object}
         */
        private filteredLoggers_: any /*missing*/;

        /**
         * Whether we are currently enabled. When the DebugWindow is enabled, it tries
         * to keep its window open. When it's disabled, it can still be capturing log
         * output if, but it won't try to write them to the DebugWindow window until
         * it's enabled.
         * @private {boolean}
         */
        private enabled_: any /*missing*/;

        /**
         * HTML string printed when the debug window opens
         * @type {string}
         * @protected
         */
        protected welcomeMessage: string;

        /**
         * Whether to force enable the window on a severe log.
         * @type {boolean}
         * @private
         */
        private enableOnSevere_: boolean;

        /**
         * Reference to debug window
         * @type {Window}
         * @protected
         */
        protected win: Window;

        /**
         * In the process of opening the window
         * @type {boolean}
         * @private
         */
        private winOpening_: boolean;

        /**
         * Whether we are currently capturing logger output.
         *
         * @type {boolean}
         * @private
         */
        private isCapturing_: boolean;

        /**
         * Reference to timeout used to buffer the output stream.
         * @type {?number}
         * @private
         */
        private bufferTimeout_: number|null;

        /**
         * Timestamp for the last time the log was written to.
         * @protected {number}
         */
        protected lastCall: any /*missing*/;

        /**
         * Sets the welcome message shown when the window is first opened or reset.
         *
         * @param {string} msg An HTML string.
         */
        setWelcomeMessage(msg: string): void;

        /**
         * Initializes the debug window.
         */
        init(): void;

        /**
         * Whether the DebugWindow is enabled. When the DebugWindow is enabled, it
         * tries to keep its window open and logs all messages to the window.  When the
         * DebugWindow is disabled, it stops logging messages to its window.
         *
         * @return {boolean} Whether the DebugWindow is enabled.
         */
        isEnabled(): boolean;

        /**
         * Sets whether the DebugWindow is enabled. When the DebugWindow is enabled, it
         * tries to keep its window open and log all messages to the window. When the
         * DebugWindow is disabled, it stops logging messages to its window. The
         * DebugWindow also saves this state to a cookie so that it's persisted across
         * application refreshes.
         * @param {boolean} enable Whether the DebugWindow is enabled.
         */
        setEnabled(enable: boolean): void;

        /**
         * Sets whether the debug window should be force enabled when a severe log is
         * encountered.
         * @param {boolean} enableOnSevere Whether to enable on severe logs..
         */
        setForceEnableOnSevere(enableOnSevere: boolean): void;

        /**
         * Whether we are currently capturing logger output.
         * @return {boolean} whether we are currently capturing logger output.
         */
        isCapturing(): boolean;

        /**
         * Sets whether we are currently capturing logger output.
         * @param {boolean} capturing Whether to capture logger output.
         */
        setCapturing(capturing: boolean): void;

        /**
         * Gets the formatter for outputting to the debug window. The default formatter
         * is an instance of goog.debug.HtmlFormatter
         * @return {goog.debug.Formatter} The formatter in use.
         */
        getFormatter(): goog.debug.Formatter;

        /**
         * Sets the formatter for outputting to the debug window.
         * @param {goog.debug.Formatter} formatter The formatter to use.
         */
        setFormatter(formatter: goog.debug.Formatter): void;

        /**
         * Adds a separator to the debug window.
         */
        addSeparator(): void;

        /**
         * @return {boolean} Whether there is an active window.
         */
        hasActiveWindow(): boolean;

        /**
         * Clears the contents of the debug window
         * @protected
         */
        protected clear(): void;

        /**
         * Adds a log record.
         * @param {goog.debug.LogRecord} logRecord the LogRecord.
         */
        addLogRecord(logRecord: goog.debug.LogRecord): void;

        /**
         * Writes a message to the log, possibly opening up the window if it's enabled,
         * or saving it if it's disabled.
         * @param {!goog.html.SafeHtml} html The HTML to write.
         * @private
         */
        private write_(html: goog.html.SafeHtml): void;

        /**
         * Write to the buffer.  If a message hasn't been sent for more than 750ms just
         * write, otherwise delay for a minimum of 250ms.
         * @param {!goog.html.SafeHtml} html HTML to post to the log.
         * @private
         */
        private writeToLog_(html: goog.html.SafeHtml): void;

        /**
         * Write to the log and maybe scroll into view.
         * @protected
         */
        protected writeBufferToLog(): void;

        /**
         * Writes all saved messages to the DebugWindow.
         * @protected
         */
        protected writeSavedMessages(): void;

        /**
         * Opens the debug window if it is not already referenced
         * @private
         */
        private openWindow_(): void;

        /**
         * Gets a valid window name for the debug window. Replaces invalid characters in
         * IE.
         * @return {string} Valid window name.
         * @private
         */
        private getWindowName_(): string;

        /**
         * @return {!goog.html.SafeStyleSheet} The stylesheet, for inclusion in the
         *     initial HTML.
         */
        getStyleRules(): goog.html.SafeStyleSheet;

        /**
         * Writes the initial HTML of the debug window.
         * @protected
         */
        protected writeInitialDocument(): void;

        /**
         * Save persistent data (using cookies) for 1 month (cookie specific to this
         * logger object).
         * @param {string} key Data name.
         * @param {string} value Data value.
         * @private
         */
        private setCookie_(key: string, value: string): void;

        /**
         * Retrieve data (using cookies).
         * @param {string} key Data name.
         * @param {string=} opt_default Optional default value if cookie doesn't exist.
         * @return {string} Cookie value.
         * @private
         */
        private getCookie_(key: string, opt_default?: string): string;

        /**
         * Saves the window position size to a cookie
         * @private
         */
        private saveWindowPositionSize_(): void;

        /**
         * Adds a logger name to be filtered.
         * @param {string} loggerName the logger name to add.
         */
        addFilter(loggerName: string): void;

        /**
         * Removes a logger name to be filtered.
         * @param {string} loggerName the logger name to remove.
         */
        removeFilter(loggerName: string): void;

        /**
         * Modify the size of the circular buffer. Allows the log to retain more
         * information while the window is closed.
         * @param {number} size New size of the circular buffer.
         */
        resetBufferWithNewSize(size: number): void;
    }
}

declare namespace goog.debug.DebugWindow {
    /**
     * Max number of messages to be saved
     * @type {number}
     */
    let MAX_SAVED: number;

    /**
     * How long to keep the cookies for in milliseconds
     * @type {number}
     */
    let COOKIE_TIME: number;

    /**
     * @param {string} identifier Identifier for logging class.
     * @return {boolean} Whether the DebugWindow is enabled.
     */
    function isEnabled(identifier: string): boolean;
}
