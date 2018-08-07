/// <reference path="../../../globals.d.ts"/>
/// <reference path="./safehtml.d.ts"/>

declare module 'goog:goog.html.SafeHtmlFormatter' {
    import alias = goog.html.SafeHtmlFormatter;
    export default alias;
}

declare namespace goog.html {
    /**
     * Formatter producing SafeHtml from a plain text format and HTML fragments.
     *
     * Example usage:
     *
     * var formatter = new goog.html.SafeHtmlFormatter();
     * var safeHtml = formatter.format(
     *     formatter.startTag('b') +
     *     'User input:' +
     *     formatter.endTag('b') +
     *     ' ' +
     *     formatter.text(userInput));
     *
     * The most common usage is with goog.getMsg:
     *
     * var MSG_USER_INPUT = goog.getMsg(
     *     '{$startLink}Learn more{$endLink} about {$userInput}', {
     *       'startLink': formatter.startTag('a', {'href': url}),
     *       'endLink': formatter.endTag('a'),
     *       'userInput': formatter.text(userInput)
     *     });
     * var safeHtml = formatter.format(MSG_USER_INPUT);
     *
     * The formatting string should be constant with all variables processed by
     * formatter.text().
     *
     * @struct
     * @final
     */
    class SafeHtmlFormatter extends __SafeHtmlFormatter {}
    abstract class __SafeHtmlFormatter {
        /**
         */
        constructor();

        /**
         * Mapping from a marker to a replacement.
         * @private {!Object<string, !goog.html.SafeHtmlFormatter.Replacement>}
         */
        private replacements_: any /*missing*/;

        /** @private {number} Number of stored replacements. */
        private replacementsCount_: any /*missing*/;

        /**
         * Formats a plain text string with markers holding HTML fragments to SafeHtml.
         * @param {string} format Plain text format, will be HTML-escaped.
         * @return {!goog.html.SafeHtml}
         */
        format(format: string): goog.html.SafeHtml;

        /**
         * Replaces found formatting strings with saved tags.
         * @param {!Array<string>} openedTags The tags opened so far, modified by this
         *     function.
         * @param {string} match
         * @return {string}
         * @private
         */
        private replaceFormattingString_(openedTags: string[], match: string): string;

        /**
         * Saves a start tag and returns its marker.
         * @param {string} tagName
         * @param {?Object<string, ?goog.html.SafeHtml.AttributeValue>=} opt_attributes
         *     Mapping from attribute names to their values. Only attribute names
         *     consisting of [a-zA-Z0-9-] are allowed. Value of null or undefined causes
         *     the attribute to be omitted.
         * @return {string} Marker.
         * @throws {Error} If invalid tag name, attribute name, or attribute value is
         *     provided. This function accepts the same tags and attributes as
         *     {@link goog.html.SafeHtml.create}.
         */
        startTag(tagName: string, opt_attributes?: {[key: string]: goog.html.SafeHtml.AttributeValue|null}|null):
            string;

        /**
         * Saves an end tag and returns its marker.
         * @param {string} tagName
         * @return {string} Marker.
         * @throws {Error} If invalid tag name, attribute name, or attribute value is
         *     provided. This function accepts the same tags and attributes as
         *     {@link goog.html.SafeHtml.create}.
         */
        endTag(tagName: string): string;

        /**
         * Escapes a text, saves it and returns its marker.
         *
         * Wrapping any user input to .text() prevents the attacker with access to
         * the random number generator to duplicate tags used elsewhere in the format.
         *
         * @param {string} text
         * @return {string} Marker.
         */
        text(text: string): string;

        /**
         * Saves SafeHtml and returns its marker.
         * @param {!goog.html.SafeHtml} safeHtml
         * @return {string} Marker.
         */
        safeHtml(safeHtml: goog.html.SafeHtml): string;

        /**
         * Stores a replacement and returns its marker.
         * @param {!goog.html.SafeHtmlFormatter.Replacement} replacement
         * @return {string} Marker.
         * @private
         */
        private storeReplacement_(replacement: goog.html.SafeHtmlFormatter.Replacement): string;
    }
}

declare namespace goog.html.SafeHtmlFormatter {
    /**
     * @typedef {?{
     *   startTag: (string|undefined),
     *   attributes: (string|undefined),
     *   endTag: (string|undefined),
     *   html: (string|undefined)
     * }}
     */
    interface Replacement {
        startTag: string|undefined;
        attributes: string|undefined;
        endTag: string|undefined;
        html: string|undefined;
    }
}
