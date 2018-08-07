/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.i18n.CharListDecompressor' {
    import alias = goog.i18n.CharListDecompressor;
    export default alias;
}

declare namespace goog.i18n {
    /**
     * Class to decompress base88 compressed character list.
     * @final
     */
    class CharListDecompressor extends __CharListDecompressor {}
    abstract class __CharListDecompressor {
        /**
         */
        constructor();

        /**
         * 1-1 mapping from ascii characters used in encoding to an integer in the
         * range 0 to 87.
         * @type {Object}
         * @private
         */
        private charMap_: Object;

        /**
         * Builds the map from ascii characters used for the base88 scheme to number
         * each character represents.
         * @param {string} str The string of characters used in base88 scheme.
         * @private
         */
        private buildCharMap_(str: string): void;

        /**
         * Gets the number encoded in base88 scheme by a substring of given length
         * and placed at the a given position of the string.
         * @param {string} str String containing sequence of characters encoding a
         *     number in base 88 scheme.
         * @param {number} start Starting position of substring encoding the number.
         * @param {number} leng Length of the substring encoding the number.
         * @return {number} The encoded number.
         * @private
         */
        private getCodeAt_(str: string, start: number, leng: number): number;

        /**
         * Add character(s) specified by the value and type to given list and return
         * the next character in the sequence.
         * @param {Array<string>} list The list of characters to which the specified
         *     characters are appended.
         * @param {number} lastcode The last codepoint that was added to the list.
         * @param {number} value The value component that representing the delta or
         *      range.
         * @param {number} type The type component that representing whether the value
         *      is a positive or negative delta or range.
         * @return {number} Last codepoint that is added to the list.
         * @private
         */
        private addChars_(list: string[], lastcode: number, value: number, type: number): number;

        /**
         * Gets the list of characters specified in the given string by base 88 scheme.
         * @param {string} str The string encoding character list.
         * @return {!Array<string>} The list of characters specified by the given
         *     string in base 88 scheme.
         */
        toCharList(str: string): string[];
    }
}
