/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../debug/error.d.ts"/>

declare module 'goog:goog.labs.format.csv' {
    export = goog.labs.format.csv;
}

declare module 'goog:goog.labs.format.csv.Token' {
    import alias = goog.labs.format.csv.Token;
    export default alias;
}

declare module 'goog:goog.labs.format.csv.ParseError' {
    import alias = goog.labs.format.csv.ParseError;
    export default alias;
}

declare namespace goog.labs.format.csv {
    /**
     * Error thrown when parsing fails.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class ParseError extends __ParseError {}
    abstract class __ParseError extends goog.debug.__Error {
        /**
         * @param {string} text The CSV source text being parsed.
         * @param {number} index The index, in the string, of the position of the
         *      error.
         * @param {string=} opt_message A description of the violated parse expectation.
         */
        constructor(text: string, index: number, opt_message?: string);

        /**
         * @type {?{line: number, column: number}} The line and column of the parse
         *     error.
         */
        position: {line: number; column: number}|null;
    }

    /**
     * @define {boolean} Enable verbose debugging. This is a flag so it can be
     * enabled in production if necessary post-compilation.  Otherwise, debug
     * information will be stripped to minimize final code size.
     */
    const ENABLE_VERBOSE_DEBUGGING: boolean;

    /**
     * A token -- a single-character string or a sentinel.
     * @typedef {string|!goog.labs.format.csv.Sentinels_}
     */
    type Token = string|any;

    /**
     * Parses a CSV string to create a two-dimensional array.
     *
     * This function does not process header lines, etc -- such transformations can
     * be made on the resulting array.
     *
     * @param {string} text The entire CSV text to be parsed.
     * @param {boolean=} opt_ignoreErrors Whether to ignore parsing errors and
     *      instead try to recover and keep going.
     * @param {string=} opt_delimiter The delimiter to use. Defaults to ','
     * @return {!Array<!Array<string>>} The parsed CSV.
     */
    function parse(text: string, opt_ignoreErrors?: boolean, opt_delimiter?: string): string[][];
}
