/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.json' {
    export = goog.json;
}

declare module 'goog:goog.json.Serializer' {
    import alias = goog.json.Serializer;
    export default alias;
}

declare module 'goog:goog.json.Reviver' {
    import alias = goog.json.Reviver;
    export default alias;
}

declare module 'goog:goog.json.Replacer' {
    import alias = goog.json.Replacer;
    export default alias;
}

declare namespace goog.json {
    /**
     * Class that is used to serialize JSON objects to a string.
     */
    class Serializer extends __Serializer {}
    abstract class __Serializer {
        /**
         * @param {?goog.json.Replacer=} opt_replacer Replacer.
         */
        constructor(opt_replacer?: goog.json.Replacer|null);

        /**
         * @type {goog.json.Replacer|null|undefined}
         * @private
         */
        private replacer_: goog.json.Replacer|null|undefined;

        /**
         * Serializes an object or a value to a JSON string.
         *
         * @param {*} object The object to serialize.
         * @throws Error if there are loops in the object graph.
         * @return {string} A JSON string representation of the input.
         */
        serialize(object: any): string;

        /**
         * Serializes a generic value to a JSON string
         * @protected
         * @param {*} object The object to serialize.
         * @param {Array<string>} sb Array used as a string builder.
         * @throws Error if there are loops in the object graph.
         */
        protected serializeInternal(object: any, sb: string[]): void;

        /**
         * Serializes a string to a JSON string
         * @private
         * @param {string} s The string to serialize.
         * @param {Array<string>} sb Array used as a string builder.
         */
        private serializeString_(s: string, sb: string[]): void;

        /**
         * Serializes a number to a JSON string
         * @private
         * @param {number} n The number to serialize.
         * @param {Array<string>} sb Array used as a string builder.
         */
        private serializeNumber_(n: number, sb: string[]): void;

        /**
         * Serializes an array to a JSON string
         * @param {Array<string>} arr The array to serialize.
         * @param {Array<string>} sb Array used as a string builder.
         * @protected
         */
        protected serializeArray(arr: string[], sb: string[]): void;

        /**
         * Serializes an object to a JSON string
         * @private
         * @param {!Object} obj The object to serialize.
         * @param {Array<string>} sb Array used as a string builder.
         */
        private serializeObject_(obj: Object, sb: string[]): void;
    }

    /**
     * Tests if a string is an invalid JSON string. This only ensures that we are
     * not using any invalid characters
     * @param {string} s The string to test.
     * @return {boolean} True if the input is a valid JSON string.
     */
    function isValid(s: string): boolean;

    /**
     * Sets an error logger to use if there's a recoverable parsing error and
     * `goog.json.TRY_NATIVE_JSON` is enabled.
     * @param {function(string, !Error)} errorLogger The first parameter is the
     *     error message, the second is the exception thrown by `JSON.parse`.
     */
    function setErrorLogger(errorLogger: (_0: string, _1: Error) => void): void;

    /**
     * Parses a JSON string and returns the result. This throws an exception if
     * the string is an invalid JSON string.
     *
     * Note that this is very slow on large strings. Use JSON.parse if possible.
     *
     * @param {*} s The JSON string to parse.
     * @throws Error if s is invalid JSON.
     * @return {Object} The object generated from the JSON string, or null.
     * @deprecated Use JSON.parse.
     */
    function parse(s: any): Object;

    /**
     * JSON replacer, as defined in Section 15.12.3 of the ES5 spec.
     * @see http://ecma-international.org/ecma-262/5.1/#sec-15.12.3
     *
     * TODO(nicksantos): Array should also be a valid replacer.
     *
     * @typedef {function(this:Object, string, *): *}
     */
    interface Replacer {
        (_0: string, _1: any): any;
    }

    /**
     * JSON reviver, as defined in Section 15.12.2 of the ES5 spec.
     * @see http://ecma-international.org/ecma-262/5.1/#sec-15.12.3
     *
     * @typedef {function(this:Object, string, *): *}
     */
    interface Reviver {
        (_0: string, _1: any): any;
    }

    /**
     * Serializes an object or a value to a JSON string.
     *
     * @param {*} object The object to serialize.
     * @param {?goog.json.Replacer=} opt_replacer A replacer function
     *     called for each (key, value) pair that determines how the value
     *     should be serialized. By defult, this just returns the value
     *     and allows default serialization to kick in.
     * @throws Error if there are loops in the object graph.
     * @return {string} A JSON string representation of the input.
     */
    function serialize(object: any, opt_replacer?: goog.json.Replacer|null): string;
}

declare namespace goog.json.Serializer {
}
