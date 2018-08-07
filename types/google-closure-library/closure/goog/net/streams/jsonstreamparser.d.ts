/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./streamparser.d.ts"/>

declare module 'goog:goog.net.streams.JsonStreamParser' {
    import alias = goog.net.streams.JsonStreamParser;
    export default alias;
}

declare module 'goog:goog.net.streams.JsonStreamParser.Options' {
    import alias = goog.net.streams.JsonStreamParser.Options;
    export default alias;
}

declare namespace goog.net.streams {
    /**
     * The default JSON stream parser.
     *
     * @struct
     * @implements {goog.net.streams.StreamParser}
     * @final
     * @package
     */
    class JsonStreamParser extends __JsonStreamParser {}
    abstract class __JsonStreamParser implements goog.net.streams.StreamParser {
        /**
         * @param {!goog.net.streams.JsonStreamParser.Options=} opt_options
         *     Configuration for the new JsonStreamParser instance.
         */
        constructor(opt_options?: goog.net.streams.JsonStreamParser.Options);

        /**
         * The current error message, if any.
         * @private {?string}
         */
        private errorMessage_: any /*missing*/;

        /**
         * The currently buffered result (parsed JSON objects).
         * @private {!Array<string|!Object>}
         */
        private result_: any /*missing*/;

        /**
         * The currently buffered input.
         * @private {string}
         */
        private buffer_: any /*missing*/;

        /**
         * The current stack.
         * @private {!Array<!Parser.State_>}
         */
        private stack_: any /*missing*/;

        /**
         * The current depth of the nested JSON structure.
         * @private {number}
         */
        private depth_: any /*missing*/;

        /**
         * The current position in the streamed data.
         * @private {number}
         */
        private pos_: any /*missing*/;

        /**
         * The current state of whether the parser is decoding a '\' escaped string.
         * @private {boolean}
         */
        private slashed_: any /*missing*/;

        /**
         * The current unicode char count. 0 means no unicode, 1-4 otherwise.
         * @private {number}
         */
        private unicodeCount_: any /*missing*/;

        /**
         * The regexp for parsing string input.
         * @private {!RegExp}
         */
        private stringInputPattern_: any /*missing*/;

        /**
         * The current stream state.
         * @private {goog.net.streams.JsonStreamParser.StreamState_}
         */
        private streamState_: any /*missing*/;

        /**
         * The current parser state.
         * @private {goog.net.streams.JsonStreamParser.State_}
         */
        private state_: any /*missing*/;

        /**
         * Whether to deliver the raw message string without decoding into JS object.
         * @private {boolean}
         */
        private deliverMessageAsRawString_: any /*missing*/;

        /**
         * Checks if the parser is aborted due to invalid input.
         *
         * @return {boolean} true if the input is still valid.
         */
        isInputValid(): boolean;

        /**
         * Checks the error message.
         *
         * @return {?string} any debug info on the first invalid input, or null if
         *    the input is still valid.
         */
        getErrorMessage(): string|null;

        /**
         * Parse the new input.
         *
         * Note that there is no Parser state to indicate the end of a stream.
         *
         * @param {string|!ArrayBuffer|!Array<number>} input The input data
         * @throws {!Error} if the input is invalid, and the parser will remain invalid
         *    once an error has been thrown.
         * @return {?Array<string|!Object>} any parsed objects (atomic messages)
         *    in an array, or null if more data needs be read to parse any new object.
         */
        parse(input: string|ArrayBuffer|number[]): string|Object[]|null;
    }
}

declare namespace goog.net.streams.JsonStreamParser {
    /**
     * Configuration spec for newly created JSON stream parser:
     *
     * allowCompactJsonArrayFormat: ignored.
     *
     * deliverMessageAsRawString: whether to deliver the raw message string without
     *     decoding into JS object. Semantically insignificant whitespaces in the
     *     input may be kept or ignored.
     *
     * @typedef {{
     *   allowCompactJsonArrayFormat: (boolean|undefined),
     *   deliverMessageAsRawString: (boolean|undefined),
     * }}
     */
    interface Options {
        allowCompactJsonArrayFormat: boolean|undefined;
        deliverMessageAsRawString: boolean|undefined;
    }
}
