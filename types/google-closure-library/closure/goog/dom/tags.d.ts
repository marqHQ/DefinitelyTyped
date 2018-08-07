/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.tags' {
    export = goog.dom.tags;
}

declare namespace goog.dom.tags {
    /**
     * The void elements specified by
     * http://www.w3.org/TR/html-markup/syntax.html#void-elements.
     * @const @private {!Object<string, boolean>}
     */
    const VOID_TAGS_: any /*missing*/;

    /**
     * Checks whether the tag is void (with no contents allowed and no legal end
     * tag), for example 'br'.
     * @param {string} tagName The tag name in lower case.
     * @return {boolean}
     */
    function isVoidTag(tagName: string): boolean;
}
