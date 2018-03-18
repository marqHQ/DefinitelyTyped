/// <reference path="../../../globals.d.ts"/>

declare namespace goog.i18n.uCharNames {
    /**
     * Gets the name of a character, if available, returns null otherwise.
     * @param {string} ch The character.
     * @return {?string} The name of the character.
     */
    function toName(ch: string): string|null;
}
