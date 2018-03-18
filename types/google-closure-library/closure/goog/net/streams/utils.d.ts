/// <reference path="../../../../globals.d.ts"/>

declare namespace exports {
    /**
     * Returns whether a character is whitespace in the context of parsing JSON
     * stream.
     *
     * TODO(user): 0xa0 for IE?
     *
     * @param {string} c The char to check
     * @return {boolean} true if a char is a whitespace
     */
    function isJsonWhitespace(c: string): boolean;
}
