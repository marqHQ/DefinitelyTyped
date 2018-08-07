/// <reference path="../../../globals.d.ts"/>
/// <reference path="../string/stringbuffer.d.ts"/>

declare module 'goog:goog.format.HtmlPrettyPrinter' {
    import alias = goog.format.HtmlPrettyPrinter;
    export default alias;
}

declare module 'goog:goog.format.HtmlPrettyPrinter.Buffer' {
    import alias = goog.format.HtmlPrettyPrinter.Buffer;
    export default alias;
}

declare namespace goog.format {
    /**
     * This class formats HTML to be more human-readable.
     * TODO(user): Add hierarchical indentation.
     * @final
     */
    class HtmlPrettyPrinter extends __HtmlPrettyPrinter {}
    abstract class __HtmlPrettyPrinter {
        /**
         * @param {number=} opt_timeOutMillis Max # milliseconds to spend on #format. If
         *     this time is exceeded, return partially formatted. 0 or negative number
         *     indicates no timeout.
         */
        constructor(opt_timeOutMillis?: number);

        /**
         * Max # milliseconds to spend on #format.
         * @type {number}
         * @private
         */
        private timeOutMillis_: number;

        /**
         * Breaks up HTML so it's easily readable by the user.
         * @param {string} html The HTML text to pretty print.
         * @return {string} Formatted result.
         * @throws {Error} Regex error, data loss, or endless loop detected.
         */
        format(html: string): string;
    }
}

declare namespace goog.format.HtmlPrettyPrinter {
    /**
     * This class is a buffer to which we push our output. It tracks line breaks to
     * make sure we don't add unnecessary ones.
     * @final
     */
    class Buffer extends __Buffer {}
    abstract class __Buffer {
        /**
         */
        constructor();

        /**
         * Tokens to be output in #toString.
         * @type {goog.string.StringBuffer}
         * @private
         */
        private out_: goog.string.StringBuffer;

        /**
         * Tracks number of line breaks added.
         * @type {number}
         */
        breakCount: number;

        /**
         * Tracks if we are at the start of a new line.
         * @type {boolean}
         * @private
         */
        private isBeginningOfNewLine_: boolean;

        /**
         * Tracks if we need a new line before the next token.
         * @type {boolean}
         * @private
         */
        private needsNewLine_: boolean;

        /**
         * Adds token and necessary line breaks to output buffer.
         * @param {boolean} breakBefore If true, add line break before token if
         *     necessary.
         * @param {string} token Token to push.
         * @param {boolean} breakAfter If true, add line break after token if
         *     necessary.
         */
        pushToken(breakBefore: boolean, token: string, breakAfter: boolean): void;

        /**
         * Append line break if we need one.
         */
        lineBreak(): void;
    }

    /**
     * Static utility function. See prototype #format.
     * @param {string} html The HTML text to pretty print.
     * @return {string} Formatted result.
     */
    function format(html: string): string;
}
