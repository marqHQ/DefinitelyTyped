/// <reference path="../../../../../../globals.d.ts"/>

declare module 'goog:goog.string.html' {
    export = goog.string.html;
}

declare module 'goog:goog.string.html.HtmlSaxHandler' {
    import alias = goog.string.html.HtmlSaxHandler;
    export default alias;
}

declare module 'goog:goog.string.html.HtmlParser' {
    import alias = goog.string.html.HtmlParser;
    export default alias;
}

declare module 'goog:goog.string.html.HtmlParser.Entities' {
    import alias = goog.string.html.HtmlParser.Entities;
    export default alias;
}

declare module 'goog:goog.string.html.HtmlParser.Elements' {
    import alias = goog.string.html.HtmlParser.Elements;
    export default alias;
}

declare module 'goog:goog.string.html.HtmlParser.EFlags' {
    import alias = goog.string.html.HtmlParser.EFlags;
    export default alias;
}

declare namespace goog._string.html {
    /**
     * An Html parser: `parse` takes a string and calls methods on
     * `goog.string.html.HtmlSaxHandler` while it is visiting it.
     *
     */
    class HtmlParser extends __HtmlParser {}
    abstract class __HtmlParser {
        /**
         */
        constructor();

        /**
         * Given a SAX-like `goog.string.html.HtmlSaxHandler` parses a
         * `htmlText` and lets the `handler` know the structure while
         * visiting the nodes.
         *
         * @param {goog.string.html.HtmlSaxHandler} handler The HtmlSaxHandler that will
         *     receive the events.
         * @param {string} htmlText The html text.
         */
        parse(handler: goog.string.html.HtmlSaxHandler, htmlText: string): void;

        /**
         * Decodes an HTML entity.
         *
         * @param {string} name The content between the '&' and the ';'.
         * @return {string} A single unicode code-point as a string.
         * @private
         */
        private lookupEntity_(name: string): string;

        /**
         * Removes null characters on the string.
         * @param {string} s The string to have the null characters removed.
         * @return {string} A string without null characters.
         * @private
         */
        private stripNULs_(s: string): string;

        /**
         * The plain text of a chunk of HTML CDATA which possibly containing.
         *
         * TODO(goto): use `goog.string.unescapeEntities` instead ?
         * @param {string} s A chunk of HTML CDATA.  It must not start or end inside
         *   an HTML entity.
         * @return {string} The unescaped entities.
         * @private
         */
        private unescapeEntities_(s: string): string;

        /**
         * Escape entities in RCDATA that can be escaped without changing the meaning.
         * @param {string} rcdata The RCDATA string we want to normalize.
         * @return {string} A normalized version of RCDATA.
         * @private
         */
        private normalizeRCData_(rcdata: string): string;
    }

    interface HtmlSaxHandler {
        /**
         * Handler called when the parser found a new tag.
         * @param {string} name The name of the tag that is starting.
         * @param {Array<string>} attributes The attributes of the tag.
         */
        startTag(name: string, attributes: string[]): void;

        /**
         * Handler called when the parser found a closing tag.
         * @param {string} name The name of the tag that is ending.
         */
        endTag(name: string): void;

        /**
         * Handler called when PCDATA is found.
         * @param {string} text The PCDATA text found.
         */
        pcdata(text: string): void;

        /**
         * Handler called when RCDATA is found.
         * @param {string} text The RCDATA text found.
         */
        rcdata(text: string): void;

        /**
         * Handler called when CDATA is found.
         * @param {string} text The CDATA text found.
         */
        cdata(text: string): void;

        /**
         * Handler called when the parser is starting to parse the document.
         */
        startDoc: any /*missing*/;

        /**
         * Handler called when the parsing is done.
         */
        endDoc: any /*missing*/;
    }

    /**
     * TODO(goto): why isn't this in the string package ? does this solves any
     * real problem ? move it to the goog.string package if it does.
     *
     * @param {string} str The string to lower case.
     * @return {string} The str in lower case format.
     */
    function toLowerCase(str: string): string;
}

declare namespace goog._string.html.HtmlParser {
    /**
     * HTML entities that are encoded/decoded.
     * TODO(user): use `goog.string.htmlEncode` instead.
     * @type {!Object<string, string>}
     */
    let Entities: {[key: string]: string};

    /**
     * The html eflags, used internally on the parser.
     * @enum {number}
     */
    enum EFlags { OPTIONAL_ENDTAG, EMPTY, CDATA, RCDATA, UNSAFE, FOLDABLE }

    /**
     * A map of element to a bitmap of flags it has, used internally on the parser.
     * @type {Object<string,number>}
     */
    let Elements: {[key: string]: number};

    /**
     * Regular expression that matches &s.
     * @type {RegExp}
     * @package
     */
    let AMP_RE: RegExp;

    /**
     * Regular expression that matches <.
     * @type {RegExp}
     * @package
     */
    let LT_RE: RegExp;

    /**
     * Regular expression that matches >.
     * @type {RegExp}
     * @package
     */
    let GT_RE: RegExp;

    /**
     * Regular expression that matches ".
     * @type {RegExp}
     * @package
     */
    let QUOTE_RE: RegExp;

    /**
     * Regular expression that matches =.
     * @type {RegExp}
     * @package
     */
    let EQUALS_RE: RegExp;
}
