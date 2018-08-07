/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.html.sanitizer.TagBlacklist' {
    import alias = goog.html.sanitizer.TagBlacklist;
    export default alias;
}

declare namespace goog.html.sanitizer {
    /**
     * A list of tags which should be removed entirely from the DOM, rather than
     * merely being made inert. Tag names must be in all caps. Note that even if
     * TEMPLATE is removed from this blacklist (or even whitelisted) it will
     * continue to be removed from the HTML  as TEMPLATE is used interally to
     * denote nodes which should not be added to the sanitized HTML.
     * @const @dict {boolean}
     */
    const TagBlacklist: any /*missing*/;
}
