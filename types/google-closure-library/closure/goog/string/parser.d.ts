/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.string.Parser' {
    import alias = goog.string.Parser;
    export default alias;
}

declare namespace goog.string {
    interface Parser {
        /**
         * Parses a string into an object and returns the result.
         * Agnostic to the format of string and object.
         *
         * @param {string} s The string to parse.
         * @return {*} The object generated from the string.
         */
        parse(s: string): any;
    }
}
