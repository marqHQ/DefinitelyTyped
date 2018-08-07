/// <reference path="../../../globals.d.ts"/>
/// <reference path="./logrecord.d.ts"/>
/// <reference path="./formatter.d.ts"/>

declare module 'goog:goog.debug.DivConsole' {
    import alias = goog.debug.DivConsole;
    export default alias;
}

declare namespace goog.debug {
    /**
     * A class for visualising logger calls in a div element.
     */
    class DivConsole extends __DivConsole {}
    abstract class __DivConsole {
        /**
         * @param {Element} element The element to append to.
         */
        constructor(element: Element);

        /**
         * Installs styles for the log messages and its div
         */
        installStyles(): void;

        /**
         * Sets whether we are currently capturing logger output.
         * @param {boolean} capturing Whether to capture logger output.
         */
        setCapturing(capturing: boolean): void;

        /**
         * Adds a log record.
         * @param {goog.debug.LogRecord} logRecord The log entry.
         */
        addLogRecord(logRecord: goog.debug.LogRecord): void;

        /**
         * Gets the formatter for outputting to the console. The default formatter
         * is an instance of goog.debug.HtmlFormatter
         * @return {!goog.debug.Formatter} The formatter in use.
         */
        getFormatter(): goog.debug.Formatter;

        /**
         * Sets the formatter for outputting to the console.
         * @param {goog.debug.HtmlFormatter} formatter The formatter to use.
         */
        setFormatter(formatter: goog.debug.HtmlFormatter): void;

        /**
         * Adds a separator to the debug window.
         */
        addSeparator(): void;

        /**
         * Clears the console.
         */
        clear(): void;
    }
}
