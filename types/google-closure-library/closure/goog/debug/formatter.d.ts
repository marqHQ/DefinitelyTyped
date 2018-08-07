/// <reference path="../../../globals.d.ts"/>
/// <reference path="./relativetimeprovider.d.ts"/>
/// <reference path="./logrecord.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>

declare module 'goog:goog.debug.TextFormatter' {
    import alias = goog.debug.TextFormatter;
    export default alias;
}

declare module 'goog:goog.debug.HtmlFormatter' {
    import alias = goog.debug.HtmlFormatter;
    export default alias;
}

declare module 'goog:goog.debug.Formatter' {
    import alias = goog.debug.Formatter;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Base class for Formatters. A Formatter is used to format a LogRecord into
     * something that can be displayed to the user.
     *
     */
    class Formatter extends __Formatter {}
    abstract class __Formatter {
        /**
         * @param {string=} opt_prefix The prefix to place before text records.
         */
        constructor(opt_prefix?: string);

        /**
         * A provider that returns the relative start time.
         * @type {goog.debug.RelativeTimeProvider}
         * @private
         */
        private startTimeProvider_: goog.debug.RelativeTimeProvider;

        /**
         * Whether to append newlines to the end of formatted log records.
         * @type {boolean}
         */
        appendNewline: boolean;

        /**
         * Whether to show absolute time in the DebugWindow.
         * @type {boolean}
         */
        showAbsoluteTime: boolean;

        /**
         * Whether to show relative time in the DebugWindow.
         * @type {boolean}
         */
        showRelativeTime: boolean;

        /**
         * Whether to show the logger name in the DebugWindow.
         * @type {boolean}
         */
        showLoggerName: boolean;

        /**
         * Whether to show the logger exception text.
         * @type {boolean}
         */
        showExceptionText: boolean;

        /**
         * Whether to show the severity level.
         * @type {boolean}
         */
        showSeverityLevel: boolean;

        /**
         * Formats a record.
         * @param {goog.debug.LogRecord} logRecord the logRecord to format.
         * @return {string} The formatted string.
         */
        formatRecord(logRecord: goog.debug.LogRecord): string;

        /**
         * Formats a record as SafeHtml.
         * @param {goog.debug.LogRecord} logRecord the logRecord to format.
         * @return {!goog.html.SafeHtml} The formatted string as SafeHtml.
         */
        formatRecordAsHtml(logRecord: goog.debug.LogRecord): goog.html.SafeHtml;

        /**
         * Sets the start time provider. By default, this is the default instance
         * but can be changed.
         * @param {goog.debug.RelativeTimeProvider} provider The provider to use.
         */
        setStartTimeProvider(provider: goog.debug.RelativeTimeProvider): void;

        /**
         * Returns the start time provider. By default, this is the default instance
         * but can be changed.
         * @return {goog.debug.RelativeTimeProvider} The start time provider.
         */
        getStartTimeProvider(): goog.debug.RelativeTimeProvider;

        /**
         * Resets the start relative time.
         */
        resetRelativeTimeStart(): void;
    }

    /**
     * Formatter that returns formatted html. See formatRecord for the classes
     * it uses for various types of formatted output.
     *
     * @extends {goog.debug.Formatter}
     */
    class HtmlFormatter extends __HtmlFormatter {}
    abstract class __HtmlFormatter extends goog.debug.__Formatter {
        /**
         * @param {string=} opt_prefix The prefix to place before text records.
         */
        constructor(opt_prefix?: string);
    }

    /**
     * Formatter that returns formatted plain text
     *
     * @extends {goog.debug.Formatter}
     * @final
     */
    class TextFormatter extends __TextFormatter {}
    abstract class __TextFormatter extends goog.debug.__Formatter {
        /**
         * @param {string=} opt_prefix The prefix to place before text records.
         */
        constructor(opt_prefix?: string);
    }
}

declare namespace goog.debug.Formatter {
}

declare namespace goog.debug.HtmlFormatter {
    /**
     * Exposes an exception that has been caught by a try...catch and outputs the
     * error as HTML with a stack trace.
     *
     * @param {*} err Error object or string.
     * @param {?Function=} fn If provided, when collecting the stack trace all
     *     frames above the topmost call to this function, including that call,
     *     will be left out of the stack trace.
     * @return {string} Details of exception, as HTML.
     */
    function exposeException(err: any, fn?: Function|null): string;

    /**
     * Exposes an exception that has been caught by a try...catch and outputs the
     * error with a stack trace.
     *
     * @param {*} err Error object or string.
     * @param {?Function=} fn If provided, when collecting the stack trace all
     *     frames above the topmost call to this function, including that call,
     *     will be left out of the stack trace.
     * @return {!goog.html.SafeHtml} Details of exception.
     */
    function exposeExceptionAsHtml(err: any, fn?: Function|null): goog.html.SafeHtml;
}
