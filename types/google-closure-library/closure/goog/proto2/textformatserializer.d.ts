/// <reference path="../../../globals.d.ts"/>
/// <reference path="./serializer.d.ts"/>
/// <reference path="./message.d.ts"/>
/// <reference path="./fielddescriptor.d.ts"/>

declare module 'goog:goog.proto2.TextFormatSerializer' {
    import alias = goog.proto2.TextFormatSerializer;
    export default alias;
}

declare namespace goog.proto2 {
    /**
     * TextFormatSerializer, a serializer which turns Messages into the human
     * readable text format.
     * @extends {goog.proto2.Serializer}
     * @final
     */
    class TextFormatSerializer extends __TextFormatSerializer {}
    abstract class __TextFormatSerializer extends goog.proto2.__Serializer {
        /**
         * @param {boolean=} opt_ignoreMissingFields If true, then fields that cannot be
         *     found on the proto when parsing the text format will be ignored.
         * @param {boolean=} opt_useEnumValues If true, serialization code for enums
         *     will use enum integer values instead of human-readable symbolic names.
         */
        constructor(opt_ignoreMissingFields?: boolean, opt_useEnumValues?: boolean);

        /**
         * Whether to ignore fields not defined on the proto when parsing the text
         * format.
         * @type {boolean}
         * @private
         */
        private ignoreMissingFields_: boolean;

        /**
         * Whether to use integer enum values during enum serialization.
         * If false, symbolic names will be used.
         * @type {boolean}
         * @private
         */
        private useEnumValues_: boolean;

        /**
         * Serializes the message and prints the text form into the given printer.
         * @param {goog.proto2.Message} message The message to serialize.
         * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
         *    which the text format will be printed.
         * @private
         */
        private serializeMessage_(message: goog.proto2.Message, printer: any): void;

        /**
         * Serializes an unknown field. When parsed from the JsPb object format, this
         * manifests as either a primitive type, an array, or a raw object with integer
         * keys. There is no descriptor available to interpret the types of nested
         * messages.
         * @param {number} tag The tag for the field. Since it's unknown, this is a
         *     number rather than a string.
         * @param {*} value The value of the field.
         * @param {!goog.proto2.TextFormatSerializer.Printer_} printer The printer to
         *     which the text format will be serialized.
         * @private
         */
        private serializeUnknown_(tag: number, value: any, printer: any): void;

        /**
         * Prints the serialized value for the given field to the printer.
         * @param {*} value The field's value.
         * @param {goog.proto2.FieldDescriptor} field The field whose value is being
         *    printed.
         * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
         *    which the value will be printed.
         * @private
         */
        private printFieldValue_(value: any, field: goog.proto2.FieldDescriptor, printer: any): void;

        /**
         * Prints the serialized field to the printer.
         * @param {goog.proto2.Message} message The parent message.
         * @param {goog.proto2.FieldDescriptor} field The field to print.
         * @param {goog.proto2.TextFormatSerializer.Printer_} printer The printer to
         *    which the field will be printed.
         * @private
         */
        private printField_(message: goog.proto2.Message, field: goog.proto2.FieldDescriptor, printer: any): void;
    }
}

declare namespace goog.proto2.TextFormatSerializer {
    /**
     * Helper class used by the text format serializer for pretty-printing text.
     * @private
     */
    class Printer_ extends __Printer_ {}
    abstract class __Printer_ {
        /**
         */
        constructor();

        /**
         * The current indentation count.
         * @type {number}
         * @private
         */
        private indentation_: number;

        /**
         * The buffer of string pieces.
         * @type {Array<string>}
         * @private
         */
        private buffer_: string[];

        /**
         * Whether indentation is required before the next append of characters.
         * @type {boolean}
         * @private
         */
        private requiresIndentation_: boolean;

        /**
         * Increases the indentation in the printer.
         */
        indent(): void;

        /**
         * Decreases the indentation in the printer.
         */
        dedent(): void;

        /**
         * Appends the given value to the printer.
         * @param {*} value The value to append.
         */
        append(value: any): void;

        /**
         * Appends a newline to the printer.
         */
        appendLine(): void;
    }

    /**
     * Helper class for tokenizing the text format.
     * @private
     */
    class Tokenizer_ extends __Tokenizer_ {}
    abstract class __Tokenizer_ {
        /**
         * @param {string} data The string data to tokenize.
         * @param {boolean=} opt_ignoreWhitespace If true, whitespace tokens will not
         *    be reported by the tokenizer.
         * @param {boolean=} opt_ignoreComments If true, comment tokens will not be
         *    reported by the tokenizer.
         */
        constructor(data: string, opt_ignoreWhitespace?: boolean, opt_ignoreComments?: boolean);

        /**
         * Whether to skip whitespace tokens on output.
         * @private {boolean}
         */
        private ignoreWhitespace_: any /*missing*/;

        /**
         * Whether to skip comment tokens on output.
         * @private {boolean}
         */
        private ignoreComments_: any /*missing*/;

        /**
         * The data being tokenized.
         * @private {string}
         */
        private data_: any /*missing*/;

        /**
         * The current index in the data.
         * @private {number}
         */
        private index_: any /*missing*/;

        /**
         * The data string starting at the current index.
         * @private {string}
         */
        private currentData_: any /*missing*/;

        /**
         * The current token type.
         * @private {goog.proto2.TextFormatSerializer.Tokenizer_.Token}
         */
        private current_: any /*missing*/;

        /**
         * @return {goog.proto2.TextFormatSerializer.Tokenizer_.Token} The current
         *     token.
         */
        getCurrent(): goog.proto2.TextFormatSerializer.Tokenizer_.Token;

        /**
         * Advances to the next token.
         * @return {boolean} True if a valid token was found, false if the end was
         *    reached or no valid token was found.
         */
        next(): boolean;

        /**
         * Internal method for determining the next token.
         * @return {boolean} True if a next token was found, false otherwise.
         * @private
         */
        private nextInternal_(): boolean;
    }

    /**
     * Helper class for parsing the text format.
     * @final
     */
    class Parser extends __Parser {}
    abstract class __Parser {
        /**
         */
        constructor();

        /**
         * The error during parsing, if any.
         * @type {?string}
         * @private
         */
        private error_: string|null;

        /**
         * The current tokenizer.
         * @type {goog.proto2.TextFormatSerializer.Tokenizer_}
         * @private
         */
        private tokenizer_: any;

        /**
         * Whether to ignore missing fields in the proto when parsing.
         * @type {boolean}
         * @private
         */
        private ignoreMissingFields_: boolean;

        /**
         * Parses the given data, filling the message as it goes.
         * @param {goog.proto2.Message} message The message to fill.
         * @param {string} data The text format data.
         * @param {boolean=} opt_ignoreMissingFields If true, fields missing in the
         *     proto will be ignored.
         * @return {boolean} True on success, false on failure. On failure, the
         *     getError method can be called to get the reason for failure.
         */
        parse(message: goog.proto2.Message, data: string, opt_ignoreMissingFields?: boolean): boolean;

        /**
         * @return {?string} The parse error, if any.
         */
        getError(): string|null;

        /**
         * Reports a parse error.
         * @param {string} msg The error message.
         * @private
         */
        private reportError_(msg: string): void;

        /**
         * Attempts to consume the given message.
         * @param {goog.proto2.Message} message The message to consume and fill. If
         *    null, then the message contents will be consumed without ever being set
         *    to anything.
         * @param {string} delimiter The delimiter expected at the end of the message.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consumeMessage_(message: goog.proto2.Message, delimiter: string): boolean;

        /**
         * Attempts to consume the value of the given field.
         * @param {goog.proto2.Message} message The parent message.
         * @param {goog.proto2.FieldDescriptor} field The field.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consumeFieldValue_(message: goog.proto2.Message, field: goog.proto2.FieldDescriptor): boolean;

        /**
         * Attempts to parse the given field's value from the stream.
         * @param {goog.proto2.FieldDescriptor} field The field.
         * @return {*} The field's value or null if none.
         * @private
         */
        private getFieldValue_(field: goog.proto2.FieldDescriptor): any;

        /**
         * Attempts to consume a nested message.
         * @param {goog.proto2.Message} message The parent message.
         * @param {goog.proto2.FieldDescriptor} field The field.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consumeNestedMessage_(message: goog.proto2.Message, field: goog.proto2.FieldDescriptor): boolean;

        /**
         * Attempts to consume the value of an unknown field. This method uses
         * heuristics to try to consume just the right tokens.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consumeUnknownFieldValue_(): boolean;

        /**
         * Attempts to consume a field under a message.
         * @param {goog.proto2.Message} message The parent message. If null, then the
         *     field value will be consumed without being assigned to anything.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consumeField_(message: goog.proto2.Message): boolean;

        /**
         * Attempts to consume a token with the given string value.
         * @param {string} value The string value for the token.
         * @return {boolean} True if the token matches and was consumed, false
         *    otherwise.
         * @private
         */
        private tryConsume_(value: string): boolean;

        /**
         * Consumes a token of the given type.
         * @param {goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes} type The type
         *     of the token to consume.
         * @return {?string} The string value of the token or null on error.
         * @private
         */
        private consumeToken_(type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes): string|null;

        /**
         * Consumes an IDENTIFIER token.
         * @return {?string} The string value or null on error.
         * @private
         */
        private consumeIdentifier_(): string|null;

        /**
         * Consumes a NUMBER token.
         * @return {?string} The string value or null on error.
         * @private
         */
        private consumeNumber_(): string|null;

        /**
         * Consumes a STRING token. Strings may come in multiple adjacent tokens which
         * are automatically concatenated, like in C or Python.
         * @return {?string} The *deescaped* string value or null on error.
         * @private
         */
        private consumeString_(): string|null;

        /**
         * Consumes a token with the given value. If not found, reports an error.
         * @param {string} value The string value expected for the token.
         * @return {boolean} True on success, false otherwise.
         * @private
         */
        private consume_(value: string): boolean;

        /**
         * @param {string} value The value to check against.
         * @return {boolean} True if the current token has the given string value.
         * @private
         */
        private lookingAt_(value: string): boolean;

        /**
         * @param {goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes} type The
         *     token type.
         * @return {boolean} True if the current token has the given type.
         * @private
         */
        private lookingAtType_(type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes): boolean;
    }
}

declare namespace goog.proto2.TextFormatSerializer.Tokenizer_ {
    /**
     * @typedef {{type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes,
     *            value: ?string}}
     */
    interface Token {
        type: goog.proto2.TextFormatSerializer.Tokenizer_.TokenTypes;
        value: string|null;
    }

    /**
     * An enumeration of all the token types.
     * @enum {!RegExp}
     */
    enum TokenTypes {
        END,
        IDENTIFIER,
        NUMBER,
        COMMENT,
        OPEN_BRACE,
        CLOSE_BRACE,
        OPEN_TAG,
        CLOSE_TAG,
        OPEN_LIST,
        CLOSE_LIST,
        STRING,
        COLON,
        COMMA,
        SEMI,
        WHITESPACE
    }
}

declare namespace goog.proto2.TextFormatSerializer.Parser {
}
