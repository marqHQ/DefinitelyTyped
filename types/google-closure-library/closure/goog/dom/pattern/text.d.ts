/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches text by exact matching or regular expressions.
     *
     * @extends {goog.dom.pattern.AbstractPattern}
     * @final
     */
    class Text extends __Text {}
    abstract class __Text extends goog.dom.pattern.__AbstractPattern {
        /**
         * @param {string|RegExp} match String or regular expression to match against.
         */
        constructor(match: string|RegExp);

        /**
         * The text or regular expression to match.
         *
         * @private {string|RegExp}
         */
        private match_: any /*missing*/;
    }
}
