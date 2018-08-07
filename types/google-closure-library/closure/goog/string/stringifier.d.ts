/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.string.Stringifier' {
    import alias = goog.string.Stringifier;
    export default alias;
}

declare namespace goog.string {
    interface Stringifier {
        /**
         * Serializes an object or a value to a string.
         * Agnostic to the particular format of object and string.
         *
         * @param {*} object The object to stringify.
         * @return {string} A string representation of the input.
         */
        stringify(object: any): string;
    }
}
