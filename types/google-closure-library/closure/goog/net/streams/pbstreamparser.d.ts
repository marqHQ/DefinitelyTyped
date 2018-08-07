/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./streamparser.d.ts"/>

declare module 'goog:goog.net.streams.PbStreamParser' {
    import alias = goog.net.streams.PbStreamParser;
    export default alias;
}

declare namespace goog.net.streams {
    /**
     * The default Protobuf stream parser.
     *
     * @struct
     * @implements {goog.net.streams.StreamParser}
     * @final
     */
    class PbStreamParser extends __PbStreamParser {}
    abstract class __PbStreamParser implements goog.net.streams.StreamParser {
        /**
         */
        constructor();

        /**
         * The current error message, if any.
         * @private {?string}
         */
        private errorMessage_: any /*missing*/;

        /**
         * The currently buffered result (parsed messages).
         * @private {!Array<!Object>}
         */
        private result_: any /*missing*/;

        /**
         * The current position in the streamed data.
         * @private {number}
         */
        private streamPos_: any /*missing*/;

        /**
         * The current parser state.
         * @private {goog.net.streams.PbStreamParser.State_}
         */
        private state_: any /*missing*/;

        /**
         * The tag of the proto message being parsed.
         * @private {number}
         */
        private tag_: any /*missing*/;

        /**
         * The length of the proto message being parsed.
         * @private {number}
         */
        private length_: any /*missing*/;

        /**
         * Count of processed length bytes.
         * @private {number}
         */
        private countLengthBytes_: any /*missing*/;

        /**
         * Raw bytes of the current message. Uses Uint8Array by default. Falls back to
         * native array when Uint8Array is unsupported.
         * @private {?Uint8Array|?Array<number>}
         */
        private messageBuffer_: any /*missing*/;

        /**
         * Count of processed message bytes.
         * @private {number}
         */
        private countMessageBytes_: any /*missing*/;

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
